'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const statusLabels: Record<string, string> = {
  PICKED_UP: 'Picked Up',
  IN_TRANSIT: 'In Transit',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  DELAYED: 'Delayed',
  CUSTOMS_BLOCKAGE: 'CUSTOMS BLOCKAGE',
  GOODS_RELEASED_BY_CUSTOMS: 'GOODS RELEASED BY CUSTOMS',
}

const statusColors: Record<string, string> = {
  PICKED_UP: 'bg-blue-100 text-blue-800',
  IN_TRANSIT: 'bg-yellow-100 text-yellow-800',
  OUT_FOR_DELIVERY: 'bg-purple-100 text-purple-800',
  DELIVERED: 'bg-green-100 text-green-800',
  DELAYED: 'bg-red-100 text-red-800',
  CUSTOMS_BLOCKAGE: 'bg-orange-100 text-orange-800',
  GOODS_RELEASED_BY_CUSTOMS: 'bg-emerald-100 text-emerald-800',
}

interface Shipment {
  trackingId: string
  shipper: { name: string; address: string }
  receiver: { name: string; address: string }
  status: string
  currentLocation?: { city: string }
  pickupTime?: string
  estimatedDelivery?: string
}

export default function AdminShipmentTable() {
  const router = useRouter()
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Note: This is a placeholder. In production, you'd fetch from Firestore
    // For now, we'll use the seed data or implement a proper API endpoint to list shipments
    fetchShipments()
  }, [])

  const fetchShipments = async () => {
    setLoading(true)
    try {
      // TODO: Replace with actual Firestore query endpoint
      // For now, this is a placeholder
      const response = await fetch('/api/shipments?list=true')
      if (response.ok) {
        const data = await response.json()
        setShipments(data.shipments || [])
      }
    } catch (error) {
      console.error('Failed to fetch shipments:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredShipments = shipments.filter((s) =>
    s.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.shipper.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.receiver.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="bg-white p-12 rounded shadow text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-4 text-slate-600">Loading shipments...</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
      {/* Search Section */}
      <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">All Shipments</h2>
          <p className="text-slate-600">Search and manage all shipments in the system</p>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by tracking ID, shipper, or receiver..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
          />
        </div>
      </div>

      {filteredShipments.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No shipments found</h3>
          <p className="text-slate-600 mb-6">Get started by creating your first shipment</p>
          <Link href="/admin/shipments/new">
            <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all">
              Create Shipment
            </button>
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-50 to-white border-b-2 border-slate-200">
              <tr>
                <th className="text-left p-4 font-bold text-slate-900">Tracking ID</th>
                <th className="text-left p-4 font-bold text-slate-900">Shipper</th>
                <th className="text-left p-4 font-bold text-slate-900">Receiver</th>
                <th className="text-left p-4 font-bold text-slate-900">Status</th>
                <th className="text-left p-4 font-bold text-slate-900">Location</th>
                <th className="text-right p-4 font-bold text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredShipments.map((shipment) => (
                <tr key={shipment.trackingId} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <span className="font-mono font-semibold text-primary text-sm">{shipment.trackingId}</span>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-900">{shipment.shipper.name}</div>
                    <div className="text-sm text-slate-500 mt-1">{shipment.shipper.address}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-900">{shipment.receiver.name}</div>
                    <div className="text-sm text-slate-500 mt-1">{shipment.receiver.address}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusColors[shipment.status] || 'bg-gray-100 text-gray-800'}`}>
                      {statusLabels[shipment.status] || shipment.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-slate-400">📍</span>
                      <span className="text-slate-600 font-medium">{shipment.currentLocation?.city || 'Unknown'}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/track/${shipment.trackingId}`}>
                        <button className="px-3 py-1.5 text-sm bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:border-primary hover:text-primary transition-all font-medium">
                          View
                        </button>
                      </Link>
                      <Link href={`/admin/shipments/${shipment.trackingId}`}>
                        <button className="px-3 py-1.5 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-all font-medium">
                          Edit
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
