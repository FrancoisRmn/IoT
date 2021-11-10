import axios from "axios"
import { kelvinToCelsius } from "../utils/weatherUtils"
import { WeatherModel } from "../models/weather/WeatherModel"

class WeatherDataAccess{

    private readonly BASE_URL = "https://api.openweathermap.org/data/2.5/onecall"

    public async getWeatherHourly(lat: Number, long: Number): Promise<WeatherModel[]>{
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