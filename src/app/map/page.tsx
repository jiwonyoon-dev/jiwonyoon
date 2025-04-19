'use client'

import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import FloatingMenuCenter from '@/components/map/FloatingMenuCenter'
import { LeftTopProgress } from '@/components/map/FloatingMenuLeft'
import Drawer from '@/components/map/Drawer'
import { pathCoords, calculateTotalDistance } from '@/utils/geo'
import type { OnDistanceUpdate } from '@/hooks/map/usePathAnimation'

const MapComponent = dynamic(() => import('@/components/map/MapComponent'), { ssr: false })

export default function MapPage() {
  const totalDistance = useMemo(() => calculateTotalDistance(pathCoords), [])
  const [isRunning, setIsRunning] = useState(false)
  const [remainingDistance, setRemainingDistance] = useState<number>(totalDistance)
  const [follow, setFollow] = useState(true)

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // TODO: 경로 생성 시점에 따라 메뉴 아이템을 동적으로 생성해야 함
  const menuItems = [
    { label: '1번 경로', onClick: () => console.log('경로 생성') },
    { label: '2번 경로', onClick: () => console.log('경로 생성') },
    { label: '3번 경로', onClick: () => console.log('경로 생성') },
    { label: '4번 경로', onClick: () => console.log('경로 생성') },
    { label: '5번 경로', onClick: () => console.log('경로 생성') }
  ]

  const handleDistanceUpdate: OnDistanceUpdate = (distance) => setRemainingDistance(distance)

  useEffect(() => {
    setRemainingDistance(totalDistance)
  }, [totalDistance])

  return (
    <main style={{ position: 'absolute', width: '100vw', height: '100vh' }}>
      {/* Map + Overlays */}
      <MapComponent isRunning={isRunning} setRemainingDistance={handleDistanceUpdate} follow={follow} />
      <FloatingMenuCenter
        isRunning={isRunning}
        follow={follow}
        onToggleMenuOpen={() => setIsDrawerOpen((o) => !o)}
        onToggleRunning={() => setIsRunning((r) => !r)}
        onToggleFollow={() => setFollow((f) => !f)}
      />
      <LeftTopProgress isRunning={isRunning} total={totalDistance} remaining={remainingDistance} />
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              item.onClick()
              setIsDrawerOpen(false)
            }}>
            {item.label}
          </button>
        ))}
      </Drawer>
    </main>
  )
}
