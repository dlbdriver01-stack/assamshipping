export default function HeroStats() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="bg-white p-6 rounded shadow">
        <h4 className="text-3xl font-bold text-primary">1.2M+</h4>
        <p className="text-sm text-slate-500">Shipments tracked</p>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h4 className="text-3xl font-bold text-primary">99.8%</h4>
        <p className="text-sm text-slate-500">On-time deliveries</p>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h4 className="text-3xl font-bold text-primary">120+</h4>
        <p className="text-sm text-slate-500">Cities covered</p>
      </div>
    </div>
  )
}
