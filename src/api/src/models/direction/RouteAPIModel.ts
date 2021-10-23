import { DirectionAPIModel } from "./DirectionAPIModel";

export interface RouteAPIModel extends DirectionAPIModel{
    
    weight_typical: number,
    duration_typical: number,
    weight: number,
    distance: number
}