'use client'

import dynamic from 'next/dynamic'
import FloatingMenuCenter from '@/components/map/FloatingMenuCenter'
import { LeftTopProgress, LeftBottomRobot } from '@/components/map/FloatingMenuLeft'
import { useEffect, useMemo, useState } from 'react'
import { pathCoords, getDistanceMeters } from '@/utils/geo'

const MapComponent = dynamic(() => import('@/components/map/MapComponent'), {
  ssr: false
})

function calculateTotalDistance(path: [number, number][]) {
  let total = 0
  for (let i = 0; i < path.length - 1; i++) {
    total += getDistanceMeters(path[i], path[i + 1])
  }
  return total
}
export default function MapPage() {
  const totalDistance = useMemo(() => calculateTotalDistance(pathCoords), [])

  const [isRunning, setIsRunning] = useState(false)
  const [remainingDistance, setRemainingDistance] = useState<number>(totalDistance)
  const [follow, setFollow] = useState(true)

  const onToggleFollow = () => {
    setFollow((prev) => !prev)
  }

  type RobotStatus = 'ok' | 'warning' | 'error'

  const robotParts: { name: string; status: RobotStatus }[] = [
    { name: '센서', status: 'ok' },
    { name: '모터', status: 'warning' },
    { name: '배터리', status: 'ok' },
    { name: '네트워크', status: 'error' }
  ]

  useEffect(() => {
    if (totalDistance > 0) {
      setRemainingDistance(totalDistance)
    }
  }, [totalDistance])

  return (
    <main style={{ position: 'absolute', width: '100vw', height: '100vh' }}>
      <MapComponent isRunning={isRunning} setRemainingDistance={setRemainingDistance} follow={follow} />
      <FloatingMenuCenter
        isRunning={isRunning}
        onStart={() => setIsRunning(true)}
        onPause={() => setIsRunning(false)}
        follow={follow}
        onToggleFollow={onToggleFollow} // ✅ 여기서 전달!
      />
      <LeftTopProgress isRunning={isRunning} total={totalDistance} remaining={remainingDistance} />
      <LeftBottomRobot parts={robotParts} />
    </main>
  )
}
