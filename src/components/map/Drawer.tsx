'use client'

import React, { Children } from 'react'
import styles from '@/components/map/styles/Drawer.module.css'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children:
    | React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>, 'button'>
    | React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>, 'button'>[]
}

export default function Drawer({ isOpen, onClose, children }: DrawerProps) {
  return (
    <>
      <div className={isOpen ? `${styles.backdrop} ${styles.backdropOpen}` : styles.backdrop} onClick={onClose} />

      <nav className={isOpen ? `${styles.panel} ${styles.panelOpen}` : styles.panel}>
        <ul className={styles.menuList}>
          {Children.map(children, (child, i) => (
            <li key={i} className={styles.menuItem}>
              {React.isValidElement(child) && child.type === 'button'
                ? React.cloneElement(child, {
                    className: styles.menuButton
                  })
                : child}
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}
