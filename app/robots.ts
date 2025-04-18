import { MetadataRoute } from 'next'
import { baseMetadata } from '@/lib/seo/metadata'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = baseMetadata.metadataBase?.toString() || 'https://ggwcapital.com/'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/studio/'],
    },
    sitemap: `${baseUrl}sitemap-index.xml`,
  }
}