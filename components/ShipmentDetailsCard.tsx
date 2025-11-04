import { Package, MapPin, Calendar, Clock, User, Truck } from 'lucide-react'

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  PICKED_UP: { label: 'Picked Up', color: 'text-blue-700', bg: 'bg-blue-100' },
  IN_TRANSIT: { label: 'In Transit', color: 'text-yellow-700', bg: 'bg-yellow-100' },
  OUT_FOR_DELIVERY: { label: 'Out for Delivery', color: 'text-purple-700', bg: 'bg-purple-100' },
  DELIVERED: { label: 'Delivered', color: 'text-green-700', bg: 'bg-green-100' },
  DELAYED: { label: 'Delayed', color: 'text-red-700', bg: 'bg-red-100' },
  CUSTOMS_BLOCKAGE: { label: 'CUSTOMS BLOCKAGE', color: 'text-orange-700', bg: 'bg-orange-100' },
  GOODS_RELEASED_BY_CUSTOMS: { label: 'GOODS RELEASED BY CUSTOMS', color: 'text-emerald-700', bg: 'bg-emerald-100' },
}

export default function ShipmentDetailsCard({ shipment }: { shipment: any }) {
  if (!shipment) return null
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not available'
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  
  const status = statusConfig[shipment.status] || { label: shipment.status, color: 'text-gray-700', bg: 'bg-gray-100' }
  
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/90 p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Shipment Details</h2>
              <p className="text-primary-100 text-sm">Tracking ID: <span className="font-mono font-semibold">{shipment.trackingId}</span></p>
            </div>
          </div>
          <div className={`px-4 py-2 ${status.bg} ${status.color} rounded-lg font-semibold text-sm`}>
            {status.label}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Addresses */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-600 mb-3">
              <Truck className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-slate-900">Shipper</h3>
            </div>
            <div className="pl-7 space-y-1">
              <p className="font-semibold text-slate-900">{shipment.shipper?.name}</p>
              <p className="text-sm text-slate-600">{shipment.shipper?.address}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-600 mb-3">
              <User className="w-5 h-5 text-accent" />
              <h3 className="font-semibold text-slate-900">Receiver</h3>
            </div>
            <div className="pl-7 space-y-1">
              <p className="font-semibold text-slate-900">{shipment.receiver?.name}</p>
              <p className="text-sm text-slate-600">{shipment.receiver?.address}</p>
            </div>
          </div>
        </div>
        
        {/* Location */}
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-slate-600">Current Location</p>
              <p className="font-semibold text-slate-900">{shipment.currentLocation?.city || 'Unknown'}</p>
            </div>
          </div>
        </div>
        
        {/* Optional shipment details */}
        {(shipment.package || shipment.typeOfShipment || shipment.weight || shipment.product || shipment.totalFreight || shipment.quantity || shipment.comment) && (
          <div className="bg-slate-50 rounded-xl p-4 space-y-2">
            <div className="grid md:grid-cols-2 gap-4">
              {shipment.package && (
                <div>
                  <p className="text-sm text-slate-600">Package</p>
                  <p className="font-semibold text-slate-900">{shipment.package}</p>
                </div>
              )}
              {shipment.typeOfShipment && (
                <div>
                  <p className="text-sm text-slate-600">Type of Shipment</p>
                  <p className="font-semibold text-slate-900">{shipment.typeOfShipment}</p>
                </div>
              )}
              {shipment.weight && (
                <div>
                  <p className="text-sm text-slate-600">Weight</p>
                  <p className="font-semibold text-slate-900">{shipment.weight}</p>
                </div>
              )}
              {shipment.quantity && (
                <div>
                  <p className="text-sm text-slate-600">Quantity</p>
                  <p className="font-semibold text-slate-900">{shipment.quantity}</p>
                </div>
              )}
              {shipment.totalFreight && (
                <div>
                  <p className="text-sm text-slate-600">Total Freight</p>
                  <p className="font-semibold text-slate-900">{shipment.totalFreight}</p>
                </div>
              )}
              {shipment.product && (
                <div>
                  <p className="text-sm text-slate-600">Product</p>
                  <p className="font-semibold text-slate-900">{shipment.product}</p>
                </div>
              )}
            </div>
            {shipment.comment && (
              <div>
                <p className="text-sm text-slate-600">Comment</p>
                <p className="text-slate-900">{shipment.comment}</p>
              </div>
            )}
          </div>
        )}

        {/* Timeline Dates */}
        <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Pickup Date</p>
              <p className="font-semibold text-slate-900">{formatDate(shipment.pickupTime)}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Estimated Delivery</p>
              <p className="font-semibold text-slate-900">{formatDate(shipment.estimatedDelivery)}</p>
            </div>
          </div>
          
          {shipment.deliveryTime && (
            <div className="flex items-start gap-3 md:col-span-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Delivered On</p>
                <p className="font-semibold text-green-700">{formatDate(shipment.deliveryTime)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
