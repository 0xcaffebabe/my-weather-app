import { useEffect, useRef, useState } from "react"
import "@amap/amap-jsapi-types";

export default function Map(props: { location: [number, number] }) {
  const ref = useRef(null)
  const [map, setMap] = useState<AMap.Map | null>(null)
  useEffect(() => {
    window.setTimeout(() => {
      if (!map) {
        const map0 = new AMap.Map('map', {
          center: props.location,
          zoom: 11
        });
        setMap(map0)
      }
      map?.setCenter(props.location)
      const marker = new AMap.Marker({
        icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
        position: props.location
      });
      map?.clearMap();
      map?.add(marker)
    }, 1000)
  })
  return (
    <div ref={ref} id="map" style={{ height: '500px', width: window.innerWidth - 40 + 'px', transition: 'all .2s' }}></div>
  )
}