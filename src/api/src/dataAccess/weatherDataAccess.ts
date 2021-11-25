import axios from "axios"
import { kelvinToCelsius } from "../utils/weatherUtils"
import { WeatherModel } from "../models/weather/WeatherModel"
import moment from "moment"
import { WeatherConditionType } from "../models/weather/WeatherConditionType"

class WeatherDataAccess{

    private readonly BASE_URL = "https://api.openweathermap.org/data/2.5/onecall"

    public async getWeatherHourly(lat: Number, long: Number): Promise<WeatherModel[]>{

        if(process.env.MODE === "demo" && process.env.BAD_WEATHER_API === "yes"){
            return [{
                time: moment().unix(),
                temp: -50,
                condition:{
                    type: WeatherConditionType.SNOW,
                    intensity: 2
                }
            }]
        }


        try{
            const data: any = (await axios.get(`${this.BASE_URL}?appid=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${long}&exclude=current,minutely,daily,alerts`)).data
            return data["hourly"].map((elem: any) : WeatherModel => ({
                time: elem["dt"] * 1000,
                temp: kelvinToCelsius(elem["feels_like"]),
                condition :{
                    type : elem["weather"][0]["main"],
                    intensity : Number(String(elem["weather"][0]["id"]).substring(1))
                }
            }))
        }catch(err){
            console.warn(err)
        }
    }
}

export const weatherDataAccess = new WeatherDataAccess