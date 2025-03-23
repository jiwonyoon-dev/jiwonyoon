import type { Metadata } from 'next'
import localFont from 'next/font/local'

const pretendardFont = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  preload: true,
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'QR 코드 생성기',
  description: '쉽게 QR 코드를 생성하고 다운로드할 수 있는 웹사이트'
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
