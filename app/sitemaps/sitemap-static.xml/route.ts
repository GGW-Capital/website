import { baseMetadata } from "@/lib/seo/metadata";

const BASE_URL = (
  baseMetadata.metadataBase?.toString() || "https://ggwcapitalre.com"
).replace(/\/$/, "");

export async function GET(): Promise<Response> {
  const today = new Date().toISOString();

  // Define static pages with their priorities and change frequencies
  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "daily" },
    { url: "/buy", priority: "0.9", changefreq: "daily" },
    { url: "/rent", priority: "0.9", changefreq: "daily" },
    { url: "/off-plan", priority: "0.9", changefreq: "daily" },
    { url: "/projects", priority: "0.9", changefreq: "daily" },
    { url: "/about", priority: "0.7", changefreq: "weekly" },
    { url: "/contact", priority: "0.7", changefreq: "monthly" },
    { url: "/blogs", priority: "0.8", changefreq: "weekly" },
    { url: "/team", priority: "0.7", changefreq: "monthly" },
    { url: "/neighborhoods", priority: "0.8", changefreq: "weekly" },
    { url: "/privacy-policy", priority: "0.5", changefreq: "yearly" },
    { url: "/terms-of-service", priority: "0.5", changefreq: "yearly" },
  ];

  // Generate XML content
  const xmlItems = staticPages
    .map(
      (page) => `
  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
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
}
