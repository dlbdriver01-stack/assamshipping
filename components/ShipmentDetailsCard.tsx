import { Package, MapPin, Calendar, Clock, User, Truck, FileText, Phone, Mail } from 'lucide-react'

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  PICKED_UP: { label: 'Picked Up', color: 'text-blue-700', bg: 'bg-blue-50' },
  IN_TRANSIT: { label: 'In Transit', color: 'text-slate-700', bg: 'bg-slate-50' },
  OUT_FOR_DELIVERY: { label: 'Out for Delivery', color: 'text-slate-700', bg: 'bg-slate-50' },
  DELIVERED: { label: 'Delivered', color: 'text-green-700', bg: 'bg-green-50' },
  DELAYED: { label: 'Delayed', color: 'text-red-700', bg: 'bg-red-50' },
  CUSTOMS_BLOCKAGE: { label: 'Customs Blockage', color: 'text-orange-700', bg: 'bg-orange-50' },
  GOODS_RELEASED_BY_CUSTOMS: { label: 'Goods Released by Customs', color: 'text-emerald-700', bg: 'bg-emerald-50' },
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
  
  const status = statusConfig[shipment.status] || { label: shipment.status, color: 'text-slate-700', bg: 'bg-slate-50' }
  
  return (
    <div className="bg-white border border-slate-200">
      {/* Professional Header */}
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-slate-600" />
            <h2 className="text-lg font-semibold text-slate-900">Shipment Details</h2>
          </div>
          <div className={`px-3 py-1.5 ${status.bg} ${status.color} text-xs font-medium border border-slate-200`}>
            {status.label}
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        {/* Tracking ID */}
        <div className="mb-6 pb-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Tracking Number</span>
            <span className="font-mono text-sm font-medium text-slate-900">{shipment.trackingId}</span>
          </div>
        </div>

        {/* Addresses - Professional Table Style */}
        <div className="mb-6 pb-6 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide">Addresses</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Truck className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">Shipper</span>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-slate-900">{shipment.shipper?.name}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{shipment.shipper?.address}</p>
                {shipment.shipper?.phone && (
                  <p className="text-xs text-slate-600 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>{shipment.shipper.phone}</span>
                  </p>
                )}
                {shipment.shipper?.email && (
                  <p className="text-xs text-slate-600 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>{shipment.shipper.email}</span>
                  </p>
                )}
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-3">
                <User className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">Receiver</span>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-slate-900">{shipment.receiver?.name}</p>
                <p className="text-sm text-slate-600 leading-relaxed">{shipment.receiver?.address}</p>
                {shipment.receiver?.phone && (
                  <p className="text-xs text-slate-600 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-500" />
                    <span>{shipment.receiver.phone}</span>
                  </p>
                )}
                {shipment.receiver?.email && (
                  <p className="text-xs text-slate-600 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    <span>{shipment.receiver.email}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Current Location */}
        <div className="mb-6 pb-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-500" />
              <span className="text-sm font-medium text-slate-600">Current Location</span>
            </div>
            <span className="font-medium text-slate-900">{shipment.currentLocation?.city || 'Unknown'}</span>
          </div>
        </div>
        
        {/* Package Information - Table Style */}
        {(shipment.package || shipment.typeOfShipment || shipment.weight || shipment.product || shipment.totalFreight || shipment.quantity) && (
          <div className="mb-6 pb-6 border-b border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide">Package Information</h3>
            <div className="space-y-3">
              {shipment.package && (
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">Package</span>
                  <span className="text-sm font-medium text-slate-900">{shipment.package}</span>
                </div>
              )}
              {shipment.typeOfShipment && (
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">Type of Shipment</span>
                  <span className="text-sm font-medium text-slate-900">{shipment.typeOfShipment}</span>
                </div>
              )}
              {shipment.weight && (
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">Weight</span>
                  <span className="text-sm font-medium text-slate-900">{shipment.weight}</span>
                </div>
              )}
              {shipment.quantity && (
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">Quantity</span>
                  <span className="text-sm font-medium text-slate-900">{shipment.quantity}</span>
                </div>
              )}
              {shipment.totalFreight && (
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">Total Freight</span>
                  <span className="text-sm font-medium text-slate-900">{shipment.totalFreight}</span>
                </div>
              )}
              {shipment.product && (
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-sm text-slate-600">Product</span>
                  <span className="text-sm font-medium text-slate-900">{shipment.product}</span>
                </div>
              )}
            </div>
            {shipment.comment && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-slate-500 mt-0.5" />
                  <div>
                    <span className="text-xs font-medium text-slate-600 uppercase tracking-wide block mb-1">Comment</span>
                    <p className="text-sm text-slate-900">{shipment.comment}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Important Dates */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide">Important Dates</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-600">Pickup Date</span>
              </div>
              <span className="text-sm font-medium text-slate-900">{formatDate(shipment.pickupTime)}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-600">Estimated Delivery</span>
              </div>
              <span className="text-sm font-medium text-slate-900">{formatDate(shipment.estimatedDelivery)}</span>
            </div>
            {shipment.deliveryTime && (
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">Delivered On</span>
                </div>
                <span className="text-sm font-medium text-green-700">{formatDate(shipment.deliveryTime)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
