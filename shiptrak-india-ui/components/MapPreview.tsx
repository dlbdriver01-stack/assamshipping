'use client'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./MapClient'), { ssr: false })

export default function MapPreview({ location }: { location: any }) {
  if (!location || !location.lat) {
    return <div className="bg-white p-6 rounded shadow">Location preview not available</div>
  }
  return (
    <div className="bg-white p-4 rounded shadow">
      <Map lat={location.lat} lng={location.lng} />
    </div>
  )
}
