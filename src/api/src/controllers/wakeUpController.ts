import { agendaDataAccess } from "../dataAccess/agendaDataAccess";
import { directionDataAccess } from "../dataAccess/directionDataAccess";
import { geocodingDataAccess } from "../dataAccess/geocodingDataAccess";
import { WakeUpConfig, WorkingConfig, HomeWorkingConfig, OfficeWorkingConfig } from "../models/wake-up-config/WakeUpConfigModel";
import _ from 'lodash';
import moment from "moment";
import { configDataAccess } from "../dataAccess/configDataAccess";
import { airPollutionDataAccess } from "../dataAccess/airPollutionDataAccess";
import { SystemException } from "../models/exceptions/SystemException";
import { DirectionModel } from "../models/direction/DirectionModel";
import { weatherDataAccess } from "../dataAccess/weatherDataAccess";
import { WakeUpModel } from "../models/wakeup/WakeUpModel";
import { AgendaWakeUpReason } from "../models/wakeup/AgendaWakeUpReason";
import { TooEarlyWakeUpReason } from "../models/wakeup/TooEarlyWakeUpReason";
import { AirPollutionWakeUpReason } from "../models/wakeup/AirPollutionWakeUpReason";
import { WeatherTemperatureWakeUpReason } from "../models/wakeup/WeatherTemperatureWakeUpReason";
import { PreferHomeWorkingWakeUpReason } from "../models/wakeup/PreferHomeWorkingWakeUpReason";
import { PreferOfficeWorkingWakeUpReason } from "../models/wakeup/PreferOfficeWorkingWakeUpReason";
import { WeatherConditionWakeUpReason } from "../models/wakeup/WeatherConditionWakeUpReason";
import { NoPublicTransportAvailableException } from "../models/exceptions/NoPublicTransportAvailableException";
import { NoPublicTransportAvailableWakeUpReason } from "../models/wakeup/NoPublicTransportAvailableWakeUpReason";
const nearest = require('nearest-date')

class WakeUpController {

