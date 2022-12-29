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
          <Row key={v.date}>
            <Col span={6}>{v.date}</Col>
            <Col span={6}>
              <img width={32} height={32} src={'./weather/' + v.weatherFrom + '.svg'} alt="" /> / <img width={32} height={32} src={'./weather/' + v.weatherTo + '.svg'} alt="" />
            </Col>
            <Col span={12}>{v.tempFrom}℃ ~ {v.tempTo}℃</Col>
          </Row>
        )}
      </div>
    </div>
  )
}

export default DailyForecast