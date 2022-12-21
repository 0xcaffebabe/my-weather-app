import React, { useState } from 'react';
import './App.css';
import Weather from './dto/Weather';
import WeatherService from './service/WeatherService';
import DailyForecast from './view/component/DailyForecast';
import TodaySummary from './view/component/TodaySummary';
import {Row, Col} from 'antd'
import HourlyForecast from './view/component/HourlyForecast';

const weatherService = WeatherService.newInstance()

function App() {
  const [weather, setWeather] = useState<Weather | null>(null)
  weatherService.getWeather().then(weat => {
    setWeather(weat)
  })

  return (
    <div className="App">
      <Row>
        <Col md={8} xs={24}>
          <TodaySummary weather={weather} />
        </Col>
        <Col md={16} xs={24}>
          <DailyForecast weather={weather}/>
        </Col>
        <Col span={24}>
          <HourlyForecast weather={weather}/>
        </Col>
      </Row>
    </div>
  );
}

export default App;
