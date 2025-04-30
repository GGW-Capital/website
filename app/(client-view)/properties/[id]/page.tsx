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
  params = await params;
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

  // Get status label based on marketType
  const statusLabel =
    property.marketType === "buy"
      ? "For Sale"
      : property.marketType === "rent"
        ? "For Rent"
        : "Off Plan";

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 pt-48 pb-16">
        {/* Back button */}
        <div className="mb-6 flex justify-between items-center">
          <Link
            href={
              property.marketType === "buy"
                ? "/buy"
                : property.marketType === "rent"
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

        {/* Property title */}
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          {property.title}
        </h1>

        {/* Property location */}
        <div className="flex items-center text-[#D4AF37] mb-8">
          <MapPin className="h-5 w-5 mr-2" />
          <span className="text-lg">{property.location}</span>
        </div>

        {/* Property description */}
        <div className="mb-12">
          <p className="text-lg text-white/80 leading-relaxed mb-8">
            {property.description}
          </p>
        </div>

        {/* Property details grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Main image & features */}
          <div className="md:col-span-2">
            {/* Main image */}
            <div className="relative h-[500px] w-full rounded-xl overflow-hidden mb-8">
              {property.mainImage ? (
                <Image
                  src={urlFor(property.mainImage).url()}
                  alt={property.title}
                  className="object-cover"
                  fill
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                  <p className="text-white/50">No image available</p>
                </div>
              )}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-[#D4AF37] text-black px-3 py-1 rounded-md text-sm font-medium">
                  {statusLabel}
                </span>
              </div>
            </div>

            {/* Property overview */}
            <div className="bg-[#080808] rounded-xl p-6 border border-[#D4AF37]/10">
              <h2 className="text-xl font-bold mb-4">Property Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                {property.bedrooms && (
                  <div>
                    <p className="text-white/60 text-sm">Bedrooms</p>
                    <p className="text-white font-medium">
                      {property.bedrooms}{" "}
                      {property.bedrooms === 1 ? "Bed" : "Beds"}
                    </p>
                  </div>
                )}

                <div>
                  <p className="text-white/60 text-sm">Bathrooms</p>
                  <p className="text-white font-medium">
                    {property.bathrooms || 0}{" "}
                    {property.bathrooms === 1 ? "Bath" : "Baths"}
                  </p>
                </div>

                {property.area && (
                  <div>
                    <p className="text-white/60 text-sm">Area</p>
                    <p className="text-white font-medium">
                      {property.area} sq.ft
                    </p>
                  </div>
                )}

                {property.type && (
                  <div>
                    <p className="text-white/60 text-sm">Property Type</p>
                    <p className="text-white font-medium">{property.type}</p>
                  </div>
                )}

                {property.furnishingStatus && (
                  <div>
                    <p className="text-white/60 text-sm">Furnishing</p>
                    <p className="text-white font-medium">
                      {property.furnishingStatus}
                    </p>
                  </div>
                )}

                {developerName && developerName !== "Not specified" && (
                  <div>
                    <p className="text-white/60 text-sm">Developer</p>
                    <p className="text-white font-medium">{developerName}</p>
                  </div>
                )}

                {neighborhoodName && neighborhoodName !== "Not specified" && (
                  <div>
                    <p className="text-white/60 text-sm">Neighborhood</p>
                    <p className="text-white font-medium">{neighborhoodName}</p>
                  </div>
                )}

                {lifestyleTitle && (
                  <div>
                    <p className="text-white/60 text-sm">Lifestyle</p>
                    <p className="text-white font-medium">{lifestyleTitle}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Price & property highlights */}
          <div>
            {/* Price card */}
            <div className="bg-[#D4AF37] rounded-xl p-6 text-black mb-8">
              <h2 className="text-xl font-bold mb-2">Price</h2>
              <p className="text-2xl font-bold mb-1">
                {formattedPrice} {property.marketType === "rent" && "per month"}
              </p>
              <div className="flex items-center bg-black/10 px-3 py-1 rounded-md w-fit">
                <span className="text-sm font-medium">{statusLabel}</span>
              </div>
            </div>

            {/* Request info */}
            <div className="bg-[#080808] rounded-xl p-6 border border-[#D4AF37]/10 mb-8">
              <h2 className="text-xl font-bold mb-4">Request Information</h2>
              <p className="text-white/70 mb-4">
                Contact us to learn more about this exclusive property.
              </p>
              <div className="space-y-3">
                <Link href="/contact">
                  <GradientButton className="w-full">
                    Contact Agent
                  </GradientButton>
                </Link>
                <Link
                  href={`https://api.whatsapp.com/send?phone=+971568663666&text=I'm%20interested%20in%20${encodeURIComponent(
                    property.title
                  )}`}
                  target="_blank"
                >
                  <Button
                    variant="outline"
                    className="w-full border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                  >
                    WhatsApp Inquiry
                  </Button>
                </Link>
              </div>
            </div>

            {/* Property details */}
            <div className="bg-[#080808] rounded-xl p-6 border border-[#D4AF37]/10">
              <h2 className="text-xl font-bold mb-4">Property Details</h2>
              <div className="space-y-2">
                {property.marketType && (
                  <div className="flex justify-between items-center border-b border-[#D4AF37]/10 pb-2">
                    <span className="text-white/70">Status</span>
                    <span className="text-white font-medium">
                      {statusLabel}
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
