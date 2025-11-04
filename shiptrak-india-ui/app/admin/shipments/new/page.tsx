import AdminShipmentForm from '../../../components/AdminShipmentForm'

export default function NewShipmentPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Create Shipment</h1>
      <div className="bg-white p-6 rounded shadow">
        <AdminShipmentForm />
      </div>
    </main>
  )
}
