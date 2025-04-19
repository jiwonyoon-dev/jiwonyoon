'use client'

import React from 'react'
import styles from '@/components/map/styles/SettingsPanel.module.css'

interface Props {
  visible: boolean
  onClose: () => void
}

const SettingsPanel = ({ visible }: Props) => {
  return (
    <div className={`${styles.panel} ${visible ? styles.visible : ''}`}>
      <div className={styles.header}>
        <p>설정</p>
      </div>
      <div className={styles.body}>
        <p>이동 속도</p>
        <p>지도 스타일</p>
        <p>다크모드</p>
      </div>
    </div>
  )
}

export default SettingsPanel
