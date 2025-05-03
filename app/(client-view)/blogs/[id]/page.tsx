import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Calendar, ArrowLeft, Facebook, Twitter, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getBlogBySlug, getBlogs, urlFor } from "@/lib/sanity"
import { formatDate } from "@/lib/utils"
import { PortableText } from "@portabletext/react"
import SchemaJsonLd from "@/components/schema-json-ld"
import { generateBlogJsonLd } from "@/lib/seo/json-ld"

// Server component to fetch data
export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  params = await params;
  // Safe params handling for Next.js
  if (!params?.id) return notFound();
  
  const id = params.id;
  
  try {
    // Fetch the blog post using the slug or ID
    const blogData = await getBlogBySlug(id);
    
    if (!blogData) {
      return notFound();
    }

    // Process the blog data to format dates and image URLs
    let mainImageUrl = "/placeholder.svg";
    
    try {
      if (blogData.mainImage) {
        // Check if it's a string (direct URL)
        if (typeof blogData.mainImage === 'string') {
          mainImageUrl = blogData.mainImage;
        }
        // Check if it's an upload object with a previewImage
        else if (blogData.mainImage._upload && blogData.mainImage._upload.previewImage) {
          mainImageUrl = blogData.mainImage._upload.previewImage;
        } 
        // Check for regular asset reference
        else if (blogData.mainImage.asset) {
          mainImageUrl = urlFor(blogData.mainImage).url();
        }
        // For other cases, try to use urlFor safely
        else {
          try {
            mainImageUrl = urlFor(blogData.mainImage).url();
          } catch (imgError) {
            console.warn("Could not process image with urlFor:", imgError);
            // If mainImage has a URL property directly, use that
            if (blogData.mainImage.url) {
              mainImageUrl = blogData.mainImage.url;
            }
          }
        }
      }
    } catch (error) {
      console.error("Error processing main image for blog:", blogData._id, error);
    }
    
    // Author image processing removed as per requirements
    
    const blog = {
      ...blogData,
      formattedDate: formatDate(blogData.publishedAt || blogData._createdAt),
      imageUrl: mainImageUrl
    };
    
    // Fetch related posts (could be based on category, tags, etc.)
    const allBlogs = await getBlogs();
    
    // Filter out current blog and get a few related ones
    // In a real app, you might have a more sophisticated recommendation algorithm
    const relatedPosts = allBlogs
      .filter((b: any) => b._id !== blogData._id)
      .filter((b: any) => {
        // If the blog has categories, try to match those
        if (blogData.categories && b.categories) {
          return blogData.categories.some((cat: string) => 
            b.categories.includes(cat)
          );
        }
        return true;
      })
      .slice(0, 3)
      .map((b: any) => {
        let imageUrl = "/placeholder.svg";
        try {
          if (b.mainImage) {
            // Check if it's an upload object with a previewImage
            if (b.mainImage._upload && b.mainImage._upload.previewImage) {
              imageUrl = b.mainImage._upload.previewImage;
            } else {
              // Otherwise use Sanity's urlFor
              imageUrl = urlFor(b.mainImage).url();
            }
          }
        } catch (error) {
          console.error("Error processing image for related blog:", b._id, error);
        }
        
        return {
          ...b,
          formattedDate: formatDate(b.publishedAt || b._createdAt),
          imageUrl
        };
      });

    return (<><script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBlogJsonLd(blogData)) }}
    />
      <main className="min-h-screen bg-black text-white pt-40 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-8">
            <Link
              href="/blogs"
              className="inline-flex items-center text-[#D4AF37] hover:text-[#D4AF37]/80 transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to All Articles
            </Link>

            <div className="space-y-4">
              {blog.categories && blog.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="bg-[#D4AF37] text-black px-3 py-1 rounded-md text-sm font-medium">
                    {blog.categories[0]}
                  </span>
                </div>
              )}

              <h1 className="text-3xl md:text-4xl heading-1 lg:text-5xl font-bold text-white">{blog.title}</h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-[#D4AF37]" />
                  <span>{blog.formattedDate}</span>
                </div>

              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.15)] mb-8">
              <Image 
  src={urlFor(blog.mainImage).width(1200).height(800).url()}
  alt={blog.mainImage?.alt || blog.title}
  width={1200}
  height={800}
                priority 
              />
            </div>

            <div>
                <article className="prose prose-invert prose-gold max-w-none">
                  {blog.body ? (
                    <PortableText 
                      value={blog.body}
                      components={{
                        types: {
                          image: ({value}) => {
                            try {
                              if (value) {
                                let imageUrl = "/placeholder.svg";
                                
                                // Handle upload objects with a previewImage
                                if (value._upload && value._upload.previewImage) {
                                  imageUrl = value._upload.previewImage;
                                } else {
                                  // Otherwise use Sanity's urlFor
                                  imageUrl = urlFor(value).url();
                                }
                                
                                return (
                                  <div className="my-8 relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                                    <Image 
                                      src={imageUrl}
                                      alt={value.alt || 'Blog image'} 
                                      fill 
                                      className="object-cover" 
                                    />
                                  </div>
                                );
                              }
                              return null;
                            } catch (error) {
                              console.error('Error rendering embedded image:', error);
                              return null;
                            }
                          }
                        },
                        block: {
                          h1: ({children}) => <h1 className="text-4xl font-bold mt-8 mb-4 text-white">{children}</h1>,
                          h2: ({children}) => <h2 className="text-3xl font-bold mt-7 mb-3 text-white">{children}</h2>,
                          h3: ({children}) => <h3 className="text-2xl font-bold mt-6 mb-3 text-white">{children}</h3>,
                          h4: ({children}) => <h4 className="text-xl font-bold mt-5 mb-2 text-white">{children}</h4>,
                          blockquote: ({children}) => (
                            <blockquote className="border-l-4 border-[#D4AF37] pl-4 py-1 my-6 text-white/80 italic">
                              {children}
                            </blockquote>
                          ),
                          normal: ({children}) => <p className="my-4 text-white/90 leading-relaxed">{children}</p>,
                        },
                        list: {
                          bullet: ({children}) => <ul className="ml-6 my-6 list-disc text-white/90 space-y-2">{children}</ul>,
                          number: ({children}) => <ol className="ml-6 my-6 list-decimal text-white/90 space-y-2">{children}</ol>,
                        },
                        listItem: {
                          bullet: ({children}) => <li className="pl-2">{children}</li>,
                          number: ({children}) => <li className="pl-2">{children}</li>,
                        },
                        marks: {
                          strong: ({children}) => <strong className="font-bold text-white">{children}</strong>,
                          em: ({children}) => <em className="italic text-white/90">{children}</em>,
                          code: ({children}) => (
                            <code className="bg-black/40 text-[#D4AF37] rounded px-1 py-0.5 font-mono text-sm">
                              {children}
                            </code>
                          ),
                          link: ({ children, value }) => {
                            const isBlank = value.blank === true;
                            const rel = isBlank ? "noopener noreferrer" : undefined;
                            const target = isBlank ? "_blank" : "_self";
                
                            return (
                              <a
                                href={value.href}
                                target={target}
                                rel={rel}
                                className="text-[#D4AF37] hover:underline font-medium"
                              >
                                {children}
                              </a>
                            );
                          }
                        }
                      }}
                    />
                  ) : (
                    <div>
                      {blog.excerpt && (
                        <p className="lead">{blog.excerpt}</p>
                      )}
                      <p>Full content not available for this blog post.</p>
                    </div>
                  )}
                </article>

                {blog.tags && blog.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-[#D4AF37]/20">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-white/80">Tags:</span>
                      {blog.tags.map((tag: string) => (
                        <Link
                          key={tag}
                          href={`/blogs/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`}
                          className="bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full text-sm hover:bg-[#D4AF37]/20 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-[#D4AF37]/20">
                  <h3 className="text-xl font-bold text-white mb-4">Share This Article</h3>
                  <div className="flex gap-4">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/blogs/${id}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Facebook"
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                      >
                        <Facebook className="h-5 w-5" />
                      </Button>
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/blogs/${id}`)}&text=${encodeURIComponent(blog.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Twitter"
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                      >
                        <Twitter className="h-5 w-5" />
                      </Button>
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/blogs/${id}`)}&title=${encodeURIComponent(blog.title)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on LinkedIn"
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                      >
                        <Linkedin className="h-5 w-5" />
                      </Button>
                    </a>
                    <a
                      href={`mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent(`Check out this article: ${blog.title} at ${process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'}/blogs/${id}`)}`}
                      aria-label="Share via Email"
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                      >
                        <Mail className="h-5 w-5" />
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <div className="max-w-6xl mx-auto mt-16">
              <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((post: any) => (
                  <Link href={`/blogs/${post.slug?.current || post._id}`} key={post._id} className="group">
                    <div className="bg-black border border-[#D4AF37]/20 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300">
                      <div className="relative h-[200px]">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {post.categories && post.categories.length > 0 && (
                          <div className="absolute top-4 left-4">
                            <span className="bg-[#D4AF37] text-black px-3 py-1 rounded-md text-sm font-medium">
                              {post.categories[0]}
                            </span>
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
            </div>
          )}
      </main></>
    );
  } catch (error) {
    console.error("Error loading blog post:", error);
    return notFound();
  }
}