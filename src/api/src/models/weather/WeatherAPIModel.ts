import { WeatherConditionType } from "./WeatherConditionType";

export interface WeatherAPIModel{
    time: Date,
    temperature: Number,
    weatherConditionType: WeatherConditionType,
    weatherConditionIntensity: Number
}