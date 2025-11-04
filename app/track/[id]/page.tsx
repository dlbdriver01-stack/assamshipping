import { adminDb } from '../../../lib/firebase-admin'
import ShipmentDetailsCard from '../../../components/ShipmentDetailsCard'
import ShipmentTimeline from '../../../components/ShipmentTimeline'
import MapPreview from '../../../components/MapPreview'
import { Metadata } from 'next'

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
    // First try to find by document ID (trackingId as doc ID)
    let doc = await adminDb.collection('shipments').doc(id).get()
    
    // If not found by document ID, try querying by trackingId field
    if (!doc.exists) {
      console.log('Not found by doc ID, querying by trackingId field...')
      const querySnapshot = await adminDb.collection('shipments')
        .where('trackingId', '==', id)
        .limit(1)
        .get()
      
      if (!querySnapshot.empty) {
        doc = querySnapshot.docs[0]
        console.log('Found by trackingId field')
      }
    }
    
    if (doc.exists) {
      data = { ...doc.data(), id: doc.id }
      console.log('Shipment data:', data)
    } else {
      console.log('Shipment not found with ID:', id)
    }
  } catch (e) {
    console.error('Error fetching shipment:', e)
    data = null
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-12 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">❌</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Shipment Not Found</h2>
            <p className="text-lg text-slate-600 mb-6">
              The tracking ID <span className="font-mono font-semibold text-primary">{id}</span> could not be found.
            </p>
            <p className="text-slate-500 mb-8">Please verify the tracking ID and try again.</p>
            <a 
              href="/" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <a 
              href="/" 
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-700 font-medium"
            >
              ← Back
            </a>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2">
            Tracking: <span className="text-primary font-mono">{id}</span>
          </h1>
          <p className="text-lg text-slate-600">Real-time shipment tracking with ASSAM PACKERS AND MOVERS</p>
        </div>
        
        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ShipmentDetailsCard shipment={data} />
            <ShipmentTimeline history={data.history || []} />
          </div>
          <div className="lg:col-span-1">
            <MapPreview location={data.currentLocation} />
          </div>
        </div>
      </div>
    </main>
  )
}
