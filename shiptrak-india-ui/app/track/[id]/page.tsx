import { adminDb } from '../../lib/firebase-admin'
import ShipmentDetailsCard from '../../components/ShipmentDetailsCard'
import ShipmentTimeline from '../../components/ShipmentTimeline'
import MapPreview from '../../components/MapPreview'

export async function generateMetadata({ params }: { params: { id: string }}) {
  return { title: `Track ${params.id} | ShipTrak India`, description: `Track ${params.id} across India in real time.` }
}

export default async function Track({ params }: { params: { id: string }}) {
  // Note: adminDb requires server credentials. For demo, the page will attempt to read if admin SDK available.
  let data = null
  try {
    const doc = await adminDb.collection('shipments').doc(params.id).get()
    if (doc.exists) data = doc.data()
  } catch (e) {
    // fallback: blank
    data = null
  }

  if (!data) {
    return <main className="p-6 max-w-4xl mx-auto"><h2 className="text-xl font-semibold">Shipment not found</h2></main>
  }

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tracking {params.id}</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <ShipmentDetailsCard shipment={data} />
          <ShipmentTimeline history={data.history || []} />
        </div>
        <div>
          <MapPreview location={data.currentLocation} />
        </div>
      </div>
    </main>
  )
}
