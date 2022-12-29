import axios from "axios";
import DailyForecastItem from "../dto/DailyForecastItem";
import Weather from "../dto/Weather";
import WeatherUtils from "../util/WeatherUtils";
import dayjs from 'dayjs'
import HourlyForecastItem from "../dto/HourlyForecastItem";
import HourlyWeatherRangeItem from "../dto/HourlyWeatherRangeItem";

export default class WeatherService {
  private static instance: WeatherService

  private constructor() {}

  public static newInstance(): WeatherService {
    return this.instance || (this.instance = new WeatherService())
  }

  public async getWeather(longtitude: string, latitude: string): Promise<Weather> {
    const resp = await axios.get(`https://weather-api.ismy.wang/wtr-v3/weather/all?longitude=${longtitude}&latitude=${latitude}&locale=zh_cn&isGlobal=false&appKey=weather20151024&sign=zUFJoAR2ZVrDy1vF3D07`)
    const weather = resp.data as Weather
    return weather
  }

  public getDailyForecast(weather: Weather | null): DailyForecastItem[] {
    if (!weather) {
      return []
    }
    const forecast = weather.forecastDaily
    return forecast.weather.value.map((_, i) => {
      return {
        date: dayjs().add(i, 'day').format("MM-DD"),
        weatherFrom: WeatherUtils.weatherCode2Str(forecast.weather.value[i].from),
        weatherTo: WeatherUtils.weatherCode2Str(forecast.weather.value[i].to),
        tempFrom: forecast.temperature.value[i].from,
        tempTo: forecast.temperature.value[i].to
      } as DailyForecastItem
    })
  }

  public getHourlyForecast(weather: Weather | null) : HourlyForecastItem[] {
    if (!weather) {
      return []
    }
    return weather.forecastHourly
      .weather.value.map((_, i) => {
        return {
          time: dayjs().set("minute", 0).add(i + 1, 'hour').format("HH:mm"),
          weather: WeatherUtils.weatherCode2Str(weather.forecastHourly.weather.value[i] + ''),
          temp: weather.forecastHourly.temperature.value[i] + '',
        } as HourlyForecastItem
      })
  }

  public calcHourlyWeahterRange(forecast: HourlyForecastItem[]): HourlyWeatherRangeItem[] {
    const result: HourlyWeatherRangeItem[] = []
    const colors = ['rgba(255, 173, 177, 0.4)', 'rgba(125, 137, 177, 0.4)']
    let cnt = 0
    for(let f of forecast) {
      if (result.length === 0 || result[result.length - 1].weather !== f.weather) {
        if (result.length !== 0) {
          result[result.length - 1].endTime = f.time  
        }
        result.push({weather: f.weather, startTime: f.time, endTime: dayjs(f.time).add(1, 'hour').format("HH:mm"), color: colors[(cnt++ % 2)]})
      } else {
        result[result.length - 1].endTime = f.time
      }
    }
    return result;
  }
}