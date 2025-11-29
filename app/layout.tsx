import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://assampackersandmovers.com'),
  title: {
    default: 'ASSAM PACKERS AND MOVERS — Professional Packing & Moving Services',
    template: '%s | ASSAM PACKERS AND MOVERS',
  },
  description: 'Professional packing and moving services across Assam and India. Track your shipments in real time. Trusted movers and packers with secure transportation.',
  keywords: ['packers and movers', 'moving services', 'packing services', 'Assam movers', 'shipment tracking', 'courier tracking', 'India logistics', 'package tracking', 'Assam packers'],
  authors: [{ name: 'ASSAM PACKERS AND MOVERS' }],
  creator: 'ASSAM PACKERS AND MOVERS',
  publisher: 'ASSAM PACKERS AND MOVERS',
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://assampackersandmovers.com',
    siteName: 'ASSAM PACKERS AND MOVERS',
    title: 'ASSAM PACKERS AND MOVERS — Professional Packing & Moving Services',
    description: 'Professional packing and moving services with real-time shipment tracking',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ASSAM PACKERS AND MOVERS — Professional Packing & Moving Services',
    description: 'Professional packing and moving services with real-time shipment tracking',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className="scroll-smooth">
      <head />
      <body className="bg-white text-slate-800 antialiased">
        {children}
      </body>
    </html>
  )
}
