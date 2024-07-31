import Weather from "../../../dto/Weather"
import WeatherUtils from "../../../util/WeatherUtils"
import style from './style.module.css'
import weatherUtils from '../../../util/WeatherUtils'

function TodaySummary(props: { weather: Weather | null }) {
  const weatherStr = WeatherUtils.weatherCode2Str(props.weather?.current.weather || '')
  return (
    <div>
      <div className={style.temp}>{props.weather?.current.temperature.value}</div>
      <div style={{ fontSize: '24px' }}>
        <span style={{ verticalAlign: 'middle' }} dangerouslySetInnerHTML={{__html: weatherUtils.imgData[weatherStr].replace('width="32" height="32"', 'width="24" height="24"')}}></span>
        <span style={{ verticalAlign: 'middle' }}></span>{weatherStr}
      </div>
      <p>湿度: {props.weather?.current.humidity.value}% | 体感：{props.weather?.current.feelsLike.value}℃ | {WeatherUtils.windDegree2ReableDirection(parseFloat(props.weather?.current.wind.direction.value || '0'))} {(parseFloat(props.weather?.current.wind.speed.value || '0') * 1000 / 3600).toFixed(2)} m/s</p>
    </div>
  )
}

export default TodaySummary