// hooks/usePathAnimation.ts
import { useState, useRef, useEffect } from 'react'
import { MapRef } from 'react-map-gl/mapbox'
import { LatLng, getDistanceMeters, getBearing, calculateRemainingDistance } from '@/utils/geo'

export type PathCoords = LatLng[]
export type OnDistanceUpdate = (remainingDistance: number) => void

export const usePathAnimation = (
  pathCoords: PathCoords,
  speedMps: number,
  isRunning: boolean,
  follow: boolean,
  mapRef: React.RefObject<MapRef | null>,
  onDistanceUpdate: OnDistanceUpdate
): LatLng => {
  const [markerPos, setMarkerPos] = useState<LatLng>(pathCoords[0])

  const segmentIndexRef = useRef(0)
  const segmentProgressRef = useRef(0)
  const lastFrameTimeRef = useRef<number | null>(null)
  const animationFrameIdRef = useRef<number | null>(null)

  useEffect(() => {
    segmentIndexRef.current = 0
    segmentProgressRef.current = 0
    lastFrameTimeRef.current = null
    setMarkerPos(pathCoords[0])
  }, [pathCoords])

  useEffect(() => {
    if (!isRunning) return

    const animate = (time: number): void => {
      const idx = segmentIndexRef.current

      if (idx >= pathCoords.length - 1) {
        onDistanceUpdate(0)
        return
      }

      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = time
      }
      const deltaSec = (time - lastFrameTimeRef.current) / 1000
      lastFrameTimeRef.current = time

      const from = pathCoords[idx]
      const to = pathCoords[idx + 1]

      const segmentDistance = getDistanceMeters(from, to)
      const segmentDuration = segmentDistance / speedMps
      segmentProgressRef.current += deltaSec / segmentDuration

      let currentPos: LatLng
      if (segmentProgressRef.current >= 1) {
        segmentIndexRef.current += 1
        segmentProgressRef.current = 0
        currentPos = to
      } else {
        const t = segmentProgressRef.current
        currentPos = [from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t]
      }

      setMarkerPos(currentPos)

      if (follow && mapRef.current) {
        const bearing = getBearing(from, to)
        mapRef.current.flyTo({
          center: currentPos,
          bearing,
          zoom: 22,
          pitch: 75,
          duration: 300
        })
      }

      const remaining = calculateRemainingDistance(currentPos, pathCoords, segmentIndexRef.current)
      onDistanceUpdate(remaining)

      animationFrameIdRef.current = requestAnimationFrame(animate)
    }

    animationFrameIdRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrameIdRef.current != null) {
        cancelAnimationFrame(animationFrameIdRef.current)
      }
      lastFrameTimeRef.current = null
    }
  }, [isRunning, follow, onDistanceUpdate, pathCoords, speedMps, mapRef])

  return markerPos
}
