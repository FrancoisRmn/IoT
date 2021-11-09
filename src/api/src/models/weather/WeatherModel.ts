import { DataSource } from "../DataSource";
import { WeatherCondition } from "./WeatherCondition";

export interface WeatherModel extends DataSource{
    temp: number,
    condition: WeatherCondition
}