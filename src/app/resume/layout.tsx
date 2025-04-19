import React from 'react'
import './resume.css'

const ResumeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  )
}

export default ResumeLayout
