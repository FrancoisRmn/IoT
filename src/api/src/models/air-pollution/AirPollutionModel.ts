import { DataSource } from "../DataSource";

export interface AirPollutionModel extends DataSource{
    time: Date,
    aqi: number,
}