import { Clock, MapPin, Circle, CheckCircle2, User as UserIcon, FileText } from 'lucide-react'

export default function ShipmentTimeline({ history }: { history: any[] }) {
  if (!history || history.length === 0) {
    return (
      <div className="bg-white border border-slate-200">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-slate-600" />
            <h3 className="text-lg font-semibold text-slate-900">All Shipment Updates</h3>
          </div>
        </div>
        <div className="p-12 text-center">
          <p className="text-sm text-slate-500">No tracking history available.</p>
        </div>
      </div>
    )
  }
  
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    const time = date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    return { day, time }
  }
  
  return (
    <div className="bg-white border border-slate-200">
      {/* Professional Header */}
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-900">All Shipment Updates</h3>
        </div>
      </div>
      
      {/* Timeline */}
      <div className="p-6">
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-300"></div>
          
          <ol className="space-y-0">
            {history.map((h, i) => {
              const isLast = i === history.length - 1
              const isDelivered = h.status === 'DELIVERED'
              const { day, time } = formatDateTime(h.time)
              
              return (
                <li key={i} className="relative pl-12 pb-6 last:pb-0">
                  {/* Timeline Dot */}
                  <div className={`absolute left-4 top-1 ${
                    isDelivered 
                      ? 'text-green-600' 
                      : isLast 
                      ? 'text-slate-900' 
                      : 'text-slate-400'
                  }`}>
                    {isDelivered ? (
                      <CheckCircle2 className="w-4 h-4 fill-current" />
                    ) : (
                      <Circle className={`w-4 h-4 ${isLast ? 'fill-current' : 'fill-slate-300'}`} />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="border-b border-slate-100 last:border-b-0 pb-6 last:pb-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <div>
                        <p className="text-sm font-medium text-slate-900 mb-1">{h.status.replace(/_/g, ' ')}</p>
                        <p className="text-xs text-slate-500">{day}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500">{time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{h.location}</span>
                    </div>

                    {h.updatedBy && (
                      <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                        <UserIcon className="w-3.5 h-3.5" />
                        <span>Updated by: {h.updatedBy}</span>
                      </div>
                    )}

                    {h.remarks && (
                      <div className="mt-1 flex items-start gap-2 text-xs text-slate-600">
                        <FileText className="w-3.5 h-3.5 mt-0.5" />
                        <span>{h.remarks}</span>
                      </div>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </div>
  )
}
