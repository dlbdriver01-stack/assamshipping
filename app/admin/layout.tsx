'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    // Skip auth check on admin login page (root /admin)
    if (pathname === '/admin') {
      setLoading(false)
      return
    }

    if (typeof window !== 'undefined') {
      import('firebase/auth').then(({ onAuthStateChanged }) => {
        import('@/lib/firebase').then(({ auth }) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              setAuthenticated(true)
              setLoading(false)
            } else {
              setAuthenticated(false)
              setLoading(false)
              router.push('/admin')
            }
          })
          return () => unsubscribe()
        }).catch((err) => {
          console.error('Firebase import error:', err)
          setLoading(false)
        })
      }).catch((err) => {
        console.error('Firebase auth import error:', err)
        setLoading(false)
      })
    }
  }, [router, pathname])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-primary">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-medium">Loading...</p>
        </div>
      </div>
    )
  }

  if (pathname === '/admin') {
    return <>{children}</>
  }

  if (!authenticated) {
    return null
  }

  return <>{children}</>
}

