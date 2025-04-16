// app/map/layout.tsx
import React from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'

export default function MapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
