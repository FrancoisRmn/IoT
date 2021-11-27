import axios from "axios";
import moment from "moment";
import { AirPollutionModel } from "../models/air-pollution/AirPollutionModel";
import { SystemException } from "../models/exceptions/SystemException";

class AirPollutionDataAccess{

    private readonly API_BASE_URL = "http://api.openweathermap.org/data/2.5/air_pollution/forecast"
    private readonly SENSOR_BASE_URL = "localhost:8080"


    public async getAirPollutionHourly(lat: Number, long: Number): Promise<AirPollutionModel[]>{

        if(process.env.MODE === "demo" && process.env.BAD_AIR_QUALITY_API === "yes"){
            return [{
                time: moment().unix(),
                aqi: 5
            }]
        }

        try{
            const data: any = (await axios.get(`${this.API_BASE_URL}?appid=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${long}`)).data
            return data["list"].map((elem: any) : AirPollutionModel => ({
                time: elem["dt"] * 1000,
                aqi: elem["main"]["aqi"]
            }))
        }catch(err){
            console.warn(err)
            throw new SystemException(err)
        }
    }

    public async getHomeAirPollution(): Promise<AirPollutionModel>{

        if(process.env.MODE === "demo" && process.env.BAD_AIR_QUALITY_SENSOR === "yes"){
            return {
                time: moment().unix(),
                aqi: 5
            }
        }

        try{
            const data: any = await axios.get(`${this.SENSOR_BASE_URL}`)
            return {
                time: moment().unix(),
                aqi: data
            }
        } catch(err){
            console.warn(err)
            throw new SystemException(err)
        }

    }

}

export const airPollutionDataAccess = new AirPollutionDataAccess