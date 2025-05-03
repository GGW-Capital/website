import { Suspense } from "react"
import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import PropertyCardSkeleton from "@/components/property-card-skeleton"
import PropertyCard from "@/components/property-card"
import PropertyFilters from "@/components/property-filters"
import Pagination from "@/components/pagination"
import { getAllProperties, getNeighborhoods, urlFor } from "@/lib/sanity"
import { Property } from "@/types/property"
import GradientTitle from "@/components/ui/gradient-title"

export const metadata: Metadata = {
  title: "Buy Properties | Luxury Real Estate",
  description: "Browse our exclusive collection of luxury properties for sale. Find your dream home in premium locations.",
  openGraph: {
    title: "Buy Properties | Luxury Real Estate",
    description: "Browse our exclusive collection of luxury properties for sale. Find your dream home in premium locations.",
    type: "website",
  },
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function BuyPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  // Prepare filter parameters from search params for server-side filtering
  const filterParams: Record<string, any> = {
    marketType: "buy",
  }
  searchParams = await searchParams;
  
  // Get current page from URL or default to 1
  const currentPage = searchParams.page ? parseInt(searchParams.page as string) : 1;
  const itemsPerPage = 9; // Number of properties per page
  
  // Add neighborhood filter if provided
  if (searchParams.neighborhoods) {
    const neighborhoodIds = typeof searchParams.neighborhoods === 'string' 
      ? searchParams.neighborhoods.split(',')
      : searchParams.neighborhoods;
      
    if (neighborhoodIds.length > 0) {
      filterParams.neighborhood = neighborhoodIds[0]; // Use the first neighborhood for server filtering
    }
  }
  
  // Add developer filter if provided
  if (searchParams.developer && searchParams.developer !== 'all') {
    filterParams.developer = searchParams.developer;
  }
  
  // Add category filter if provided
  if (searchParams.category && searchParams.category !== 'all') {
    filterParams.category = searchParams.category;
  }
  
  // Add lifestyle filter if provided
  if (searchParams.lifestyle && searchParams.lifestyle !== 'all') {
    filterParams.lifestyle = searchParams.lifestyle;
  }
  
  // Add price range filters if provided
  if (searchParams.minPrice) {
    filterParams.minPrice = parseInt(searchParams.minPrice as string);
  }
  
  if (searchParams.maxPrice) {
    filterParams.maxPrice = parseInt(searchParams.maxPrice as string);
  }
  
  // Server-side data fetching
  const neighborhoods = await getNeighborhoods();
  const availableNeighborhoods = neighborhoods.map((n: any) => ({
    id: n._id,
    name: n.name
  }));
  
  // Server-side initial properties fetch
  const propertiesData = await getAllProperties(filterParams);

  // Process properties to format image URLs - do this on the server
  const processedProperties: Property[] = propertiesData && propertiesData.length > 0
    ? propertiesData.map((property: any) => ({
        ...property,
        images: property.images 
          ? property.images.map((img: any) => urlFor(img).url())
          : [],
        mainImageUrl: property.mainImage ? urlFor(property.mainImage).url() : "/placeholder.svg",
      }))
    : [];
    
  // Extract unique locations, developers, amenities and views for filtering
  const locations = Array.from(new Set(processedProperties.map((p: any) => p.location).filter(Boolean)));
  const developers = Array.from(new Set(processedProperties
    .map((p: any) => p.developer && typeof p.developer === 'object' ? p.developer.name : p.developer)
    .filter(Boolean)
  ));
  
  // Collect all amenities and views
  const allAmenities = new Set<string>();
  const allViews = new Set<string>();
  
  processedProperties.forEach((property: any) => {
    if (property.amenities && Array.isArray(property.amenities)) {
      property.amenities.forEach((amenity: any) => {
        if (typeof amenity === 'string') {
          allAmenities.add(amenity);
        } else if (amenity && amenity.name) {
          allAmenities.add(amenity.name);
        }
      });
    }
    
    if (property.views && Array.isArray(property.views)) {
      property.views.forEach((view: string) => allViews.add(view));
    }
  });
  
  // Client-side filtering based on search parameters
  let filteredProperties = [...processedProperties];
  
  // Apply additional client-side filters
  if (searchParams.locations) {
    const locationList = typeof searchParams.locations === 'string' 
      ? searchParams.locations.split(',') 
      : searchParams.locations;
    
    if (locationList.length > 0) {
      filteredProperties = filteredProperties.filter(property => 
        locationList.some(loc => property.location?.includes(loc))
      );
    }
  }
  
  // Filter by amenities
  if (searchParams.amenities) {
    const amenityList = typeof searchParams.amenities === 'string' 
      ? searchParams.amenities.split(',') 
      : searchParams.amenities;
    
    if (amenityList.length > 0) {
      filteredProperties = filteredProperties.filter(property => {
        if (!property.amenities || !Array.isArray(property.amenities)) {
          return false;
        }
        
        return amenityList.every(amenity => {
          return property.amenities!.some((propAmenity: any) => {
            if (typeof propAmenity === 'string') {
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
  
  // Filter by views
  if (searchParams.views) {
    const viewList = typeof searchParams.views === 'string' 
      ? searchParams.views.split(',') 
      : searchParams.views;
    
    if (viewList.length > 0) {
      filteredProperties = filteredProperties.filter(property => {
        if (!property.views || !Array.isArray(property.views)) {
          return false;
        }
        
        return viewList.some(view => property.views!.includes(view));
      });
    }
  }
  
  // Filter by bedrooms
  if (searchParams.bedrooms && searchParams.bedrooms !== 'any') {
    if (searchParams.bedrooms === 'studio') {
      filteredProperties = filteredProperties.filter(property => 
        property.bedrooms === 0 || property.type?.toLowerCase() === 'studio'
      );
    } else if (searchParams.bedrooms === '4+') {
      filteredProperties = filteredProperties.filter(property => 
        property.bedrooms !== undefined && property.bedrooms >= 4
      );
    } else {
      const bedroomCount = parseInt(searchParams.bedrooms as string);
      filteredProperties = filteredProperties.filter(property => 
        property.bedrooms === bedroomCount
      );
    }
  }
  
  // Filter by bathrooms
  if (searchParams.bathrooms && searchParams.bathrooms !== 'any') {
    if (searchParams.bathrooms === '4+') {
      filteredProperties = filteredProperties.filter(property => 
        property.bathrooms !== undefined && property.bathrooms >= 4
      );
    } else {
      const bathroomCount = parseInt(searchParams.bathrooms as string);
      filteredProperties = filteredProperties.filter(property => 
        property.bathrooms === bathroomCount
      );
    }
  }
  
  // Filter by area
  if (searchParams.minArea && searchParams.maxArea) {
    const minArea = parseInt(searchParams.minArea as string);
    const maxArea = parseInt(searchParams.maxArea as string);
    
    filteredProperties = filteredProperties.filter(property => {
      if (!property.area) return false;
      return property.area >= minArea && property.area <= maxArea;
    });
  }
  
  // Filter by furnishing status
  if (searchParams.furnishingStatus && searchParams.furnishingStatus !== 'any') {
    filteredProperties = filteredProperties.filter(property => 
      property.furnishingStatus === searchParams.furnishingStatus
    );
  }
  
  // Filter by keyword
  if (searchParams.keyword) {
    const keyword = (searchParams.keyword as string).toLowerCase();
    
    filteredProperties = filteredProperties.filter(property => {
      return (
        (property.title && property.title.toLowerCase().includes(keyword)) ||
        (property.location && property.location.toLowerCase().includes(keyword)) ||
        (property.type && property.type.toLowerCase().includes(keyword)) ||
        (property.description && property.description.toLowerCase().includes(keyword)) ||
        (typeof property.developer === 'string' && property.developer.toLowerCase().includes(keyword)) ||
        (property.developer && typeof property.developer === 'object' && 
         property.developer.name && property.developer.name.toLowerCase().includes(keyword))
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
      if (key !== 'page' && value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach(v => params.append(key, v));
        } else {
          params.set(key, value);
        }
      }
    });
    
    // Set the requested page number
    params.set('page', pageNumber.toString());
    
    return `/buy?${params.toString()}`;
  };

  // Return the server-rendered page with all the data needed by the client component
  return (
    <section>
      <div className="pt-48 pb-20 bg-gradient-to-b from-[#050505] to-black">
        <div className="container mx-auto px-4">
          <header className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-serif md:text-5xl font-bold mb-6 text-white">
              Properties for <GradientTitle element="span">Sale</GradientTitle>
            </h1>
            <div className="w-24 h-1 bg-[#D4AF37]/60 mx-auto mb-6" aria-hidden="true"></div>
            <p className="text-lg text-white/80">
              Discover our exclusive collection of luxury properties for sale in the UAE
            </p>
          </header>

          <div className="max-w-7xl mx-auto mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">{filteredProperties.length} Properties Available</h2>
            </div>

            <PropertyFilters 
              pageType="buy"
              availableLocations={locations as string[]}
              availableDevelopers={developers as string[]}
              availableAmenities={Array.from(allAmenities)}
              availableViews={Array.from(allViews)}
              availableNeighborhoods={availableNeighborhoods}
            />
          </div>

          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[...Array(6)].map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          }>
            {filteredProperties.length === 0 ? (
              <div className="text-center py-20 bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">No Properties Found</h3>
                <p className="text-white/70 mb-8">
                  We couldn't find any properties matching your criteria. Try adjusting your filters.
                </p>
                <Button asChild>
                  <a href="/buy">
                    Reset All Filters
                  </a>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {paginatedProperties.map((property) => (
                  <div key={property._id} className="transition-opacity duration-300">
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
      </div>
    </section>
  )
}