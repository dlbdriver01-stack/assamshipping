# ASSAM PACKER SAND MOVERS

Professional packing and moving services with real-time shipment tracking. A full-stack, SEO-optimized platform built with Next.js 16, TypeScript, Firebase Firestore, and TailwindCSS.

## 🚀 Features

- **Public Tracking**: Search and view shipment status using unique Tracking IDs
- **Admin Dashboard**: Create, update, and manage shipments
- **Real-time Updates**: Live tracking using Firebase Firestore
- **SEO Optimized**: Server-side rendering with metadata and structured data
- **Modern UI**: Built with TailwindCSS and shadcn/ui components
- **Type Safe**: Full TypeScript with Zod validation

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Validation**: Zod
- **Forms**: React Hook Form
- **Testing**: Vitest

## 📋 Prerequisites

- Node.js 20+ 
- npm or yarn
- Firebase project with Firestore enabled
- Firebase service account key

## 🔧 Setup Instructions

### 1. Clone and Install

```bash
git clone <repository-url>
cd shiptrak-india
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

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

# Optional: Mapbox for route visualization
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

### 3. Admin Login

- **URL**: `http://localhost:3000/admin`
- **Email**: `admin@assam.com`
- **Password**: `admin@123##`

Make sure the admin user exists in Firebase Authentication console.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### 5. Seed Firestore Data (Optional)

```bash
node -r ts-node/register scripts/seed-firestore.ts
```

## 📁 Project Structure

```
shiptrak-india/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   ├── track/             # Public tracking pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...                # Feature components
├── lib/                   # Utilities and configurations
│   ├── firebase.ts       # Firebase client setup
│   ├── firebase-admin.ts # Firebase admin setup
│   ├── schemas/          # Zod validation schemas
│   └── utils.ts          # Utility functions
├── config/               # Configuration files
├── data/                 # Seed data
├── scripts/              # Build and seed scripts
└── tests/                # Test files
```

## 🧪 Testing

Run tests with:

```bash
npm run test
```

## 🏗️ Build

Build for production:

```bash
npm run build
npm start
```

## 📚 Documentation

- Architecture and API specifications are documented in the codebase
- For deployment instructions, refer to your hosting provider's documentation

## 🌐 Deployment

Deploy to Vercel:

```bash
vercel --prod
```

Make sure to set all environment variables in your Vercel project settings.

## 📄 License

MIT

## 🤝 Contributing

Please follow standard Next.js and React best practices when contributing to this project.
