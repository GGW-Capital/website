import type { Metadata } from "next";
import { getPropertyBySlug, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Compass, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import { formatCurrency } from "@/lib/utils";
import { notFound } from "next/navigation";
import ClientPropertyTabs from "./client-property-tabs";

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

  // Create a more descriptive title
  const propertyTitle = `${property.title} - ${property.bedrooms || ""} ${property.bedrooms === 1 ? "Bedroom" : property.bedrooms ? "Bedrooms" : ""} ${property.type || ""} ${property.marketType === "buy" ? "For Sale" : property.marketType === "rent" ? "For Rent" : "Off Plan"} in ${property.location || "UAE"} | GGW Capital`;

  // Create a more detailed description with key selling points
  const propertyDescription = `${property.marketType === "buy" ? "Buy" : property.marketType === "rent" ? "Rent" : "Invest in"} this luxury ${property.type || "property"} ${property.bedrooms ? `with ${property.bedrooms} bedrooms` : ""} in ${property.location || "UAE"}. ${property.area ? `${property.area} sq.ft. ` : ""}${property.features && property.features.length > 0 ? `Features include: ${property.features.slice(0, 3).join(", ")}. ` : ""}Contact GGW Capital for exclusive viewings.`;

  // Format price for OG tags
  const formattedPrice = property.price
    ? formatCurrency(property.price)
    : "Price on Request";

  // Get main image URL for OG tags
  const mainImageUrl = property.mainImage
    ? urlFor(property.mainImage).width(1200).height(630).url()
    : "https://www.ggwcapitalre.com/default-property-image.jpg"; // Replace with your default image

  return {
    title: propertyTitle,
    description: propertyDescription,
    openGraph: {
      title: propertyTitle,
      description: propertyDescription,
      images: [
        {
          url: mainImageUrl,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
      locale: "en_US",
      type: "website",
      siteName: "GGW Capital",
      url: `https://www.ggwcapitalre.com/properties/${propertySlug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: propertyTitle,
      description: propertyDescription,
      images: [mainImageUrl],
      creator: "@ggwcapital", // Replace with your Twitter handle
    },
    alternates: {
      canonical: `https://www.ggwcapitalre.com/properties/${propertySlug}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    keywords: [
      property.title,
      property.type || "property",
      property.location || "UAE",
      property.marketType === "buy"
        ? "property for sale"
        : property.marketType === "rent"
          ? "property for rent"
          : "off plan property",
      `${property.bedrooms || ""} bedroom property`,
      "luxury property",
      "GGW Capital",
      property.neighborhood?.name || "",
      property.developer?.name || "",
    ]
      .filter(Boolean)
      .join(", "),
  };
}

// JSON-LD structured data for the property
export function generateJsonLd(property: any) {
  // Format price with commas and AED
  const formattedPrice = property.price
    ? formatCurrency(property.price)
    : "Price on Request";

  // Get status label based on marketType
  const statusLabel =
    property.marketType === "buy"
      ? "For Sale"
      : property.marketType === "rent"
        ? "For Rent"
        : "Off Plan";

  // Extract developer name
  const developerName = property.developer?.name || "";

  // Extract neighborhood name
  const neighborhoodName = property.neighborhood?.name || "";

  // Get main image URL
  const mainImageUrl = property.mainImage
    ? urlFor(property.mainImage).width(1200).height(630).url()
    : "https://www.ggwcapitalre.com/default-property-image.jpg"; // Replace with your default image

  // Get all image URLs
  const imageUrls = property.images
    ? property.images.map((image: any) => urlFor(image).url())
    : [];

  // Add main image to the array if not already included
  if (mainImageUrl && !imageUrls.includes(mainImageUrl)) {
    imageUrls.unshift(mainImageUrl);
  }

  // Extract amenities - handle both string arrays and reference arrays
  const amenitiesList = property.amenities
    ? property.amenities.map((amenity: any) =>
        typeof amenity === "string" ? amenity : amenity.name || ""
      )
    : [];

  // Get coordinates from Google Maps URL if available
  let latitude = null;
  let longitude = null;
  if (property.googleMapsUrl) {
    const match = property.googleMapsUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (match) {
      latitude = Number.parseFloat(match[1]);
      longitude = Number.parseFloat(match[2]);
    }
  }

  // Determine price based on market type
  let priceValue = property.price;
  let pricePeriod = null;

  if (property.marketType === "rent") {
    if (property.defaultRentalPeriod === "weekly" && property.priceWeekly) {
      priceValue = property.priceWeekly;
      pricePeriod = "WEEK";
    } else if (
      property.defaultRentalPeriod === "monthly" &&
      property.priceMonthly
    ) {
      priceValue = property.priceMonthly;
      pricePeriod = "MONTH";
    } else if (
      property.defaultRentalPeriod === "yearly" &&
      property.priceYearly
    ) {
      priceValue = property.priceYearly;
      pricePeriod = "YEAR";
    }
  }

  // Build the structured data object
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    url: `https://www.ggwcapitalre.com/properties/${property.slug?.current || ""}`,
    datePosted: property._createdAt || new Date().toISOString(),
    image: imageUrls,
  };

  // Add price information if available
  if (priceValue) {
    jsonLd.offers = {
      "@type": "Offer",
      price: priceValue,
      priceCurrency: "AED",
      availability: "https://schema.org/InStock",
      validFrom: property._createdAt || new Date().toISOString(),
    };

    if (pricePeriod) {
      jsonLd.offers.priceValidUntil = new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      ).toISOString();
      jsonLd.offers.unitPriceSpecification = {
        "@type": "UnitPriceSpecification",
        price: priceValue,
        priceCurrency: "AED",
        unitCode: pricePeriod,
        billingIncrement: 1,
        priceType: "https://schema.org/UnitPriceSpecification",
      };
    }
  }

  // Add address if location is available
  if (property.location) {
    jsonLd.address = {
      "@type": "PostalAddress",
      addressLocality: property.location,
      addressRegion: neighborhoodName || "Dubai",
      addressCountry: "AE",
    };
  }

  // Add geo coordinates if available
  if (latitude && longitude) {
    jsonLd.geo = {
      "@type": "GeoCoordinates",
      latitude: latitude,
      longitude: longitude,
    };
  }

  // Add property details if available
  if (property.bedrooms) {
    jsonLd.numberOfRooms = property.bedrooms;
  }

  if (property.bathrooms) {
    jsonLd.numberOfBathroomsTotal = property.bathrooms;
  }

  if (property.area) {
    jsonLd.floorSize = {
      "@type": "QuantitativeValue",
      value: property.area,
      unitCode: "FTK", // Square feet
    };
  }

  // Add amenities if available
  if (amenitiesList.length > 0) {
    jsonLd.amenityFeature = amenitiesList.map((amenity: string) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
    }));
  }

  // Add broker information
  jsonLd.broker = {
    "@type": "RealEstateAgent",
    name: "GGW Capital",
    telephone: "+971568663666",
    email: "info@ggwcapitalre.com", // Replace with your actual email
    url: "https://www.ggwcapitalre.com",
    logo: "https://www.ggwcapitalre.com/logo.png", // Replace with your actual logo URL
  };

  // Add additional properties
  jsonLd.additionalProperty = [
    {
      "@type": "PropertyValue",
      name: "propertyType",
      value: property.type || null,
    },
    {
      "@type": "PropertyValue",
      name: "listingStatus",
      value: statusLabel,
    },
    {
      "@type": "PropertyValue",
      name: "furnishingStatus",
      value: property.furnishingStatus || null,
    },
    {
      "@type": "PropertyValue",
      name: "developer",
      value: developerName || null,
    },
    {
      "@type": "PropertyValue",
      name: "completionDate",
      value:
        property.marketType === "off-plan"
          ? property.completionDate || null
          : null,
    },
  ].filter((item) => item.value !== null);

  return jsonLd;
}

// Server component for property details
export default async function PropertyDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  params = await params;
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

  // Generate JSON-LD structured data
  const jsonLd = generateJsonLd(property);

  return (
    <>
      {/* Add JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* BreadcrumbList schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.ggwcapitalre.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name:
                  property.marketType === "buy"
                    ? "Properties For Sale"
                    : property.marketType === "rent"
                      ? "Properties For Rent"
                      : "Off Plan Properties",
                item: `https://www.ggwcapitalre.com/${property.marketType === "buy" ? "buy" : property.marketType === "rent" ? "rent" : "off-plan"}`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: property.title,
                item: `https://www.ggwcapitalre.com/properties/${propertySlug}`,
              },
            ],
          }),
        }}
      />

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
                    src={
                      urlFor(property.mainImage)
                        .width(1600)
                        .height(1066)
                        .url() || "/placeholder.svg"
                    }
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
                      <p className="text-white font-medium">
                        {neighborhoodName}
                      </p>
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
                  {formattedPrice}{" "}
                  {property.marketType === "rent" && "per month"}
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
                    rel="noopener noreferrer"
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
                rel="noopener noreferrer"
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
    </>
  );
}
