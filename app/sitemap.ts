import { MetadataRoute } from 'next'
import { baseMetadata } from '@/lib/seo/metadata'

const BASE_URL = (baseMetadata.metadataBase?.toString() || 'https://ggwcapital.com').replace(/\/$/, '')

// This is the main sitemap index file
// It references individual sitemap files for different content types
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/sitemap-index.xml`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/sitemaps/sitemap-static.xml`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/sitemaps/sitemap-properties.xml`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/sitemaps/sitemap-projects.xml`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/sitemaps/sitemap-blogs.xml`,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/sitemaps/sitemap-neighborhoods.xml`,
      lastModified: new Date(),
    },
  ]
}