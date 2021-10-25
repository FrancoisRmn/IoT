import { directionAPIDataAccess } from "../dataAccess/directionAPIDataAccess";
import { geocodingDataAccess } from "../dataAccess/geocodingDataAccess";
import { wakeUpConfigDataAccess } from "../dataAccess/wakeUpConfigDataAccess"
import { directionClient } from "../middlewares/directionClient";
import { WakeUpConfig } from "../models/wake-up-config/WakeUpConfigModel";

class WakeUpController{
    
    public async getWakeUpTime(): Promise<Date>{

        const config = wakeUpConfigDataAccess.getConfig();
        const currentDate = new Date();

        let workingConfig;
        if(config.preferedWorkingType === "home"){
            workingConfig = config.homeWorkingConfig;

        } else {
            workingConfig = config.officeWorkingConfig;
            console.log(await this.getDirectionWakeUp(config))
        }

        return
    }

    private async getDirectionWakeUp(config: WakeUpConfig): Promise<number>{

        const officeAdressGeocoded = await geocodingDataAccess.geocode1(config.officeAdress)
        const homeAdressGeocoded = await geocodingDataAccess.geocode2(config.homeAdress)
        const directionModel = await directionAPIDataAccess.getDirection(
            config.officeWorkingConfig.shouldStartAt,
            homeAdressGeocoded[0],
            homeAdressGeocoded[1],
            officeAdressGeocoded[0],
            officeAdressGeocoded[1],
        )

        return directionModel.departureTime;
    }
    
}

export const wakeupController = new WakeUpController()