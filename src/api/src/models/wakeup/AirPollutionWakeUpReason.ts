import { AirPollutionModel } from "../air-pollution/AirPollutionModel";
import { AirPollutionCheck } from "../wake-up-config/WakeUpConfigModel";
import { WakeUpReason } from "./WakeUpReason";

export class AirPollutionWakeUpReason extends WakeUpReason{

    constructor(
        violatedCheck?: AirPollutionCheck,
        currentData?: AirPollutionModel){
            super(violatedCheck,currentData)
        }

    public get reasonText():string{
        return `Air quality is too bad (aqi: ${(<AirPollutionModel>this.currentData).aqi})`
    }
}