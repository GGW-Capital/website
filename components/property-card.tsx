
import Image from "next/image"
import Link from "next/link"
import { MapPin, BedDouble, Bath, Maximize2, Building } from "lucide-react"
import { formatCurrency, formatRentalPrice } from "@/lib/utils"
import { urlFor } from "@/lib/sanity"

interface PropertyCardProps {
  property: any
}

export default function PropertyCard({ property }: PropertyCardProps) {
  // Add a check to handle undefined property
  if (!property) {
    return null
  }


  return (
    <div className="group">
      <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-500 h-full">
        <div className="relative h-[300px]">
          <Image
            src={property.mainImage ? urlFor(property.mainImage).width(800).height(533).url() : "/placeholder.jpg"}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-[#D4AF37] text-black px-3 py-1 rounded-md text-sm font-medium">
              {property.marketType === "buy" ? "For Sale" : 
               property.marketType === "rent" ? "For Rent" : 
               property.marketType === "off-plan" ? "Off Plan" : ""}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className="bg-black/70 text-white px-3 py-1 rounded-md text-sm font-medium border border-[#D4AF37]/30">
              {property.type}
            </span>
          </div>

          {/* Project connection if available */}
          {property.projectId && (
            <div className="absolute bottom-4 left-4">
              <Link href={`/projects/${property.projectSlug?.current || property.projectId}`}>
                <span className="bg-black/70 text-white px-3 py-1 rounded-md text-sm font-medium border border-[#D4AF37]/30 hover:bg-black/90">
                  <Building className="h-3 w-3 inline mr-1" />
                  View Project
                </span>
              </Link>
            </div>
          )}

          <div className="absolute group-hover:scale-110 inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
        </div>

        <div className="p-6">
          <Link href={`/properties/${property.slug.current}`} className="text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
            {property.title}
          </Link>

          <div className="flex items-center text-[#D4AF37] mb-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.location}</span>
          </div>

          {property.developer && (
            <div className="flex items-center text-white/70 mb-3 text-sm">
              <Building className="h-4 w-4 mr-1 text-[#D4AF37]" />
              <Link
                href={`/off-plan?developer=${property.developer}`}
                className="hover:text-[#D4AF37] transition-colors"
              >
                Developer: {property.developer}
              </Link>
            </div>
          )}
          
          {property.lifestyle && (
            <div className="flex items-center text-white/70 mb-3 text-sm">
              <span className="inline-block w-4 h-4 mr-1 text-[#D4AF37]">✦</span>
              <Link
                href={`/buy?lifestyle=${property.lifestyle}`}
                className="hover:text-[#D4AF37] transition-colors"
              >
                Lifestyle: {property.lifestyleTitle || property.lifestyle}
              </Link>
            </div>
          )}

          <div className="flex items-center justify-between text-white/80 text-sm mb-4">
            <div className="flex items-center">
              <BedDouble className="h-4 w-4 mr-1 text-[#D4AF37]" />
              <span>
                {property.bedrooms === 0 || property.bedrooms === "0" || property.type === "Studio"
                  ? "Studio"
                  : `${property.bedrooms} ${property.bedrooms === 1 || property.bedrooms === "1" ? "Bed" : "Beds"}`}
              </span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1 text-[#D4AF37]" />
              <span>
                {property.bathrooms} {property.bathrooms === 1 || property.bathrooms === "1" ? "Bath" : "Baths"}
              </span>
            </div>
            <div className="flex items-center">
              <Maximize2 className="h-4 w-4 mr-1 text-[#D4AF37]" />
              <span>{property.area} sq.ft</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-[#D4AF37]">
              {property.marketType === 'rent' 
                ? formatRentalPrice(property)
                : formatCurrency(property.price)
              }
            </span>
            <Link href={`/properties/${property.slug.current}`} className="border-[#D4AF37] bg-transparent transition-colors font-semibold border-[1px] text-sm px-[14px] py-2 border-solid text-[#D4AF37] hover:bg-[#D4AF37]/10">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}