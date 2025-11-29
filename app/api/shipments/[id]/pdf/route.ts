import { adminDb } from '../../../../../lib/firebase-admin'
import path from 'path'
import fs from 'fs'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Add validation
  if (!id || id.trim() === '') {
    return new Response('Invalid tracking ID', { status: 400 })
  }

  try {
    // Use jsPDF instead of pdfkit for Next.js compatibility
    const { jsPDF } = await import('jspdf')
    const QRCode = await import('qrcode')

    // Fetch shipment (same logic as main GET route)
    let doc = await adminDb.collection('shipments').doc(id).get()
    if (!doc.exists) {
      const querySnapshot = await adminDb
        .collection('shipments')
        .where('trackingId', '==', id)
        .limit(1)
        .get()

      if (!querySnapshot.empty) {
        doc = querySnapshot.docs[0]
      }
    }

    if (!doc.exists) {
      return new Response('Shipment not found', { status: 404 })
    }

    const raw = doc.data() as any
    const toIso = (v: any) =>
      v && typeof v.toDate === 'function' ? v.toDate().toISOString() : v

    const history = Array.isArray(raw.history)
      ? raw.history.map((h: any) => ({
          time: toIso(h.time),
          status: h.status,
          location: h.location,
          updatedBy: h.updatedBy,
          remarks: h.remarks,
        }))
      : []

    const shipment = {
      ...raw,
      trackingId: raw?.trackingId || doc.id,
      pickupTime: toIso(raw?.pickupTime),
      estimatedDelivery: toIso(raw?.estimatedDelivery),
      deliveryTime: toIso(raw?.deliveryTime),
      createdAt: toIso(raw?.createdAt),
      updatedAt: toIso(raw?.updatedAt),
      history,
    }

    // Create PDF with jsPDF (A4 size, portrait)
    const docPdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    let yPos = 20 // Starting Y position

    // Header: logo and company name
    const logoPath = path.join(process.cwd(), 'public', 'logo-assam.png')
    if (fs.existsSync(logoPath)) {
      try {
        const logoData = fs.readFileSync(logoPath)
        const logoBase64 = logoData.toString('base64')
        docPdf.addImage(logoBase64, 'PNG', 20, yPos, 40, 15)
        yPos += 20
      } catch (e) {
        // If logo fails, use text
        docPdf.setFontSize(20)
        docPdf.setTextColor(14, 116, 144) // #0E7490
        docPdf.text('ASSAM PACKERS AND MOVERS', 20, yPos)
        yPos += 15
      }
    } else {
      docPdf.setFontSize(20)
      docPdf.setTextColor(14, 116, 144) // #0E7490
      docPdf.text('ASSAM PACKERS AND MOVERS', 20, yPos)
      yPos += 15
    }

    yPos += 10

    // QR code with tracking URL
    const origin = request.headers.get('host') || 'localhost:3000'
    const protocol = request.headers.get('x-forwarded-proto') || (origin.includes('localhost') ? 'http' : 'https')
    const trackingUrl = `${protocol}://${origin}/track/${shipment.trackingId}`

    const qrDataUrl = await QRCode.default.toDataURL(trackingUrl, { width: 100 })
    const qrBase64 = qrDataUrl.replace(/^data:image\/png;base64,/, '')

    // Center QR code
    const pageWidth = docPdf.internal.pageSize.getWidth()
    const qrSize = 50
    const qrX = (pageWidth - qrSize) / 2
    docPdf.addImage(qrBase64, 'PNG', qrX, yPos, qrSize, qrSize)
    yPos += qrSize + 5

    // Tracking ID below QR code
    docPdf.setFontSize(10)
    docPdf.setTextColor(15, 23, 42) // #0f172a
    docPdf.text(String(shipment.trackingId || ''), pageWidth / 2, yPos, { align: 'center' })
    yPos += 15

    // Shipper Information
    docPdf.setFontSize(12)
    docPdf.setTextColor(17, 24, 39) // #111827
    docPdf.setFont('helvetica', 'bold')
    docPdf.text('Shipper Information', 20, yPos)
    docPdf.line(20, yPos + 2, 190, yPos + 2)
    yPos += 8

    const shipper = shipment.shipper || {}
    docPdf.setFontSize(10)
    docPdf.setFont('helvetica', 'normal')
    docPdf.setTextColor(0, 0, 0)

    if (shipper.name) {
      docPdf.text(shipper.name, 20, yPos)
      yPos += 6
    }
    if (shipper.address) {
      const addressLines = docPdf.splitTextToSize(shipper.address, 170)
      docPdf.text(addressLines, 20, yPos)
      yPos += addressLines.length * 6
    }
    if (shipper.phone) {
      docPdf.text(`Phone: ${shipper.phone}`, 20, yPos)
      yPos += 6
    }
    if (shipper.email) {
      docPdf.text(`Email: ${shipper.email}`, 20, yPos)
      yPos += 6
    }

    yPos += 5

    // Receiver Information
    docPdf.setFontSize(12)
    docPdf.setTextColor(17, 24, 39)
    docPdf.setFont('helvetica', 'bold')
    docPdf.text('Receiver Information', 20, yPos)
    docPdf.line(20, yPos + 2, 190, yPos + 2)
    yPos += 8

    const receiver = shipment.receiver || {}
    docPdf.setFontSize(10)
    docPdf.setFont('helvetica', 'normal')
    docPdf.setTextColor(0, 0, 0)

    if (receiver.name) {
      docPdf.text(receiver.name, 20, yPos)
      yPos += 6
    }
    if (receiver.address) {
      const addressLines = docPdf.splitTextToSize(receiver.address, 170)
      docPdf.text(addressLines, 20, yPos)
      yPos += addressLines.length * 6
    }
    if (receiver.phone) {
      docPdf.text(`Phone: ${receiver.phone}`, 20, yPos)
      yPos += 6
    }
    if (receiver.email) {
      docPdf.text(`Email: ${receiver.email}`, 20, yPos)
      yPos += 6
    }

    yPos += 5

    // Shipment Information
    docPdf.setFontSize(12)
    docPdf.setTextColor(17, 24, 39)
    docPdf.setFont('helvetica', 'bold')
    docPdf.text('Shipment Information', 20, yPos)
    docPdf.line(20, yPos + 2, 190, yPos + 2)
    yPos += 8

    docPdf.setFontSize(10)
    docPdf.setFont('helvetica', 'normal')

    const addLine = (label: string, value?: string) => {
      if (!value) return
      docPdf.setFont('helvetica', 'bold')
      docPdf.text(`${label}: `, 20, yPos)
      const textWidth = docPdf.getTextWidth(`${label}: `)
      docPdf.setFont('helvetica', 'normal')
      docPdf.text(value, 20 + textWidth, yPos)
      yPos += 6
    }

    addLine('Current Location', shipment.currentLocation?.city)
    addLine('Package', shipment.package)
    addLine('Type of Shipment', shipment.typeOfShipment)
    addLine('Weight', shipment.weight)
    addLine('Quantity', shipment.quantity)
    addLine('Total Freight', shipment.totalFreight)
    addLine('Product', shipment.product)
    if (shipment.comment) {
      yPos += 2
      addLine('Comment', shipment.comment)
    }

    yPos += 5

    // Important Dates
    docPdf.setFontSize(12)
    docPdf.setTextColor(17, 24, 39)
    docPdf.setFont('helvetica', 'bold')
    docPdf.text('Important Dates', 20, yPos)
    docPdf.line(20, yPos + 2, 190, yPos + 2)
    yPos += 8

    docPdf.setFontSize(10)
    docPdf.setFont('helvetica', 'normal')

    const formatDate = (value?: string) =>
      value
        ? new Date(value).toLocaleString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })
        : undefined

    addLine('Pickup Date', formatDate(shipment.pickupTime))
    addLine('Estimated Delivery', formatDate(shipment.estimatedDelivery))
    if (shipment.deliveryTime) {
      addLine('Delivered On', formatDate(shipment.deliveryTime))
    }

    // Shipment History (on new page if needed)
    if (history.length > 0) {
      // Check if we need a new page
      const pageHeight = docPdf.internal.pageSize.getHeight()
      if (yPos > pageHeight - 40) {
        docPdf.addPage()
        yPos = 20
      } else {
        yPos += 10
      }

      docPdf.setFontSize(14)
      docPdf.setTextColor(17, 24, 39)
      docPdf.setFont('helvetica', 'bold')
      docPdf.text('Shipment History', 20, yPos)
      docPdf.line(20, yPos + 2, 190, yPos + 2)
      yPos += 10

      docPdf.setFontSize(10)
      docPdf.setFont('helvetica', 'normal')

      history.forEach((h: any, index: number) => {
        // Check if we need a new page
        if (yPos > pageHeight - 50) {
          docPdf.addPage()
          yPos = 20
        }

        docPdf.setFont('helvetica', 'bold')
        docPdf.text(`Event ${index + 1}`, 20, yPos)
        yPos += 6

        docPdf.setFont('helvetica', 'normal')
        const dt = formatDate(h.time)
        if (dt) {
          docPdf.text(`Date / Time: ${dt}`, 20, yPos)
          yPos += 6
        }
        if (h.location) {
          docPdf.text(`Location: ${h.location}`, 20, yPos)
          yPos += 6
        }
        if (h.status) {
          docPdf.text(`Status: ${h.status}`, 20, yPos)
          yPos += 6
        }
        if (h.updatedBy) {
          docPdf.text(`Updated By: ${h.updatedBy}`, 20, yPos)
          yPos += 6
        }
        if (h.remarks) {
          const remarksLines = docPdf.splitTextToSize(`Remarks: ${h.remarks}`, 170)
          docPdf.text(remarksLines, 20, yPos)
          yPos += remarksLines.length * 6
        }
        yPos += 5
      })
    }

    // Generate PDF buffer
    const pdfBuffer = Buffer.from(docPdf.output('arraybuffer'))

    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="shipment-${shipment.trackingId}.pdf"`,
      },
    })
  } catch (err) {
    console.error('Error generating PDF:', err)
    const errorMessage = err instanceof Error ? err.message : String(err)
    const errorStack = err instanceof Error ? err.stack : undefined
    console.error('Error details:', errorStack || errorMessage)
    return new Response(
      JSON.stringify({
        error: 'Failed to generate PDF',
        message: errorMessage,
        ...(process.env.NODE_ENV === 'development' && { stack: errorStack }),
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
