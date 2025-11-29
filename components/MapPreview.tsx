'use client'
import dynamic from 'next/dynamic'
import { MapPin } from 'lucide-react'

const MapClient = dynamic(() => import('./MapClient'), { ssr: false })

export default function MapPreview({ location }: { location: any }) {
  if (!location || !location.lat) {
    return (
      <div className="bg-white border border-slate-200">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-slate-600" />
            <h4 className="text-lg font-semibold text-slate-900">Location Preview</h4>
          </div>
        </div>
        <div className="p-12 text-center">
          <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500">Location data not available</p>
        </div>
      </div>
    )
  }
  return (
    <div className="bg-white border border-slate-200">
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-slate-600" />
          <h4 className="text-lg font-semibold text-slate-900">Current Location</h4>
        </div>
        <p className="text-xs text-slate-600 mt-1">{location.city}</p>
      </div>
      <div className="p-2 bg-slate-50">
        <div className="border border-slate-200">
          <MapClient lat={location.lat} lng={location.lng} />
        </div>
      </div>
      <div className="border-t border-slate-200 px-6 py-4 bg-slate-50">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-600">Coordinates</span>
          <span className="font-mono text-slate-900">{location.lat.toFixed(4)}, {location.lng.toFixed(4)}</span>
        </div>
      </div>
    </div>
  )
}
