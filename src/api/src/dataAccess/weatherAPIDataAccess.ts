import axios from "axios"
import { WeatherAPIModel } from "../models/weather/WeatherAPIModel"

class WeatherAPIDataAccess{

    private readonly BASE_URL = "https://api.openweathermap.org/data/2.5/onecall"

    public async getCurrentWeather(lat: Number, long: Number): Promise<WeatherAPIModel>{
        try{
            const data = (await axios.get(`${this.BASE_URL}?appid=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${long}&exclude=current,minutely,daily,alerts`)).data

            return {
                time: new Date(data["dt"]),
                temperature: data["temp"],
                
            }

        }catch(err){
            console.warn(err)
        }
    }
}

export const weatherAPIDataAccess = new WeatherAPIDataAccess