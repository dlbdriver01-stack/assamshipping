'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { LogOut, Package, Home } from 'lucide-react'
import Link from 'next/link'

export default function AdminNav() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('@/lib/firebase').then(({ auth }) => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          setUser(user)
        })
        return () => unsubscribe()
      }).catch((err) => {
        console.error('Firebase auth error in AdminNav:', err)
      })
    }
  }, [])

  const handleLogout = async () => {
    try {
      const { signOut } = await import('firebase/auth')
      const { auth } = await import('@/lib/firebase')
      await signOut(auth)
      router.push('/admin')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link 
              href="/admin/shipments" 
              className="flex items-center gap-2 text-slate-900 hover:text-primary transition-colors"
            >
              <Package className="w-5 h-5" />
              <span className="font-bold text-lg">ASSAM PACKER SAND MOVERS</span>
            </Link>
            <span className="text-slate-400">|</span>
            <Link 
              href="/" 
              className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors text-sm"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {user && (
              <>
                <span className="text-sm text-slate-600">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

