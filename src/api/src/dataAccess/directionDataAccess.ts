import { Status, TransitMode, TravelMode } from "@googlemaps/google-maps-services-js";
import moment from "moment";
import { mapsClient } from "../middlewares/mapsClient";
import { DirectionModel } from "../models/direction/DirectionModel";
import { RoutingProfile } from "../models/direction/RoutingProfile"
import { NoPublicTransportAvailableException } from "../models/exceptions/NoPublicTransportAvailableException";
import { SystemException } from "../models/exceptions/SystemException";
require('dotenv').config();

class DirectionDataAccess {

    public async getDirection(
        expectedArrivalDate: Date,
        latOrigin: number,
        lonOrigin: number,
        latDest: number,
        lonDest: number,
        profile: RoutingProfile,
    ): Promise<DirectionModel> {
        const data = (await mapsClient.directions({
            params: {
                origin: {
                    lat: latOrigin,
                    lng: lonOrigin
                },
                destination: {
                    lat: latDest,
                    lng: lonDest
                },
                arrival_time: expectedArrivalDate,
                mode: this.mapRoutingProfileToTransitMode(profile),
                key: process.env.GOOGLE_API_KEY
            }
        })).data

        if (data.status === Status.OK) {
            let ins = "\n"
            data.routes[0].legs[0].steps.forEach(s => {
                ins += s.html_instructions.replace(/<[^>]+>/g, ' ');
                ins += "\n"
            })

            let arrivalTimeDateUnix;
            let startDayUnix;
            const duration = data.routes[0].legs[0].duration.value

            if (profile === RoutingProfile.TRANSIT) {
                arrivalTimeDateUnix = data.routes[0].legs[0].arrival_time.value.valueOf()
                startDayUnix = moment.unix(arrivalTimeDateUnix).startOf('day').unix()

            } else {
                arrivalTimeDateUnix = expectedArrivalDate.valueOf() / 1000
                startDayUnix = moment.unix(expectedArrivalDate.valueOf() / 1000).startOf('day').unix()
            }

            return {
                departureTime: arrivalTimeDateUnix - duration - startDayUnix,
                arrivalTime: arrivalTimeDateUnix - startDayUnix,
                instructions: ins
            }
        } else {
            if (profile === RoutingProfile.TRANSIT && data.status == Status.ZERO_RESULTS) {
                throw new NoPublicTransportAvailableException()
            }
            throw new SystemException()
        }
    }


    private mapRoutingProfileToTransitMode(r: RoutingProfile): TravelMode {
        switch (r) {
            case RoutingProfile.CYCLING: return TravelMode.bicycling
            case RoutingProfile.DRIVING: return TravelMode.driving
            case RoutingProfile.TRANSIT: return TravelMode.transit
            case RoutingProfile.WALKING: return TravelMode.walking
            default: throw new SystemException()
        }
    }
}


export const directionDataAccess = new DirectionDataAccess()