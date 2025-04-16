import React, { useRef, useEffect, useState } from 'react'
import mapboxgl, { Map as MapboxMap, LngLatLike, AnyLayer, LineLayer, MapMouseEvent } from 'mapbox-gl'

// --- Mapbox 접근 토큰 설정 ---
const MAPBOX_ACCESS_TOKEN: string | undefined = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

// 토큰 존재 여부 확인 (애플리케이션 시작 시점에 하는 것이 더 좋을 수 있음)
if (!MAPBOX_ACCESS_TOKEN) {
  console.error('Mapbox Access Token is missing. Set NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN in your .env')
  // 실제 앱에서는 여기서 에러를 던지거나, 사용자에게 메시지를 보여주는 등의 처리가 필요합니다.
} else {
  mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN
}

const sampleLineString: GeoJSON.Feature<GeoJSON.LineString> = {
  type: 'Feature',
  properties: {
    // 라인에 대한 추가 정보 (예: 이름)
    name: 'Sample Route'
  },
  geometry: {
    type: 'LineString',
    coordinates: [
      // 경로 좌표 [경도, 위도] 순서로 입력
      [127.0443732, 37.547901], // 시작점
      [127.0443931, 37.5477552],
      [127.0444413, 37.5473182],
      [127.0445225, 37.5467488],
      [127.0445903, 37.546293],
      [127.0447155, 37.5452295],
      [127.0441102, 37.5453912],
      [127.0433977, 37.5455994],
      [127.043153, 37.5450269]
    ]
  }
}

