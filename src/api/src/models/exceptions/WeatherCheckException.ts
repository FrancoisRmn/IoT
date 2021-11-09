import { WeatherCheck } from "../wake-up-config/WakeUpConfigModel";
import { WeatherModel } from "../weather/WeatherModel";
import { CheckException } from "./CheckException";

export class ConfigCheckException extends CheckException{


    constructor(private readonly check: WeatherCheck, private readonly weather: WeatherModel){
        super();
    }
}