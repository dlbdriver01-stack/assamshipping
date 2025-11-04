import { TrendingUp, Clock, MapPin } from 'lucide-react'

export default function HeroStats() {
  const stats = [
    { 
      value: '1.2M+', 
      label: 'Shipments Tracked', 
      icon: TrendingUp,
      gradient: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50'
    },
    { 
      value: '99.8%', 
      label: 'On-time Deliveries', 
      icon: Clock,
      gradient: 'from-green-500 to-green-600',
      bg: 'bg-green-50'
    },
    { 
      value: '120+', 
      label: 'Cities Covered', 
      icon: MapPin,
      gradient: 'from-primary to-primary/90',
      bg: 'bg-primary/10'
    },
  ]
  
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <div 
          key={i}
          className="group relative overflow-hidden bg-white rounded-2xl p-8 border border-slate-200 hover:border-primary hover:shadow-xl transition-all duration-300"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-50 to-transparent rounded-bl-full"></div>
          
          <div className={`w-16 h-16 ${stat.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
            <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-lg flex items-center justify-center shadow-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <div className="relative z-10">
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-2 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {stat.value}
            </h3>
            <p className="text-slate-600 font-medium">{stat.label}</p>
          </div>
          
          {/* Decorative element */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
      ))}
    </div>
  )
}

