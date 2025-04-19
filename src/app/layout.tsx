import React from 'react'
import Script from 'next/script'
import type { Metadata } from 'next'
import '@/app/global.css'

const GA_ID = 'G-YXSFQJP09V'

export const metadata: Metadata = {
  title: 'Jjwon Yoon | Frontend Developer',
  description: 'Jjwon Yoon | Frontend Developer'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <title>{`${metadata.title}`}</title>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  )
}
