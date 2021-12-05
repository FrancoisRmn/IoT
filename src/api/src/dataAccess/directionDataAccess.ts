import { TransitMode, TravelMode } from "@googlemaps/google-maps-services-js";
import moment from "moment";
import { mapsClient } from "../middlewares/mapsClient";
import { DirectionModel } from "../models/direction/DirectionModel";
import { RoutingProfile } from "../models/direction/RoutingProfile"
import { SystemException } from "../models/exceptions/SystemException";
require('dotenv').config();

class DirectionDataAccess{

    public async getDirection(
        arrivalTime: Date,
        latOrigin:number,
        lonOrigin:number,
        latDest:number,
        lonDest:number,
        profile: RoutingProfile,
        ): Promise<DirectionModel>{
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
                    key: process.env.GOOGLE_API_KEY
                }
            })).data
            

            let ins = "\n"
            data.routes[0].legs[0].steps.forEach(s => {
                ins += s.html_instructions.replace(/<[^>]+>/g, ' ');
                ins += "\n"
            })

            return {
                departureTime: (arrivalTime.valueOf() / 1000) - data.routes[0].legs[0].duration.value - moment(arrivalTime).startOf('day').unix(),
                instructions: ins
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