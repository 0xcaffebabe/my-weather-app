import Weather from '../../../dto/Weather';
import styles from './style.module.css'
import { Flex } from 'antd';
import weatherUtils from '../../../util/WeatherUtils'

import WeatherService from '../../../service/WeatherService';
import { useMemo } from 'react';

const weatherService = WeatherService.newInstance()

function HourlyForecast(props: { weather: Weather | null }) {
  const forecast = useMemo(() => weatherService.getHourlyForecast(props.weather), [props.weather])
  return (
    <div className={styles.chartWrapper}>
      <div id='hourlyForecast' className={styles.hourlyForecast}>
        <Flex wrap gap="large">
          {forecast.map(v => (
            <div>
            <div>{v.time}</div>
            <div> <span  dangerouslySetInnerHTML={{ __html: weatherUtils.imgData[v.weather] }}></span></div>
            <div>{v.temp}°</div>
            </div>
          ))}
        </Flex>
      </div>
    </div>
  )
}
export default HourlyForecast