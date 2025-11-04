'use client'
import dynamic from 'next/dynamic'
import { MapPin } from 'lucide-react'

const MapClient = dynamic(() => import('./MapClient'), { ssr: false })

export default function MapPreview({ location }: { location: any }) {
  if (!location || !location.lat) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-slate-400" />
          </div>
          <h4 className="text-xl font-bold text-slate-900">Location Preview</h4>
        </div>
        <div className="bg-slate-50 rounded-xl p-8 text-center border-2 border-dashed border-slate-200">
          <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">Location data not available</p>
        </div>
      </div>
    )
  }
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-primary/90 p-4 text-white">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5" />
          <h4 className="text-lg font-bold">Current Location</h4>
        </div>
        <p className="text-primary-100 text-sm mt-1">{location.city}</p>
      </div>
      <div className="p-2">
        <MapClient lat={location.lat} lng={location.lng} />
      </div>
      <div className="p-4 bg-slate-50 border-t border-slate-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">Coordinates</span>
          <span className="font-mono text-slate-900">{location.lat.toFixed(4)}, {location.lng.toFixed(4)}</span>
        </div>
      </div>
    </div>
  )
}

