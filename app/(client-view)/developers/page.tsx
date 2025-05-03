import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getDevelopers, urlFor } from "@/lib/sanity"
import Navbar from "@/components/navbar"
import GradientTitle from "@/components/ui/gradient-title"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Developers | GGW Capital Luxury Real Estate",
  alternates: {
    canonical: "https://ggwcapitalre.com/developers",
  },
  description:
    "Explore projects from the UAE's most prestigious developers, updated daily with the latest launches and exclusive offers.",
  openGraph: {
    title: "Developers | GGW Capital Luxury Real Estate",
    description:
      "Explore projects from the UAE's most prestigious developers, updated daily with the latest launches and exclusive offers.",
    images: [
      {
        url: "/developers-showcase.webp", // Replace with actual image
        width: 1200,
        height: 630,
        alt: "UAE's Top Real Estate Developers",
      },
    ],
  },
}

export const revalidate = 60

export default async function DevelopersPage() {
  // Fetch developers data server-side
  let developers: any[] = []
  let error = null

  try {
    const developersData = await getDevelopers()
    if (developersData && developersData.length > 0) {
      // Process developers to format image URLs
      developers = developersData.map((developer: any) => ({
        ...developer,
        logoUrl: developer.logo ? urlFor(developer.logo).url() : "/placeholder-logo.svg",
      }))
    } else {
      console.warn("No developers returned from Sanity")
    }
  } catch (err) {
    console.error("Error loading developers:", err)
    error = err
  }

  const featuredDevelopers = developers.filter((dev) => dev.isFeatured)
  const otherDevelopers = developers.filter((dev) => !dev.isFeatured)

  // Generate JSON-LD for developers
  const developersJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: developers.map((developer, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Organization",
        name: developer.name,
        description: developer.description,
        logo: developer.logoUrl,
        url: developer.website || `https://ggwcapitalre.com/buy?developer=${encodeURIComponent(developer.name) || ""}`,
        numberOfItems: developer.projectCount || 0,
      },
    })),
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Add JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(developersJsonLd),
        }}
      />

      <div className="container mx-auto px-4 pt-48 pb-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl heading-1 lg:text-6xl font-bold mb-6 text-white">
            <GradientTitle element="span">Developers</GradientTitle> in UAE
          </h1>
          <div className="w-24 h-1 bg-[#D4AF37]/60 mx-auto mb-6"></div>
          <p className="text-lg text-white/80">
            Explore projects from the UAE's most prestigious developers, updated daily with the latest launches and
            exclusive offers.
          </p>
        </div>

        {error ? (
          <div className="text-center py-20 bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Error Loading Developers</h3>
            <p className="text-white/70 mb-8">
              We encountered an issue while loading the developers. Please try again later.
            </p>
          </div>
        ) : (
          <>
            {featuredDevelopers.length > 0 && (
              <section className="mb-16">
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                  <span className="text-[#D4AF37] mr-2">Featured</span> Developers
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredDevelopers.map((developer) => (
                    <div
                      key={developer._id}
                      className="bg-black border border-[#D4AF37]/20 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300"
                    >
                      <div className="p-6 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-6">
                          <div className="relative h-16 w-32">
                            <Image
                              src={developer.logoUrl || "/placeholder-logo.svg"}
                              alt={developer.name}
                              fill
                              className="object-contain bg-ggw-gold/50 border-solid border-[1px] border-ggw-gold rounded-xl p-2"
                            />
                          </div>
                          <div className="bg-[#D4AF37]/10 px-3 py-1 rounded-full text-[#D4AF37] text-sm">
                            {developer.projectCount || 0} Projects
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3">{developer.name}</h3>
                        <p className="text-white/70 mb-6 flex-grow">{developer.description}</p>

                        <div className="flex gap-4">
                          {developer.projects && developer.projects.length > 0 && (
                            <Link href={`/buy?developer=${encodeURIComponent(developer.name)}`} className="flex-1">
                              <Button className="w-full bg-[#D4AF37] text-black hover:bg-[#C4A030] flex items-center justify-center gap-2">
                                View Projects <ExternalLink className="h-4 w-4" />
                              </Button>
                            </Link>
                          )}

                          {developer.website && (
                            <Link
                              href={developer.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-shrink-0"
                            >
                              <Button
                                variant="outline"
                                className="border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                              >
                                Website
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {otherDevelopers.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-white mb-8 flex items-center">
                  <span className="text-[#D4AF37] mr-2">All</span> Developers
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherDevelopers.map((developer) => (
                    <div
                      key={developer._id}
                      className="bg-black border border-[#D4AF37]/20 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300"
                    >
                      <div className="p-6 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-6">
                          <div className="relative h-16 w-32">
                            <Image
                              src={developer.logoUrl || "/placeholder-logo.svg"}
                              alt={developer.name}
                              fill
                              className="object-contain bg-ggw-gold/50 border-solid border-[1px] border-ggw-gold rounded-xl p-2"
                            />
                          </div>
                          <div className="bg-[#D4AF37]/10 px-3 py-1 rounded-full text-[#D4AF37] text-sm">
                            {developer.projectCount || 0} Projects
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3">{developer.name}</h3>
                        <p className="text-white/70 mb-6 flex-grow">{developer.description}</p>

                        <div className="flex gap-4">
                          {developer.projects && developer.projects.length > 0 && (
                            <Link href={`/buy?developer=${encodeURIComponent(developer.name)}`} className="flex-1">
                              <Button className="w-full bg-[#D4AF37] text-black hover:bg-[#C4A030] flex items-center justify-center gap-2">
                                View Projects <ExternalLink className="h-4 w-4" />
                              </Button>
                            </Link>
                          )}

                          {developer.website && (
                            <Link
                              href={developer.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-shrink-0"
                            >
                              <Button
                                variant="outline"
                                className="border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                              >
                                Website
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {developers.length === 0 && (
              <div className="text-center py-20 bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">No Developers Found</h3>
                <p className="text-white/70 mb-8">
                  We couldn't find any developers in our database. Please check back later.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
