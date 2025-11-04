import Link from 'next/link'

export default function ShipmentsPage() {
  return (
    <main>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Shipments</h1>
        <Link href="/admin/shipments/new" className="px-3 py-2 bg-primary text-white rounded">Add Shipment</Link>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-slate-600">Table placeholder. Implement Firestore list and filters.</p>
      </div>
    </main>
  )
}
