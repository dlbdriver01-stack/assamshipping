import { MetadataRoute } from 'next'
import { adminDb } from '@/lib/firebase-admin'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://assampackersandmovers.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]

  // Dynamic shipment tracking pages
  try {
    const snapshot = await adminDb.collection('shipments')
      .where('status', '!=', 'DELIVERED')
      .limit(1000)
      .get()

    const dynamicPages: MetadataRoute.Sitemap = snapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        url: `${baseUrl}/track/${doc.id}`,
        lastModified: data.updatedAt ? new Date(data.updatedAt) : new Date(),
        changeFrequency: 'hourly' as const,
        priority: 0.8,
      }
    })

    return [...staticPages, ...dynamicPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
}

