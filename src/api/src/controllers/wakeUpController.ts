import { agendaDataAccess } from "../dataAccess/agendaDataAccess";
import { directionAPIDataAccess } from "../dataAccess/directionAPIDataAccess";
import { geocodingDataAccess } from "../dataAccess/geocodingDataAccess";
import { wakeUpConfigDataAccess } from "../dataAccess/wakeUpConfigDataAccess"
import { WakeUpConfig, WorkingConfig, HomeWorkingConfig, OfficeWorkingConfig } from "../models/wake-up-config/WakeUpConfigModel";
import _ from 'lodash';
import { AgendaCheckException } from "../models/exceptions/AgendaCheckException";
import { CheckException } from "../models/exceptions/CheckException";
import moment from "moment";
import { configDataAccess } from "../dataAccess/configDataAccess";
import { airPollutionAPIDataAccess } from "../dataAccess/airPollutionAPIDataAccess";
import { SystemException } from "../models/exceptions/SystemException";
import { airPollutionSensorDataAccess } from "../dataAccess/airPollutionSensorDataAccess";
import { DirectionModel } from "../models/direction/DirectionAPIModel";
const nearest = require('nearest-date')

class WakeUpController {
    private readonly TEMP_URL = "https://ade.unamur.be/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=1959&projectId=1&calType=ical&nbWeeks=52&displayConfigId=8"

    public async getWakeUpTime(): Promise<Date> {

        const config = await wakeUpConfigDataAccess.getConfig();
        const currentDate = new Date();


        if (config.preferHomeWorking) {
            if (config.homeWorkingConfig.agendaCheck) {
                const events = await agendaDataAccess.getEvents(new URL(config.homeWorkingConfig.agendaCheck.url));
                const eventFound = events.find(e => e.location === config.officeWorkingConfig.address)
                if (eventFound) {
                    let time = await this.calcWakeUpTimeOfficeWorking(config);
                    if (time < config.noWakeUpBefore) {
                        time = this.calcWakeUpTimeHomeWorking(config.homeWorkingConfig)
                    }
                }
            }
        } else {
            const direction = await this.getDirectionModel(config);
            const wuTime = await this.calcWakeUpTimeOfficeWorking(direction.departureTime,config);


            if (config.officeWorkingConfig.airPollutionCheck) {
                const currentOfficeAirPollution = await airPollutionAPIDataAccess.getAirPollutionHourly(config.homeWorkingConfig.position.lat,config.homeWorkingConfig.position.lon)
                const index = nearest(currentOfficeAirPollution.map(a => a.time), new Date(direction.arrivalTime))
                const nearestAirPollution = currentOfficeAirPollution[index]
                if(nearestAirPollution.aqi < config.officeWorkingConfig.airPollutionCheck.minAqi){
                    return new Date(this.calcWakeUpTimeHomeWorking(config.homeWorkingConfig))
                }

                const currentHomeAirPollution = await airPollutionSensorDataAccess.getCurrentAirPollution()
                if(currentHomeAirPollution.aqi < config.officeWorkingConfig.airPollutionCheck.minAqi){
                    return new Date(this.calcWakeUpTimeHomeWorking(config.homeWorkingConfig))
                }
            }
    
            if (config.officeWorkingConfig.weatherCheck) {
            }
    
            if (config.officeWorkingConfig.directionCheck) {
                //todo
            }
        }
    }

    public saveConfig(c: WakeUpConfig): WakeUpConfig{
        const officeAdressGeocoded = await geocodingDataAccess.geocode1(c.officeWorkingConfig.address)
        const homeAdressGeocoded = await geocodingDataAccess.geocode2(c.homeWorkingConfig.address)
        c.homeWorkingConfig.position.lat = homeAdressGeocoded[0]
        c.homeWorkingConfig.position.lon = homeAdressGeocoded[1]
        c.officeWorkingConfig.position.lat = officeAdressGeocoded[0]
        c.officeWorkingConfig.position.lon = officeAdressGeocoded[1]
        return configDataAccess.save(c);
    }

    public getConfig(): WakeUpConfig{
        return configDataAccess.get();
    }

    private async getDirectionModel(config: WakeUpConfig): Promise<DirectionModel> {

        if((!config.homeWorkingConfig.position) || (!config.officeWorkingConfig.position)){
            throw new SystemException()
        }

        const directionModel = await directionAPIDataAccess.getDirection(
            config.officeWorkingConfig.shouldStartAt,
            config.homeWorkingConfig.position.lat,
            config.homeWorkingConfig.position.lon,
            config.officeWorkingConfig.position.lat,
            config.officeWorkingConfig.position.lon
        )

        return (directionModel.departureTime, directionModel.);
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