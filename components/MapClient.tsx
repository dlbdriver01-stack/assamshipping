'use client'
import { useEffect, useRef } from 'react'

export default function MapClient({ lat, lng }: { lat: number; lng: number }) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // Clean map placeholder
    const mapContainer = mapRef.current
    mapContainer.innerHTML = `
      <div style="
        width: 100%; 
        height: 320px; 
        background: linear-gradient(135deg, #0E7490 0%, #06B6D4 50%, #0E7490 100%);
        display: flex; 
        align-items: center; 
        justify-content: center; 
        position: relative;
        overflow: hidden;
      ">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        ">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#0E7490"/>
          </svg>
        </div>
      </div>
    `
  }, [lat, lng])

  return <div ref={mapRef} style={{ width: '100%' }} />
}
