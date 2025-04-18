import Image from "next/image"
import Link from "next/link"
import { Building, MapPin, Home, BarChart3, ArrowLeft } from "lucide-react"
import { 
  getNeighborhoodBySlug, 
  urlFor 
} from "@/lib/sanity"
import { Metadata } from "next"
import ClientNeighborhoodTabs from "./client-tabs"
import { notFound } from "next/navigation"
import ClientLoadingWrapper from "@/components/client-loading-wrapper"

// Dynamic metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const neighborhood = await getNeighborhoodBySlug(params.slug)
  
  if (!neighborhood) {
    return {
      title: "Neighborhood Not Found",
      description: "The requested neighborhood could not be found."
    }
  }
  
  return {
    title: `${neighborhood.name} | Dubai Luxury Real Estate`,
    description: neighborhood.description || `Explore properties and projects in ${neighborhood.name}, one of Dubai's most sought-after neighborhoods.`,
    openGraph: {
      title: `${neighborhood.name} | Dubai Luxury Real Estate`,
      description: neighborhood.description || `Explore properties and projects in ${neighborhood.name}, one of Dubai's most sought-after neighborhoods.`,
      images: neighborhood.image ? [urlFor(neighborhood.image).width(1200).height(630).url()] : undefined,
      type: "website"
    }
  }
}

// Define statistic item component to avoid using client JSX in server component
function StatItem({ 
  icon, 
  title, 
  value
}: { 
  icon: string,
  title: string,
  value: string
}) {
  return (
    <div className="bg-black/50 backdrop-blur-md border border-[#D4AF37]/20 rounded-xl p-4 text-center">
      <div className="bg-[#D4AF37]/10 p-3 rounded-full inline-flex mb-3">
        {icon === 'building' && <Building className="h-10 w-10 text-[#D4AF37]" />}
        {icon === 'mapPin' && <MapPin className="h-10 w-10 text-[#D4AF37]" />}
        {icon === 'home' && <Home className="h-10 w-10 text-[#D4AF37]" />}
        {icon === 'barChart' && <BarChart3 className="h-10 w-10 text-[#D4AF37]" />}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-[#D4AF37]">{value}</p>
    </div>
  );
}

// Server component for the neighborhood detail page
export default async function NeighborhoodDetailPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  // Fetch neighborhood data including properties and projects
  const neighborhood = await getNeighborhoodBySlug(params.slug)
  
  // If neighborhood not found, show 404 page
  if (!neighborhood) {
    notFound()
  }
  
  // Extract properties and projects from neighborhood data
  const properties = neighborhood.properties || []
  const projects = neighborhood.projects || []
  
  // Format neighborhood image URL
  const imageUrl = neighborhood.image 
    ? urlFor(neighborhood.image).width(1920).height(1080).url()
    : "/placeholder.jpg"

  return (
    <ClientLoadingWrapper>
      <main className="min-h-screen bg-black text-white pb-20">
        {/* Hero Section */}
        <section className="relative pt-44 pb-16">
          <div className="absolute inset-0 z-0">
            <div className="relative w-full h-full">
              <Image
                src={imageUrl}
                alt={neighborhood.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90"></div>
            </div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <Link href="/neighborhoods" className="inline-flex items-center text-[#D4AF37] hover:underline">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to Neighborhoods
                </Link>
              </div>
              
              <h1 className="text-4xl md:text-5xl heading-1 lg:text-6xl font-bold text-white mb-6">
                {neighborhood.name}
              </h1>
              <p className="text-xl text-white/80 mb-8">
                {neighborhood.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <StatItem 
                  icon="building" 
                  title="Area Type" 
                  value={neighborhood.lifestyle || "Luxury"} 
                />
                <StatItem 
                  icon="mapPin" 
                  title="Properties" 
                  value={properties.length > 0 ? `${properties.length} Available` : "Coming Soon"} 
                />
                <StatItem 
                  icon="home" 
                  title="Projects" 
                  value={projects.length > 0 ? `${projects.length} Developments` : "Coming Soon"} 
                />
                <StatItem 
                  icon="barChart" 
                  title="Price Range" 
                  value={neighborhood.priceRange || "Contact for Pricing"} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Client-side tabs component */}
        <ClientNeighborhoodTabs 
          neighborhood={neighborhood}
          properties={properties}
          projects={projects}
        />
      </main>
    </ClientLoadingWrapper>
  )
}