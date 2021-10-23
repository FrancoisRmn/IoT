import { RouteAPIModel } from "../models/direction/RouteAPIModel";
import { RoutingProfile } from "../models/direction/RoutingProfile"
require('dotenv').config();
const mbxClient = require('@mapbox/mapbox-sdk');
const mbxDirections = require('@mapbox/mapbox-sdk/services/directions');

class DirectionAPIDataAccess{

    private readonly directionsService: any;

    constructor() {
        const baseClient = new mbxClient({ accessToken: process.env.DIRECTION_API_KEY });
        this.directionsService = mbxDirections(baseClient);
    }

    public async getDirection(
        profile: RoutingProfile,
        time: number,
        lat_origin:number,
        long_origin:number,
        lat_dest:number,
        long_dest:number): Promise<RouteAPIModel>{
        try{
            const data = await this.directionsService.getDirections({
                profile: profile,
                waypoints:[
                    {
                        coordinates:[long_origin,lat_origin]
                    },
                    {
                        coordinates:[long_dest,lat_dest]
                    }
                ]
            }).send()
            return {
                weight_typical: data.body.routes[0].weight_typical,
                duration_typical: data.body.routes[0].duration_typical,
                duration: data.body.routes[0].duration,
                weight: data.body.routes[0].weight,
                distance: data.body.routes[0].distance
            }

        }catch(err){
            console.warn(err)
        }
    }
}

export const directionAPIDataAccess = new DirectionAPIDataAccess()