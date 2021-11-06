import { directionClient } from "../middlewares/directionClient";
import { RouteModel } from "../models/direction/RouteAPIModel";
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
        ): Promise<RouteModel>{
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
                departureTime: data.routes[0].legs[0].departure_time.value.getTime(),
                arrivalTime: data.routes[0].legs[0].arrival_time.value.getTime()
            }

        }catch(err){
            console.warn(err)
        }
    }
}

export const directionAPIDataAccess = new DirectionAPIDataAccess()