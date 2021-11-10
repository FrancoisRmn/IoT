import { AirPollutionModel } from "../air-pollution/AirPollutionModel";
import { AirPollutionCheck, WorkingConfig } from "../wake-up-config/WakeUpConfigModel";
import { ViolatedCheckWakeUpReason } from "./ViolatedCheckWakeUpReason";

export class AirPollutionWakeUpReason extends ViolatedCheckWakeUpReason{

    constructor(
        config: WorkingConfig,
        violatedCheck: AirPollutionCheck,
        currentData: AirPollutionModel){
            super(config,violatedCheck,currentData)
        }

    public get reasonText():string{
        return `Air quality is too bad (aqi: ${(<AirPollutionModel>this.currentData).aqi})`
    }
}