    public async getWakeUp(): Promise<WakeUpModel> {

        const config = await configDataAccess.get();
        let direction;
        try{
            direction = await this.getDirectionModel(config);
        } catch(err){
            switch(err.constructor){
                case NoPublicTransportAvailableException:
                    const wuTimeHome = this.calcWakeUpTimeHomeWorking(config.homeWorkingConfig)
                    return new WakeUpModel(wuTimeHome, new NoPublicTransportAvailableWakeUpReason(config.homeWorkingConfig, config.officeWorkingConfig.directionCheck,null))
                default: throw new SystemException()
            }
        }
        const wuTimeOffice = this.calcWakeUpTimeOfficeWorking(direction.departureTime, config.officeWorkingConfig);
        if (config.preferHomeWorking) {
            if (config.homeWorkingConfig.agendaCheck) {
                const events = await agendaDataAccess.getEvents(new URL(config.homeWorkingConfig.agendaCheck.url));
                const eventFound = events.find(e =>
                    //e.location === config.officeWorkingConfig.address &&
                    moment().startOf('day').isSame(moment(e.startDate).startOf('day'))
                )
                if (eventFound) {
                    return new WakeUpModel(wuTimeOffice, new AgendaWakeUpReason(config.homeWorkingConfig, config.homeWorkingConfig.agendaCheck, eventFound,direction))
                }
            }
            const wuTimeHome = this.calcWakeUpTimeHomeWorking(config.homeWorkingConfig)
            return new WakeUpModel(wuTimeHome, new PreferHomeWorkingWakeUpReason(config.homeWorkingConfig))
        } else {
            if (wuTimeOffice < config.officeWorkingConfig.directionCheck.noWakeUpBefore) {
                const wuTimeHome = this.calcWakeUpTimeHomeWorking(config.homeWorkingConfig)
                return new WakeUpModel(wuTimeHome, new TooEarlyWakeUpReason(config.officeWorkingConfig, config.officeWorkingConfig.directionCheck, direction))
            }

            if (config.officeWorkingConfig.airPollutionCheck) {
                const currentOfficeAirPollution = await airPollutionDataAccess.getAirPollutionHourly(config.officeWorkingConfig.position.lat, config.officeWorkingConfig.position.lon)
                const index = nearest(currentOfficeAirPollution.map(a => a.time), new Date(direction.arrivalTime))
                const nearestAirPollution = currentOfficeAirPollution[index]
                if (nearestAirPollution.aqi > config.officeWorkingConfig.airPollutionCheck.minAqi) {
                    const wuTimeHome = this.calcWakeUpTimeHomeWorking(config.homeWorkingConfig)
                    return new WakeUpModel(wuTimeHome, new AirPollutionWakeUpReason(config.officeWorkingConfig, config.officeWorkingConfig.airPollutionCheck, nearestAirPollution))
                }
                const currentHomeAirPollution = await airPollutionDataAccess.getHomeAirPollution()
                if (currentHomeAirPollution.aqi > config.officeWorkingConfig.airPollutionCheck.minAqi) {
                    const wuTimeHome = this.calcWakeUpTimeHomeWorking(config.homeWorkingConfig)
                    return new WakeUpModel(wuTimeHome, new AirPollutionWakeUpReason(config.officeWorkingConfig, config.officeWorkingConfig.airPollutionCheck, currentHomeAirPollution))
                }
            }

            if (config.officeWorkingConfig.weatherCheck) {
                const currentOfficeWeather = await weatherDataAccess.getWeatherHourly(config.officeWorkingConfig.position.lat, config.officeWorkingConfig.position.lon)
                const indexOffice = nearest(currentOfficeWeather.map(c => c.time), new Date(direction.arrivalTime))
                const nearestOfficeWeather = currentOfficeWeather[indexOffice]
                if ((nearestOfficeWeather.temp < config.officeWorkingConfig.weatherCheck?.minTemp) || (nearestOfficeWeather.temp > config.officeWorkingConfig.weatherCheck?.maxTemp)) {
                    const wuTimeHome = this.calcWakeUpTimeHomeWorking(config.homeWorkingConfig)
                    return new WakeUpModel(wuTimeHome, new WeatherTemperatureWakeUpReason(config.officeWorkingConfig, config.officeWorkingConfig.weatherCheck, nearestOfficeWeather))
                }
                
                const wccOfficeFound = config.officeWorkingConfig.weatherCheck?.weatherConditionsCheck.find(wcc => wcc.type === nearestOfficeWeather.condition.type)
                if (wccOfficeFound && nearestOfficeWeather.condition.intensity > wccOfficeFound.maxIntensity) {
                    const wuTimeHome = this.calcWakeUpTimeHomeWorking(config.homeWorkingConfig)
                    return new WakeUpModel(wuTimeHome, new WeatherConditionWakeUpReason(config.officeWorkingConfig, wccOfficeFound, nearestOfficeWeather))
                }

                const currentHomeWeather = await weatherDataAccess.getWeatherHourly(config.homeWorkingConfig.position.lat, config.homeWorkingConfig.position.lon)
                const indexHome = nearest(currentHomeWeather.map(c => c.time), new Date(direction.departureTime))
                const nearestHomeWeather = currentHomeWeather[indexHome]
                if ((nearestHomeWeather.temp < config.officeWorkingConfig.weatherCheck.minTemp) || (nearestHomeWeather.temp > config.officeWorkingConfig.weatherCheck.maxTemp)) {
                    const wuTimeHome = this.calcWakeUpTimeHomeWorking(config.homeWorkingConfig)
                    return new WakeUpModel(wuTimeHome, new WeatherTemperatureWakeUpReason(config.homeWorkingConfig, config.officeWorkingConfig.weatherCheck, nearestHomeWeather))
                }
                const wccHomeFound = config.officeWorkingConfig.weatherCheck?.weatherConditionsCheck.find(wcc => wcc.type === nearestOfficeWeather.condition.type)
                if (wccHomeFound && nearestHomeWeather.condition.intensity > wccHomeFound.maxIntensity) {
                    const wuTimeHome = this.calcWakeUpTimeHomeWorking(config.homeWorkingConfig)
                    return new WakeUpModel(wuTimeHome, new WeatherConditionWakeUpReason(config.homeWorkingConfig, wccHomeFound, nearestOfficeWeather))
                }
            }
            return new WakeUpModel(wuTimeOffice, new PreferOfficeWorkingWakeUpReason(config.officeWorkingConfig, direction))
        }
    }

    public async saveConfig(c: WakeUpConfig): Promise<WakeUpConfig> {
        const officeAdressGeocoded = await geocodingDataAccess.geocode(c.officeWorkingConfig.address)
        const homeAdressGeocoded = await geocodingDataAccess.geocode(c.homeWorkingConfig.address)
        c.homeWorkingConfig.position = homeAdressGeocoded
        c.officeWorkingConfig.position = officeAdressGeocoded
        return configDataAccess.save(c);
    }

    public async getConfig(): Promise<WakeUpConfig> {
        return await configDataAccess.get();
    }

    private async getDirectionModel(config: WakeUpConfig): Promise<DirectionModel> {

        if ((!config.homeWorkingConfig.position) || (!config.officeWorkingConfig.position)) {
            throw new SystemException()
        }

        const directionModel = await directionDataAccess.getDirection(
            moment().startOf('day').add(config.officeWorkingConfig.shouldStartAt,'seconds').toDate(),
            config.homeWorkingConfig.position.lat,
            config.homeWorkingConfig.position.lon,
            config.officeWorkingConfig.position.lat,
            config.officeWorkingConfig.position.lon,
            config.officeWorkingConfig.directionCheck.mode
        )

        return directionModel
    }

    private calcWakeUpTimeHomeWorking(config: HomeWorkingConfig): number {
        return config.shouldStartAt - config.preparationDuration
    }

    private calcWakeUpTimeOfficeWorking(dpTime: number, config: OfficeWorkingConfig): number {
        return dpTime - config.preparationDuration
    }

}

export const wakeupController = new WakeUpController()