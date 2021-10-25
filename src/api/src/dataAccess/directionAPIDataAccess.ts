import { directionClient } from "../middlewares/directionClient";
import { RouteAPIModel } from "../models/direction/RouteAPIModel";
import { RoutingProfile } from "../models/direction/RoutingProfile"
require('dotenv').config();

class DirectionAPIDataAccess{

    public async getDirection(
        arrivalTime: number,
        latOrigin:number,
        lonOrigin:number,
        latDest:number,
        lonDest:number,
        profile?: RoutingProfile,
        ): Promise<RouteAPIModel>{
        try{
            const data = (await directionClient.directions({
                params:{
                    origin:{
                        lat: latOrigin,
                        lng: lonOrigin
                    },
                    destination:{
                        lat: latDest,
                        lng: lonDest
                    },
                    arrival_time: arrivalTime,
                    key: process.env.DIRECTION_API_KEY
                }
            })).data

            return {
                departureTime: data.routes[0].legs[0].departure_time.value.getTime()
            }

        }catch(err){
            console.warn(err)
        }
    }
}

export const directionAPIDataAccess = new DirectionAPIDataAccess()