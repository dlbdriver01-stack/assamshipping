import Link from 'next/link'
import { Metadata } from 'next'
import AdminShipmentTable from '../../../components/AdminShipmentTable'

export const metadata: Metadata = {
  title: 'Admin — Shipments Management',
  description: 'Manage and track all shipments',
  robots: {
    index: false,
    follow: false,
  },
}

import AdminNav from '../../../components/AdminNav'

export default function AdminShipments() {
  return (
    <>
      <AdminNav />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8">
        <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Shipments Management</h1>
            <p className="text-slate-600">Manage and track all shipments</p>
          </div>
          <Link 
            href="/admin/shipments/new" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <span>+</span> Add Shipment
          </Link>
        </div>
        <AdminShipmentTable />
        </div>
      </main>
    </>
  )
}
