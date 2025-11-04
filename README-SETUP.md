# Setup Instructions - ASSAM PACKER SAND MOVERS

## Environment Variables Setup

Create a `.env.local` file in the root directory with these values from your Firebase project:

```env
# Firebase Configuration (Client) - set from your Firebase Console
NEXT_PUBLIC_FIREBASE_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID=YOUR_APP_ID

# Firebase Admin (Server-side) - paste the JSON content or Base64 of your service account
# Prefer using Base64 to avoid escaping issues:
# FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account",...}
# or
# FIREBASE_SERVICE_ACCOUNT_KEY_BASE64=BASE64_ENCODED_JSON

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://assampackersandmovers.com
```

## Admin Login

- **URL**: `http://localhost:3000/admin`
- **Email**: `admin@assam.com`
- **Password**: `admin@123##`

Make sure the admin user exists in Firebase Authentication console.

## Running the Project

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:3000`


