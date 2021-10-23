import { WeatherConditionType } from "./WeatherConditionType";

export interface WeatherAPIModel{
    time: Date,
    temperature: number,
    weatherConditionType: WeatherConditionType,
    weatherConditionIntensity: number
}