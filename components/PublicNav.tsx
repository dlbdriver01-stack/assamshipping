'use client'
import Link from 'next/link'
import { Package, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function PublicNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-amber-400 border-b-4 border-amber-500 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="font-bold text-lg sm:text-xl text-slate-900">ASSAM PACKERS AND MOVERS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link href="/" className="text-slate-900 font-semibold hover:text-primary transition-colors">
              Track
            </Link>
            <Link href="#services" className="text-slate-900 font-semibold hover:text-primary transition-colors">
              Services
            </Link>
            <Link href="#about" className="text-slate-900 font-semibold hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-slate-900 font-semibold hover:text-primary transition-colors">
              Contact
            </Link>
            <Link 
              href="/admin" 
              className="px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm lg:text-base"
            >
              Admin Portal
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-900 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-amber-500">
            <Link 
              href="/" 
              className="block text-slate-900 font-semibold px-2 py-2 hover:bg-amber-300 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Track
            </Link>
            <Link 
              href="#services" 
              className="block text-slate-900 font-semibold px-2 py-2 hover:bg-amber-300 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              href="#about" 
              className="block text-slate-900 font-semibold px-2 py-2 hover:bg-amber-300 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="#contact" 
              className="block text-slate-900 font-semibold px-2 py-2 hover:bg-amber-300 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/admin" 
              className="block px-4 py-2 bg-primary text-white rounded-lg font-semibold w-fit mx-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin Portal
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}



