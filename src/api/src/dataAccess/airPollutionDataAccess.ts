import axios from "axios";
import { AirPollutionModel } from "../models/air-pollution/AirPollutionModel";
import { SystemException } from "../models/exceptions/SystemException";

class AirPollutionDataAccess{

    private readonly BASE_URL = "http://api.openweathermap.org/data/2.5/air_pollution/forecast"

    public async getAirPollutionHourly(lat: Number, long: Number): Promise<AirPollutionModel[]>{
        try{
            const data: any = (await axios.get(`${this.BASE_URL}?appid=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${long}`)).data
            return data["list"].map((elem: any) : AirPollutionModel => ({
                time: new Date(elem["dt"] * 1000),
                aqi: elem["main"]["aqi"]
            }))
        }catch(err){
            console.warn(err)
            throw new SystemException(err)
        }
    }

    public async getHomeAirPollution(): Promise<AirPollutionModel>{
        //todo
        return
    }

}

export const airPollutionDataAccess = new AirPollutionDataAccess