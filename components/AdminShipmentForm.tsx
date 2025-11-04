'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ShipmentSchema, type Shipment } from '@/lib/schemas/shipment'

const statusOptions = [
  { value: 'PICKED_UP', label: 'Picked Up' },
  { value: 'IN_TRANSIT', label: 'In Transit' },
  { value: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'DELAYED', label: 'Delayed' },
  { value: 'CUSTOMS_BLOCKAGE', label: 'CUSTOMS BLOCKAGE' },
  { value: 'GOODS_RELEASED_BY_CUSTOMS', label: 'GOODS RELEASED BY CUSTOMS' },
]

export default function AdminShipmentForm({ trackingId }: { trackingId?: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<Shipment>({
    resolver: zodResolver(ShipmentSchema),
    defaultValues: {
      trackingId: trackingId || '',
      shipper: { name: '', address: '' },
      receiver: { name: '', address: '' },
      status: 'PICKED_UP',
      currentLocation: { city: '' },
      history: [],
      package: '',
      typeOfShipment: '',
      weight: '',
      product: '',
      totalFreight: '',
      quantity: '',
      comment: '',
    },
  })

  useEffect(() => {
    if (trackingId) {
      // Fetch existing shipment
      fetch(`/api/shipments?id=${encodeURIComponent(trackingId)}`, { cache: 'no-store' })
        .then((res) => res.json())
        .then((data) => {
          if (data.ok && data.data) {
            const raw = data.data as any
            const toIso = (v: any) => (v && typeof v.toDate === 'function') ? v.toDate().toISOString() : v
            const toInput = (v: any) => {
              const iso = toIso(v)
              if (!iso) return undefined
              const d = new Date(iso)
              // Format as yyyy-MM-ddTHH:mm for datetime-local
              return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
            }
            const shipment = {
              ...raw,
              pickupTime: toIso(raw?.pickupTime),
              estimatedDelivery: toIso(raw?.estimatedDelivery),
              deliveryTime: toIso(raw?.deliveryTime),
              createdAt: toIso(raw?.createdAt),
              updatedAt: toIso(raw?.updatedAt),
            } as Shipment
            // Use reset for reliable full-form prefill
            const formValues: Shipment = {
              trackingId: shipment.trackingId || trackingId,
              shipper: { name: shipment.shipper?.name || '', address: shipment.shipper?.address || '' },
              receiver: { name: shipment.receiver?.name || '', address: shipment.receiver?.address || '' },
              status: (shipment.status as any) || 'PICKED_UP',
              currentLocation: shipment.currentLocation?.city ? { city: shipment.currentLocation.city } : { city: '' },
              pickupTime: toInput(shipment.pickupTime) as any,
              estimatedDelivery: toInput(shipment.estimatedDelivery) as any,
              deliveryTime: toInput((shipment as any).deliveryTime) as any,
              history: shipment.history || [],
              package: (shipment as any).package || '',
              typeOfShipment: (shipment as any).typeOfShipment || '',
              weight: (shipment as any).weight || '',
              product: (shipment as any).product || '',
              totalFreight: (shipment as any).totalFreight || '',
              quantity: (shipment as any).quantity || '',
              comment: (shipment as any).comment || '',
              createdAt: (shipment as any).createdAt,
              updatedAt: (shipment as any).updatedAt,
            }
            reset(formValues)
          }
        })
        .catch(() => setError('Failed to load shipment'))
    }
  }, [trackingId, setValue])

  const onSubmit = async (data: Shipment) => {
    setLoading(true)
    setError(null)
    
    try {
      // Convert datetime-local values to ISO strings
      const submissionData: Shipment = {
        ...data,
        pickupTime: data.pickupTime ? new Date(data.pickupTime).toISOString() : undefined,
        estimatedDelivery: data.estimatedDelivery ? new Date(data.estimatedDelivery).toISOString() : undefined,
      }
      
      const response = await fetch('/api/shipments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      })
      
      const result = await response.json()
      
      if (result.ok) {
        router.push(`/admin/shipments`)
      } else {
        setError(result.error || 'Failed to save shipment')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary/90 p-6 text-white">
            <h2 className="text-3xl font-bold mb-1">{trackingId ? 'Edit Shipment' : 'Create New Shipment'}</h2>
            <p className="text-primary-100">
              {trackingId ? `Update shipment details for tracking ID: ${trackingId}` : 'Fill in the details below to create a new shipment'}
            </p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="trackingId" className="block text-sm font-medium">Tracking ID *</label>
            <input
              id="trackingId"
              {...register('trackingId')}
              placeholder="e.g. IN2458901"
              disabled={!!trackingId}
              className="w-full border rounded px-3 py-2"
            />
            {errors.trackingId && (
              <p className="text-sm text-red-600">{errors.trackingId.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Shipper Information</h3>
              <div className="space-y-2">
                <label htmlFor="shipperName" className="block text-sm font-medium">Shipper Name *</label>
                <input
                  id="shipperName"
                  {...register('shipper.name')}
                  placeholder="Company or person name"
                  className="w-full border rounded px-3 py-2"
                />
                {errors.shipper?.name && (
                  <p className="text-sm text-red-600">{errors.shipper.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="shipperAddress" className="block text-sm font-medium">Shipper Address *</label>
                <input
                  id="shipperAddress"
                  {...register('shipper.address')}
                  placeholder="City, State"
                  className="w-full border rounded px-3 py-2"
                />
                {errors.shipper?.address && (
                  <p className="text-sm text-red-600">{errors.shipper.address.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Receiver Information</h3>
              <div className="space-y-2">
                <label htmlFor="receiverName" className="block text-sm font-medium">Receiver Name *</label>
                <input
                  id="receiverName"
                  {...register('receiver.name')}
                  placeholder="Recipient name"
                  className="w-full border rounded px-3 py-2"
                />
                {errors.receiver?.name && (
                  <p className="text-sm text-red-600">{errors.receiver.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="receiverAddress" className="block text-sm font-medium">Receiver Address *</label>
                <input
                  id="receiverAddress"
                  {...register('receiver.address')}
                  placeholder="City, State"
                  className="w-full border rounded px-3 py-2"
                />
                {errors.receiver?.address && (
                  <p className="text-sm text-red-600">{errors.receiver.address.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm font-medium">Status *</label>
              <select
                id="status"
                {...register('status')}
                className="w-full border rounded px-3 py-2"
              >
                {statusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="text-sm text-red-600">{errors.status.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="currentLocation" className="block text-sm font-medium">Current Location</label>
              <input
                id="currentLocation"
                {...register('currentLocation.city', {
                  setValueAs: (value) => value || undefined,
                })}
                placeholder="e.g. Mumbai, MH"
                onChange={(e) => {
                  setValue('currentLocation', { city: e.target.value })
                }}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Additional Optional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="package" className="block text-sm font-medium">Package</label>
              <input id="package" {...register('package')} placeholder="e.g. Household Items" className="w-full border rounded px-3 py-2" />
            </div>
            <div className="space-y-2">
              <label htmlFor="typeOfShipment" className="block text-sm font-medium">Type of Shipment</label>
              <input id="typeOfShipment" {...register('typeOfShipment')} placeholder="e.g. Express / Standard" className="w-full border rounded px-3 py-2" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="weight" className="block text-sm font-medium">Weight</label>
              <input id="weight" {...register('weight')} placeholder="e.g. 25 kg" className="w-full border rounded px-3 py-2" />
            </div>
            <div className="space-y-2">
              <label htmlFor="quantity" className="block text-sm font-medium">Quantity</label>
              <input id="quantity" {...register('quantity')} placeholder="e.g. 10" className="w-full border rounded px-3 py-2" />
            </div>
            <div className="space-y-2">
              <label htmlFor="totalFreight" className="block text-sm font-medium">Total Freight</label>
              <input id="totalFreight" {...register('totalFreight')} placeholder="e.g. ₹ 5,500" className="w-full border rounded px-3 py-2" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="product" className="block text-sm font-medium">Product</label>
              <input id="product" {...register('product')} placeholder="e.g. Electronics" className="w-full border rounded px-3 py-2" />
            </div>
            <div className="space-y-2">
              <label htmlFor="comment" className="block text-sm font-medium">Comment</label>
              <input id="comment" {...register('comment')} placeholder="Additional notes (optional)" className="w-full border rounded px-3 py-2" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="pickupTime" className="block text-sm font-medium">Pickup Date/Time</label>
              <input
                id="pickupTime"
                type="datetime-local"
                {...register('pickupTime')}
                value={watch('pickupTime') || ''}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="estimatedDelivery" className="block text-sm font-medium">Estimated Delivery</label>
              <input
                id="estimatedDelivery"
                type="datetime-local"
                {...register('estimatedDelivery')}
                value={watch('estimatedDelivery') || ''}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

            <div className="flex gap-4 pt-4 border-t border-slate-200">
              <button 
                type="submit" 
                disabled={loading} 
                className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-primary/90 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Saving...
                  </span>
                ) : (
                  'Save Shipment'
                )}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin/shipments')}
                className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-lg font-semibold hover:border-primary hover:text-primary transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
