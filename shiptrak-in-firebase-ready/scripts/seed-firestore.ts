/**
 * Seed Firestore with sample shipments and users.
 *
 * Usage:
 * 1) Place your service account JSON at project root named "serviceAccountKey.json"
 *    OR set FIREBASE_SERVICE_ACCOUNT_KEY env var to the JSON string.
 * 2) npm install firebase-admin ts-node
 * 3) npx ts-node scripts/seed-firestore.ts
 */

import fs from 'fs'
import admin from 'firebase-admin'
import path from 'path'

const servicePath = path.resolve(process.cwd(), 'serviceAccountKey.json')
let serviceAccount: any = null

if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  } catch (e) {
    console.error('FIREBASE_SERVICE_ACCOUNT_KEY is not valid JSON')
    process.exit(1)
  }
} else if (fs.existsSync(servicePath)) {
  serviceAccount = JSON.parse(fs.readFileSync(servicePath, 'utf-8'))
} else {
  console.error('Missing service account. Provide serviceAccountKey.json or set FIREBASE_SERVICE_ACCOUNT_KEY env var.')
  process.exit(1)
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

async function seedCollection(filePath: string, collection: string, idField?: string) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  for (const doc of data) {
    const docId = idField ? doc[idField] : doc.uid || (collection === 'shipments' ? doc.trackingId : undefined)
    if (!docId) {
      console.warn('Skipping document without id:', doc)
      continue
    }
    await db.collection(collection).doc(String(docId)).set(doc)
    console.log('Seeded', collection, docId)
  }
}

async function main() {
  const base = path.resolve(process.cwd(), 'data')
  await seedCollection(path.join(base, 'shipments_seed.json'), 'shipments', 'trackingId')
  await seedCollection(path.join(base, 'users_seed.json'), 'users', 'uid')
  console.log('Seeding complete.')
  process.exit(0)
}

main().catch((e)=>{ console.error(e); process.exit(1) })
