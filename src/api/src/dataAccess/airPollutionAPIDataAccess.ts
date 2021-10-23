import axios from "axios";
import { AirPollutionAPIModel } from "../models/air-pollution/AirPollutionAPIModel";

class AirPollutionAPIDataAccess{

    private readonly BASE_URL = "http://api.openweathermap.org/data/2.5/air_pollution/forecast"

    public async getAirPollutionHourly(lat: Number, long: Number): Promise<AirPollutionAPIModel[]>{
        try{
            const data: any = (await axios.get(`${this.BASE_URL}?appid=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${long}`)).data
            return data["list"].map((elem: any) : AirPollutionAPIModel => ({
                time: new Date(elem["dt"] * 1000),
                aqi: elem["main"]["aqi"]
            }))
        }catch(err){
            console.warn(err)
        }
    }

}

export const airPollutionAPIDataAccess = new AirPollutionAPIDataAccess