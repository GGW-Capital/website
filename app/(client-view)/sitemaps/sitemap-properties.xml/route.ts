import { baseMetadata } from "@/lib/seo/metadata";
import { client } from "@/lib/sanity";

const BASE_URL = (
  baseMetadata.metadataBase?.toString() || "https://ggwcapitalre.com"
).replace(/\/$/, "");

export async function GET(): Promise<Response> {
  try {
    // Fetch all properties from Sanity
    const properties =
      await client.fetch(`*[_type == "property" && defined(slug.current)] { 
      slug, 
      _updatedAt
    }`);

    // Generate XML content for properties
    const xmlItems = properties
      .map(
        (property: any) => `
    <url>
      <loc>${BASE_URL}/properties/${property.slug.current}</loc>
      <lastmod>${new Date(property._updatedAt).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`
      )
      .join("");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems}
</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error generating properties sitemap:", error);

    // Return an empty sitemap in case of error
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "no-cache",
      },
    });
  }
}
