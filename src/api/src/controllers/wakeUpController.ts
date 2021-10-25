import { agendaDataAccess } from "../dataAccess/agendaDataAccess";
import { directionAPIDataAccess } from "../dataAccess/directionAPIDataAccess";
import { geocodingDataAccess } from "../dataAccess/geocodingDataAccess";
import { wakeUpConfigDataAccess } from "../dataAccess/wakeUpConfigDataAccess"
import { directionClient } from "../middlewares/directionClient";
import { ConfigChecks, WakeUpConfig, WorkingConfig } from "../models/wake-up-config/WakeUpConfigModel";
import _ from 'lodash';
import { AgendaEventModel } from "../models/agenda/AgendaEventModel";
import { AgendaCheckException } from "../models/exceptions/AgendaCheckException";
import { CheckException } from "../models/exceptions/CheckException";

class WakeUpController{
    private readonly TEMP_URL = "https://ade.unamur.be/jsp/custom/modules/plannings/anonymous_cal.jsp?resources=1959&projectId=1&calType=ical&nbWeeks=52&displayConfigId=8"

    public async getWakeUpTime(): Promise<Date>{

        const config = await wakeUpConfigDataAccess.getConfig();
        const currentDate = new Date();

        let workingConfig;
        if(config.preferedWorkingType === "home"){
            workingConfig = config.homeWorkingConfig;
        } else {
            workingConfig = config.officeWorkingConfig;
        }

        try{

        } catch(err: any){
            switch(err){
                case CheckException: {
                    
                }
                default: throw err
            }
        }


        return
    }

    private async getDirectionWakeUp(config: WakeUpConfig): Promise<number>{

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

    private async checkSwitch(config: WorkingConfig): Promise<void>{

        const checks = config.configChecks
        if(checks.agendaCheck){
            const events = await agendaDataAccess.getEvents(new URL(checks.agendaCheck.url));
            const eventFound = events.find(e => e.location === config.address)
            if(eventFound){
                throw new AgendaCheckException(eventFound)
            }
        }

        if(checks.airPollutionCheck){
            //todo
        }
        
        if(checks.weatherCheck){
            //todo
        }

        if(checks.directionCheck){
            //todo
        }
    }

    
}

export const wakeupController = new WakeUpController()