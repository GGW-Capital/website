import { Suspense } from "react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import PropertyCardSkeleton from "@/components/property-card-skeleton";
import PropertyCard from "@/components/property-card";
import PropertyFilters from "@/components/property-filters";
import Pagination from "@/components/pagination";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  getAllProperties,
  getNeighborhoods,
  getDevelopers,
  urlFor,
} from "@/lib/sanity";
import { Property } from "@/types/property";
import GradientTitle from "@/components/ui/gradient-title";

export const metadata: Metadata = {
  title: "Off-Plan Properties | Luxury Real Estate",
  description:
    "Explore our collection of off-plan properties in prime UAE locations.",
  openGraph: {
    title: "Off-Plan Properties | Luxury Real Estate",
    description:
      "Explore our collection of off-plan properties in prime UAE locations.",
    type: "website",
  },
  
  alternates: {
    canonical: "https://ggwcapitalre.com/off-plan",
  }
};

export const revalidate = 60;

export default async function OffPlanPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Prepare filter parameters from search params
  const propertyFilterParams: Record<string, any> = {
    marketType: "off-plan",
  };

  searchParams = await searchParams;
  // Get current page from URL or default to 1
  const currentPage = searchParams.page
    ? parseInt(searchParams.page as string)
    : 1;
  const itemsPerPage = 9; // Number of properties per page

  // Add neighborhood filter if provided
  if (searchParams.neighborhoods) {
    const neighborhoodIds =
      typeof searchParams.neighborhoods === "string"
        ? searchParams.neighborhoods.split(",")
        : searchParams.neighborhoods;

    if (neighborhoodIds.length > 0) {
      propertyFilterParams.neighborhood = neighborhoodIds[0];
    }
  }

  // Add developer filter if provided
  if (searchParams.developer && searchParams.developer !== "all") {
    propertyFilterParams.developer = searchParams.developer;
  }

  // Add category filter if provided
  if (searchParams.category && searchParams.category !== "all") {
    propertyFilterParams.category = searchParams.category;
  }

  // Add lifestyle filter if provided
  if (searchParams.lifestyle && searchParams.lifestyle !== "all") {
    propertyFilterParams.lifestyle = searchParams.lifestyle;
  }

  // Add completion year filter if provided
  if (searchParams.completionYear && searchParams.completionYear !== "any") {
    propertyFilterParams.completionYear = searchParams.completionYear;
  }

  // Add price range filters if provided
  if (searchParams.minPrice) {
    propertyFilterParams.minPrice = parseInt(searchParams.minPrice as string);
  }

  if (searchParams.maxPrice) {
    propertyFilterParams.maxPrice = parseInt(searchParams.maxPrice as string);
  }

  // Server-side data fetching
  const neighborhoods = await getNeighborhoods();
  const availableNeighborhoods = neighborhoods.map((n: any) => ({
    id: n._id,
    name: n.name,
  }));

  const developers = await getDevelopers();
  const developersData = developers.map((dev: any) => dev.name);

  // Server-side data fetching - get only off-plan properties
  console.log(
    "Fetching off-plan properties with filters:",
    JSON.stringify(propertyFilterParams, null, 2)
  );

  const propertiesData = await getAllProperties(propertyFilterParams);

  // Process properties to format image URLs
  const processedProperties: Property[] =
    propertiesData && propertiesData.length > 0
      ? propertiesData.map((property: any) => ({
          ...property,
          images: property.images
            ? property.images.map((img: any) => urlFor(img).url())
            : [],
          mainImageUrl: property.mainImage
            ? urlFor(property.mainImage).url()
            : "/placeholder.svg",
        }))
      : [];

  console.log(`Found ${processedProperties.length} off-plan properties`);

  // Extract unique locations and completion years for filtering
  const locations = Array.from(
    new Set(
      processedProperties.map((item: any) => item.location).filter(Boolean)
    )
  );

  const completionYears = Array.from(
    new Set(
      processedProperties
        .map((item: any) => {
          if (item.completionYear) return item.completionYear;
          if (item.completionDate) {
            try {
              // Try to extract just the year from completion date
              return new Date(item.completionDate).getFullYear().toString();
            } catch (e) {
              // If we can't parse the date, extract year from string if possible
              const match = item.completionDate.match(/\d{4}/);
              return match ? match[0] : null;
            }
          }
          return null;
        })
        .filter(Boolean)
    )
  );

  // Client-side filtering based on additional search parameters
  let filteredProperties = [...processedProperties];

  // Filter by locations
  if (searchParams.locations) {
    const locationList =
      typeof searchParams.locations === "string"
        ? searchParams.locations.split(",")
        : searchParams.locations;

    if (locationList.length > 0) {
      filteredProperties = filteredProperties.filter((item) =>
        locationList.some((loc) => item.location?.includes(loc))
      );
    }
  }

  // Filter by bedrooms
  if (searchParams.bedrooms && searchParams.bedrooms !== "any") {
    filteredProperties = filteredProperties.filter((item) => {
      if (searchParams.bedrooms === "studio") {
        return item.bedrooms === 0 || item.type?.toLowerCase() === "studio";
      } else if (searchParams.bedrooms === "4+") {
        return item.bedrooms !== undefined && item.bedrooms >= 4;
      } else {
        const bedroomCount = parseInt(searchParams.bedrooms as string);
        return item.bedrooms === bedroomCount;
      }
    });
  }

  // Filter by amenities
  if (searchParams.amenities) {
    const amenityList =
      typeof searchParams.amenities === "string"
        ? searchParams.amenities.split(",")
        : searchParams.amenities;

    if (amenityList.length > 0) {
      filteredProperties = filteredProperties.filter((item) => {
        if (!item.amenities || !Array.isArray(item.amenities)) {
          return false;
        }

        return amenityList.every((amenity) => {
          return item.amenities!.some((propAmenity: any) => {
            if (typeof propAmenity === "string") {
              return propAmenity === amenity;
            } else if (propAmenity && propAmenity.name) {
              return propAmenity.name === amenity;
            }
            return false;
          });
        });
      });
    }
  }

  // Filter by keyword
  if (searchParams.keyword) {
    const keyword = (searchParams.keyword as string).toLowerCase();

    filteredProperties = filteredProperties.filter((item) => {
      const title = item.title || "";
      const location = item.location || "";
      const description = item.description || "";
      const developer =
        typeof item.developer === "string"
          ? item.developer
          : item.developer && item.developer.name
            ? item.developer.name
            : "";

      return (
        title.toLowerCase().includes(keyword) ||
        location.toLowerCase().includes(keyword) ||
        description.toLowerCase().includes(keyword) ||
        developer.toLowerCase().includes(keyword)
      );
    });
  }

  // Calculate pagination
  const totalItems = filteredProperties.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedProperties = filteredProperties.slice(startIndex, endIndex);

  // Create pagination URL helper
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();

    // Preserve all current search parameters
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== "page" && value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.set(key, value);
        }
      }
    });

    // Set the requested page number
    params.set("page", pageNumber.toString());

    return `/off-plan?${params.toString()}`;
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-48 pb-16 bg-gradient-to-b from-[#050505] to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-serif md:text-5xl font-bold mb-6 text-white">
              <GradientTitle element="span">Off-Plan</GradientTitle> Properties
            </h1>
            <div className="w-24 h-1 bg-[#D4AF37]/60 mx-auto mb-6"></div>
            <p className="text-lg text-white/80">
              Discover exclusive off-plan properties in the UAE's most
              prestigious locations
            </p>
          </div>

          <div className="max-w-7xl mx-auto mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {filteredProperties.length} Properties Available
              </h2>
            </div>

            <PropertyFilters
              pageType="off-plan"
              availableLocations={locations as string[]}
              availableDevelopers={developersData}
              availableNeighborhoods={availableNeighborhoods}
              availableCompletionYears={completionYears as string[]}
            />
          </div>

          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {[...Array(6)].map((_, i) => (
                  <PropertyCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            {filteredProperties.length === 0 ? (
              <div className="text-center py-20 bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">
                  No Properties Found
                </h3>
                <p className="text-white/70 mb-8">
                  We couldn't find any off-plan properties matching your
                  criteria. Try adjusting your filters.
                </p>
                <Button asChild>
                  <a href="/off-plan">Reset All Filters</a>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {paginatedProperties.map((property) => (
                  <div
                    key={property._id}
                    className="transition-opacity duration-300"
                  >
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredProperties.length > itemsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                createPageUrl={createPageUrl}
              />
            )}
          </Suspense>
        </div>
      </section>

    </main>
  );
}
