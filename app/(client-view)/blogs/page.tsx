// app/blogs/page.tsx
import { getBlogs, urlFor } from "@/lib/sanity";
import { formatDate } from "@/lib/utils";
import BlogList from "@/components/BlogList";
import GradientTitle from "@/components/ui/gradient-title";

export const revalidate = 60;

export default async function BlogsPage() {
  const data = await getBlogs();
  const blogs = (data || []).map((blog: any) => {
    return {
      ...blog,
      formattedDate: formatDate(blog.publishedAt || blog._createdAt),
    };
  });

  return (
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
    </main>
  );
}
