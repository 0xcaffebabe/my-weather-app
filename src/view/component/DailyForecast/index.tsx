import { Row, Col } from "antd";
import Weather from "../../../dto/Weather";
import WeatherService from "../../../service/WeatherService";
import styles from './style.module.css'

const weatherService = WeatherService.newInstance()

function DailyForecast(props: { weather: Weather | null }) {
  const forecast = weatherService.getDailyForecast(props.weather)
  return (
    <div className={styles.dailyForecast}>
      <div>
        {forecast.map(v =>
          <Row>
            <Col span={6}>{v.date}</Col>
            <Col span={6}>{v.weatherFrom} 转 {v.weatherTo}</Col>
            <Col span={12}>{v.tempFrom}℃ ~ {v.tempTo}℃</Col>
          </Row>
        )}
      </div>
    </div>
  )
}

export default DailyForecast