import AdminShipmentForm from '../../../../components/AdminShipmentForm'
import AdminNav from '../../../../components/AdminNav'
import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Admin — Edit Shipment ${id}`,
    description: 'Edit shipment details',
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function EditShipment({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <>
      <AdminNav />
      <main>
        <AdminShipmentForm trackingId={id} />
      </main>
    </>
  )
}
