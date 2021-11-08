import axios from "axios"
import { kelvinToCelsius } from "../utils/weatherUtils"
import { WeatherAPIModel } from "../models/weather/WeatherAPIModel"

class WeatherDataAccess{

    private readonly BASE_URL = "https://api.openweathermap.org/data/2.5/onecall"

    public async getWeatherHourly(lat: Number, long: Number): Promise<WeatherAPIModel[]>{
        try{
            const data: any = (await axios.get(`${this.BASE_URL}?appid=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${long}&exclude=current,minutely,daily,alerts`)).data
            return data["hourly"].map((elem: any) : WeatherAPIModel => ({
                time: new Date(elem["dt"] * 1000),
                temperature: kelvinToCelsius(elem["feels_like"]),
                weatherConditionType : elem["weather"][0]["main"],
                weatherConditionIntensity : Number(String(elem["weather"][0]["id"]).substring(1))
            }))
        }catch(err){
            console.warn(err)
        }
    }
}

export const weatherDataAccess = new WeatherDataAccess