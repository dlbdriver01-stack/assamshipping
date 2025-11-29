import { adminDb } from '../../../lib/firebase-admin'
import ShipmentDetailsCard from '../../../components/ShipmentDetailsCard'
import ShipmentTimeline from '../../../components/ShipmentTimeline'
import PublicNav from '../../../components/PublicNav'
import { Metadata } from 'next'
import { Package, ArrowLeft, ChevronRight, Printer } from 'lucide-react'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  return { 
    title: `Track ${id} | ASSAM PACKERS AND MOVERS`, 
    description: `Track ${id} with ASSAM PACKERS AND MOVERS. Real-time tracking for your shipment.` 
  }
}

export default async function TrackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let data: any = null
  try {
    console.log('Fetching shipment:', id)
    let doc = await adminDb.collection('shipments').doc(id).get()
    
    if (!doc.exists) {
      const querySnapshot = await adminDb.collection('shipments')
        .where('trackingId', '==', id)
        .limit(1)
        .get()
      
      if (!querySnapshot.empty) {
        doc = querySnapshot.docs[0]
      }
    }
    
    if (doc.exists) {
      data = { ...doc.data(), id: doc.id }
    }
  } catch (e) {
    console.error('Error fetching shipment:', e)
    data = null
  }

  if (!data) {
    return (
      <>
        <PublicNav />
        <main className="min-h-screen bg-white">
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="border border-slate-200 bg-white">
              <div className="border-b border-slate-200 bg-slate-50 px-8 py-6">
                <h1 className="text-2xl font-semibold text-slate-900">Shipment Tracking</h1>
              </div>
              <div className="p-12 text-center">
                <div className="w-16 h-16 border-2 border-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="w-8 h-8 text-slate-400" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900 mb-3">Shipment Not Found</h2>
                <p className="text-slate-600 mb-2 text-sm">The tracking number</p>
                <p className="font-mono font-medium text-slate-900 text-base mb-4 tracking-wider">{id}</p>
                <p className="text-slate-500 text-sm mb-8">could not be found in our system.</p>
                <Link 
                  href="/" 
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <PublicNav />
      <main className="min-h-screen bg-slate-50">
        {/* Professional Header */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center gap-3 text-sm text-slate-600 mb-4">
              <Link href="/" className="hover:text-slate-900">Home</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-900">Track Shipment</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900 mb-1">Shipment Tracking</h1>
                <p className="text-sm text-slate-600">Tracking Number: <span className="font-mono text-slate-900">{id}</span></p>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={`/api/shipments/${encodeURIComponent(id)}/pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Download PDF Receipt</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="space-y-6">
            <ShipmentDetailsCard shipment={data} />
            <ShipmentTimeline history={data.history || []} />
          </div>
        </div>
      </main>
    </>
  )
}
