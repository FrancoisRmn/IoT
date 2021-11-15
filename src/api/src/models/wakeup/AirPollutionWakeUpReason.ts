import { AirPollutionModel } from "../air-pollution/AirPollutionModel";
import { AirPollutionCheck, WorkingConfig } from "../wake-up-config/WakeUpConfigModel";
import { ViolatedCheckWakeUpReason } from "./ViolatedCheckWakeUpReason";
import { ViolationType } from "./ViolationType";

export class AirPollutionWakeUpReason extends ViolatedCheckWakeUpReason{

    constructor(
        config: WorkingConfig,
        violatedCheck: AirPollutionCheck,
        currentData: AirPollutionModel){
            super(config,violatedCheck,currentData, ViolationType.AIR_POLLUTION)
        }

    public get reasonText():string{
        return `Air quality is too bad near ${this.config.address} (aqi: ${(<AirPollutionModel>this.currentData).aqi})`
    }
}