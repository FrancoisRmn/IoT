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
const nearest = require('nearest-date')

class WakeUpController {

    public async getWakeUp(): Promise<WakeUpModel> {

        const config = await configDataAccess.get();
        const direction = await this.getDirectionModel(config);
        const wuTimeOffice = this.calcWakeUpTimeOfficeWorking(direction.departureTime,config);
        if (config.preferHomeWorking) {
            if (config.homeWorkingConfig.agendaCheck) {
                const events = await agendaDataAccess.getEvents(new URL(config.homeWorkingConfig.agendaCheck.url));
                const eventFound = events.find(e => e.location === config.officeWorkingConfig.address)
                if (eventFound) {
                    return new WakeUpModel(wuTimeOffice, new AgendaWakeUpReason(config.homeWorkingConfig,config.homeWorkingConfig.agendaCheck, eventFound))
                }
            }
            const wuTimeHome = this.calcWakeUpTimeHomeWorking(config.homeWorkingConfig)
            return new WakeUpModel(wuTimeHome, new PreferHomeWorkingWakeUpReason(config.homeWorkingConfig))
        } else {
            if(wuTimeOffice < config.officeWorkingConfig.directionCheck.noWakeUpBefore){
                const wuTimeHome = this.calcWakeUpTimeHomeWorking(config.homeWorkingConfig)
                return new WakeUpModel(wuTimeHome, new TooEarlyWakeUpReason(config.officeWorkingConfig,config.officeWorkingConfig.directionCheck, direction))
            }

            if (config.officeWorkingConfig.airPollutionCheck) {
                const currentOfficeAirPollution = await airPollutionDataAccess.getAirPollutionHourly(config.officeWorkingConfig.position.lat,config.officeWorkingConfig.position.lon)
                const index = nearest(currentOfficeAirPollution.map(a => a.time), new Date(config.officeWorkingConfig.shouldStartAt))
                const nearestAirPollution = currentOfficeAirPollution[index]
                if(nearestAirPollution.aqi < config.officeWorkingConfig.airPollutionCheck.minAqi){
                    const wuTimeHome = this.calcWakeUpTimeHomeWorking(config.homeWorkingConfig)
                    return new WakeUpModel(wuTimeHome, new AirPollutionWakeUpReason(config.officeWorkingConfig,config.officeWorkingConfig.airPollutionCheck, nearestAirPollution))
                }

                const currentHomeAirPollution = await airPollutionDataAccess.getHomeAirPollution()
                if(currentHomeAirPollution.aqi < config.officeWorkingConfig.airPollutionCheck.minAqi){
                    const wuTimeHome = this.calcWakeUpTimeHomeWorking(config.homeWorkingConfig)
                    return new WakeUpModel(wuTimeHome, new AirPollutionWakeUpReason(config.officeWorkingConfig,config.officeWorkingConfig.airPollutionCheck, currentHomeAirPollution))
                }
            }
    
            if (config.officeWorkingConfig.weatherCheck) {
                const currentOfficeWeather = await weatherDataAccess.getWeatherHourly(config.officeWorkingConfig.position.lat, config.officeWorkingConfig.position.lon)
                const indexOffice = nearest(currentOfficeWeather.map(c => c.time), new Date(config.officeWorkingConfig.shouldStartAt))
                const nearestOfficeWeather = currentOfficeWeather[indexOffice]
                if((nearestOfficeWeather.temp < config.officeWorkingConfig.weatherCheck.minTemp)||(nearestOfficeWeather.temp > config.officeWorkingConfig.weatherCheck.maxTemp)){
                    const wuTimeHome = this.calcWakeUpTimeHomeWorking(config.homeWorkingConfig)
                    return new WakeUpModel(wuTimeHome, new WeatherTemperatureWakeUpReason(config.officeWorkingConfig,config.officeWorkingConfig.weatherCheck,nearestOfficeWeather))
                }

                const currentHomeWeather = await weatherDataAccess.getWeatherHourly(config.homeWorkingConfig.position.lat, config.homeWorkingConfig.position.lon)
                const indexHome = nearest(currentHomeWeather.map(c => c.time), new Date(direction.departureTime))
                const nearestHomeWeather = currentHomeWeather[indexHome]
                if((nearestHomeWeather.temp < config.officeWorkingConfig.weatherCheck.minTemp)||(nearestHomeWeather.temp > config.officeWorkingConfig.weatherCheck.maxTemp)){
                    const wuTimeHome = this.calcWakeUpTimeHomeWorking(config.homeWorkingConfig)
                    return new WakeUpModel(wuTimeHome, new WeatherTemperatureWakeUpReason(config.officeWorkingConfig,config.officeWorkingConfig.weatherCheck,nearestHomeWeather))
                }
            }
        }
    }

    public async saveConfig(c: WakeUpConfig): Promise<WakeUpConfig>{
        const officeAdressGeocoded = await geocodingDataAccess.geocode(c.officeWorkingConfig.address)
        const homeAdressGeocoded = await geocodingDataAccess.geocode(c.homeWorkingConfig.address)
        c.homeWorkingConfig.position = homeAdressGeocoded
        c.officeWorkingConfig.position = officeAdressGeocoded
        return configDataAccess.save(c);
    }

    public async getConfig(): Promise<WakeUpConfig>{
        return await configDataAccess.get();
    }

    private async getDirectionModel(config: WakeUpConfig): Promise<DirectionModel> {

        if((!config.homeWorkingConfig.position) || (!config.officeWorkingConfig.position)){
            throw new SystemException()
        }

        const directionModel = await directionDataAccess.getDirection(
            config.officeWorkingConfig.shouldStartAt,
            config.homeWorkingConfig.position.lat,
            config.homeWorkingConfig.position.lon,
            config.officeWorkingConfig.position.lat,
            config.officeWorkingConfig.position.lon,
            config.officeWorkingConfig.directionCheck.mode
        )

        return {
            departureTime: directionModel.departureTime,
        }
    }

    private calcWakeUpTimeHomeWorking(config: HomeWorkingConfig): number {
        return moment()
            .startOf('date')
            .seconds(config.shouldStartAt)
            .subtract(config.preparationDuration)
            .unix()
    }

    private calcWakeUpTimeOfficeWorking(dpTime: number, config: WakeUpConfig): number{
        return moment()
        .startOf('date')
        .seconds(config.officeWorkingConfig.shouldStartAt)
        .subtract(config.officeWorkingConfig.preparationDuration)
        .subtract(dpTime)
        .unix()
    }

}

export const wakeupController = new WakeUpController()