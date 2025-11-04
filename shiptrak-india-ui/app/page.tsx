import TrackingSearchBar from '../components/TrackingSearchBar'
import HeroStats from '../components/HeroStats'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-r from-white to-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-primary mb-4">
              Smart, Transparent & Reliable Shipping for India
            </h1>
            <p className="text-lg text-slate-600 mb-6">
              Track your parcel anywhere across India. Real-time updates, estimated delivery, and support at every step.
            </p>
            <div className="mb-6">
              <TrackingSearchBar />
            </div>
            <div className="flex gap-3">
              <a className="px-4 py-2 bg-primary text-white rounded shadow">Get Started</a>
              <a className="px-4 py-2 border rounded">Learn More</a>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}>
            <div className="p-6 bg-white rounded-2xl shadow-lg">
              <h3 className="font-semibold mb-3">Live Demo</h3>
              <p className="text-sm text-slate-500">Enter sample tracking ID: <code className="bg-slate-100 px-2 py-1 rounded">IN2458901</code></p>
              <div className="mt-4">
                <img src="/og-image.png" alt="illustration" className="w-full rounded" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <HeroStats />
      </section>
    </main>
  )
}
