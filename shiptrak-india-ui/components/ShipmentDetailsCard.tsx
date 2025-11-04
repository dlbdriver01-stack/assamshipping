export default function ShipmentDetailsCard({ shipment }: { shipment: any }) {
  return (
    <section className="bg-white p-6 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Shipment Details</h3>
      <div className="text-sm text-slate-700 space-y-1">
        <div><strong>From:</strong> {shipment.shipper?.name} — {shipment.shipper?.address}</div>
        <div><strong>To:</strong> {shipment.receiver?.name} — {shipment.receiver?.address}</div>
        <div><strong>Status:</strong> <span className="font-medium">{shipment.status}</span></div>
        <div><strong>ETA:</strong> {shipment.estimatedDelivery || '—'}</div>
      </div>
    </section>
  )
}
