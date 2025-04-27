import { Metadata } from "next";
import { getPropertyBySlug, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Compass, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import { formatCurrency } from "@/lib/utils";
import { notFound } from "next/navigation";
import ClientPropertyTabs from "./client-property-tabs"; // We'll create this component

// Generate dynamic metadata for each property
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const propertySlug = params.id;
  const property = await getPropertyBySlug(propertySlug);

  if (!property) {
    return {
      title: "Property Not Found | GGW Capital",
      description:
        "The property you are looking for could not be found. Browse our other exclusive property listings.",
    };
  }

  return {
    title: `${property.title} | ${property.marketType === "buy" ? "For Sale" : "For Rent"} | ${property.location || "UAE"}`,
    description: `${property.marketType === "buy" ? "Buy" : "Rent"} this luxury ${property.type || "property"} ${property.bedrooms ? `with ${property.bedrooms} bedrooms` : ""} in ${property.location || "UAE"}.`,
  };
}

// Server component for property details
export default async function PropertyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  // Fetch property data server-side
  const propertySlug = params.id;
  const property = await getPropertyBySlug(propertySlug);

  // Handle property not found
  if (!property) {
    notFound();
  }

  // Format price with commas and AED
  const formattedPrice = property.price
    ? formatCurrency(property.price)
    : "Price on Request";

  // Extract developer name
  const developerName =
    property.developer?.name || property.developer || "Not specified";

  // Extract neighborhood name
  const neighborhoodName =
    property.neighborhood?.name || property.neighborhoodName || "Not specified";

  // Extract lifestyle
  const lifestyleTitle =
    property.lifestyle?.name || property.lifestyleTitle || "";

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 pt-48 pb-16">
        {/* Back button */}
        <div className="mb-6 flex justify-between items-center">
          <Link
            href={
              property.status === "For Sale"
                ? "/buy"
                : property.status === "For Rent"
                  ? "/rent"
                  : "/off-plan"
            }
            className="group"
          >
            <Button
              variant="outline"
              size="sm"
              className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Back to Listings
            </Button>
          </Link>

          <div className="flex gap-2">
            {property.developer && (
              <Link
                href={`/developers?name=${encodeURIComponent(developerName)}`}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                >
                  <Building className="h-4 w-4 mr-2" />
                  Developer
                </Button>
              </Link>
            )}

            {property.neighborhood && (
              <Link
                href={`/neighborhoods/${property.neighborhood?.slug?.current || property.neighborhoodSlug?.current || "#"}`}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                >
                  <Compass className="h-4 w-4 mr-2" />
                  Neighborhood
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Property Title and Location - Server Rendered */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#F5D87A] to-[#D4AF37] bg-clip-text text-transparent">
                {property.title}
              </span>
            </h1>
            <div className="flex items-center text-[#D4AF37] mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-lg">{property.location}</span>
            </div>
            {neighborhoodName !== "Not specified" && (
              <div className="flex items-center text-white/80 mb-4">
                <Compass className="h-4 w-4 mr-1 text-[#D4AF37]/80" />
                <span>{neighborhoodName}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-end">
            <p className="text-2xl md:text-3xl font-bold text-[#D4AF37] mb-2">
              {formattedPrice} {property.status === 'rent' && 'per month'}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-[#0a0a0a] border border-[#D4AF37]/20 px-3 py-1 rounded-full text-sm">
                {property.status}
              </span>
              {lifestyleTitle && (
                <span className="bg-[#0a0a0a] border border-[#D4AF37]/20 px-3 py-1 rounded-full text-sm">
                  {lifestyleTitle}
                </span>
              )}
            </div>

            <div className="flex justify-between mb-2">
              <Link
                href={`https://api.whatsapp.com/send?phone=+971568663666&text=I'm%20interested%20in%20${encodeURIComponent(property.title)}`}
                target="_blank"
              >
                <GradientButton className="w-full md:w-auto">
                  Request Information
                </GradientButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Image - Server Rendered */}
        <div className="mb-12">
          {property.mainImage ? (
            <div className="relative h-[500px] rounded-xl overflow-hidden mb-4">
              <Image
                src={urlFor(property.mainImage).url()}
                alt={property.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="h-[500px] rounded-xl overflow-hidden mb-4 bg-[#0a0a0a] border border-[#D4AF37]/20 flex items-center justify-center">
              <p className="text-white/50">No image available</p>
            </div>
          )}
        </div>

        {/* Property Overview - Server Rendered */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 text-white">
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFDF8E] bg-clip-text text-transparent">
                  About This Property
                </span>
              </h2>
              <p className="text-white/80 whitespace-pre-line mb-6 leading-relaxed">
                {property.description}
              </p>

              {property.views && property.views.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2 text-[#D4AF37]/90">
                    Views
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {property.views.map((view: string, index: number) => (
                      <span
                        key={index}
                        className="bg-black/40 border border-[#D4AF37]/10 px-3 py-1 rounded-full text-sm text-white/90"
                      >
                        {view}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4 text-white">
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#FFDF8E] bg-clip-text text-transparent">
                  Property Details
                </span>
              </h2>

              <div className="space-y-4">
                {property.bedrooms !== undefined && (
                  <div className="flex justify-between items-center border-b border-[#D4AF37]/10 pb-2">
                    <span className="text-white/70">Bedrooms</span>
                    <span className="text-white font-medium">
                      {property.bedrooms}
                    </span>
                  </div>
                )}

                {property.bathrooms !== undefined && (
                  <div className="flex justify-between items-center border-b border-[#D4AF37]/10 pb-2">
                    <span className="text-white/70">Bathrooms</span>
                    <span className="text-white font-medium">
                      {property.bathrooms}
                    </span>
                  </div>
                )}

                {property.area && (
                  <div className="flex justify-between items-center border-b border-[#D4AF37]/10 pb-2">
                    <span className="text-white/70">Area</span>
                    <span className="text-white font-medium">
                      {property.area} sq.ft.
                    </span>
                  </div>
                )}

                {property.type && (
                  <div className="flex justify-between items-center border-b border-[#D4AF37]/10 pb-2">
                    <span className="text-white/70">Type</span>
                    <span className="text-white font-medium">
                      {property.type}
                    </span>
                  </div>
                )}

                {property.status && (
                  <div className="flex justify-between items-center border-b border-[#D4AF37]/10 pb-2">
                    <span className="text-white/70">Status</span>
                    <span className="text-white font-medium">
                      {property.status}
                    </span>
                  </div>
                )}

                {property.furnishingStatus && (
                  <div className="flex justify-between items-center border-b border-[#D4AF37]/10 pb-2">
                    <span className="text-white/70">Furnishing</span>
                    <span className="text-white font-medium">
                      {property.furnishingStatus}
                    </span>
                  </div>
                )}

                {property.marketType === "off-plan" &&
                  property.completionDate && (
                    <div className="flex justify-between items-center border-b border-[#D4AF37]/10 pb-2">
                      <span className="text-white/70">Completion</span>
                      <span className="text-white font-medium">
                        {property.completionDate}
                      </span>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Tabs - Client Component */}
        <ClientPropertyTabs property={property} />

        {/* Additional details - Server Rendered */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Interested in this property?
          </h2>
          <p className="text-white/70 mb-6 max-w-2xl mx-auto">
            Contact our team of experts for more information, to schedule a
            viewing, or to discuss investment opportunities.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/contact">
              <GradientButton>Contact Us</GradientButton>
            </Link>
            <Link
              href={`https://api.whatsapp.com/send?phone=+971568663666&text=I'm%20interested%20in%20${encodeURIComponent(property.title)}`}
              target="_blank"
            >
              <Button
                variant="outline"
                className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
              >
                WhatsApp Inquiry
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
