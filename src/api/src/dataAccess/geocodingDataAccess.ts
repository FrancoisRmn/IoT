import { AddressGeometry } from "@googlemaps/google-maps-services-js";
import { mapsClient } from "../middlewares/mapsClient"
import { SystemException } from "../models/exceptions/SystemException";
import { Position } from "../models/wake-up-config/WakeUpConfigModel";
require('dotenv').config();

class GeocodingDataAccess{
    
    public async geocode(address: string): Promise<Position>{
        const data = (await mapsClient.geocode({
            params :{
                address : address,
                key: process.env.DIRECTION_API_KEY
            },
            
        })).data
        if(data.status !== "OK"){
            throw new SystemException()
        }
        return this.mapGeometryToPosition(data.results[0].geometry)

    }

    private mapGeometryToPosition(g: AddressGeometry): Position{
        return {
            lat: g.location.lat,
            lon: g.location.lng
        }
    }
}

export const geocodingDataAccess = new GeocodingDataAccess()