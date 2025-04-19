'use client'

import styles from '@/components/map/styles/FloatingMenusLeft.module.css'
import React from 'react'

interface ProgressProps {
  total: number
  remaining: number
  isRunning: boolean
}

interface RobotStatusProps {
  parts: {
    name: string
    status: 'ok' | 'warning' | 'error'
  }[]
}

export const LeftTopProgress = ({ total, remaining, isRunning }: ProgressProps) => {
  const percent = total > 0 ? Math.max(0, Math.min(100, ((total - remaining) / total) * 100)) : 0

  return (
    <div className={`${styles.topBox} ${isRunning ? styles.visible : ''}`}>
      <div className={styles.progressHeader} onClick={() => console.log(percent)}>
        📍 남은 거리
      </div>
      <div className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${percent}%` }} />
      </div>
      <div className={styles.progressText}>
        {remaining.toFixed(0)}m 남음 ({percent.toFixed(0)}%)
      </div>
    </div>
  )
}

export const LeftBottomRobot = ({ parts }: RobotStatusProps) => {
  return (
    <div className={styles.bottomBox}>
      <div className={styles.robotHeader}>🤖 로봇 상태</div>
      <div className={styles.robotModel}>[3D 모델 자리]</div>
      <ul className={styles.partList}>
        {parts.map((part, i) => (
          <li key={i} className={`${styles.partItem} ${styles[part.status]}`}>
            {part.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
