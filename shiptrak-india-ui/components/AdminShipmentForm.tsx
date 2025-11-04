'use client'
import { useState } from 'react'

export default function AdminShipmentForm({ trackingId }: { trackingId?: string }) {
  const [form, setForm] = useState<any>({
    trackingId: trackingId || '',
    shipper: { name: '', address: '' },
    receiver: { name: '', address: '' },
    status: 'PICKED_UP',
    estimatedDelivery: ''
  })

  const submit = async () => {
    const res = await fetch('/api/shipments', { method: 'POST', body: JSON.stringify(form), headers: { 'Content-Type': 'application/json' } })
    if (res.ok) alert('Created')
    else alert('Error')
  }

  return (
    <div className="space-y-3">
      <input value={form.trackingId} onChange={(e)=>setForm({...form, trackingId: e.target.value})} placeholder="Tracking ID" className="w-full border p-2 rounded" />
      <input value={form.shipper.name} onChange={(e)=>setForm({...form, shipper: {...form.shipper, name: e.target.value}})} placeholder="Shipper name" className="w-full border p-2 rounded" />
      <input value={form.receiver.name} onChange={(e)=>setForm({...form, receiver: {...form.receiver, name: e.target.value}})} placeholder="Receiver name" className="w-full border p-2 rounded" />
      <input value={form.estimatedDelivery} onChange={(e)=>setForm({...form, estimatedDelivery: e.target.value})} placeholder="Estimated delivery" className="w-full border p-2 rounded" />
      <div className="flex gap-2">
        <button onClick={submit} className="px-4 py-2 bg-primary text-white rounded">Save</button>
      </div>
    </div>
  )
}
