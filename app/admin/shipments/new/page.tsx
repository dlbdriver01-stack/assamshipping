import AdminShipmentForm from '../../../../components/AdminShipmentForm'
import AdminNav from '../../../../components/AdminNav'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — Create New Shipment',
  description: 'Create a new shipment tracking entry',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NewShipment() {
  return (
    <>
      <AdminNav />
      <main>
        <AdminShipmentForm />
      </main>
    </>
  )
}
