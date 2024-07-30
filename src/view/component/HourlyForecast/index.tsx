import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  MarkLineComponent,
  MarkLineComponentOption,
  MarkPointComponent,
  MarkPointComponentOption,
  MarkAreaComponent
} from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useEffect } from 'react';
import styles from './style.module.css'
import Weather from '../../../dto/Weather';
import WeatherService from '../../../service/WeatherService';

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  MarkAreaComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | MarkLineComponentOption
  | MarkPointComponentOption
  | LineSeriesOption
>;

const weatherService = WeatherService.newInstance()
let chart: echarts.ECharts | null = null
function initChart(weather: Weather | null) {
  const forecast = weatherService.getHourlyForecast(weather)
  var chartDom = document.getElementById('hourlyForecast')!;
  if (!chart) {
    chart = echarts.init(chartDom);
  }
  const option: EChartsOption = {
    textStyle: {
      color: '#fff'
    },
    title: {
      text: '24小时预报',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: forecast.map(v => v.time)
    },
    yAxis: {
      type: 'value',
      min: 'dataMin',
      max: 'dataMax',
      axisLabel: {
        formatter: '{value} °C'
      }
    },
    series: [
      {
        name: '温度',
        type: 'line',
        smooth: true,
        data: forecast.map(v => parseInt(v.temp)),
        lineStyle: {
          color: '#ccc'
        },
        markArea: {
          itemStyle: {
            color: 'rgba(255, 173, 177, 0.4)'
          },
          data: weatherService.calcHourlyWeahterRange(forecast).map(v => [
            {name: v.weather, xAxis: v.startTime, itemStyle: {color: v.color}},
            {xAxis: v.endTime},
          ])
        }
      }
    ]
  };

  option && chart.setOption(option);
}

function HourlyForecast(props: { weather: Weather | null }) {
  useEffect(() => {
    if (props.weather) {
      initChart(props.weather)
    }
  }, [props.weather])
  return (
    <div className={styles.chartWrapper}>
      <div id='hourlyForecast' className={styles.hourlyForecast}></div>
    </div>
  )
}

export default HourlyForecast