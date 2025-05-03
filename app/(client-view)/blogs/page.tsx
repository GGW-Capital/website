// app/blogs/page.tsx
import { getBlogs, urlFor } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";
import BlogList from "@/components/BlogList";
import GradientTitle from "@/components/ui/gradient-title";
import { Metadata } from "next";
import Head from "next/head";
export const revalidate = 60;
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "GGW Capital Blog",
  description:
    "Insights, guides, and market analysis from real estate experts at GGW Capital.",
  // blogPost: blogs.map((blog: any) => ({
  //   "@type": "BlogPosting",
  //   headline: blog.title,
  //   image: urlFor(blog.mainImage).url(),
  //   url: `https://ggwpcapitalre.com/blogs/${blog.slug.current}`,
  //   datePublished: blog.publishedAt,
  //   description: blog.excerpt,
  //   author: { "@type": "Organization", name: "GGW Capital" },
  //   publisher: {
  //     "@type": "Organization",
  //     name: "GGW Capital",
  //     logo: {
  //       "@type": "ImageObject",
  //       url: "https://ggwpcapitalre.com/images/ggw-capital-logo.webp",
  //     },
  //   },
  // })),
};
export const metadata: Metadata = {
  title: "GGW Capital Blog",
  description:
    "Insights, guides, and market analysis from real estate experts at GGW Capital.",
  openGraph: {
    title: "GGW Capital Blog",
    description:
      "Insights, guides, and market analysis from real estate experts at GGW Capital.",
    url: "https://ggwpcapitalre.com/blogs",
    type: "website",
    images: [
      {
        url: "/images/ggw-capital-logo.webp",
        width: 1200,
        height: 630,
        alt: "GGW Capital Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GGW Capital Blog",
    description:
      "Insights, guides, and market analysis from real estate experts at GGW Capital.",
    images: ["/images/ggw-capital-logo.webp"],
  },
  alternates: {
    canonical: "https://ggwpcapitalre.com/blogs",
  },
};
export default async function BlogsPage() {
  const data = await getBlogs();
  const blogs = (data || []).map((blog: any) => {
    return {
      ...blog,
      formattedDate: formatDate(blog.publishedAt || blog._createdAt),
    };
  });

  return (
    <><Head><script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
  /></Head>
      <main className="min-h-screen bg-black text-white pt-48 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl heading-1 lg:text-6xl font-bold mb-6 text-white">
              Our <GradientTitle element="span">Blog</GradientTitle>
            </h1>
            <p className="text-lg text-white/80">
              Insights, guides, and market analysis from our real estate
              experts.
            </p>
          </div>

          <BlogList blogs={blogs} />
        </div>
      </main>
    </>
  );
}
