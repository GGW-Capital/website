import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getNeighborhoods, urlFor } from "@/lib/sanity"
import { Metadata } from "next"
import GradientTitle from "@/components/ui/gradient-title"

export const metadata: Metadata = {
  title: "Dubai Neighborhoods | Explore Premium Areas",
  description: "Discover the most prestigious and sought-after neighborhoods in Dubai, each with its unique character, lifestyle, and luxury properties.",
  openGraph: {
    title: "Dubai Neighborhoods | Explore Premium Areas",
    description: "Discover the most prestigious and sought-after neighborhoods in Dubai, each with its unique character, lifestyle, and luxury properties.",
    type: "website"
  },
  alternates: {
    canonical: "https://ggwcapitalre.com/nieghborhoods",
  }
}

// Server-side component to fetch neighborhoods
export default async function NeighborhoodsPage() {
  // Fetch neighborhoods from Sanity on the server
  const neighborhoods = await getNeighborhoods() || []
  
  // Define neighborhood card component
  type Neighborhood = {
    _id: string
    name: string
    slug?: { current: string }
    image?: any
    description?: string
    propertyTypes?: string[]
    priceRange?: string
    lifestyle?: string
  }

  const NeighborhoodCard = ({ neighborhood }: { neighborhood: Neighborhood }) => {
    // Format the image URL using Sanity's URL builder
    const imageUrl = neighborhood.image 
      ? urlFor(neighborhood.image).width(800).height(600).url()
      : "/placeholder.jpg"
      
    // Format the slug for the URL
    const neighborhoodSlug = neighborhood.slug?.current || neighborhood._id
    
    // Get property types and other details from Sanity data
    const propertyTypes = neighborhood.propertyTypes || ["Properties"]
    const priceRange = neighborhood.priceRange || "Contact for pricing"
    const lifestyle = neighborhood.lifestyle || "Luxury"
    
    return (
      <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-500 h-full group">
        <Link href={`/neighborhoods/${neighborhoodSlug}`} className="block">
          <div className="relative h-[350px]">
            <Image
              src={imageUrl}
              alt={neighborhood.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t group-hover:scale-110 from-black/80 via-black/40 to-black/10 transition-all duration-700"></div>
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                {neighborhood.name}
              </h3>
              <div className="bg-[#D4AF37] text-black px-3 py-1 rounded-full text-xs font-semibold uppercase">
                {lifestyle}
              </div>
            </div>
          </div>
        </Link>

        <div className="p-6">
          <p className="text-white/80 mb-4 line-clamp-3">{neighborhood.description || `Explore ${neighborhood.name}, one of Dubai's premium neighborhoods offering world-class amenities and luxury living.`}</p>

          <div className="flex flex-wrap gap-4 mb-6">
            {propertyTypes.length > 0 && (
              <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-lg">
                <MapPin className="h-4 w-4 text-[#D4AF37]" />
                <span className="text-white/80 text-sm">{Array.isArray(propertyTypes) ? propertyTypes.join(", ") : propertyTypes}</span>
              </div>
            )}

            {priceRange && (
              <div className="bg-black/30 px-3 py-1.5 rounded-lg">
                <span className="text-white/80 text-sm">{priceRange}</span>
              </div>
            )}
          </div>

          <Link href={`/neighborhoods/${neighborhoodSlug}`}>
            <Button
              variant="outline"
              className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black flex items-center justify-center gap-2 transition-all duration-300"
            >
              Explore Area <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
      <main className="pb-20">
        {/* Hero Section */}
        <section className="bg-black min-h-[40vh] flex items-center justify-center bg-cover bg-center relative" style={{ backgroundImage: "url('/images/dubai-skyline.avif')" }}>
          <div className="absolute inset-0 bg-black/70 z-10"></div>
          <div className="container mx-auto px-4 relative z-20 pt-44 pb-16 text-center">
            <h1 className="text-4xl md:text-5xl heading-1 lg:text-6xl font-bold text-white mb-6">
              Luxury Dubai <GradientTitle element="span">Neighborhoods</GradientTitle>
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Discover the most prestigious areas in Dubai, each with its unique character and exclusive properties
            </p>
            <div className="w-24 h-1 bg-[#D4AF37]/60 mx-auto"></div>
          </div>
        </section>

        {/* Neighborhoods Grid */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          {neighborhoods.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {neighborhoods.map((neighborhood: Neighborhood) => (
                <div key={neighborhood._id} data-aos="fade-up" data-aos-delay={(neighborhoods.indexOf(neighborhood) % 3) * 100}>
                  <NeighborhoodCard neighborhood={neighborhood} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-white mb-4">Neighborhoods Coming Soon</h3>
              <p className="text-white/70 max-w-md mx-auto">
                We are currently curating the best neighborhoods in Dubai. Please check back later for updates.
              </p>
            </div>
          )}
        </section>

        {/* Neighborhood Benefits - Streamlined */}
        <section className="py-16 bg-[#050505]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl heading-2 font-semibold text-white text-center mb-12">
              Why Choose Dubai's <GradientTitle element="span">Premier Neighborhoods</GradientTitle>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-8 shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-500" data-aos="fade-up">
                <div className="h-16 w-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Prime Locations</h3>
                <p className="text-white/70">
                  Access to the best locations in Dubai, offering unparalleled views, convenience, and prestigious addresses.
                </p>
              </div>

              <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-8 shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-500" data-aos="fade-up" data-aos-delay="100">
                <div className="h-16 w-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Luxury Amenities</h3>
                <p className="text-white/70">
                  Exclusive access to world-class amenities including private beaches, marinas, golf courses, and premium retail.
                </p>
              </div>

              <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-8 shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-500" data-aos="fade-up" data-aos-delay="200">
                <div className="h-16 w-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">Security & Privacy</h3>
                <p className="text-white/70">
                  Gated communities with 24/7 security, providing peace of mind and privacy for you and your family.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
  )
}