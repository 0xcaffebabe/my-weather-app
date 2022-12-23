import React, { useEffect, useState } from 'react';
import './App.css';
import Weather from './dto/Weather';
import WeatherService from './service/WeatherService';
import DailyForecast from './view/component/DailyForecast';
import TodaySummary from './view/component/TodaySummary';
import {Row, Col} from 'antd'
import HourlyForecast from './view/component/HourlyForecast';
import RainFallForecast from './view/component/RainFallForecast';

const weatherService = WeatherService.newInstance()

function App() {
  const [weather, setWeather] = useState<Weather | null>(null)

  const refresh = function() {
    weatherService.getWeather().then(weat => {
      setWeather(weat)
    })
  }
  console.log('222')
    useEffect(() => {
      if (!weather) {
        console.log('111')
        refresh()
        const timer = setInterval(refresh, 10000)
        return () => clearInterval(timer)
      }
  })

  return (
    <div className="App">
      <Row>
        <Col span={24}>
          <p>推送时间: {weather?.current.pubTime}</p>
        </Col>
        <Col md={8} xs={24}>
          <TodaySummary weather={weather} />
        </Col>
        <Col md={16} xs={24}>
          <DailyForecast weather={weather}/>
        </Col>
        <Col span={24}>
        <RainFallForecast weather={weather}/>
        </Col>
        <Col span={24}>
          <HourlyForecast weather={weather}/>
        </Col>
      </Row>
    </div>
  );
}

export default App;