const Map: React.FC = () => {
  // Ref 타입 지정: HTMLDivElement 또는 null, MapboxMap 또는 null
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapboxMap | null>(null)

  // State 타입 지정: number
  const [lng, setLng] = useState<number>(127.0447)
  const [lat, setLat] = useState<number>(37.5475)
  const [zoom, setZoom] = useState<number>(19)

  useEffect(() => {
    // 접근 토큰이 없거나, 이미 지도가 초기화되었거나, 컨테이너 ref가 없으면 실행 중단
    if (!mapboxgl.accessToken || mapRef.current || !mapContainerRef.current) {
      console.log('Map initialization prerequisites not met.')
      return
    }

    console.log('Initializing Mapbox map...')
    const map = new mapboxgl.Map({
      container: mapContainerRef.current, // HTMLElement 타입과 호환
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat] as LngLatLike, // LngLatLike 타입으로 단언
      zoom: zoom,
      pitch: 45
    })

    mapRef.current = map // 생성된 지도 인스턴스를 ref에 저장

    const handleMapClick = (e: MapMouseEvent) => {
      const coordinates = e.lngLat // 클릭 이벤트 객체에서 LngLat 객체 가져오기
      console.log(`Map clicked at:`)
      console.log(`  Longitude: ${coordinates.lng}`) // 경도
      console.log(`  Latitude: ${coordinates.lat}`) // 위도

      // 필요하다면 클릭한 좌표를 상태(state)로 저장하거나 다른 작업 수행
      // setClickedCoords({ lng: coordinates.lng, lat: coordinates.lat });
    }

    map.on('click', handleMapClick)

    // 지도 이동 이벤트 리스너
    map.on('move', () => {
      if (!mapRef.current) return
      // getCenter(), getZoom()의 반환값 타입에 맞게 상태 업데이트
      setLng(parseFloat(mapRef.current.getCenter().lng.toFixed(4)))
      setLat(parseFloat(mapRef.current.getCenter().lat.toFixed(4)))
      setZoom(parseFloat(mapRef.current.getZoom().toFixed(2)))
    })

    // 지도 로드 완료 이벤트 리스너
    map.on('load', () => {
      if (!mapRef.current) return
      console.log('Map loaded. Adding 3D buildings layer...')
      const currentMap = mapRef.current // 타입 추론을 위해 변수에 할당

      // 기존 레이어 목록 가져오기 (첫 번째 심볼 레이어 찾기 위함)
      const layers = currentMap.getStyle().layers
      let firstSymbolId: string | undefined
      if (layers) {
        for (const layer of layers) {
          // layer 객체의 타입이 명확하지 않을 수 있으므로, 타입 가드나 단언이 필요할 수 있음
          if ((layer as AnyLayer).type === 'symbol') {
            firstSymbolId = layer.id
            break
          }
        }
      }
      console.log('Found first symbol layer ID:', firstSymbolId)

      // 3D 빌딩 레이어 추가 (이미 존재하지 않는 경우)
      if (!currentMap.getLayer('add-3d-buildings')) {
        // addLayer의 layer 파라미터 타입을 명시적으로 지정 (AnyLayer 또는 더 구체적인 타입)
        currentMap.addLayer(
          {
            id: 'add-3d-buildings',
            source: 'composite', // Mapbox Streets v8 이상
            'source-layer': 'building',
            filter: ['==', 'extrude', 'true'],
            type: 'fill-extrusion',
            minzoom: 15,
            paint: {
              'fill-extrusion-color': '#aaa',
              'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'height']],
              'fill-extrusion-base': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'min_height']],
              'fill-extrusion-opacity': 0.6
            }
          } as AnyLayer, // AnyLayer 또는 FillExtrusionLayer 등 구체적인 타입 사용
          firstSymbolId // 이 ID의 레이어 '앞'에 추가 (이 ID가 없으면 맨 위에 추가됨)
        )
        console.log('3D buildings layer added.')
      } else {
        console.log("3D buildings layer ('add-3d-buildings') already exists.")
      }

      // --- START: GeoJSON LineString 레이어 추가 ---

      const lineSourceId = 'geojson-line-source'
      const lineLayerId = 'geojson-line-layer'

      // 1. GeoJSON 소스 추가 (소스가 없을 경우에만)
      if (!currentMap.getSource(lineSourceId)) {
        currentMap.addSource(lineSourceId, {
          type: 'geojson',
          data: sampleLineString // 위에서 정의한 GeoJSON 데이터 사용
        })
        console.log(`GeoJSON source '${lineSourceId}' added.`)
      } else {
        // 필요하다면 기존 소스 데이터 업데이트:
        // (currentMap.getSource(lineSourceId) as mapboxgl.GeoJSONSource).setData(newGeoJsonData);
        console.log(`GeoJSON source '${lineSourceId}' already exists.`)
      }

      // 2. 라인 레이어 추가 (레이어가 없을 경우에만)
      if (!currentMap.getLayer(lineLayerId)) {
        currentMap.addLayer(
          {
            id: lineLayerId,
            type: 'line',
            source: lineSourceId, // 위에서 추가한 소스 ID 참조
            layout: {
              'line-join': 'round', // 라인 연결 부분 부드럽게
              'line-cap': 'round' // 라인 끝 부분 둥글게
            },
            paint: {
              'line-color': '#00BA7C', // 라인 색상 (빨간색)
              'line-width': 4, // 라인 두께
              'line-opacity': 1 // 라인 투명도 (선택 사항)
            }
          } as LineLayer // LineLayer 타입으로 단언
          // 라인을 최상단에 그리려면 이 인자 생략
        )
        console.log(`Line layer '${lineLayerId}' added.`)
      } else {
        console.log(`Line layer '${lineLayerId}' already exists.`)
      }

      // --- END: GeoJSON LineString 레이어 추가 ---
    })

    // 지도 에러 처리 (선택 사항)
    map.on('error', (e) => {
      console.error('Mapbox error:', e)
      // 에러 처리를 위한 추가 로직
    })

    // 컴포넌트 언마운트 시 정리 함수
    return () => {
      console.log('Cleaning up Mapbox map instance.')
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null // ref 초기화
      }
    }
  }, []) // 의존성 배열을 비워서 마운트 시 1회만 실행되도록 함

  return (
    // 지도를 담을 컨테이너와 상태 표시줄을 포함하는 외부 div
    <div style={{ position: 'absolute', width: '100vw', height: '100vh' }}>
      {/* 현재 좌표 및 줌 레벨 표시 */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 1, // 지도 위에 표시되도록 z-index 설정
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '5px 10px',
          borderRadius: '4px',
          fontFamily: 'monospace',
          fontSize: '12px'
        }}>
        Lng: {lng} | Lat: {lat} | Zoom: {zoom}
      </div>

      {/* Mapbox 지도가 렌더링될 div */}
      <div ref={mapContainerRef} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />
    </div>
  )
}

export default Map
