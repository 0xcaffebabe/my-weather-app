import Weather from "../../../dto/Weather"

function RainFallForecast(props: {weather: Weather | null}) {

  return (
    <div>
      <p>{props.weather?.minutely?.precipitation.description}</p>
    </div>
  )
}

export default RainFallForecast