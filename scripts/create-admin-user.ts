/**
 * Script to create admin user in Firebase Auth
 * Run with: npx tsx scripts/create-admin-user.ts
 */

import { initializeApp, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import * as fs from 'fs'
import * as path from 'path'

// Load service account key
let serviceAccount
try {
  const keyPath = path.join(process.cwd(), 'serviceAccountKey.json')
  if (fs.existsSync(keyPath)) {
    serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'))
    console.log('✓ Loaded service account from file')
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
    console.log('✓ Loaded service account from environment')
  } else {
    throw new Error('No service account key found')
  }
} catch (error) {
  console.error('Error loading service account:', error)
  process.exit(1)
}

// Initialize Firebase Admin
if (!initializeApp.length) {
  initializeApp({
    credential: cert(serviceAccount),
  })
  console.log('✓ Firebase Admin initialized')
}

const auth = getAuth()

async function createAdminUser() {
  const email = 'admin@assam.com'
  const password = 'admin@123##'
  
  try {
    // Check if user already exists
    let user
    try {
      user = await auth.getUserByEmail(email)
      console.log(`User ${email} already exists`)
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        // User doesn't exist, create it
        user = await auth.createUser({
          email,
          password,
          emailVerified: true,
          disabled: false,
        })
        console.log(`✓ Created admin user: ${email}`)
      } else {
        throw error
      }
    }

    // Set custom claims for admin role
    await auth.setCustomUserClaims(user.uid, {
      admin: true,
      role: 'admin',
    })
    console.log(`✓ Set admin role for user: ${email}`)
    
    console.log('\n✅ Admin user setup complete!')
    console.log(`Email: ${email}`)
    console.log(`Password: ${password}`)
    console.log('\nYou can now login at /admin/login')
    
  } catch (error) {
    console.error('Error creating admin user:', error)
    process.exit(1)
  }
}

createAdminUser()

