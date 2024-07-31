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
  document.querySelector('html')!.style.background = `linear-gradient(135deg, ${color[0]}, ${color[1]})`
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", color[0])
}

function useLocation() {
  const [location, setLocation] = useState<[number,number]>([0,0])
  const [messageApi] = message.useMessage();
  useEffect(() => {
    getPosition().then(pos => {
      const coord = LocationUtils.wgs84togcj02(pos.coords.longitude, pos.coords.latitude)
      setLocation([coord[0], coord[1]])
    }).catch(e => {
      messageApi.error("请求定位服务失败:" + (e as GeolocationPositionError).message)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return [location]
}

function App() {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(true)
  const [location] = useLocation()
  
  const [showRefreshTip, setShowRefreshTip] = useState(false)

  const [messageApi, contextHolder] = message.useMessage();

  /* 根据经纬度更新地址 */
  const refreshAddress = async (lon: string, lat: string) => {
    setAddress(await locationService.location2Address(lon,lat))
  }

  /* 整体刷新逻辑 */
  const refresh = async () => {
    const coord = location as [number, number]
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
    if (!weather) {
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

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
        <div>地点: {address || '未知'}</div>
      </div>
      {template()}
    </div>
  );
}

export default App;
