// app/blogs/page.tsx
import { getBlogs, urlFor } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";
import BlogList from "@/components/BlogList";
import GradientTitle from "@/components/ui/gradient-title";
import { NextSeo } from "next-seo";
export const revalidate = 60;

export default async function BlogsPage() {
  const data = await getBlogs();
  const blogs = (data || []).map((blog: any) => {
    return {
      ...blog,
      formattedDate: formatDate(blog.publishedAt || blog._createdAt),
    };
  });
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "GGW Capital Blog",
    "description": "Insights, guides, and market analysis from real estate experts at GGW Capital.",
    "blogPost": blogs.map((blog: any) => ({
      "@type": "BlogPosting",
      "headline": blog.title,
      "image": urlFor(blog.mainImage).url(),
      "url": `https://www.yourdomain.com/blogs/${blog.slug.current}`,
      "datePublished": blog.publishedAt,
      "description": blog.excerpt,
      "author": { "@type": "Organization", "name": "GGW Capital" },
      "publisher": {
        "@type": "Organization",
        "name": "GGW Capital",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.yourdomain.com/logo.png"
        }
      }
    }))
  }
  return (<><NextSeo
    title="GGW Capital Blog"
    description="Explore expert insights, market trends, and property tips from GGW Capital's real estate blog."
    openGraph={{
      type: 'website',
      url: 'https://www.yourdomain.com/blogs',
      title: 'GGW Capital Blog',
      description:
        'Explore expert insights, market trends, and property tips from GGW Capital\'s real estate blog.',
      images: [
        {
          url: 'https://www.yourdomain.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'GGW Capital Blog',
        },
      ],
    }}
    additionalMetaTags={[
      { name: 'robots', content: 'index, follow' },
      { name: 'keywords', content: 'Dubai Real Estate Blog, Property Trends, Investment Tips' }
    ]}
    additionalJsonLd={[structuredData]}
  />
    <main className="min-h-screen bg-black text-white pt-48 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl heading-1 lg:text-6xl font-bold mb-6 text-white">
            Our <GradientTitle element="span">Blog</GradientTitle>
          </h1>
          <p className="text-lg text-white/80">
            Insights, guides, and market analysis from our real estate experts.
          </p>
        </div>

        <BlogList blogs={blogs} />
      </div>
    </main></>
  );
}
