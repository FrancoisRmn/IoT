import { WeatherCondition } from "../wake-up-config/WakeUpConfigModel";
import { WeatherModel } from "../weather/WeatherModel";
import { WakeUpReason } from "./WakeUpReason";

export class WeatherConditionWakeUpReason extends WakeUpReason{

    constructor(
        violatedCheck?: WeatherCondition,
        currentData?: WeatherModel) {
        super(violatedCheck, currentData)
    }

    public get reasonText(): string{
        return `Weather condition ${(<WeatherModel>this.currentData).condition.type}
        has an intensity ${(<WeatherModel>this.currentData).condition.intensity}
        but should be under ${(<WeatherCondition>this.violatedCheck).maxIntensity}`
    }
}