import React, { useState } from 'react';
import './App.css';
import WeatherService from './service/WeatherService';

const weatherService = new WeatherService()

function App() {
  const [temp, setTemp] = useState("0")
  const [weather, setWeather] = useState("未知")
  weatherService.getWeather().then(weat => {
    setTemp(weat.current.temperature.value)
    setWeather(weat.current.weather)
  })

  return (
    <div className="App">
      <div>
        当前温度 {temp}
      </div>
      <div>
        当前天气 {weather}
      </div>
    </div>
  );
}

export default App;
