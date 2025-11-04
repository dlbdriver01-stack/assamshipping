import { ShipmentSchema } from '../../lib/schemas/shipment'
import { adminDb } from '../../lib/firebase-admin'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const res = ShipmentSchema.safeParse(body)
    if (!res.success) return new Response(JSON.stringify({ ok:false, errors: res.error.errors }), { status:400 })
    const data = res.data
    if (adminDb) {
      await adminDb.collection('shipments').doc(data.trackingId).set({ ...data, createdAt: new Date().toISOString() })
      return new Response(JSON.stringify({ ok:true }), { status:201 })
    }
    return new Response(JSON.stringify({ ok:false, error: 'adminDb not configured' }), { status:500 })
  } catch (e) {
    return new Response(JSON.stringify({ ok:false, error: String(e) }), { status:500 })
  }
}
