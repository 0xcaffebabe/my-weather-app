import { useEffect, useState } from 'react';
import './App.css';
import Weather from './dto/Weather';
import WeatherService from './service/WeatherService';
import DailyForecast from './view/component/DailyForecast';
import TodaySummary from './view/component/TodaySummary';
import { Row, Col, Spin,message } from 'antd'
import HourlyForecast from './view/component/HourlyForecast';
import RainFallForecast from './view/component/RainFallForecast';
import TouchUtils from './util/TouchUtils';
import WeatherUtils from './util/WeatherUtils';
import LocationService from './service/LocationService';
import LocationUtils from './util/LocationUtils';
import Alerts from './view/component/Alerts';
import { AxiosError } from 'axios';

const weatherService = WeatherService.newInstance()
const locationService = LocationService.newInstance()

function getPosition(options?: PositionOptions): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => 
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
  );
}

/* 根据天气更新背景色 */
const updateBackground = (weat: Weather) => {
  const color = WeatherUtils.weatherCode2Color(weat.current.weather)
  document.querySelector('html')!.style.background = `${color[0]}`
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", color[0])
}

function useLocation(): [[number,number], (loc: [number,number]) => void] {
  const [location, setLocation] = useState<[number,number]>(LocationUtils.getLastLocation())
  const [messageApi] = message.useMessage();
  useEffect(() => {
    getPosition().then(pos => {
      const coord = LocationUtils.wgs84togcj02(pos.coords.longitude, pos.coords.latitude)
      if (coord[0] !== location[0] || coord[1] !== location[1]) {
        setLocation([coord[0], coord[1]])
        LocationUtils.saveLastLocation(coord[0], coord[1])
      }
    }).catch(e => {
      messageApi.error("请求定位服务失败:" + (e as GeolocationPositionError).message)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return [location, setLocation]
}

function App() {
  const [weather, setWeather] = useState<Weather | null>(weatherService.getLastWeather())
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useLocation()
  
  const [showRefreshTip, setShowRefreshTip] = useState(false)

  const [messageApi, contextHolder] = message.useMessage();

  /* 根据经纬度更新地址 */
  const refreshAddress = async (lon: string, lat: string) => {
    setAddress(await locationService.location2Address(lon,lat))
  }

  /* 整体刷新逻辑 */
  const refresh = async () => {
    let coord = location
    try {
      const pos = await getPosition()
      coord = LocationUtils.wgs84togcj02(pos.coords.longitude, pos.coords.latitude) as [number, number]
      LocationUtils.saveLastLocation(coord[0], coord[1])
      setLocation([coord[0], coord[1]])
    }catch(e) {
      messageApi.error("请求定位服务失败:" + (e as GeolocationPositionError).message)
      coord = LocationUtils.getLastLocation()
    }
    if (!coord[0] && !coord[1]) {
      return
    }
    weatherService.getWeather(coord[0] + '', coord[1] + '').then(weat => {
      setWeather(weat)
      updateBackground(weat)
      setLoading(false)
    }).catch((err: AxiosError) => {
      messageApi.error("请求天气接口失败:" + err.message)
      // 使用上一次数据
      const weat = weatherService.getLastWeather()
      if (!weat) {
        messageApi.error("没有可用天气数据")
        return
      }
      setWeather(weat)
      updateBackground(weat)
      setLoading(false)
    })
    refreshAddress(coord[0] + '', coord[1] + '')
    setLoading(true)
  }

  useEffect(() => {
    TouchUtils.onSwipe(document.getElementById('app')!, (dir, del) => {
      if (dir[1] === 'down' && del[1] >= 350) {
        refresh()
        setShowRefreshTip(false)
      }
    }, (dir, del) => {
      if (dir[1] === 'down' && del[1] >= 350) {
        setShowRefreshTip(true)
      }
    })
    refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (weather) {
      updateBackground(weather)
    }
  }, [weather])

  const template = () => {
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
        <Col span={24}>
          <div className="block">
            <p className="words">
              爱哭寶爱小盈
            </p>
          </div>
        </Col>
      </Row>
    )
  }

  const refreshTipTemplate = () => {
    if (showRefreshTip) {
      return <div style={{fontSize: '12px'}}><Spin tip="" size='small'></Spin> 松开以刷新</div>
    }
  }

  return (
    <div className="App" id="app">
      {contextHolder}
      <div>
        {refreshTipTemplate()}
        <div>地点: {address || '未知'} <span style={{fontSize: '12px'}}>{loading && (<Spin style={{ color: '#fff' }} tip="" size='small'></Spin>)}</span> </div>
      </div>
      {template()}
    </div>
  );
}

export default App;
