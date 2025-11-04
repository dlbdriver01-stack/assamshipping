'use client'
import { useEffect, useRef } from 'react'
import { MapPin } from 'lucide-react'

export default function MapClient({ lat, lng }: { lat: number; lng: number }) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // Enhanced map placeholder with gradient design
    const mapContainer = mapRef.current
    mapContainer.innerHTML = `
      <div style="
        width: 100%; 
        height: 320px; 
        background: linear-gradient(135deg, #0E7490 0%, #06B6D4 50%, #0E7490 100%);
        border-radius: 12px; 
        display: flex; 
        flex-direction: column;
        align-items: center; 
        justify-content: center; 
        color: white; 
        position: relative;
        overflow: hidden;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
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
          animation: pulse 2s infinite;
        ">
          <span style="font-size: 24px;">📍</span>
        </div>
        <div style="
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(8px);
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          text-align: center;
        ">
          <div style="margin-bottom: 4px;">Map Preview</div>
          <div style="font-size: 11px; opacity: 0.9;">${lat.toFixed(4)}, ${lng.toFixed(4)}</div>
        </div>
        <style>
          @keyframes pulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.1); }
          }
        </style>
      </div>
    `
  }, [lat, lng])

  return <div ref={mapRef} className="rounded-xl overflow-hidden" />
}

