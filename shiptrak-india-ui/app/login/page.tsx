'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('admin@shiptrak.in')
  const [password, setPassword] = useState('password123')
  const router = useRouter()

  async function submit(e: any) {
    e.preventDefault()
    const auth = getAuth()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/admin')
    } catch (err) {
      alert('Login failed')
    }
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border p-2 rounded" />
        <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full border p-2 rounded" />
        <button className="px-4 py-2 bg-primary text-white rounded">Sign in</button>
      </form>
    </main>
  )
}
