import TrackingSearchBar from '../components/TrackingSearchBar'
import HeroStats from '../components/HeroStats'
import { Metadata } from 'next'
import { Package, MapPin, Clock, Shield, ArrowRight, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'ASSAM PACKERS AND MOVERS — Professional Packing & Moving Services',
  description: 'Professional packing and moving services across Assam and India. Track your shipments in real time with secure transportation.',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                <TrendingUp className="w-4 h-4" />
                <span>Assam's Trusted Packing & Moving Services</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
                Track Your{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Shipments
                </span>{' '}
                with ASSAM PACKERS AND MOVERS
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed">
                Professional packing and moving services across Assam and India. Real-time tracking, 
                secure transportation, and reliable delivery for your belongings.
              </p>
              
              {/* Enhanced Search Bar */}
              <div className="space-y-4">
                <TrackingSearchBar />
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-green-500" />
                    Secure Tracking
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-blue-500" />
                    Real-time Updates
                  </span>
                </div>
              </div>
              
              {/* CTA Buttons */}
               <div className="flex flex-wrap gap-4">
                {/*<a 
                  href="/admin/shipments" 
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>*/   } 
                <a 
                  href="#features" 
                  className="px-6 py-3 bg-white text-slate-700 rounded-lg font-semibold border-2 border-slate-200 hover:border-primary hover:text-primary transition-all duration-200"
                >
                  Learn More
                </a>
              </div> 
            </div>
            
            {/* Right Visual */}
            <div className="relative">
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl shadow-lg flex items-center justify-center">
                  <Package className="w-10 h-10 text-white" />
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Try Live Demo</h3>
                    <p className="text-slate-600 mb-4">Enter this tracking ID to see it in action:</p>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg border border-primary/20">
                      <code className="text-primary font-mono font-bold text-lg">IN2458901</code>
                      <span className="text-xs text-slate-500">Sample ID</span>
                    </div>
                  </div>
                  
                  {/* Tracking Preview Card */}
                  <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl p-6 border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">In Transit</div>
                          <div className="text-sm text-slate-500">Mumbai → Delhi</div>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                        Active
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Current Location</span>
                        <span className="font-semibold text-slate-900">Jaipur, RJ</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">ETA</span>
                        <span className="font-semibold text-slate-900">Nov 3, 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating decoration */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Trusted Packing & Moving Services in Assam
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Professional relocation services with exceptional reliability, security, and transparency
            </p>
        </div>
        <HeroStats />
      </section>

      {/* Features Section */}
      <section className="bg-white border-t border-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Choose ASSAM PACKERS AND MOVERS?
            </h2>
            <p className="text-lg text-slate-600">Professional packing, moving, and tracking services</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MapPin, title: 'Real-time Tracking', desc: 'Know exactly where your shipment is at any moment' },
              { icon: Clock, title: 'Fast Updates', desc: 'Get instant notifications on every status change' },
              { icon: Shield, title: 'Secure & Reliable', desc: 'Enterprise-grade security for your shipments' },
              { icon: Package, title: 'Nationwide Coverage', desc: 'Track shipments across 120+ cities in India' },
            ].map((feature, i) => (
              <div 
                key={i}
                className="group p-6 bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 hover:border-primary hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
