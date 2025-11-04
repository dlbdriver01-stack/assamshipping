export default function ShipmentTimeline({ history }: { history: any[] }) {
  return (
    <section className="bg-white p-6 mt-4 rounded shadow">
      <h4 className="font-semibold mb-3">Timeline</h4>
      <ol className="border-l-2 border-slate-100 pl-4 space-y-3">
        {history.map((h, i) => (
          <li key={i}>
            <div className="text-sm font-medium">{h.status} <span className="text-xs text-slate-500">— {h.location}</span></div>
            <div className="text-xs text-slate-500">{h.time}</div>
          </li>
        ))}
      </ol>
    </section>
  )
}
