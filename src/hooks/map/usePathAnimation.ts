// hooks/usePathAnimation.ts
import { useState, useRef, useEffect } from 'react'
import { MapRef } from 'react-map-gl/mapbox'

// ——————————————————
// 타입 정의
// ——————————————————
export type LatLng = [number, number]
export type PathCoords = LatLng[]
export type OnDistanceUpdate = (remainingDistance: number) => void

// ——————————————————
// 상수 및 유틸 함수
// ——————————————————
const RADIUS_EARTH = 6_371_000

const toRad = (deg: number): number => (deg * Math.PI) / 180

const getDistanceMeters = (from: LatLng, to: LatLng): number => {
  const φ1 = toRad(from[1])
  const φ2 = toRad(to[1])
  const Δφ = toRad(to[1] - from[1])
  const Δλ = toRad(to[0] - from[0])

  const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return RADIUS_EARTH * c
}

const getBearing = (from: LatLng, to: LatLng): number => {
  const φ1 = toRad(from[1])
  const φ2 = toRad(to[1])
  const Δλ = toRad(to[0] - from[0])

  const y = Math.sin(Δλ) * Math.cos(φ2)
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ)
  const θ = Math.atan2(y, x)

  return ((θ * 180) / Math.PI + 360) % 360
}

const calculateRemainingDistance = (current: LatLng, path: PathCoords, index: number): number => {
  let dist = 0
  // 현재 위치에서 다음 포인트까지
  dist += getDistanceMeters(current, path[index + 1])
  // 그 이후 세그먼트 누적
  for (let i = index + 1; i < path.length - 1; i++) {
    dist += getDistanceMeters(path[i], path[i + 1])
  }
  return dist
}

// ——————————————————
// usePathAnimation 훅
// ——————————————————
export const usePathAnimation = (
  pathCoords: PathCoords,
  speedMps: number,
  isRunning: boolean,
  follow: boolean,
  mapRef: React.RefObject<MapRef | null>,
  onDistanceUpdate: OnDistanceUpdate
): LatLng => {
  const [markerPos, setMarkerPos] = useState<LatLng>(pathCoords[0])

  const segmentIndexRef = useRef<number>(0)
  const segmentProgressRef = useRef<number>(0)
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
      if (idx >= pathCoords.length - 1) return

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

      const bearing = getBearing(from, to)
      if (follow && mapRef.current) {
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
