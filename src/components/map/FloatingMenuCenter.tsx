'use client'

import React from 'react'
import styles from '@/components/map/styles/FloatingMenuCenter.module.css'

interface FloatingMenuProps {
  isRunning?: boolean
  follow: boolean
  onToggleRunning: () => void
  onToggleFollow: () => void
  onToggleMenuOpen: () => void
}

const FloatingMenuCenter = ({
  isRunning,
  follow,
  onToggleRunning,
  onToggleFollow,
  onToggleMenuOpen
}: FloatingMenuProps) => {
  return (
    <>
      <div className={`${styles.menu} `}>
        <button className={styles.button} onClick={onToggleMenuOpen}>
          ☰ 메뉴
        </button>

        <button className={styles.button} onClick={onToggleRunning}>
          {isRunning ? '⏸ 일시 정지' : '🚀 주행 시작'}
        </button>
        <button className={styles.button} onClick={onToggleFollow}>
          {follow ? '📍 따라가기 해제' : '📍 따라가기 켜기'}
        </button>
      </div>
    </>
  )
}

export default FloatingMenuCenter
