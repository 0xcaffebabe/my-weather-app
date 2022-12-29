import Weather from "../../../dto/Weather"
import * as echarts from 'echarts/core';
import { GridComponent, GridComponentOption,TitleComponent,
  TitleComponentOption, } from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useEffect } from "react";
import { Popover } from "antd";

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition, TitleComponent]);

type EChartsOption = echarts.ComposeOption<
  GridComponentOption | LineSeriesOption | TitleComponentOption
>;


function initChart(weat: Weather | null) {
  if (!weat) {
    return
  }
  var chartDom = document.getElementById('rainFallChart')!;
  var myChart = echarts.init(chartDom);

  const option: EChartsOption = {
    textStyle: {
      color: '#fff'
    },
    title: {
      text: '2小时降水预报',
      textStyle: {
        color: '#fff'
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: weat?.minutely?.precipitation.value.map((_, i) => i + '')
    },
    tooltip: {
      trigger: 'axis'
    },
    yAxis: {
      type: 'value',
      max: '100'
    },
    series: [
      {
        data: weat?.minutely?.precipitation.value.map(v => v * 100),
        type: 'line',
        smooth: true,
        areaStyle: {}
      }
    ]
  };

  option && myChart.setOption(option);
}

function RainFallForecast(props: { weather: Weather | null, location: [number, number] }) {

  const allZero = !props.weather?.minutely?.precipitation.value.some(v => v !== 0)
  useEffect(() => {
    if (!allZero) {
      initChart(props.weather)
    }
  })

  const chartTemplate = () => {
    if (!allZero) {
      return (
        <div id="rainFallChart" style={{width: '100%', height: 'calc(28vh)'}}></div>
      )
    }
  }

  return (
    <div>
      <Popover content={(<iframe title="天气云图" src='https://caiyunapp.com/share/index.html' style={{height: window.innerHeight - 100 + 'px', width: window.innerWidth - 40 + 'px'}} />)} trigger="click">
        <p>{props.weather?.minutely?.precipitation.description}</p>
      </Popover>
      {chartTemplate()}
    </div>
  )
}

export default RainFallForecast