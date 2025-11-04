// Run with: npx tsx scripts/seed-firestore.ts
import fs from 'fs'
import admin from 'firebase-admin'
import path from 'path'

// Try to load service account from file first, then from env
const serviceAccountPath = path.resolve(process.cwd(), 'serviceAccountKey.json')
let serviceAccount: any = null

if (fs.existsSync(serviceAccountPath)) {
  serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'))
  console.log('Loaded service account from file')
} else if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    console.log('Loaded service account from env')
  } catch (e) {
    console.error('FIREBASE_SERVICE_ACCOUNT_KEY is not valid JSON')
    process.exit(1)
  }
} else {
  console.error('Missing service account. Provide serviceAccountKey.json or set FIREBASE_SERVICE_ACCOUNT_KEY env var.')
  process.exit(1)
}

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
const db = admin.firestore()

async function seed() {
  const data = JSON.parse(fs.readFileSync('./data/shipments_seed.json', 'utf-8'))
  for (const s of data) {
    await db.collection('shipments').doc(s.trackingId).set({
      ...s,
      createdAt: s.createdAt || new Date().toISOString(),
      updatedAt: s.updatedAt || new Date().toISOString(),
    })
    console.log('Seeded', s.trackingId)
  }
  console.log('Done seeding', data.length, 'shipments')
}
seed().then(()=>{ console.log('Done'); process.exit(0) }).catch(e=>{ console.error(e); process.exit(1) })
