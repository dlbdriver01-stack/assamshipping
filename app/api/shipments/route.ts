import { ShipmentSchema } from '../../../lib/schemas/shipment'
import { adminDb } from '../../../lib/firebase-admin'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = ShipmentSchema.safeParse(body)
    if (!parsed.success) {
      return Response.json(
        { ok: false, errors: parsed.error.errors },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }
    const data = parsed.data
    const now = new Date().toISOString()
    const docRef = adminDb.collection('shipments').doc(data.trackingId)
    const existing = await docRef.get()
    const createdAt = existing.exists && (existing.data() as any)?.createdAt ? (existing.data() as any).createdAt : now
    await docRef.set(
      {
        ...data,
        createdAt,
        updatedAt: now,
      },
      { merge: true }
    )
    return Response.json(
      { ok: true, id: data.trackingId },
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return Response.json(
      { ok: false, error: String(err) },
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    const list = url.searchParams.get('list')
    
    if (list === 'true') {
      // List all shipments (for admin dashboard)
      const snapshot = await adminDb.collection('shipments')
        .orderBy('createdAt', 'desc')
        .limit(100)
        .get()
      
      const shipments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      
      return Response.json(
        { ok: true, shipments },
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    if (!id) {
      return Response.json(
        { ok: false, error: 'missing id parameter' },
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }
    
    let doc = await adminDb.collection('shipments').doc(id).get()
    if (!doc.exists) {
      // Fallback: query by trackingId field
      const query = await adminDb.collection('shipments').where('trackingId', '==', id).limit(1).get()
      if (!query.empty) {
        doc = query.docs[0]
      }
    }

    if (!doc.exists) {
      return Response.json(
        { ok: false, error: 'shipment not found' },
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const raw = doc.data() as any
    const toIso = (v: any) => (v && typeof v.toDate === 'function') ? v.toDate().toISOString() : v
    const payload = {
      ...raw,
      trackingId: raw?.trackingId || doc.id,
      pickupTime: toIso(raw?.pickupTime),
      estimatedDelivery: toIso(raw?.estimatedDelivery),
      deliveryTime: toIso(raw?.deliveryTime),
      createdAt: toIso(raw?.createdAt),
      updatedAt: toIso(raw?.updatedAt),
    }
    return Response.json(
      { ok: true, data: payload },
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return Response.json(
      { ok: false, error: String(err) },
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
