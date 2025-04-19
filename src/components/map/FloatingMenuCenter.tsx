'use client'

import React from 'react'
import styles from '@/components/map/styles/FloatingMenuCenter.module.css'

interface FloatingMenuProps {
  onStart: () => void
  onPause: () => void
  isRunning?: boolean
  follow: boolean
  onToggleFollow: () => void
}

const FloatingMenuCenter = ({ isRunning, onStart, onPause, follow, onToggleFollow }: FloatingMenuProps) => {
  return (
    <>
      <div className={`${styles.menu} `}>
        <button className={styles.button} onClick={isRunning ? onPause : onStart}>
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
