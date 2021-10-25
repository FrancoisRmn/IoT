import { WeatherCheck } from "../wake-up-config/WakeUpConfigModel";
import { Weather } from "../weather/Weather";
import { CheckException } from "./CheckException";

export class ConfigCheckException extends CheckException{


    constructor(private readonly check: WeatherCheck, private readonly weather: Weather){
        super();
    }
}