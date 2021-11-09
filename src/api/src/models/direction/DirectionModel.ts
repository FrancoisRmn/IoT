import { DataSource } from "../DataSource";

export interface DirectionModel extends DataSource{
    departureTime: number
    arrivalTime: number
}