"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { getBlogs, urlFor } from "@/lib/sanity"
import { formatDate } from "@/lib/utils"
import { Metadata } from "next"




// export const metadata: Metadata = {
//   title: 'Real Estate Blog & News | Luxury Property Insights',
//   description: 'Explore our blog for expert insights into the UAE luxury real estate market, property investment tips, and the latest news from the world of luxury properties.',
//   alternates: {
//     canonical: '/blogs',
//   },
//   openGraph: {
//     title: 'Real Estate Insights & News | Luxury Property Blog',
//     description: 'Stay informed with the latest trends, market analysis, and investment opportunities in UAE luxury real estate.',
//     images: [
//       {
//         url: '/blog-og-image.jpg',
//         width: 1200,
//         height: 630,
//         alt: 'Luxury Real Estate Blog',
//       }
//     ],
//     type: 'website',
//   }
// }



export default function BlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredBlogs, setFilteredBlogs] = useState<any[]>([])

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await getBlogs()
        if (data && data.length > 0) {
          // Process blogs to format dates and images
          const processedBlogs = data.map((blog: any) => {
            let imageUrl = "/placeholder.svg";
            try {
              if (blog.mainImage) {
                // Use a try-catch block specifically for image URL processing
                try {
                  // Let urlFor handle different image cases including uploads in progress
                  imageUrl = urlFor(blog.mainImage).url();
                } catch (imgError) {
                  console.error("Error generating image URL for blog:", blog._id, imgError);
                  imageUrl = "/placeholder.svg";
                }
              }
            } catch (error) {
              console.error("Error processing image for blog:", blog._id, error);
            }
            
            return {
              ...blog,
              formattedDate: formatDate(blog.publishedAt || blog._createdAt),
              imageUrl
            };
          })
          setBlogs(processedBlogs)
          setFilteredBlogs(processedBlogs)
        } else {
          console.warn("No blogs returned from Sanity")
        }
      } catch (error) {
        console.error("Error loading blogs:", error)
      } finally {
        setLoading(false)
      }
    }

    loadBlogs()
  }, [])

  // Handle search
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredBlogs(blogs)
      return
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    const filtered = blogs.filter(
      (blog) =>
        blog.title?.toLowerCase().includes(lowerCaseSearchTerm) ||
        blog.excerpt?.toLowerCase().includes(lowerCaseSearchTerm) ||
        blog.category?.toLowerCase().includes(lowerCaseSearchTerm)
    )
    setFilteredBlogs(filtered)
  }, [searchTerm, blogs])

  const featuredPosts = filteredBlogs.filter((post) => post.isFeatured)
  const regularPosts = filteredBlogs.filter((post) => !post.isFeatured)

  return (
    <main className="min-h-screen bg-black text-white pt-48 pb-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl heading-1 lg:text-6xl font-bold mb-6 text-white">
            Our <span className="text-[#D4AF37]">Blog</span>
          </h1>
          <p className="text-lg text-white/80">Insights, guides, and market analysis from our real estate experts.</p>
        </div>

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

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {featuredPosts.length > 0 && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                  <span className="text-[#D4AF37] mr-2">Featured</span> Articles
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredPosts.map((post) => (
                    <Link href={`/blogs/${post.slug?.current || post._id}`} key={post._id} className="group">
                      <div className="bg-black border border-[#D4AF37]/20 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300">
                        <div className="relative h-[250px]">
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
                          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                            {post.title}
                          </h3>

                          <p className="text-white/70 mb-4 line-clamp-2">{post.excerpt}</p>

                          <div className="flex items-center text-sm text-white/60">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-[#D4AF37]" />
                              <span>{post.formattedDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {regularPosts.length > 0 ? (
              <section>
                <h2 className="text-2xl font-bold text-white mb-8">Latest Articles</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {regularPosts.map((post) => (
                    <Link href={`/blogs/${post.slug?.current || post._id}`} key={post._id} className="group">
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
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-[#D4AF37]" />
                              <span>{post.formattedDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ) : (
              <div className="text-center py-12 bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl">
                <p className="text-white/80 mb-4">No articles found matching your search.</p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}