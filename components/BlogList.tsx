// components/BlogList.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function BlogList({ blogs }: { blogs: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  useEffect(() => {
    const lower = searchTerm.toLowerCase();
    setFilteredBlogs(
      blogs.filter((b) =>
        [b.title, b.excerpt, b.category].some((v) =>
          v?.toLowerCase().includes(lower)
        )
      )
    );
  }, [searchTerm, blogs]);

  const featured = filteredBlogs.filter((b) => b.isFeatured);
  const regular = filteredBlogs.filter((b) => !b.isFeatured);

  return (
    <>
      <div className="flex justify-center mb-12">
        <div className="relative w-full max-w-xl">
          <Input
            type="text"
            placeholder="Search articles..."
            className="bg-transparent border-[#D4AF37]/30 text-white pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#D4AF37]" />
        </div>
      </div>

      {featured.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
            <span className="text-[#D4AF37] mr-2">Featured</span> Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featured.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}

      {regular.length > 0 ? (
        <section>
          <h2 className="text-2xl font-bold text-white mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {regular.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      ) : (
        <div className="text-center py-12 bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl">
          <p className="text-white/80 mb-4">No articles found.</p>
        </div>
      )}
    </>
  );
}

function BlogCard({ post }: { post: any }) {
  return (
    <Link href={`/blogs/${post.slug?.current || post._id}`} className="group">
      <div className="bg-black border border-[#D4AF37]/20 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300">
        <div className="relative h-[200px]">
          <Image
            src={post.imageUrl || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {post.category && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-[#D4AF37] text-black font-semibold px-3 py-1">
                {post.category}
              </Badge>
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-white/70 mb-4 text-sm line-clamp-2">{post.excerpt}</p>
          <div className="flex items-center text-xs text-white/60">
            <Calendar className="h-3 w-3 text-[#D4AF37]" />
            <span>{post.formattedDate}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
