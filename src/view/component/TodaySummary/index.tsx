import Weather from "../../../dto/Weather"
import WeatherUtils from "../../../util/WeatherUtils"
import style from './style.module.css'

function TodaySummary(props: { weather: Weather | null }) {
  return (
    <div>
      <div className={style.temp}>{props.weather?.current.temperature.value}</div>
      <div style={{ fontSize: '24px' }}>
        <img width={24} height={24} src={'./weather/' + props.weather?.current.weather + '.svg'} alt="" />
        <span style={{ verticalAlign: 'middle' }}></span>{props.weather?.current.weather}
      </div>
      <p>湿度: {props.weather?.current.humidity.value}% | 体感：{props.weather?.current.feelsLike.value}℃ | {WeatherUtils.windDegree2ReableDirection(parseFloat(props.weather?.current.wind.direction.value || '0'))} {(parseFloat(props.weather?.current.wind.speed.value || '0') * 1000 / 3600).toFixed(2)} m/s</p>
    </div>
  )
}

export default TodaySummary