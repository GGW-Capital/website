"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, BedDouble, Bath, Maximize2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getFeaturedProperties, urlFor } from "@/lib/sanity"
import FilterToggle from "@/components/filter-toggle"
import Carousel from "@/components/carousel"
import PropertyCardNew from "@/components/property-card-new"
import { motion } from "framer-motion"

// Define our filter options
const marketTypes = [
  { id: "all", label: "All" },
  { id: "buy", label: "For Sale" },
  { id: "rent", label: "For Rent" },
  { id: "off-plan", label: "Off-Plan" },
]

const propertyCategories = [
  { id: "all", label: "All" },
  { id: "apartment", label: "Apartment" },
  { id: "villa", label: "Villa" },
  { id: "penthouse", label: "Penthouse" },
  { id: "townhouse", label: "Townhouse" },
]

const lifestyleOptions = [
  { id: "all", label: "All" },
  { id: "luxury", label: "Luxury" },
  { id: "beachfront", label: "Beachfront" },
  { id: "family", label: "Family" },
  { id: "urban", label: "Urban" },
  { id: "investment", label: "Investment" },
]

export default function FeaturedProperties() {
  const [properties, setProperties] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Filter states
  const [activeMarketType, setActiveMarketType] = useState("all")
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeLifestyle, setActiveLifestyle] = useState("all")
  const [filteredProperties, setFilteredProperties] = useState<any[]>([])

  useEffect(() => {
    async function loadProperties() {
      try {
        const data = await getFeaturedProperties()
        if (data && data.length > 0) {
          setProperties(data)
          setFilteredProperties(data)
        } else {
          console.warn("No featured properties returned from Sanity")
        }
      } catch (error) {
        console.error("Error loading featured properties:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProperties()
  }, [])

  // Apply filters when they change
  useEffect(() => {
    let filtered = properties

    if (activeMarketType !== "all") {
      filtered = filtered.filter((property) => property.marketType === activeMarketType)
    }

    if (activeCategory !== "all") {
      filtered = filtered.filter((property) => property.category === activeCategory)
    }

    if (activeLifestyle !== "all") {
      filtered = filtered.filter((property) => property.lifestyle === activeLifestyle)
    }

    setFilteredProperties(filtered)
  }, [activeMarketType, activeCategory, activeLifestyle, properties])

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-black to-[#050505]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Featured <span className="text-[#D4AF37]">Properties</span>
            </h2>
            <div className="w-24 h-1 bg-[#D4AF37]/60 mx-auto mb-6"></div>
            <p className="text-lg text-white/80">
              Discover our handpicked selection of the most exclusive properties in the UAE.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    )
  }

  // Return empty section if no properties data is available
  if (properties.length === 0) {
    return null
  }

  const PropertyCard = ({ property }: { property: any }) => {
    // Get image URL from Sanity
    const imageUrl = property.mainImage 
      ? urlFor(property.mainImage).width(800).height(600).url()
      : "/placeholder.jpg"
    
    // Format the property's slug for the URL
    const propertySlug = property.slug?.current || property._id
    
    return (
      <Link href={`/properties/${propertySlug}`} className="group">
        <div className="bg-[#0a0a0a] border border-ggw-gold/20 rounded-[2px] overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-500 h-full">
          <div className="relative h-[300px]">
            <Image
              src={imageUrl}
              alt={property.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-ggw-gold text-black px-3 py-1 rounded-[2px] text-sm font-medium font-sans">
                {property.status || (property.marketType === "buy" ? "For Sale" : 
                                    property.marketType === "rent" ? "For Rent" : "Off-Plan")}
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <span className="bg-black/70 text-white px-3 py-1 rounded-[2px] text-sm font-medium border border-ggw-gold/30 font-sans">
                {property.type}
              </span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-ggw-gold transition-colors">
              {property.title}
            </h3>

            <div className="flex items-center text-ggw-gold mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm font-sans">{property.location}</span>
            </div>

            <div className="flex items-center justify-between text-white/80 text-sm mb-4 font-sans">
              <div className="flex items-center">
                <BedDouble className="h-4 w-4 mr-1 text-ggw-gold" />
                <span>
                  {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
                </span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1 text-ggw-gold" />
                <span>
                  {property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}
                </span>
              </div>
              <div className="flex items-center">
                <Maximize2 className="h-4 w-4 mr-1 text-ggw-gold" />
                <span>{property.area} sq.ft</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-semibold text-ggw-gold font-sans">{property.price}</span>
              <Link href={`/properties/${propertySlug}`}>
                <Button variant="outline" size="sm" className="rounded-[2px]">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <section className="py-24 bg-gradient-to-b from-black to-[#050505]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="heading-2 mb-6 text-white">
            Featured <span className="text-ggw-gold">Properties</span>
          </h2>
          <div className="w-24 h-1 bg-ggw-gold/60 mx-auto mb-6"></div>
          <p className="text-lg text-white/80 font-sans">
            Discover our handpicked selection of the most exclusive properties in the UAE.
          </p>
        </motion.div>

        <div className="mb-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Market Type:</label>
              <FilterToggle options={marketTypes} activeId={activeMarketType} onChange={setActiveMarketType} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Property Type:</label>
              <FilterToggle options={propertyCategories} activeId={activeCategory} onChange={setActiveCategory} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Lifestyle:</label>
              <FilterToggle options={lifestyleOptions} activeId={activeLifestyle} onChange={setActiveLifestyle} />
            </div>
          </div>
        </div>

        {filteredProperties.length === 0 ? (
          <div className="text-center py-12 bg-[#0a0a0a] border border-ggw-gold/20 rounded-[2px]">
            <p className="text-white/80 mb-4 font-sans">No properties found matching your filters.</p>
            <Button
              variant="outline"
              className="rounded-[2px] font-sans"
              onClick={() => {
                setActiveMarketType("all")
                setActiveCategory("all")
                setActiveLifestyle("all")
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <Carousel
            showArrows={true}
            showDots={true}
            autoPlay={true}
            interval={5000}
            itemsPerView={3}
            className="mb-16"
          >
            {filteredProperties.map((property) => (
              <PropertyCardNew key={property._id} property={property} />
            ))}
          </Carousel>
        )}

        <div className="flex justify-center">
          <Link href="/buy">
            <Button className="bg-black border border-ggw-gold text-ggw-gold hover:bg-ggw-gold/10 flex items-center gap-2 px-8 py-6 text-lg rounded-[2px] transition-all duration-300 transform hover:scale-105 font-sans">
              View All Properties <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

