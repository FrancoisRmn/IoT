import { TransitMode, TravelMode } from "@googlemaps/google-maps-services-js";
import { mapsClient } from "../middlewares/mapsClient";
import { RouteModel } from "../models/direction/RouteModel";
import { RoutingProfile } from "../models/direction/RoutingProfile"
import { SystemException } from "../models/exceptions/SystemException";
require('dotenv').config();

class DirectionDataAccess{

    public async getDirection(
        arrivalTime: number,
        latOrigin:number,
        lonOrigin:number,
        latDest:number,
        lonDest:number,
        profile: RoutingProfile,
        ): Promise<RouteModel>{
        try{
            const data = (await mapsClient.directions({
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
                    mode: this.mapRoutingProfileToTransitMode(profile),
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

    
private mapRoutingProfileToTransitMode(r :RoutingProfile): TravelMode{
    switch(r){
        case RoutingProfile.CYCLING: return TravelMode.bicycling
        case RoutingProfile.DRIVING: return TravelMode.driving
        case RoutingProfile.TRANSIT: return TravelMode.transit
        case RoutingProfile.WALKING: return TravelMode.walking
        default: throw new SystemException()
    }
}
}


export const directionDataAccess = new DirectionDataAccess()