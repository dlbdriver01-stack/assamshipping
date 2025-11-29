import { z } from 'zod'

export const ShipmentHistorySchema = z.object({
  time: z.string(),
  status: z.string(),
  location: z.string(),
  updatedBy: z.string().optional(),
  remarks: z.string().optional(),
})

export const ShipmentSchema = z.object({
  trackingId: z.string().min(3, 'Tracking ID must be at least 3 characters'),
  shipper: z.object({
    name: z.string().min(1, 'Shipper name is required'),
    address: z.string().min(1, 'Shipper address is required'),
    phone: z.string().optional(),
    email: z.string().email().optional().or(z.literal('')),
  }),
  receiver: z.object({
    name: z.string().min(1, 'Receiver name is required'),
    address: z.string().min(1, 'Receiver address is required'),
    phone: z.string().optional(),
    email: z.string().email().optional().or(z.literal('')),
  }),
  status: z.enum(['PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'DELAYED', 'CUSTOMS_BLOCKAGE', 'GOODS_RELEASED_BY_CUSTOMS']),
  pickupTime: z.string().optional(),
  estimatedDelivery: z.string().optional(),
  deliveryTime: z.string().nullable().optional(),
  currentLocation: z.object({
    city: z.string(),
    lat: z.number().optional(),
    lng: z.number().optional(),
  }).optional(),
  // Optional additional fields
  package: z.string().optional(),
  typeOfShipment: z.string().optional(),
  weight: z.string().optional(),
  product: z.string().optional(),
  totalFreight: z.string().optional(),
  quantity: z.string().optional(),
  comment: z.string().optional(),
  history: z.array(ShipmentHistorySchema).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
})

export type Shipment = z.infer<typeof ShipmentSchema>
