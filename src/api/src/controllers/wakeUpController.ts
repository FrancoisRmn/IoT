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
const nearest = require('nearest-date')

class WakeUpController {
    private readonly TEMP_URL = "https://ade.unamur.be/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=1959&projectId=1&calType=ical&nbWeeks=52&displayConfigId=8"

    public async getWakeUpTime(): Promise<number> {

        const config = await configDataAccess.get();
        const direction = await this.getDirectionModel(config);
        const wuTime = await this.calcWakeUpTimeOfficeWorking(direction.departureTime,config);

        if (config.preferHomeWorking) {
            if (config.homeWorkingConfig.agendaCheck) {
                const events = await agendaDataAccess.getEvents(new URL(config.homeWorkingConfig.agendaCheck.url));
                const eventFound = events.find(e => e.location === config.officeWorkingConfig.address)
                if (eventFound) {
                    return this.calcWakeUpTimeOfficeWorking(direction.departureTime,config);
                }
            }
        } else {
            if(wuTime < config.noWakeUpBefore){
                return this.calcWakeUpTimeHomeWorking(config.homeWorkingConfig)
            }

            if (config.officeWorkingConfig.airPollutionCheck) {
                const currentOfficeAirPollution = await airPollutionDataAccess.getAirPollutionHourly(config.officeWorkingConfig.position.lat,config.officeWorkingConfig.position.lon)
                const index = nearest(currentOfficeAirPollution.map(a => a.time), new Date(direction.arrivalTime))
                const nearestAirPollution = currentOfficeAirPollution[index]
                if(nearestAirPollution.aqi < config.officeWorkingConfig.airPollutionCheck.minAqi){
                    return this.calcWakeUpTimeHomeWorking(config.homeWorkingConfig)
                }

                const currentHomeAirPollution = await airPollutionDataAccess.getHomeAirPollution()
                if(currentHomeAirPollution.aqi < config.officeWorkingConfig.airPollutionCheck.minAqi){
                    return this.calcWakeUpTimeHomeWorking(config.homeWorkingConfig)
                }
            }
    
            if (config.officeWorkingConfig.weatherCheck) {
                const currentOfficeWeather = await weatherDataAccess.getWeatherHourly(config.officeWorkingConfig.position.lat, config.officeWorkingConfig.position.lon)
                const indexOffice = nearest(currentOfficeWeather.map(c => c.time), new Date(direction.arrivalTime))
                const nearestOfficeWeather = currentOfficeWeather[indexOffice]
                if((nearestOfficeWeather.temperature < config.officeWorkingConfig.weatherCheck.minTemp)||(nearestOfficeWeather.temperature > config.officeWorkingConfig.weatherCheck.maxTemp)){
                    return this.calcWakeUpTimeHomeWorking(config.homeWorkingConfig)
                }

                const currentHomeWeather = await weatherDataAccess.getWeatherHourly(config.homeWorkingConfig.position.lat, config.homeWorkingConfig.position.lon)
                const indexHome = nearest(currentHomeWeather.map(c => c.time), new Date(direction.departureTime))
                const nearestHomeWeather = currentHomeWeather[indexHome]
                if((nearestHomeWeather.temperature < config.officeWorkingConfig.weatherCheck.minTemp)||(nearestHomeWeather.temperature > config.officeWorkingConfig.weatherCheck.maxTemp)){
                    return this.calcWakeUpTimeHomeWorking(config.homeWorkingConfig)
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
            arrivalTime: directionModel.arrivalTime
        }
    }

    private calcWakeUpTimeHomeWorking(config: HomeWorkingConfig): number {
        return moment()
            .startOf('date')
            .seconds(config.shouldStartAt)
            .subtract(config.preparationDuration)
            .unix()
    }

    private async calcWakeUpTimeOfficeWorking(dpTime: number, config: WakeUpConfig): Promise<number>{
        return moment()
        .startOf('date')
        .seconds(config.officeWorkingConfig.shouldStartAt)
        .subtract(config.officeWorkingConfig.preparationDuration)
        .subtract(dpTime)
        .unix()
    }

}

export const wakeupController = new WakeUpController()