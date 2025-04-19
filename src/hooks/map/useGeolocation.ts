// src/hooks/useGeolocation.ts
import { useState, useEffect, useRef } from 'react'
import { getDistance } from '@/utils/geo'

export interface Position {
  latitude: number
  longitude: number
  accuracy: number
}

export interface GeolocationState {
  position: Position | null
  error: GeolocationPositionError | null
  loading: boolean
}

export interface UseGeolocationConfig {
  options?: PositionOptions
  precision?: number
  accuracyThreshold?: number
  distanceFilter?: number
}

export const useGeolocation = ({
  options,
  precision = 6,
  accuracyThreshold,
  distanceFilter
}: UseGeolocationConfig = {}): GeolocationState => {
  const [position, setPosition] = useState<Position | null>(null)
  const [error, setError] = useState<GeolocationPositionError | null>(null)
  const [loading, setLoading] = useState(true)
  const lastPosRef = useRef<Position | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setError({
        code: 0,
        message: 'Geolocation is not supported by your browser.',
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3
      } as GeolocationPositionError)
      setLoading(false)
      return
    }

    const watcherId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords

        if (accuracyThreshold !== undefined && accuracy > accuracyThreshold) {
          return
        }

        const rounded: Position = {
          latitude: +latitude.toFixed(precision),
          longitude: +longitude.toFixed(precision),
          accuracy
        }

        const last = lastPosRef.current
        if (distanceFilter !== undefined && last && getDistance(last, rounded) < distanceFilter) {
          return
        }

        lastPosRef.current = rounded
        setPosition(rounded)
        setError(null)
        setLoading(false)
      },
      (err) => {
        setError(err)
        setLoading(false)
      },
      options
    )

    return () => {
      navigator.geolocation.clearWatch(watcherId)
    }
  }, [options, precision, accuracyThreshold, distanceFilter])

  return { position, error, loading }
}
