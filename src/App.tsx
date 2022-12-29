import React, { useEffect, useState } from 'react';
import './App.css';
import Weather from './dto/Weather';
import WeatherService from './service/WeatherService';
import DailyForecast from './view/component/DailyForecast';
import TodaySummary from './view/component/TodaySummary';
import { Row, Col, Spin,message, Popover  } from 'antd'
import HourlyForecast from './view/component/HourlyForecast';
import RainFallForecast from './view/component/RainFallForecast';
import TouchUtils from './util/TouchUtils';
import WeatherUtils from './util/WeatherUtils';
import LocationService from './service/LocationService';
import LocationUtils from './util/LocationUtils';
import Alerts from './view/component/Alerts';
import Map from './view/component/Map';

const weatherService = WeatherService.newInstance()
const locationService = LocationService.newInstance()

function getPosition(options?: PositionOptions): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => 
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
  );
}

function App() {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(true)
  const [location, setLocation] = useState<[number,number]>([118.636286,24.874194])

  const [messageApi, contextHolder] = message.useMessage();

  const getLocation = async (): Promise<[number, number]> => {
    try {
      const pos = await getPosition()
      const coord = LocationUtils.wgs84togcj02(pos.coords.longitude, pos.coords.latitude)
      setLocation([coord[0], coord[1]])
      return [coord[0], coord[1]]
    }catch(e) {
      messageApi.error((e as GeolocationPositionError).message)
    }
    return [118.636286,24.874194]
  }

  const updateBackground = (weat: Weather) => {
    const color = WeatherUtils.weatherCode2Color(weat.current.weather)
    document.querySelector('html')!.style.background = `linear-gradient(135deg, ${color[0]}, ${color[1]})`
  }

  const refreshAddress = async (lon: string, lat: string) => {
    setAddress(await locationService.location2Address(lon,lat))
  }

  const refresh = async () => {
    const coord = await getLocation()
    weatherService.getWeather(coord[0] + '', coord[1] + '').then(weat => {
      setWeather(weat)
      updateBackground(weat)
      setLoading(false)
    })
    refreshAddress(coord[0] + '', coord[1] + '')
    setLoading(true)
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
            <Alerts weather={weather}/>
          </Col>
          <Col md={8} xs={24}>
            <TodaySummary weather={weather} />
          </Col>
          <Col md={16} xs={24}>
            <DailyForecast weather={weather} />
          </Col>
          <Col span={24}>
            <RainFallForecast weather={weather} location={location} />
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
      <Popover content={(<Map location={location}/>)}>
        <div>{address}</div>
      </Popover>
      
      {template()}
    </div>
  );
}

export default App;
