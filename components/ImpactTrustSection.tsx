'use client'
import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Package, Clock, MapPin } from 'lucide-react'

interface AnimatedNumberProps {
  value: string
  suffix?: string
  prefix?: string
  delay?: number
}

function AnimatedNumber({ value, suffix = '', prefix = '', delay = 0 }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState('0')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return

    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''))
    const hasDecimal = value.includes('.')
    const duration = 2000
    const steps = 60
    const increment = numericValue / steps
    let current = 0

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        current += increment
        if (current >= numericValue) {
          setDisplayValue(value.replace(/[0-9.]+/, hasDecimal ? numericValue.toFixed(1) : Math.floor(numericValue).toString()))
          clearInterval(interval)
        } else {
          setDisplayValue(value.replace(/[0-9.]+/, hasDecimal ? current.toFixed(1) : Math.floor(current).toString()))
        }
      }, duration / steps)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [isInView, value, delay])

  return (
    <span ref={ref}>
      {prefix}{displayValue}{suffix}
    </span>
  )
}

interface StatCardProps {
  value: string
  label: string
  icon: React.ElementType
  delay: number
  suffix?: string
}

function StatCard({ value, label, icon: Icon, delay, suffix = '' }: StatCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05, 
        y: -5,
        transition: { duration: 0.3 }
      }}
      className="group relative"
    >
      {/* Glowing background effect on hover */}
      <div className="absolute inset-0 bg-white/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
      
      {/* Main glassmorphism card */}
      <div className="relative bg-white/10 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/20 text-center overflow-hidden shadow-xl">
        {/* Subtle gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: delay + 0.3 }}
        />
        
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: '-100%' }}
          animate={isInView ? { x: '200%' } : { x: '-100%' }}
          transition={{ 
            duration: 2, 
            delay: delay + 0.5,
            repeat: Infinity,
            repeatDelay: 3
          }}
        />

        {/* Icon with animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ 
            duration: 0.6, 
            delay: delay + 0.2,
            type: "spring",
            stiffness: 200
          }}
          className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-white/20 rounded-2xl mb-4 backdrop-blur-sm border border-white/30"
        >
          <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
        </motion.div>

        {/* Animated number */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.4 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-3 tracking-tight"
        >
          <AnimatedNumber 
            value={value} 
            suffix={suffix}
            delay={delay + 0.6}
          />
        </motion.h3>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: delay + 0.8 }}
          className="text-white/90 text-base sm:text-lg font-medium relative z-10"
        >
          {label}
        </motion.p>

        {/* Decorative particles */}
        <motion.div
          className="absolute top-3 right-3 w-2 h-2 bg-white/40 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: delay,
          }}
        />
        <motion.div
          className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-white/30 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: delay + 0.5,
          }}
        />
      </div>
    </motion.div>
  )
}

// Brand logo placeholder component
function BrandLogo({ name }: { name: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -2 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-center h-12 sm:h-16 px-4 sm:px-6"
    >
      <span className="text-white/60 text-sm sm:text-base font-semibold tracking-wide">
        {name}
      </span>
    </motion.div>
  )
}

export default function ImpactTrustSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const stats = [
    {
      value: '1.2',
      label: 'Shipments Tracked',
      icon: Package,
      suffix: 'M+',
    },
    {
      value: '99.8',
      label: 'On-time Deliveries',
      icon: Clock,
      suffix: '%',
    },
    {
      value: '120',
      label: 'Cities Covered',
      icon: MapPin,
      suffix: '+',
    },
  ]

  const brands = ['Amazon', 'Flipkart', 'Myntra', 'DHL', 'BigBasket', 'Reliance Retail']

  return (
    <section 
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-24 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #062A4D 0%, #0B3A63 100%)',
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glowing dots */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/5 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Subtle network lines */}
        <svg className="absolute inset-0 w-full h-full opacity-5" aria-hidden="true">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight">
            Delivering Trust, Speed & Scale Across India
          </h2>
          
          {/* Yellow accent divider */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="w-20 h-1 bg-amber-400 rounded-full"></div>
          </div>
          
          <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Over 500+ companies rely on us every day for secure, on-time deliveries.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              value={stat.value}
              label={stat.label}
              icon={stat.icon}
              delay={index * 0.2}
              suffix={stat.suffix}
            />
          ))}
        </div>

        {/* Trust Logos Strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative"
        >
          {/* Label */}
          <p className="text-center text-white/70 text-sm sm:text-base font-medium mb-6 sm:mb-8">
            Trusted by 500+ companies across India
          </p>

          {/* Logos container */}
          <div className="relative bg-black/20 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-12">
              {brands.map((brand, index) => (
                <motion.div
                  key={brand}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                >
                  <BrandLogo name={brand} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

