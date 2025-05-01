import Image from "next/image";
import Link from "next/link";
import { MapPin, BedDouble, Bath, Maximize2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeaturedProperties, urlFor } from "@/lib/sanity";
import GradientTitle from "./ui/gradient-title";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Property } from "@/types/property";
import ClientCarouselControls from "./client-carousel-controls";

// This is a server component that fetches and renders the featured properties
export default async function FeaturedPropertiesSection() {
  // Fetch properties from Sanity CMS server-side
  let properties: Property[] = [];
  try {
    properties = await getFeaturedProperties();
    // Limit to 5 properties
    properties = properties.slice(0, 5);
  } catch (error) {
    console.error("Error loading featured properties:", error);
  }

  // Function to render a property card
  const renderPropertyCard = (property: Property, index: number) => {
    return (
      <Link
        key={property._id}
        href={`/properties/${property.slug?.current || property._id}`}
        className="group px-2 carousel-item"
        data-index={index}
        style={{ display: index < 3 ? "block" : "none" }}
      >
        <div
          className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-500 h-full"
         
        >
          <div className="relative h-[250px]">
            {property.mainImage ? (
              <Image
                src={urlFor(property.mainImage).url()}
                alt={property.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
            <div className="absolute top-4 left-4">
              <Badge className="bg-[#D4AF37] text-black px-3 py-1 text-sm font-medium">
                {property.marketType === "rent"
                  ? "For Rent"
                  : property.marketType === "buy"
                    ? "For Sale"
                    : "Off-Plan"}
              </Badge>
            </div>
            {property.category && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-black/70 text-white px-3 py-1 text-sm font-medium border border-[#D4AF37]/30">
                  {property.category.charAt(0).toUpperCase() +
                    property.category.slice(1)}
                </Badge>
              </div>
            )}
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
              {property.title}
            </h3>

            <div className="flex items-center text-[#D4AF37] mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.location}</span>
            </div>

            <div className="flex items-center justify-between text-white/80 text-sm mb-4">
              {property.bedrooms !== undefined && (
                <div className="flex items-center">
                  <BedDouble className="h-4 w-4 mr-1 text-[#D4AF37]" />
                  <span>
                    {property.bedrooms}{" "}
                    {property.bedrooms === 1 ? "Bed" : "Beds"}
                  </span>
                </div>
              )}

              {property.bathrooms !== undefined && (
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1 text-[#D4AF37]" />
                  <span>
                    {property.bathrooms}{" "}
                    {property.bathrooms === 1 ? "Bath" : "Baths"}
                  </span>
                </div>
              )}

              {property.area !== undefined && (
                <div className="flex items-center">
                  <Maximize2 className="h-4 w-4 mr-1 text-[#D4AF37]" />
                  <span>{property.area} sq.ft</span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-3">
              <span className="font-semibold text-[#D4AF37]">
                {property.price !== undefined
                  ? `${formatCurrency(property.price)}`
                  : "Price on Request"}
                {property.marketType === "rent" && "/year"}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section
      id="featured-properties"
      className="py-20 bg-gradient-to-b from-[#050505] to-black"
    >
      <div className="container mx-auto px-4">
        {/* Title and description */}
        <div
          className="max-w-7xl mt-5 mx-auto text-center relative mb-16 duration-1000"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white font-serif">
            Featured <GradientTitle element="span">Properties</GradientTitle>
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37]/60 mx-auto mb-6"></div>
          <p className="text-lg text-white/80">
            Discover our exclusive collection of luxury properties
          </p>
        </div>

        {properties.length > 0 ? (
          <div className="max-w-7xl mx-auto">
            {/* Server-side rendered carousel */}
            <div id="featured-properties-carousel" className="relative px-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {properties.map((property, index) =>
                  renderPropertyCard(property, index)
                )}
              </div>

              {/* Client-side carousel controls */}
              <ClientCarouselControls
                totalItems={properties.length}
                itemsPerView={3}
                carouselId="featured-properties-carousel"
              />
            </div>
          </div>
        ) : (
          <div
            className="text-center py-20 bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl max-w-4xl mx-auto"
            data-taos="fade-up"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              No Featured Properties
            </h3>
            <p className="text-white/70 mb-8">
              Currently, no featured properties are available.
            </p>
          </div>
        )}

        <div
          className="flex justify-center mt-12"
          data-taos="fade-up"
          data-taos-offset="50"
        >
          <Link href="/buy">
            <Button className="bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 px-8 py-6 text-lg font-medium group">
              Explore All Properties
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
