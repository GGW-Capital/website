import { baseMetadata } from '@/lib/seo/metadata'
import { client } from '@/lib/sanity'

const BASE_URL = (baseMetadata.metadataBase?.toString() || 'https://ggwcapital.com').replace(/\/$/, '')

export async function GET(): Promise<Response> {
  try {
    // Fetch all blogs from Sanity
    const blogs = await client.fetch(`*[_type == "blog" && defined(slug.current)] { 
      slug, 
      _updatedAt
    }`)
    
    // Generate XML content for blogs
    const xmlItems = blogs.map((blog: any) => `
    <url>
      <loc>${BASE_URL}/blogs/${blog.slug.current}</loc>
      <lastmod>${new Date(blog._updatedAt).toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.6</priority>
    </url>`).join('')

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems}
</urlset>`

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600'
      }
    })
  } catch (error) {
    console.error('Error generating blogs sitemap:', error)
    
    // Return an empty sitemap in case of error
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`
    
    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'no-cache'
      }
    })
  }
}