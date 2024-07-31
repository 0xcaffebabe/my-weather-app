import { Row, Col } from "antd";
import Weather from "../../../dto/Weather";
import WeatherService from "../../../service/WeatherService";
import styles from './style.module.css'
import weatherUtils from '../../../util/WeatherUtils'

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
            <span dangerouslySetInnerHTML={{__html: weatherUtils.imgData[v.weatherFrom]}}></span> / <span dangerouslySetInnerHTML={{__html: weatherUtils.imgData[v.weatherTo]}}></span>
            </Col>
            <Col span={12}>{v.tempFrom}℃ ~ {v.tempTo}℃</Col>
          </Row>
        )}
      </div>
    </div>
  )
}

export default DailyForecast