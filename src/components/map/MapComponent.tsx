// components/MapComponent.tsx
'use client'

import React, { useRef } from 'react'
import type { Position } from 'geojson'
import Map, { Marker, Source, Layer, MapRef } from 'react-map-gl/mapbox'
import { usePathAnimation, LatLng, PathCoords, OnDistanceUpdate } from '@/hooks/map/usePathAnimation'

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

const pathLineGeoJSON: GeoJSON.Feature<GeoJSON.LineString> = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'LineString',
    coordinates: [
      [127.0443732, 37.547901],
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

const rawCoords = pathLineGeoJSON.geometry.coordinates as Position[]

const pathCoords: PathCoords = rawCoords.map((pos) => {
  const [lon, lat] = pos
  return [lon, lat] // 이제 타입이 [number, number]
})
const SPEED_MPS = 3.5

interface MapComponentProps {
  isRunning: boolean
  setRemainingDistance: OnDistanceUpdate
  follow: boolean
}

const MapComponent: React.FC<MapComponentProps> = ({ isRunning, setRemainingDistance, follow }) => {
  const mapRef = useRef<MapRef | null>(null)

  const markerPos: LatLng = usePathAnimation(pathCoords, SPEED_MPS, isRunning, follow, mapRef, setRemainingDistance)

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: pathCoords[0][0],
        latitude: pathCoords[0][1],
        zoom: 18,
        pitch: 45,
        bearing: 0
      }}
      mapboxAccessToken={mapboxToken}
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v12">
      <Source id="route" type="geojson" data={pathLineGeoJSON}>
        <Layer
          id="route-line"
          type="line"
          layout={{
            'line-cap': 'round',
            'line-join': 'round'
          }}
          paint={{
            'line-color': '#00BA7C',
            'line-width': 4,
            'line-opacity': 1
          }}
        />
      </Source>
      <Marker longitude={markerPos[0]} latitude={markerPos[1]} />
    </Map>
  )
}

export default MapComponent
