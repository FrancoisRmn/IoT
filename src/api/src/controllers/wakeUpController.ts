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
            if (config.officeWorkingConfig.airPollutionCheck) {
                //todo
            }
    
            if (config.officeWorkingConfig.weatherCheck) {
                //todo
            }
    
            if (config.officeWorkingConfig.directionCheck) {
                //todo
            }
        }
    }

    public saveConfig(c: WakeUpConfig): WakeUpConfig{
        return configDataAccess.save(c);
    }

    public getConfig(): WakeUpConfig{
        return configDataAccess.get();
    }

    private async getDirectionDepartureTime(config: WakeUpConfig): Promise<number> {

        const officeAdressGeocoded = await geocodingDataAccess.geocode1(config.officeWorkingConfig.address)
        const homeAdressGeocoded = await geocodingDataAccess.geocode2(config.homeWorkingConfig.address)
        const directionModel = await directionAPIDataAccess.getDirection(
            config.officeWorkingConfig.shouldStartAt,
            homeAdressGeocoded[0],
            homeAdressGeocoded[1],
            officeAdressGeocoded[0],
            officeAdressGeocoded[1],
        )

        return directionModel.departureTime;
    }

    private calcWakeUpTimeHomeWorking(config: HomeWorkingConfig): number {
        return moment()
            .startOf('date')
            .seconds(config.shouldStartAt)
            .subtract(config.preparationDuration)
            .unix()
    }

    private async calcWakeUpTimeOfficeWorking(config: WakeUpConfig): Promise<number>{
        const dpTime = await this.getDirectionDepartureTime(config);
        return moment()
        .startOf('date')
        .seconds(config.officeWorkingConfig.shouldStartAt)
        .subtract(config.officeWorkingConfig.preparationDuration)
        .subtract(dpTime)
        .unix()
    }

}

export const wakeupController = new WakeUpController()