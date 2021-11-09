import { WeatherCheck } from "../wake-up-config/WakeUpConfigModel";
import { WeatherModel } from "../weather/WeatherModel";
import { WakeUpReason } from "./WakeUpReason";

export class WeatherTemperatureWakeUpReason extends WakeUpReason {


    constructor(
        violatedCheck?: WeatherCheck,
        currentData?: WeatherModel) {
        super(violatedCheck, currentData)
    }

    public get reasonText(): string{
        return `Weather temperature is ${(<WeatherModel>this.currentData).temp} but should be between ${(<WeatherCheck>this.violatedCheck).minTemp} and ${(<WeatherCheck>this.violatedCheck).maxTemp}`
    }
}