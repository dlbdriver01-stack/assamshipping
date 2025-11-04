'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TrackingSearchBar() {
  const [id, setId] = useState('')
  const router = useRouter()
  return (
    <form className="flex gap-2" onSubmit={(e)=>{ e.preventDefault(); if (id) router.push(`/track/${id}`) }}>
      <input value={id} onChange={(e)=>setId(e.target.value)} placeholder="Enter tracking ID (e.g. IN2458901)" className="border rounded px-3 py-2 w-72" />
      <button className="bg-accent text-white px-4 py-2 rounded">Track</button>
    </form>
  )
}
