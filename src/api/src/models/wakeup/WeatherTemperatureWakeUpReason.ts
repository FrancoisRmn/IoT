import { SystemException } from "../exceptions/SystemException";
import { WeatherCheck, WorkingConfig } from "../wake-up-config/WakeUpConfigModel";
import { WeatherModel } from "../weather/WeatherModel";
import { ViolatedCheckWakeUpReason } from "./ViolatedCheckWakeUpReason";

export class WeatherTemperatureWakeUpReason extends ViolatedCheckWakeUpReason {


    constructor(
        config: WorkingConfig,
        violatedCheck: WeatherCheck,
        currentData: WeatherModel) {
        super(config,violatedCheck, currentData)
    }

    public get reasonText(): string{
        let str =  `Weather temperature is ${(<WeatherModel>this.currentData).temp.toFixed(1)} near ${this.config.address} but should be `
        if((<WeatherCheck>this.violatedCheck).minTemp){
            if((<WeatherCheck>this.violatedCheck).maxTemp){
                return str + `between ${(<WeatherCheck>this.violatedCheck).minTemp} and ${(<WeatherCheck>this.violatedCheck).maxTemp}`
            } else {
                return str + `higher than ${(<WeatherCheck>this.violatedCheck).minTemp}`
            }
        } else {
            if((<WeatherCheck>this.violatedCheck).maxTemp){
                return str + `less than ${(<WeatherCheck>this.violatedCheck).maxTemp}`
            } else {
                throw new SystemException()
            }
        }
    }
}