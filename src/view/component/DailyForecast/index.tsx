import { Row, Col } from "antd";
import Weather from "../../../dto/Weather";
import WeatherService from "../../../service/WeatherService";
import styles from './style.module.css'
import weatherUtils from '../../../util/WeatherUtils'
import dayjs from 'dayjs'

const weatherService = WeatherService.newInstance()

function DailyForecast(props: { weather: Weather | null }) {
  const forecast = weatherService.getDailyForecast(props.weather)
  return (
    <div className={styles.dailyForecast}>
      <div>
        {forecast.map(v => (
          <Row
            key={v.date}
            style={{
              fontSize: '1rem',
              padding: '0.5rem 0',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Col span={8} style={{ fontSize: '1rem', fontWeight: 'bold', textAlign: 'center' }}>
              {v.date}
            </Col>
            <Col span={8} style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span dangerouslySetInnerHTML={{ __html: weatherUtils.imgData[v.weatherFrom] }}></span>
              <span style={{ margin: '0 0.5rem' }}>/</span>
              <span dangerouslySetInnerHTML={{ __html: weatherUtils.imgData[v.weatherTo] }}></span>
            </Col>
            <Col span={8} style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span>{v.tempTo}°</span>
              <span style={{ margin: '0 0.2rem' }}>~</span>
              <span>{v.tempFrom}°</span>
            </Col>
          </Row>
        ))}
      </div>
    </div>
  );

}

export default DailyForecast