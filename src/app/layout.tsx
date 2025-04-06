import type { Metadata } from 'next'
import localFont from 'next/font/local'

const pretendardFont = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  preload: true,
  display: 'swap'
})

export const metadata: Metadata = {
  title: '윤지원 이력서',
  description: '소프트웨어 엔지니어 윤지원 입니다.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${pretendardFont.className} antialiased`}>{children}</body>
    </html>
  )
}
