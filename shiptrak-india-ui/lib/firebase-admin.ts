/**
 * Server-side admin SDK helper.
 * Requires serviceAccountKey.json or FIREBASE_SERVICE_ACCOUNT_KEY env var.
 */
import admin from 'firebase-admin'

if (!admin.apps.length) {
  try {
    const svc = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
    if (svc) admin.initializeApp({ credential: admin.credential.cert(JSON.parse(svc)) })
    else admin.initializeApp()
  } catch (e) {
    // fallback - admin SDK not configured
    console.warn('Firebase admin not configured:', e && e.message)
  }
}

export const adminDb = admin.firestore ? admin.firestore() : null
