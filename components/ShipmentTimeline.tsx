import { Clock, MapPin, CheckCircle2 } from 'lucide-react'

const statusIcons: Record<string, string> = {
  PICKED_UP: '📦',
  IN_TRANSIT: '🚚',
  OUT_FOR_DELIVERY: '🚛',
  DELIVERED: '✅',
  DELAYED: '⚠️',
}

export default function ShipmentTimeline({ history }: { history: any[] }) {
  if (!history || history.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-6 h-6 text-primary" />
          <h3 className="text-xl font-bold text-slate-900">Tracking Timeline</h3>
        </div>
        <p className="text-slate-500">No tracking history available.</p>
      </div>
    )
  }
  
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-bold text-slate-900">Tracking Timeline</h3>
      </div>
      
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-slate-200"></div>
        
        <ol className="space-y-6">
          {history.map((h, i) => {
            const isLast = i === history.length - 1
            const isDelivered = h.status === 'DELIVERED'
            
            return (
              <li key={i} className="relative pl-12">
                {/* Dot */}
                <div className={`absolute left-4 top-1 w-4 h-4 rounded-full border-2 border-white shadow-lg ${
                  isDelivered 
                    ? 'bg-green-500' 
                    : isLast 
                    ? 'bg-primary ring-4 ring-primary/20' 
                    : 'bg-primary'
                }`}>
                  {isDelivered && (
                    <CheckCircle2 className="w-3 h-3 text-white absolute -top-0.5 -left-0.5" />
                  )}
                </div>
                
                {/* Content Card */}
                <div className={`rounded-xl p-4 border-2 transition-all ${
                  isLast 
                    ? 'bg-primary/5 border-primary/20 shadow-md' 
                    : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{statusIcons[h.status] || '📍'}</span>
                      <span className="font-semibold text-slate-900">{h.status.replace('_', ' ')}</span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">{formatDateTime(h.time)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span>{h.location}</span>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
