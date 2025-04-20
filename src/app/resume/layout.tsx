import React from 'react'
import './resume.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '윤지원 이력서',
  description: '프론트엔드 개발자 윤지원의 이력서 입니다.'
}

const ResumeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  )
}

export default ResumeLayout
