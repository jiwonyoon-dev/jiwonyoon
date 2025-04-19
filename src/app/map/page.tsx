'use client'

import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import FloatingMenuCenter from '@/components/map/FloatingMenuCenter'
import { LeftTopProgress } from '@/components/map/FloatingMenuLeft'
import { pathCoords, calculateTotalDistance } from '@/utils/geo'
import type { OnDistanceUpdate } from '@/hooks/map/usePathAnimation'

const MapComponent = dynamic(() => import('@/components/map/MapComponent'), { ssr: false })

export default function MapPage() {
  const totalDistance = useMemo(() => calculateTotalDistance(pathCoords), [])
  const [isRunning, setIsRunning] = useState(false)
  const [remainingDistance, setRemainingDistance] = useState<number>(totalDistance)
  const [follow, setFollow] = useState(true)

  const onToggleFollow = () => setFollow((prev) => !prev)

  const handleDistanceUpdate: OnDistanceUpdate = (distance) => {
    setRemainingDistance(distance)
  }

  useEffect(() => {
    setRemainingDistance(totalDistance)
  }, [totalDistance])

  return (
    <main style={{ position: 'absolute', width: '100vw', height: '100vh' }}>
      <MapComponent isRunning={isRunning} setRemainingDistance={handleDistanceUpdate} follow={follow} />
      <FloatingMenuCenter
        isRunning={isRunning}
        onStart={() => setIsRunning(true)}
        onPause={() => setIsRunning(false)}
        follow={follow}
        onToggleFollow={onToggleFollow}
      />
      <LeftTopProgress isRunning={isRunning} total={totalDistance} remaining={remainingDistance} />
    </main>
  )
}
