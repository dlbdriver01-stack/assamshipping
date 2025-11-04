import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Delivered', value: 120 },
  { name: 'In Transit', value: 60 },
  { name: 'Out for Delivery', value: 30 },
]

export default function DashboardStats() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-white p-6 rounded shadow">
        <h3 className="font-semibold mb-3">Shipments by status</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}><XAxis dataKey="name" /><YAxis /><Tooltip /><Bar dataKey="value" /></BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h3 className="font-semibold mb-3">Recent activity</h3>
        <ul className="text-sm text-slate-600">
          <li>IN2458902 marked Out for Delivery</li>
          <li>IN2458901 updated location to Jaipur</li>
        </ul>
      </div>
    </div>
  )
}
