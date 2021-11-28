import { WeatherCondition, WorkingConfig } from "../wake-up-config/WakeUpConfigModel";
import { WeatherModel } from "../weather/WeatherModel";
import { ViolatedCheckWakeUpReason } from "./ViolatedCheckWakeUpReason";
import { WakeUpReasonCategory } from "./WakeUpReasonCategory";

export class WeatherConditionWakeUpReason extends ViolatedCheckWakeUpReason {

    constructor(
        config: WorkingConfig,
        violatedCheck: WeatherCondition,
        currentData: WeatherModel) {
        super(config, violatedCheck, currentData)
    }

    public get reasonText(): string {
        return `Weather condition named "${(<WeatherModel>this.currentData).condition.type}" has an intensity of ${(<WeatherModel>this.currentData).condition.intensity} but should be under ${(<WeatherCondition>this.violatedCheck).maxIntensity} near ${this.config.address}`
    }

    public get homeWorking():boolean{
        return true
    }

    public get category(): WakeUpReasonCategory{
        return WakeUpReasonCategory.WEATHER
    }
}