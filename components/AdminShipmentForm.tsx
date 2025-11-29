'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ShipmentSchema, type Shipment } from '@/lib/schemas/shipment'
import {
  Package,
  User,
  MapPin,
  Calendar,
  Weight,
  ShoppingCart,
  DollarSign,
  FileText,
  Clock,
  Phone,
  Mail,
  Plus,
  Trash2,
  History,
} from 'lucide-react'

const statusOptions = [
  { value: 'PICKED_UP', label: 'Picked Up' },
  { value: 'IN_TRANSIT', label: 'In Transit' },
  { value: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
  { value: 'DELIVERED', label: 'Delivered' },
  { value: 'DELAYED', label: 'Delayed' },
  { value: 'CUSTOMS_BLOCKAGE', label: 'Custom Blockage' },
  { value: 'GOODS_RELEASED_BY_CUSTOMS', label: 'Goods Released by Custom' },
]

export default function AdminShipmentForm({ trackingId }: { trackingId?: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [newHistoryEntry, setNewHistoryEntry] = useState({
    time: '',
    status: '',
    location: '',
    updatedBy: 'admin',
    remarks: '',
  })
  
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
      shipper: { name: '', address: '', phone: '', email: '' },
      receiver: { name: '', address: '', phone: '', email: '' },
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
              shipper: { 
                name: shipment.shipper?.name || '', 
                address: shipment.shipper?.address || '',
                phone: (shipment.shipper as any)?.phone || '',
                email: (shipment.shipper as any)?.email || '',
              },
              receiver: { 
                name: shipment.receiver?.name || '', 
                address: shipment.receiver?.address || '',
                phone: (shipment.receiver as any)?.phone || '',
                email: (shipment.receiver as any)?.email || '',
              },
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
  }, [trackingId, setValue, reset])

  const addHistoryEntry = () => {
    if (!newHistoryEntry.time || !newHistoryEntry.status || !newHistoryEntry.location) {
      setError('Please fill in Date/Time, Status, and Location for history entry')
      return
    }
    const currentHistory = watch('history') || []
    const entry = {
      time: new Date(newHistoryEntry.time).toISOString(),
      status: newHistoryEntry.status,
      location: newHistoryEntry.location,
      updatedBy: newHistoryEntry.updatedBy || 'admin',
      remarks: newHistoryEntry.remarks || '',
    }
    setValue('history', [...currentHistory, entry])
    setNewHistoryEntry({ time: '', status: '', location: '', updatedBy: 'admin', remarks: '' })
    setError(null)
  }

  const removeHistoryEntry = (index: number) => {
    const currentHistory = watch('history') || []
    setValue('history', currentHistory.filter((_, i) => i !== index))
  }

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
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-primary to-primary/90 px-6 py-4 text-white">
            <h2 className="text-2xl font-bold mb-1">
              {trackingId ? 'Edit Shipment' : 'Create New Shipment'}
            </h2>
            <p className="text-white/90 text-sm">
              {trackingId
                ? `Update shipment details for tracking ID: ${trackingId}`
                : 'Fill in the details below to create a new shipment'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-6 pb-6 pt-4">
            {error && (
              <div className="p-4 bg-red-50 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Tracking ID & Status */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="trackingId">
                  Tracking ID <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    id="trackingId"
                    {...register('trackingId')}
                    placeholder="e.g. IN2458901"
                    disabled={!!trackingId}
                    className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-lg bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  />
                </div>
                {errors.trackingId && (
                  <p className="mt-1 text-sm text-red-600">{errors.trackingId.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="status">
                  Status <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    id="status"
                    {...register('status')}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg bg-white appearance-none cursor-pointer focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                    <svg
                      className="h-5 w-5 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                {errors.status && (
                  <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
                )}
              </div>
            </div>

            {/* Shipper & Receiver Information */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Shipper Information */}
              <div className="rounded-xl border-2 border-slate-100 bg-slate-50 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="rounded-lg bg-primary p-2">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Shipper Information</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="shipperName"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Shipper Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="shipperName"
                      {...register('shipper.name')}
                      placeholder="Company or person name"
                      className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                    {errors.shipper?.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.shipper.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="shipperAddress"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Shipper Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="shipperAddress"
                      {...register('shipper.address')}
                      placeholder="Full address, City, State, PIN"
                      className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                    {errors.shipper?.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.shipper.address.message}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="shipperPhone"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        id="shipperPhone"
                        {...register('shipper.phone')}
                        placeholder="e.g. +91 7093937537"
                        className="w-full rounded-lg border-2 border-slate-200 bg-white pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="shipperEmail"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        id="shipperEmail"
                        type="email"
                        {...register('shipper.email')}
                        placeholder="e.g. contact@company.com"
                        className="w-full rounded-lg border-2 border-slate-200 bg-white pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                      />
                    </div>
                    {errors.shipper?.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.shipper.email.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Receiver Information */}
              <div className="rounded-xl border-2 border-slate-100 bg-slate-50 p-6">
                <div className="mb-4 flex items-center gap-2">
                  <div className="rounded-lg bg-amber-400 p-2">
                    <User className="h-4 w-4 text-slate-900" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Receiver Information</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="receiverName"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Receiver Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="receiverName"
                      {...register('receiver.name')}
                      placeholder="Recipient name"
                      className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                    {errors.receiver?.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.receiver.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="receiverAddress"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Receiver Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="receiverAddress"
                      {...register('receiver.address')}
                      placeholder="Full address, City, State, PIN"
                      className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                    {errors.receiver?.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.receiver.address.message}</p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="receiverPhone"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        id="receiverPhone"
                        {...register('receiver.phone')}
                        placeholder="e.g. +91 9843902041"
                        className="w-full rounded-lg border-2 border-slate-200 bg-white pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="receiverEmail"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        id="receiverEmail"
                        type="email"
                        {...register('receiver.email')}
                        placeholder="e.g. recipient@email.com"
                        className="w-full rounded-lg border-2 border-slate-200 bg-white pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                      />
                    </div>
                    {errors.receiver?.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.receiver.email.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Shipment Information Section */}
            <div className="pt-6 border-t-2 border-slate-200">
              <div className="mb-6 flex items-center gap-2">
                <div className="rounded-lg bg-primary p-2">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Shipment Information</h2>
              </div>

            {/* Current Location */}
            <div>
              <label
                htmlFor="currentLocation"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Current Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  id="currentLocation"
                  {...register('currentLocation.city', {
                    setValueAs: (value) => value || undefined,
                  })}
                  placeholder="e.g. Mumbai, MH"
                  onChange={(e) => {
                    setValue('currentLocation', { city: e.target.value })
                  }}
                  className="w-full rounded-lg border-2 border-slate-200 bg-white pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                />
              </div>
            </div>

            {/* Package & Type of Shipment */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="package"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Package
                </label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    id="package"
                    {...register('package')}
                    placeholder="e.g. Household Items"
                    className="w-full rounded-lg border-2 border-slate-200 bg-white pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="typeOfShipment"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Type of Shipment
                </label>
                <div className="relative">
                  <ShoppingCart className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    id="typeOfShipment"
                    {...register('typeOfShipment')}
                    placeholder="e.g. Express / Standard"
                    className="w-full rounded-lg border-2 border-slate-200 bg-white pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Weight, Quantity, Total Freight */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div>
                <label
                  htmlFor="weight"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Weight
                </label>
                <div className="relative">
                  <Weight className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    id="weight"
                    {...register('weight')}
                    placeholder="e.g. 25 kg"
                    className="w-full rounded-lg border-2 border-slate-200 bg-white pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="quantity"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Quantity
                </label>
                <div className="relative">
                  <ShoppingCart className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    id="quantity"
                    {...register('quantity')}
                    placeholder="e.g. 10"
                    className="w-full rounded-lg border-2 border-slate-200 bg-white pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="totalFreight"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Total Freight
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    id="totalFreight"
                    {...register('totalFreight')}
                    placeholder="e.g. ₹ 5,500"
                    className="w-full rounded-lg border-2 border-slate-200 bg-white pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Product & Comment */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="product"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Product
                </label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    id="product"
                    {...register('product')}
                    placeholder="e.g. Electronics"
                    className="w-full rounded-lg border-2 border-slate-200 bg-white pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="comment"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Comment
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                  <input
                    id="comment"
                    {...register('comment')}
                    placeholder="Additional notes (optional)"
                    className="w-full rounded-lg border-2 border-slate-200 bg-white pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Pickup Date/Time & Estimated Delivery */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="pickupTime"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Pickup Date/Time
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    id="pickupTime"
                    type="datetime-local"
                    {...register('pickupTime')}
                    value={watch('pickupTime') || ''}
                    className="w-full rounded-lg border-2 border-slate-200 bg-white pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="estimatedDelivery"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Estimated Delivery
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    id="estimatedDelivery"
                    type="datetime-local"
                    {...register('estimatedDelivery')}
                    value={watch('estimatedDelivery') || ''}
                    className="w-full rounded-lg border-2 border-slate-200 bg-white pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                  />
                </div>
              </div>
            </div>
            </div>

            {/* Shipment History Section */}
            <div className="pt-6 border-t-2 border-slate-200">
              <div className="mb-6 flex items-center gap-2">
                <div className="rounded-lg bg-amber-400 p-2">
                  <History className="h-5 w-5 text-slate-900" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Shipment History</h2>
              </div>

              {/* Existing History Entries */}
              {watch('history') && watch('history')!.length > 0 && (
                <div className="mb-6 space-y-4">
                  {watch('history')!.map((entry, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border-2 border-slate-200 bg-white p-4"
                    >
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-semibold text-slate-600">Date:</span>
                          <span className="ml-2 text-slate-800">
                            {new Date(entry.time).toLocaleDateString('en-IN')}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-600">Time:</span>
                          <span className="ml-2 text-slate-800">
                            {new Date(entry.time).toLocaleTimeString('en-IN', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-600">Location:</span>
                          <span className="ml-2 text-slate-800">{entry.location}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-600">Status:</span>
                          <span className="ml-2 text-slate-800">{entry.status}</span>
                        </div>
                        {(entry as any).updatedBy && (
                          <div>
                            <span className="font-semibold text-slate-600">Updated By:</span>
                            <span className="ml-2 text-slate-800">{(entry as any).updatedBy}</span>
                          </div>
                        )}
                        {(entry as any).remarks && (
                          <div className="col-span-2">
                            <span className="font-semibold text-slate-600">Remarks:</span>
                            <span className="ml-2 text-slate-800">{(entry as any).remarks}</span>
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeHistoryEntry(idx)}
                        className="mt-3 flex items-center gap-1 text-sm text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add New History Entry */}
              <div className="rounded-lg border-2 border-slate-200 bg-slate-50 p-6">
                <h3 className="mb-4 text-lg font-semibold text-slate-900">Add History Entry</h3>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Date/Time <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="datetime-local"
                        value={newHistoryEntry.time}
                        onChange={(e) =>
                          setNewHistoryEntry({ ...newHistoryEntry, time: e.target.value })
                        }
                        className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Status <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={newHistoryEntry.status}
                        onChange={(e) =>
                          setNewHistoryEntry({ ...newHistoryEntry, status: e.target.value })
                        }
                        className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                      >
                        <option value="">Select Status</option>
                        {statusOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="text"
                        value={newHistoryEntry.location}
                        onChange={(e) =>
                          setNewHistoryEntry({ ...newHistoryEntry, location: e.target.value })
                        }
                        placeholder="e.g. Mumbai, MH"
                        className="w-full rounded-lg border-2 border-slate-200 bg-white pl-10 pr-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Updated By
                      </label>
                      <input
                        type="text"
                        value={newHistoryEntry.updatedBy}
                        onChange={(e) =>
                          setNewHistoryEntry({ ...newHistoryEntry, updatedBy: e.target.value })
                        }
                        placeholder="e.g. admin"
                        className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Remarks
                      </label>
                      <input
                        type="text"
                        value={newHistoryEntry.remarks}
                        onChange={(e) =>
                          setNewHistoryEntry({ ...newHistoryEntry, remarks: e.target.value })
                        }
                        placeholder="Additional notes"
                        className="w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-3 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addHistoryEntry}
                    className="flex items-center gap-2 rounded-lg bg-amber-400 px-6 py-2.5 font-semibold text-slate-900 transition-all hover:bg-amber-500"
                  >
                    <Plus className="h-5 w-5" />
                    Add History Entry
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 border-t border-slate-200 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Package className="h-5 w-5" />
                    <span>Save Shipment</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin/shipments')}
                className="flex items-center justify-center gap-2 rounded-lg border-2 border-slate-300 bg-white px-8 py-3.5 font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50"
              >
                <Clock className="h-5 w-5" />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
