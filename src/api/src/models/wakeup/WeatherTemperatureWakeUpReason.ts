import { WeatherCheck, WorkingConfig } from "../wake-up-config/WakeUpConfigModel";
import { WeatherModel } from "../weather/WeatherModel";
import { ViolatedCheckWakeUpReason } from "./ViolatedCheckWakeUpReason";
import { WakeUpReason } from "./WakeUpReason";

export class WeatherTemperatureWakeUpReason extends ViolatedCheckWakeUpReason {


    constructor(
        config: WorkingConfig,
        violatedCheck: WeatherCheck,
        currentData: WeatherModel) {
        super(config,violatedCheck, currentData)
    }

    public get reasonText(): string{
        return `Weather temperature is ${(<WeatherModel>this.currentData).temp} near ${this.config.address} but should be between ${(<WeatherCheck>this.violatedCheck).minTemp} and ${(<WeatherCheck>this.violatedCheck).maxTemp}`
    }
}