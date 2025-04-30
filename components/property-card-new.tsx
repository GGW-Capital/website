"use client"
import Image from "next/image"
import Link from "next/link"
import { MapPin, BedDouble, Bath, Maximize2, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { urlFor } from "@/lib/sanity"
import { formatCurrency, formatRentalPrice } from "@/lib/utils"

interface PropertyCardProps {
  property: any
}

export default function PropertyCardNew({ property }: PropertyCardProps) {
  // Add a check to handle undefined property
  if (!property) {
    return null
  }

  // Get the property slug for the URL
  const propertySlug = property.slug?.current || property._id
  
  // Get image URL from Sanity
  const imageUrl = property.mainImage 
    ? urlFor(property.mainImage).width(800).height(600).url()
    : "/placeholder.jpg"

  return (
    <div className="group bg-[#0a0a0a] border border-ggw-gold/20 rounded-[2px] overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-500 h-full">
      <div className="relative h-[300px]">
        <Link href={`/properties/${propertySlug}`}>
          <Image
            src={imageUrl}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-ggw-gold text-black px-3 py-1 rounded-[2px] text-sm font-medium font-sans">
              {property.marketType === "buy" ? "For Sale" : 
               property.marketType === "rent" ? "For Rent" : 
               property.marketType === "off-plan" ? "Off Plan" : ""}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className="bg-black/70 text-white px-3 py-1 rounded-[2px] text-sm font-medium border border-ggw-gold/30 font-sans">
              {property.type}
            </span>
          </div>
        </Link>

        {/* Project connection if available */}
        {property.projectId && (
          <div className="absolute bottom-4 left-4">
            <Link href={`/projects/${property.projectSlug || property.projectId}`}>
              <span className="bg-black/70 text-white px-3 py-1 rounded-[2px] text-sm font-medium border border-ggw-gold/30 hover:bg-black/90 font-sans">
                <Building className="h-3 w-3 inline mr-1" />
                {property.projectName ? property.projectName : "View Project"}
              </span>
            </Link>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>

      <div className="p-6">
        <Link href={`/properties/${propertySlug}`}>
          <h3 className="text-xl font-serif font-bold text-white mb-2 group-hover:text-ggw-gold transition-colors">
            {property.title}
          </h3>
        </Link>

        <div className="flex items-center text-ggw-gold mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm font-sans">{property.location}</span>
        </div>

        {property.developer && (
          <div className="flex items-center text-white/70 mb-3 text-sm font-sans">
            <Building className="h-4 w-4 mr-1 text-ggw-gold" />
            <Link
              href={`/off-plan?developer=${property.developer}`}
              className="hover:text-ggw-gold transition-colors"
            >
              Developer: {property.developer}
            </Link>
          </div>
        )}

        <div className="flex items-center justify-between text-white/80 text-sm mb-4 font-sans">
          <div className="flex items-center">
            <BedDouble className="h-4 w-4 mr-1 text-ggw-gold" />
            <span>
              {property.bedrooms === 0 || property.bedrooms === "0" || property.type === "Studio"
                ? "Studio"
                : `${property.bedrooms} ${property.bedrooms === 1 || property.bedrooms === "1" ? "Bed" : "Beds"}`}
            </span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1 text-ggw-gold" />
            <span>
              {property.bathrooms} {property.bathrooms === 1 || property.bathrooms === "1" ? "Bath" : "Baths"}
            </span>
          </div>
          <div className="flex items-center">
            <Maximize2 className="h-4 w-4 mr-1 text-ggw-gold" />
            <span>{property.area} sq.ft</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-semibold text-ggw-gold font-sans">
            {property.marketType === 'rent' 
              ? formatRentalPrice(property)
              : formatCurrency(property.price)
            }
          </span>
          <Link href={`/properties/${propertySlug}`}>
            <Button variant="outline" size="sm" className="rounded-[2px] bg-black text-ggw-gold border-ggw-gold hover:bg-ggw-gold/10">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}