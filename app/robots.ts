import { MetadataRoute } from "next";
import { baseMetadata } from "@/lib/seo/metadata";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    baseMetadata.metadataBase?.toString() || "https://ggwcapitalre.com/";

  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        "sitemap.xml",
        "/sitemap-index.xml",
        "/sitemaps/sitemap-blogs.xml",
        "/sitemaps/sitemap-properties.xml",
        "/sitemaps/sitemap-static.xml",
        "/sitemaps/sitemap-neighborhoods.xml",
        "/sitemaps/sitemap-projects.xml",
      ],
      disallow: ["/admin/", "/api/", "/studio/"],
    },
    sitemap: `${baseUrl}sitemap-index.xml`,
  };
}
