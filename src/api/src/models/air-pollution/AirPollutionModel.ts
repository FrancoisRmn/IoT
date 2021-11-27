import { DataSource } from "../DataSource";

export interface AirPollutionModel extends DataSource{
    time: number,
    aqi: number,
}