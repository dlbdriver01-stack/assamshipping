'use client'
import TrackingSearchBar from '../components/TrackingSearchBar'
import ImpactTrustSection from '../components/ImpactTrustSection'
import PublicNav from '../components/PublicNav'
import { motion } from 'framer-motion'
import { Package, MapPin, Clock, Shield, Truck, Warehouse, Users, Award } from 'lucide-react'

export default function Home() {
  return (
    <>
      <PublicNav />
      <main className="min-h-screen">
        {/* Hero Section with Real Industry Photo Background */}
        <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden">
          {/* Background Image - Real logistics/warehouse photo */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-800/75 to-slate-900/85"></div>
          </div>

          {/* Content Overlay */}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 z-10">
            <div className="max-w-3xl">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-white"
              >
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-400/20 backdrop-blur-sm text-amber-300 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-amber-400/30">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>Assam's Trusted Packing & Moving Services</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
                  Track Your{' '}
                  <span className="text-amber-400">Shipments</span>{' '}
                  Across India
                </h1>
                
                <p className="text-base sm:text-lg lg:text-xl text-slate-200 mb-6 sm:mb-8 leading-relaxed">
                  Real-time tracking, secure transportation, and reliable delivery. 
                  Professional logistics services you can trust.
                </p>
                
                <div className="mb-6 sm:mb-8">
                  <TrackingSearchBar />
                </div>
                
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <a 
                    href="#services" 
                    className="px-5 sm:px-6 py-2.5 sm:py-3 bg-amber-400 text-slate-900 font-bold rounded-lg shadow-lg hover:bg-amber-300 transition-all hover:scale-105 text-sm sm:text-base"
                  >
                    Explore Services
                  </a>
                  <a 
                    href="#about" 
                    className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white/30 hover:bg-white/20 transition-all text-sm sm:text-base"
                  >
                    Learn More
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Impact & Trust Section */}
        <ImpactTrustSection />

        {/* Services Section with Real Industry Photos */}
        <section id="services" className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">
                Our Services
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto px-4">
                Comprehensive logistics solutions for businesses and individuals across India
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Service 1 - Real Warehouse Photo */}
              <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1684695749267-233af13276d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Warehouse and storage services"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  <Warehouse className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-3 text-amber-400" />
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Warehouse & Storage</h3>
                  <p className="text-sm sm:text-base text-slate-200">Secure storage facilities with 24/7 monitoring</p>
                </div>
              </div>

              {/* Service 2 - Real Delivery Photo */}
              <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1627019866926-b6030ff785fe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                    alt="Express delivery services"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  <Truck className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-3 text-amber-400" />
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Express Delivery</h3>
                  <p className="text-sm sm:text-base text-slate-200">Fast and reliable delivery across India</p>
                </div>
              </div>

              {/* Service 3 - Real Logistics Photo */}
              <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 sm:col-span-2 lg:col-span-1">
                <div className="relative h-56 sm:h-64 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" 
                    alt="Supply chain management"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  <Package className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-3 text-amber-400" />
                  <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Supply Chain</h3>
                  <p className="text-sm sm:text-base text-slate-200">End-to-end logistics solutions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Showcase Section */}
        <section id="about" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left - Real Industry Photo */}
              <div className="relative order-2 lg:order-1">
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&q=80" 
                    alt="Professional logistics team"
                    className="w-full h-[400px] sm:h-[500px] object-cover"
                  />
                </div>
                {/* Floating Stats Card */}
                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white rounded-lg sm:rounded-xl shadow-xl p-4 sm:p-6 border-4 border-amber-400">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">99.8%</div>
                  <div className="text-xs sm:text-sm text-slate-600">On-time Delivery Rate</div>
                </div>
              </div>

              {/* Right - Content */}
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
                  Professional Logistics Services
                </h2>
                <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 leading-relaxed">
                  With years of experience in the logistics industry, we provide reliable, 
                  secure, and efficient shipping solutions across India. Our state-of-the-art 
                  facilities and professional team ensure your shipments are handled with care.
                </p>
                
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { icon: Shield, text: 'Secure & Insured Shipments' },
                    { icon: Clock, text: 'Real-time Tracking & Updates' },
                    { icon: MapPin, text: 'Nationwide Coverage' },
                    { icon: Users, text: 'Expert Logistics Team' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-slate-900" />
                      </div>
                      <span className="text-base sm:text-lg text-slate-700 font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">
                Why Choose ASSAM PACKERS AND MOVERS?
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto px-4">
                Trusted by thousands of customers across India
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: MapPin, title: 'Real-time Tracking', desc: 'Know exactly where your shipment is at any moment' },
                { icon: Clock, title: 'Fast Updates', desc: 'Get instant notifications on every status change' },
                { icon: Shield, title: 'Secure & Reliable', desc: 'Enterprise-grade security for your shipments' },
                { icon: Package, title: 'Nationwide Coverage', desc: 'Track shipments across 120+ cities in India' },
              ].map((feature, i) => (
                <div 
                  key={i}
                  className="group p-5 sm:p-6 bg-gradient-to-br from-white to-slate-50 rounded-xl sm:rounded-2xl border-2 border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary to-amber-400 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-slate-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-white py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-amber-400 p-2 rounded-lg">
                    <Package className="w-5 h-5 text-slate-900" />
                  </div>
                  <span className="font-bold text-lg">ASSAM PACKERS AND MOVERS</span>
                </div>
                <p className="text-slate-400 text-sm">
                  Professional logistics and tracking services across India.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><a href="#services" className="hover:text-amber-400 transition-colors">Warehouse & Storage</a></li>
                  <li><a href="#services" className="hover:text-amber-400 transition-colors">Express Delivery</a></li>
                  <li><a href="#services" className="hover:text-amber-400 transition-colors">Supply Chain</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><a href="#about" className="hover:text-amber-400 transition-colors">About Us</a></li>
                  <li><a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a></li>
                  <li><a href="/admin" className="hover:text-amber-400 transition-colors">Admin Portal</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><a href="/" className="hover:text-amber-400 transition-colors">Track Shipment</a></li>
                  <li><a href="#contact" className="hover:text-amber-400 transition-colors">Help Center</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
              <p>&copy; {new Date().getFullYear()} ASSAM PACKERS AND MOVERS. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
