import admin from 'firebase-admin'
import fs from 'fs'
import path from 'path'

if (!admin.apps.length) {
  // Try to load from file first, then from env
  const serviceAccountPath = path.resolve(process.cwd(), 'serviceAccountKey.json')
  let serviceAccount: any = null

  if (fs.existsSync(serviceAccountPath)) {
    serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'))
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    } catch (e) {
      console.error('FIREBASE_SERVICE_ACCOUNT_KEY is not valid JSON')
    }
  }

  if (serviceAccount) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      })
      console.log('Firebase Admin initialized successfully')
    } catch (error) {
      console.error('Firebase Admin initialization error:', error)
      admin.initializeApp()
    }
  } else {
    // Running without admin credentials (emulator or limited)
    console.warn('Firebase Admin: No service account found. Some features may not work.')
    try {
      admin.initializeApp()
    } catch (error) {
      console.error('Firebase Admin fallback initialization error:', error)
    }
  }
}
export const adminDb = admin.firestore()
export const adminAuth = admin.auth()
