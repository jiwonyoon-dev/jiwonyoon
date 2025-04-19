// components/MapComponent.tsx
'use client'

import React, { useRef } from 'react'
import Map, { Marker, Source, Layer, MapRef } from 'react-map-gl/mapbox'
import { usePathAnimation, OnDistanceUpdate } from '@/hooks/map/usePathAnimation'
import { pathCoords, LatLng } from '@/utils/geo'

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!

const pathLineGeoJSON: GeoJSON.Feature<GeoJSON.LineString> = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'LineString',
    coordinates: pathCoords
  }
}

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
      attributionControl={false}
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
