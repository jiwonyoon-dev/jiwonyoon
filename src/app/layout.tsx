import localFont from 'next/font/local'
import React from 'react'
import '@/app/global.css'

const pretendardFont = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  preload: true,
  display: 'swap'
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendardFont.className} antialiased`}>{children}</body>
    </html>
  )
}
