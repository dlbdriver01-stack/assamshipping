'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [firebaseReady, setFirebaseReady] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if Firebase is properly configured
    if (typeof window !== 'undefined') {
      const checkFirebase = async () => {
        try {
          const { auth } = await import('@/lib/firebase')
          const { onAuthStateChanged } = await import('firebase/auth')
          
          // Test if Firebase is initialized
          if (auth) {
            setFirebaseReady(true)
            
            // Redirect if already logged in
            const unsubscribe = onAuthStateChanged(auth, (user) => {
              if (user) {
                router.push('/admin/shipments')
              }
            })
            return () => unsubscribe()
          }
        } catch (err: any) {
          console.error('Firebase initialization error:', err)
          setError('Firebase is not properly configured. Please check your environment variables.')
          setFirebaseReady(false)
        }
      }
      checkFirebase()
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (typeof window !== 'undefined') {
        const { signInWithEmailAndPassword } = await import('firebase/auth')
        const { auth } = await import('@/lib/firebase')
        
        if (!auth) {
          throw new Error('Firebase Auth is not initialized')
        }
        
        await signInWithEmailAndPassword(auth, email, password)
        router.push('/admin/shipments')
      }
    } catch (err: any) {
      console.error('Login error:', err)
      let errorMessage = 'Failed to sign in. Please check your credentials.'
      
      if (err.code === 'auth/invalid-api-key') {
        errorMessage = 'Firebase API key is invalid. Please check your environment variables (NEXT_PUBLIC_FIREBASE_API_KEY).'
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password.'
      } else if (err.message) {
        errorMessage = err.message
      }
      
      setError(errorMessage)
      setLoading(false)
    }
  }

  if (!firebaseReady && !error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-medium">Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Login</h1>
            <p className="text-slate-600">ASSAM PACKER SAND MOVERS</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@assam.com"
                  className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !firebaseReady}
              className="w-full px-6 py-4 bg-gradient-to-r from-primary to-primary/90 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200">
            <Link 
              href="/" 
              className="block text-center text-sm text-slate-600 hover:text-primary transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
