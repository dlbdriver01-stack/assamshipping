import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getFirestore, Firestore } from 'firebase/firestore'
import { getAuth, Auth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Validate configuration
if (!firebaseConfig.apiKey) {
  console.error('⚠️ Firebase API key is missing! Please set NEXT_PUBLIC_FIREBASE_API_KEY in your .env.local file')
}
if (!firebaseConfig.projectId) {
  console.error('⚠️ Firebase Project ID is missing! Please set NEXT_PUBLIC_FIREBASE_PROJECT_ID in your .env.local file')
}

// Initialize Firebase
let app: FirebaseApp
if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig)
    console.log('✓ Firebase initialized successfully')
  } catch (error) {
    console.error('❌ Firebase initialization error:', error)
    throw error
  }
} else {
  app = getApps()[0]
}

export const db: Firestore = getFirestore(app)
export const auth: Auth = getAuth(app)
