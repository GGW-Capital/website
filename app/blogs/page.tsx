// app/blogs/page.tsx
import { getBlogs, urlFor } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";
import BlogList from "@/components/BlogList";

export const revalidate = 60;

export default async function BlogsPage() {
  const data = await getBlogs();
  const blogs = (data || []).map((blog: any) => {
    let imageUrl = "/placeholder.svg";
    try {
      if (blog.mainImage) {
        imageUrl = urlFor(blog.mainImage).url();
      }
    } catch {
      imageUrl = "/placeholder.svg";
    }
    return {
      ...blog,
      formattedDate: formatDate(blog.publishedAt || blog._createdAt),
      imageUrl,
    };
  });

  return (
    <main className="min-h-screen bg-black text-white pt-48 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl heading-1 lg:text-6xl font-bold mb-6 text-white">
            Our <span className="text-[#D4AF37]">Blog</span>
          </h1>
          <p className="text-lg text-white/80">
            Insights, guides, and market analysis from our real estate experts.
          </p>
        </div>

        <BlogList blogs={blogs} />
      </div>
    </main>
  );
}
