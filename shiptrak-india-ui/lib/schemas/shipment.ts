import { z } from 'zod'
export const ShipmentHistorySchema = z.object({ time: z.string(), status: z.string(), location: z.string() })
export const ShipmentSchema = z.object({
  trackingId: z.string().min(3),
  shipper: z.object({ name: z.string(), address: z.string() }),
  receiver: z.object({ name: z.string(), address: z.string() }),
  status: z.string(),
  pickupTime: z.string().optional(),
  estimatedDelivery: z.string().optional(),
  deliveryTime: z.string().nullable().optional(),
  currentLocation: z.object({ city: z.string().optional(), lat: z.number().optional(), lng: z.number().optional() }).optional(),
  history: z.array(ShipmentHistorySchema).optional()
})
