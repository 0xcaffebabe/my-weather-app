import React, { useEffect, useState } from 'react';
import './App.css';
import Weather from './dto/Weather';
import WeatherService from './service/WeatherService';
import DailyForecast from './view/component/DailyForecast';
import TodaySummary from './view/component/TodaySummary';
import { Row, Col, Spin,message  } from 'antd'
import HourlyForecast from './view/component/HourlyForecast';
import RainFallForecast from './view/component/RainFallForecast';
import TouchUtils from './util/TouchUtils';
import WeatherUtils from './util/WeatherUtils';
import LocationService from './service/LocationService';

const weatherService = WeatherService.newInstance()
const locationService = LocationService.newInstance()

function App() {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(true)
  const [longtitude, setLongtitude] = useState('118.636286')
  const [latitude, setLatitude] = useState('24.874194')

  const [messageApi, contextHolder] = message.useMessage();

  navigator.geolocation.getCurrentPosition((pos) => {
    setLongtitude(pos.coords.longitude + '')
    setLatitude(pos.coords.latitude + '')
  }, (err) => {
    messageApi.error(err.message)
  })

  const updateBackground = (weat: Weather) => {
    const color = WeatherUtils.weatherCode2Color(weat.current.weather)
    document.querySelector('html')!.style.background = `linear-gradient(135deg, ${color[0]}, ${color[1]})`
  }

  const refreshAddress = async () => {
    setAddress(await locationService.location2Address(longtitude,latitude))
  }

  const refresh = function () {
    refreshAddress()
    setLoading(true)
    weatherService.getWeather(longtitude, latitude).then(weat => {
      setWeather(weat)
      updateBackground(weat)
      setLoading(false)
    })
  }
  useEffect(() => {
    if (!weather) {
      TouchUtils.onSwipe(document.getElementById('app')!, (dir, del) => {
        if (dir[1] === 'down' && del[1] >= 350) {
          refresh()
        }
      })
      refresh()
    }
  })

  const template = () => {
    if (loading) {
      return (<Spin style={{ color: '#fff', position: 'fixed', left: 'calc(50% - 1vh)', top: 'calc(50% - 1vh)' }} tip="刷新中" size='large'></Spin>)
    } else {
      return (
        <Row>
          <Col span={24}>
            <p>推送时间: {weather?.current.pubTime}</p>
          </Col>
          <Col md={8} xs={24}>
            <TodaySummary weather={weather} />
          </Col>
          <Col md={16} xs={24}>
            <DailyForecast weather={weather} />
          </Col>
          <Col span={24}>
            <RainFallForecast weather={weather} />
          </Col>
          <Col span={24}>
            <HourlyForecast weather={weather} />
          </Col>
        </Row>
      )
    }
  }

  return (
    <div className="App" id="app">
      {contextHolder}
      <div>{address} | {longtitude},{latitude}</div>
      {template()}
    </div>
  );
}

export default App;
