import axios from "axios";
import DailyForecastItem from "../dto/DailyForecastItem";
import Weather from "../dto/Weather";
import WeatherUtils from "../util/WeatherUtils";
import dayjs from 'dayjs'
import HourlyForecastItem from "../dto/HourlyForecastItem";
import HourlyWeatherRangeItem from "../dto/HourlyWeatherRangeItem";

const dayNames = ['日', '一', '二', '三', '四', '五', '六']

export default class WeatherService {
  private static instance: WeatherService

  private constructor() { }

  public static newInstance(): WeatherService {
    return this.instance || (this.instance = new WeatherService())
  }

  public async getWeather(longtitude: string, latitude: string): Promise<Weather> {
    const resp = await axios.get(`https://weather-api.ismy.wang/wtr-v3/weather/all?longitude=${longtitude}&latitude=${latitude}&locale=zh_cn&isGlobal=false&appKey=weather20151024&sign=zUFJoAR2ZVrDy1vF3D07`)
    const weather = resp.data as Weather
    localStorage.setItem("last-weather", JSON.stringify(weather))
    return weather
  }


  /**
   *
   * 获取最后一次可用的天气
   * @return {*}  {Weather}
   * @memberof WeatherService
   */
  public getLastWeather(): Weather | null {
    const json = localStorage.getItem("last-weather")
    if (!json) {
      return null
    }
    return JSON.parse(json) as Weather
  }

  public getDailyForecast(weather: Weather | null): DailyForecastItem[] {
    if (!weather) {
      return []
    }
    const forecast = weather.forecastDaily
    return forecast.weather.value.map((_, i) => {
      return {
        date: dayjs().add(i, 'day').format("MM-DD") + `(周${dayNames[dayjs().add(i, 'day').day()]})`,
        weatherFrom: WeatherUtils.weatherCode2Str(forecast.weather.value[i].from),
        weatherTo: WeatherUtils.weatherCode2Str(forecast.weather.value[i].to),
        tempFrom: forecast.temperature.value[i].from,
        tempTo: forecast.temperature.value[i].to
      } as DailyForecastItem
    })
  }

  public getHourlyForecast(weather: Weather | null): HourlyForecastItem[] {
    if (!weather) {
      return []
    }
    // 插入当前天气
    return [{
      time: '现在',
      weather: WeatherUtils.weatherCode2Str(weather.current.weather + ''),
      temp: weather.current.temperature.value
    },...weather.forecastHourly
      .weather.value.map((_, i) => {
        return {
          time: dayjs().set("minute", 0).add(i + 1, 'hour').format("HH:mm"),
          weather: WeatherUtils.weatherCode2Str(weather.forecastHourly.weather.value[i] + ''),
          temp: weather.forecastHourly.temperature.value[i] + '',
        } as HourlyForecastItem
      })]
  }

  public calcHourlyWeahterRange(forecast: HourlyForecastItem[]): HourlyWeatherRangeItem[] {
    const result: HourlyWeatherRangeItem[] = []
    const colors = ['rgba(41, 42, 43, 0.2)', 'rgba(173, 173, 177, 0.4)']
    let cnt = 0
    for (let f of forecast) {
      if (result.length === 0 || result[result.length - 1].weather !== f.weather) {
        if (result.length !== 0) {
          result[result.length - 1].endTime = f.time
        }
        result.push({ weather: f.weather, startTime: f.time, endTime: dayjs(f.time).add(1, 'hour').format("HH:mm"), color: colors[(cnt++ % 2)] })
      } else {
        result[result.length - 1].endTime = f.time
      }
    }
    result[result.length - 1].endTime = dayjs().subtract(1, 'hour').format("HH:00")
    return result;
  }
}