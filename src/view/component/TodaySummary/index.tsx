import Weather from "../../../dto/Weather"
import style from './style.module.css'

function TodaySummary(props: {weather: Weather | null}) {
  return (
    <div>
      <div className={style.temp}>{props.weather?.current.temperature.value} <span className={style.tempUnit}>℃</span> </div>
      <div>{props.weather?.current.weather}</div>
    </div>
  )
}

export default TodaySummary