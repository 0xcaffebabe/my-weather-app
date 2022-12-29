import { Alert, Popover } from "antd";
import Weather from "../../../dto/Weather";

export default function Alerts(props: {weather: Weather | null}) {
  const alerts =  props.weather?.alerts || []
  if (alerts.length !== 0) {
    return (
      <div style={{padding: '10px'}}>
        {alerts.map(v => (
          <Popover content={(<div> {v.detail}</div>)} title={v.title} trigger="click">
            <Alert message={v.title} type='warning' showIcon icon={<img width={20} height={20} src={v.images.icon}/>}/>
          </Popover>
        ))}
      </div>
    )
  }
  return <div></div>
}