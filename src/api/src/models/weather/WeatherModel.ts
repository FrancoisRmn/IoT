import { DataSource } from "../DataSource";
import { WeatherCondition } from "./WeatherCondition";

export interface WeatherModel extends DataSource{
    time: number,
    temp: number,
    condition: WeatherCondition
}