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
          zoom: 16
        });
        AMap.plugin([
          'AMap.ToolBar',
          'AMap.Scale',
          'AMap.HawkEye',
          'AMap.MapType',
          'AMap.Geolocation',
      ], function(){
          // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
          map0.addControl(new (AMap as any).ToolBar());
      
          // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
          map0.addControl(new (AMap as any).Scale());
      
          // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
          map0.addControl(new (AMap as any).HawkEye({isOpen:false}));
         
          // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
          map0.addControl(new (AMap as any).MapType());
         
          // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
          map0.addControl(new (AMap as any).Geolocation({position: 'LB', panToLocation : true, zoomToAccuracy: true}));
      });
        setMap(map0)
      }
      map?.setCenter(props.location)
    }, 1000)
  })
  return (
    <div ref={ref} id="map" style={{ height: '500px', width: window.innerWidth - 40 + 'px', transition: 'all .2s' }}></div>
  )
}