import { describe, it, expect } from 'vitest'
import { ShipmentSchema, ShipmentHistorySchema } from '../lib/schemas/shipment'

describe('ShipmentHistorySchema', () => {
  it('should validate correct history entry', () => {
    const validHistory = {
      time: '2025-10-30T08:15:00Z',
      status: 'PICKED_UP',
      location: 'Mumbai',
    }
    expect(() => ShipmentHistorySchema.parse(validHistory)).not.toThrow()
  })

  it('should reject missing fields', () => {
    const invalidHistory = {
      time: '2025-10-30T08:15:00Z',
      // missing status and location
    }
    expect(() => ShipmentHistorySchema.parse(invalidHistory)).toThrow()
  })
})

describe('ShipmentSchema', () => {
  const validShipment = {
    trackingId: 'IN2458901',
    shipper: {
      name: 'Ravi Logistics Pvt Ltd',
      address: 'Mumbai, MH',
    },
    receiver: {
      name: 'Anita Singh',
      address: 'Delhi, DL',
    },
    status: 'IN_TRANSIT',
    pickupTime: '2025-10-30T08:15:00Z',
    estimatedDelivery: '2025-11-03T00:00:00Z',
    currentLocation: {
      city: 'Jaipur',
    },
    history: [
      {
        time: '2025-10-30T08:15:00Z',
        status: 'PICKED_UP',
        location: 'Mumbai',
      },
    ],
  }

  it('should validate complete shipment data', () => {
    expect(() => ShipmentSchema.parse(validShipment)).not.toThrow()
  })

  it('should validate minimal required fields', () => {
    const minimalShipment = {
      trackingId: 'IN123',
      shipper: {
        name: 'Test Shipper',
        address: 'Test Address',
      },
      receiver: {
        name: 'Test Receiver',
        address: 'Test Address',
      },
      status: 'PICKED_UP',
    }
    expect(() => ShipmentSchema.parse(minimalShipment)).not.toThrow()
  })

  it('should reject tracking ID shorter than 3 characters', () => {
    const invalidShipment = {
      ...validShipment,
      trackingId: 'IN',
    }
    expect(() => ShipmentSchema.parse(invalidShipment)).toThrow()
  })

  it('should reject missing shipper name', () => {
    const invalidShipment = {
      ...validShipment,
      shipper: {
        address: 'Mumbai, MH',
      },
    }
    expect(() => ShipmentSchema.parse(invalidShipment)).toThrow()
  })

  it('should reject missing receiver address', () => {
    const invalidShipment = {
      ...validShipment,
      receiver: {
        name: 'Anita Singh',
      },
    }
    expect(() => ShipmentSchema.parse(invalidShipment)).toThrow()
  })

  it('should reject invalid status', () => {
    const invalidShipment = {
      ...validShipment,
      status: 'INVALID_STATUS',
    }
    expect(() => ShipmentSchema.parse(invalidShipment)).toThrow()
  })

  it('should accept valid status values', () => {
    const statuses = ['PICKED_UP', 'IN_TRANSIT', 'OUT_FOR_DELIVERY', 'DELIVERED', 'DELAYED']
    statuses.forEach((status) => {
      const shipment = { ...validShipment, status }
      expect(() => ShipmentSchema.parse(shipment)).not.toThrow()
    })
  })

  it('should accept optional deliveryTime as null', () => {
    const shipment = {
      ...validShipment,
      deliveryTime: null,
    }
    expect(() => ShipmentSchema.parse(shipment)).not.toThrow()
  })

  it('should accept currentLocation with lat/lng', () => {
    const shipment = {
      ...validShipment,
      currentLocation: {
        city: 'Mumbai',
        lat: 19.0760,
        lng: 72.8777,
      },
    }
    expect(() => ShipmentSchema.parse(shipment)).not.toThrow()
  })
})
