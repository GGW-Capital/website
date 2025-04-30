"use client"

import { useState, useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  Search,
  Filter,
  ChevronDown,
  X,
  Palmtree,
  Car,
  Dumbbell,
  PocketIcon as Pool,
  Wifi,
  UtensilsCrossed,
  Lock,
  Mountain,
  Sparkles,
  Building,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { GradientButton } from "@/components/ui/gradient-button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import FilterToggle from "@/components/filter-toggle"
import { motion, AnimatePresence } from "framer-motion"
import { getLifestyles, getNeighborhoods } from "@/lib/sanity"

// Define our filter options
const marketTypes = [
  { id: "buy", label: "For Sale" },
  { id: "rent", label: "For Rent" },
  { id: "off-plan", label: "Off-Plan" },
]

const propertyCategories = [
  { id: "apartment", label: "Apartment" },
  { id: "villa", label: "Villa" },
  { id: "penthouse", label: "Penthouse" },
  { id: "townhouse", label: "Townhouse" },
]

// Default lifestyle options before Sanity data loads
const defaultLifestyleOptions = [
  { id: "luxury", label: "Luxury" },
  { id: "beachfront", label: "Beachfront" },
  { id: "family", label: "Family" },
  { id: "urban", label: "Urban" },
  { id: "investment", label: "Investment" },
]

const amenityIcons: Record<string, React.ReactNode> = {
  "pool": <Pool className="h-4 w-4" />,
  "gym": <Dumbbell className="h-4 w-4" />,
  "parking": <Car className="h-4 w-4" />,
  "security": <Lock className="h-4 w-4" />,
  "balcony": <Palmtree className="h-4 w-4" />,
  "wifi": <Wifi className="h-4 w-4" />,
  "furnished": <Sparkles className="h-4 w-4" />,
  "kitchen": <UtensilsCrossed className="h-4 w-4" />,
  "view": <Mountain className="h-4 w-4" />,
}

interface PropertyFiltersProps {
  pageType: 'buy' | 'rent' | 'off-plan'
  availableLocations?: string[]
  availableDevelopers?: string[]
  availableAmenities?: string[]
  availableViews?: string[]
  availableNeighborhoods?: { id: string, name: string }[]
  availableCompletionYears?: string[]
  onFilterChange?: (filters: any) => void
}

export default function PropertyFilters({
  pageType,
  availableLocations = [],
  availableDevelopers = [],
  availableAmenities = [],
  availableViews = [],
  availableNeighborhoods = [],
  availableCompletionYears = [],
  onFilterChange
}: PropertyFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  // State for search and filters
  const [searchKeyword, setSearchKeyword] = useState(searchParams.get('keyword') || '')
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  
  // Add state for neighborhoods
  const [neighborhoodOptions, setNeighborhoodOptions] = useState<{ id: string; name: string }[]>(availableNeighborhoods)
  
  // Add state for lifestyle options
  const [lifestyleOptions, setLifestyleOptions] = useState(defaultLifestyleOptions)

  // Filter states with defaults from search params
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all')
  const [activeLifestyle, setActiveLifestyle] = useState(searchParams.get('lifestyle') || 'all')
  const [activeDeveloper, setActiveDeveloper] = useState(searchParams.get('developer') || 'all')
  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    searchParams.get('locations')?.split(',').filter(Boolean) || []
  )
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>(
    searchParams.get('neighborhoods')?.split(',').filter(Boolean) || []
  )
  
  // Set price range based on page type
  const defaultMinPrice = pageType === 'rent' ? 50000 : 500000
  const defaultMaxPrice = pageType === 'rent' ? 500000 : 20000000
  const parsedMinPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice') || '') : defaultMinPrice
  const parsedMaxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice') || '') : defaultMaxPrice
  
  const [priceRange, setPriceRange] = useState<[number, number]>([parsedMinPrice, parsedMaxPrice])
  
  // Area range
  const parsedMinArea = searchParams.get('minArea') ? parseInt(searchParams.get('minArea') || '') : 500
  const parsedMaxArea = searchParams.get('maxArea') ? parseInt(searchParams.get('maxArea') || '') : 10000
  const [areaRange, setAreaRange] = useState<[number, number]>([parsedMinArea, parsedMaxArea])
  
  // Bedrooms & bathrooms
  const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') || 'any')
  const [bathrooms, setBathrooms] = useState(searchParams.get('bathrooms') || 'any')
  
  // Amenities, views, completion year, furnishing status
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(
    searchParams.get('amenities')?.split(',').filter(Boolean) || []
  )
  const [selectedViews, setSelectedViews] = useState<string[]>(
    searchParams.get('views')?.split(',').filter(Boolean) || []
  )
  const [completionYear, setCompletionYear] = useState(searchParams.get('completionYear') || 'any')
  const [furnishingStatus, setFurnishingStatus] = useState(searchParams.get('furnishingStatus') || 'any')

  // Format price for display
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M AED`
    } else {
      return `${(price / 1000).toFixed(0)}K AED`
    }
  }

  // Format area for display
  const formatArea = (area: number) => {
    return `${area.toLocaleString()} sq.ft`
  }

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateFilters({ keyword: searchKeyword })
  }

  // Toggle location selection
  const toggleLocation = (locationId: string) => {
    setSelectedLocations((prev) =>
      prev.includes(locationId) ? prev.filter((id) => id !== locationId) : [...prev, locationId],
    )
  }

  // Toggle view selection
  const toggleView = (viewId: string) => {
    setSelectedViews((prev) => (prev.includes(viewId) ? prev.filter((id) => id !== viewId) : [...prev, viewId]))
  }

  // Toggle amenity selection
  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenityId) ? prev.filter((id) => id !== amenityId) : [...prev, amenityId],
    )
  }

  // Toggle neighborhood selection
  const toggleNeighborhood = (neighborhoodId: string) => {
    setSelectedNeighborhoods((prev) =>
      prev.includes(neighborhoodId) ? prev.filter((id) => id !== neighborhoodId) : [...prev, neighborhoodId],
    )
  }
  
  // Update URL parameters and trigger filter change
  const updateFilters = (newFilters: Record<string, any>) => {
    // Create a new URLSearchParams object from the current parameters
    const params = new URLSearchParams(searchParams.toString())
    
    // Update parameters based on new filters
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === null || value === undefined || value === '' || value === 'all' || 
          (Array.isArray(value) && value.length === 0)) {
        params.delete(key)
      } else if (Array.isArray(value)) {
        params.set(key, value.join(','))
      } else {
        params.set(key, String(value))
      }
    })
    
    // Remove empty or default parameters
    Array.from(params.keys()).forEach(key => {
      const value = params.get(key)
      if (value === '' || value === 'all') {
        params.delete(key)
      }
    })
    
    // Build the new URL
    const newUrl = `${pathname}?${params.toString()}`
    
    // Update the URL in history
    router.push(newUrl, { scroll: false })
    
    // Call the onFilterChange handler if provided
    if (onFilterChange) {
      // Construct the filter object
      const filterObject = {
        marketType: pageType,
        category: activeCategory === 'all' ? undefined : activeCategory,
        lifestyle: activeLifestyle === 'all' ? undefined : activeLifestyle,
        developer: activeDeveloper === 'all' ? undefined : activeDeveloper,
        locations: selectedLocations.length > 0 ? selectedLocations : undefined,
        priceRange: priceRange,
        areaRange: areaRange,
        bedrooms: bedrooms === 'any' ? undefined : bedrooms,
        bathrooms: bathrooms === 'any' ? undefined : bathrooms,
        amenities: selectedAmenities.length > 0 ? selectedAmenities : undefined,
        views: selectedViews.length > 0 ? selectedViews : undefined,
        completionYear: completionYear === 'any' ? undefined : completionYear,
        furnishingStatus: furnishingStatus === 'any' ? undefined : furnishingStatus,
        neighborhoods: selectedNeighborhoods.length > 0 ? selectedNeighborhoods : undefined,
        keyword: searchKeyword || undefined,
        ...newFilters
      }
      
      onFilterChange(filterObject)
    }
  }
  
  // Apply category filter immediately when changed
  useEffect(() => {
    if (activeCategory !== (searchParams.get('category') || 'all')) {
      updateFilters({ category: activeCategory })
    }
  }, [activeCategory])
  
  // Apply lifestyle filter immediately when changed
  useEffect(() => {
    if (activeLifestyle !== (searchParams.get('lifestyle') || 'all')) {
      updateFilters({ lifestyle: activeLifestyle })
    }
  }, [activeLifestyle])
  
  // Apply developer filter immediately when changed
  useEffect(() => {
    if (activeDeveloper !== (searchParams.get('developer') || 'all')) {
      updateFilters({ developer: activeDeveloper })
    }
  }, [activeDeveloper])
  
  // Apply all filters when Apply button is clicked
  const applyFilters = () => {
    updateFilters({
      locations: selectedLocations,
      priceRange: priceRange.length === 2 ? [priceRange[0], priceRange[1]] : undefined,
      areaRange: areaRange.length === 2 ? [areaRange[0], areaRange[1]] : undefined,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      amenities: selectedAmenities,
      views: selectedViews,
      completionYear: completionYear,
      furnishingStatus: furnishingStatus,
      neighborhoods: selectedNeighborhoods,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minArea: areaRange[0],
      maxArea: areaRange[1]
    })
    
    setShowMobileFilters(false)
  }

  // Reset all filters
  const resetFilters = () => {
    setActiveCategory('all')
    setActiveLifestyle('all')
    setActiveDeveloper('all')
    setSelectedLocations([])
    setSelectedNeighborhoods([])
    setPriceRange(pageType === 'rent' ? [50000, 500000] : [500000, 20000000])
    setAreaRange([500, 10000])
    setBedrooms('any')
    setBathrooms('any')
    setSelectedAmenities([])
    setSelectedViews([])
    setCompletionYear('any')
    setFurnishingStatus('any')
    setSearchKeyword('')
    
    // Clear all search parameters and redirect to the base URL
    router.push(pathname, { scroll: false })
    
    // Call onFilterChange with empty filters
    if (onFilterChange) {
      onFilterChange({
        marketType: pageType,
      })
    }
    
    setShowMobileFilters(false)
  }

  // Fetch neighborhoods and lifestyle data
  useEffect(() => {
    async function fetchNeighborhoods() {
      try {
        // Skip if we already have neighborhoods provided through props
        if (availableNeighborhoods.length > 0) {
          setNeighborhoodOptions(availableNeighborhoods)
          return
        }
        
        const neighborhoods = await getNeighborhoods();
        if (neighborhoods && neighborhoods.length > 0) {
          setNeighborhoodOptions(
            neighborhoods.map((n: any) => ({
              id: n._id,
              name: n.name
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching neighborhoods:', error);
      }
    }
    
    async function fetchLifestyles() {
      try {
        const lifestyleData = await getLifestyles(true); // true = include "All" option
        
        if (lifestyleData && lifestyleData.length > 0) {
          setLifestyleOptions(lifestyleData);
        }
      } catch (error) {
        console.error('Error fetching lifestyle data:', error);
        // Keep the default options if there's an error
      }
    }
    
    fetchNeighborhoods();
    fetchLifestyles();
  }, [availableNeighborhoods]);

  return (
    <div className="w-full">
      {/* Top Filters and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex-1 min-w-0">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search properties by location, name, features..."
              className="w-full bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white pr-10"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#D4AF37]"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form>

        {/* Primary Filters */}
        <div className="flex space-x-2">
          {/* Category Filter */}
          <div className="hidden md:flex">
            <Select value={activeCategory} onValueChange={setActiveCategory}>
              <SelectTrigger className="w-36 bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F0F0F] border-[#D4AF37]/30">
                <SelectItem value="all" className="text-white hover:bg-[#D4AF37]/10">All Types</SelectItem>
                {propertyCategories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                    className="text-white hover:bg-[#D4AF37]/10"
                  >
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Lifestyle Filter */}
          <div className="hidden md:flex">
            <Select value={activeLifestyle} onValueChange={setActiveLifestyle}>
              <SelectTrigger className="w-36 bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white">
                <SelectValue placeholder="Lifestyle" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F0F0F] border-[#D4AF37]/30">
                {lifestyleOptions.map((lifestyle) => (
                  <SelectItem
                    key={lifestyle.id}
                    value={lifestyle.id}
                    className="text-white hover:bg-[#D4AF37]/10"
                  >
                    {lifestyle.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Developer Filter */}
          {availableDevelopers.length > 0 && (
            <div className="hidden md:flex">
              <Select value={activeDeveloper} onValueChange={setActiveDeveloper}>
                <SelectTrigger className="w-36 bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white">
                  <SelectValue placeholder="Developer" />
                </SelectTrigger>
                <SelectContent className="bg-[#0F0F0F] border-[#D4AF37]/30">
                  <SelectItem value="all" className="text-white hover:bg-[#D4AF37]/10">All Developers</SelectItem>
                  {availableDevelopers.map((developer) => (
                    <SelectItem
                      key={developer}
                      value={developer}
                      className="text-white hover:bg-[#D4AF37]/10"
                    >
                      {developer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Advanced Filters Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="hidden md:flex items-center border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 text-white"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            <ChevronDown
              className={`h-4 w-4 ml-2 transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`}
            />
          </Button>

          {/* Mobile Filters Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowMobileFilters(true)}
            className="md:hidden flex flex-1 items-center border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 text-white"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Desktop Advanced Filters */}
      <AnimatePresence>
        {showAdvancedFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="bg-black/20 border border-[#D4AF37]/20 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Price Range */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Price Range</h3>
                  <div className="mb-2">
                    <Slider
                      value={priceRange}
                      min={pageType === 'rent' ? 20000 : 100000}
                      max={pageType === 'rent' ? 1000000 : 50000000}
                      step={pageType === 'rent' ? 5000 : 50000}
                      onValueChange={(values) => setPriceRange(values as [number, number])}
                      className="my-4"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-white/70">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>

                {/* Area Range */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Area (sq.ft)</h3>
                  <div className="mb-2">
                    <Slider
                      value={areaRange}
                      min={100}
                      max={20000}
                      step={100}
                      onValueChange={(values) => setAreaRange(values as [number, number])}
                      className="my-4"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-white/70">
                    <span>{formatArea(areaRange[0])}</span>
                    <span>{formatArea(areaRange[1])}</span>
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Bedrooms</h3>
                  <Select value={bedrooms} onValueChange={setBedrooms}>
                    <SelectTrigger className="w-full bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0F0F0F] border-[#D4AF37]/30">
                      <SelectItem value="any" className="text-white hover:bg-[#D4AF37]/10">Any</SelectItem>
                      <SelectItem value="studio" className="text-white hover:bg-[#D4AF37]/10">Studio</SelectItem>
                      <SelectItem value="1" className="text-white hover:bg-[#D4AF37]/10">1 Bedroom</SelectItem>
                      <SelectItem value="2" className="text-white hover:bg-[#D4AF37]/10">2 Bedrooms</SelectItem>
                      <SelectItem value="3" className="text-white hover:bg-[#D4AF37]/10">3 Bedrooms</SelectItem>
                      <SelectItem value="4+" className="text-white hover:bg-[#D4AF37]/10">4+ Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bathrooms */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Bathrooms</h3>
                  <Select value={bathrooms} onValueChange={setBathrooms}>
                    <SelectTrigger className="w-full bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0F0F0F] border-[#D4AF37]/30">
                      <SelectItem value="any" className="text-white hover:bg-[#D4AF37]/10">Any</SelectItem>
                      <SelectItem value="1" className="text-white hover:bg-[#D4AF37]/10">1 Bathroom</SelectItem>
                      <SelectItem value="2" className="text-white hover:bg-[#D4AF37]/10">2 Bathrooms</SelectItem>
                      <SelectItem value="3" className="text-white hover:bg-[#D4AF37]/10">3 Bathrooms</SelectItem>
                      <SelectItem value="4+" className="text-white hover:bg-[#D4AF37]/10">4+ Bathrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* More Filters */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Locations */}
                {availableLocations.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-3">Locations</h3>
                    <div className="max-h-40 overflow-y-auto pr-2 space-y-2">
                      {availableLocations.map((location) => (
                        <div key={location} className="flex items-center">
                          <Checkbox
                            id={`location-${location}`}
                            checked={selectedLocations.includes(location)}
                            onCheckedChange={() => toggleLocation(location)}
                            className="border-[#D4AF37]/50 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                          />
                          <label
                            htmlFor={`location-${location}`}
                            className="ml-2 text-sm text-white/90 cursor-pointer"
                          >
                            {location}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Amenities */}
                {availableAmenities.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-3">Amenities</h3>
                    <div className="max-h-40 overflow-y-auto pr-2 space-y-2">
                      {availableAmenities.map((amenity) => (
                        <div key={amenity} className="flex items-center">
                          <Checkbox
                            id={`amenity-${amenity}`}
                            checked={selectedAmenities.includes(amenity)}
                            onCheckedChange={() => toggleAmenity(amenity)}
                            className="border-[#D4AF37]/50 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                          />
                          <label
                            htmlFor={`amenity-${amenity}`}
                            className="ml-2 text-sm text-white/90 cursor-pointer flex items-center"
                          >
                            {amenityIcons[amenity.toLowerCase()] && (
                              <span className="mr-1 text-[#D4AF37]">{amenityIcons[amenity.toLowerCase()]}</span>
                            )}
                            {amenity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Views */}
                {availableViews.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-3">Views</h3>
                    <div className="max-h-40 overflow-y-auto pr-2 space-y-2">
                      {availableViews.map((view) => (
                        <div key={view} className="flex items-center">
                          <Checkbox
                            id={`view-${view}`}
                            checked={selectedViews.includes(view)}
                            onCheckedChange={() => toggleView(view)}
                            className="border-[#D4AF37]/50 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                          />
                          <label
                            htmlFor={`view-${view}`}
                            className="ml-2 text-sm text-white/90 cursor-pointer"
                          >
                            {view}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Additional Filters */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Neighborhoods */}
                {neighborhoodOptions.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-3">Neighborhoods</h3>
                    <div className="max-h-40 overflow-y-auto pr-2 space-y-2">
                      {neighborhoodOptions.map((neighborhood) => (
                        <div key={neighborhood.id} className="flex items-center">
                          <Checkbox
                            id={`neighborhood-${neighborhood.id}`}
                            checked={selectedNeighborhoods.includes(neighborhood.id)}
                            onCheckedChange={() => toggleNeighborhood(neighborhood.id)}
                            className="border-[#D4AF37]/50 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                          />
                          <label
                            htmlFor={`neighborhood-${neighborhood.id}`}
                            className="ml-2 text-sm text-white/90 cursor-pointer"
                          >
                            {neighborhood.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Furnishing Status */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Furnishing</h3>
                  <Select value={furnishingStatus} onValueChange={setFurnishingStatus}>
                    <SelectTrigger className="w-full bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0F0F0F] border-[#D4AF37]/30">
                      <SelectItem value="any" className="text-white hover:bg-[#D4AF37]/10">Any</SelectItem>
                      <SelectItem value="Furnished" className="text-white hover:bg-[#D4AF37]/10">Furnished</SelectItem>
                      <SelectItem value="Unfurnished" className="text-white hover:bg-[#D4AF37]/10">Unfurnished</SelectItem>
                      <SelectItem value="Partially Furnished" className="text-white hover:bg-[#D4AF37]/10">
                        Partially Furnished
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Completion Year (for off-plan) */}
                {pageType === 'off-plan' && availableCompletionYears.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-3">Completion Year</h3>
                    <Select value={completionYear} onValueChange={setCompletionYear}>
                      <SelectTrigger className="w-full bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0F0F0F] border-[#D4AF37]/30">
                        <SelectItem value="any" className="text-white hover:bg-[#D4AF37]/10">Any</SelectItem>
                        {availableCompletionYears.map((year) => (
                          <SelectItem
                            key={year}
                            value={year}
                            className="text-white hover:bg-[#D4AF37]/10"
                          >
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Filter Actions */}
              <div className="mt-8 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  className="border-[#D4AF37]/30 text-white hover:bg-[#D4AF37]/10"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
                <GradientButton onClick={applyFilters}>Apply Filters</GradientButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Filters (Modal) */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="ml-auto w-full max-w-md h-full bg-black overflow-y-auto"
            >
              <div className="p-4 border-b border-[#D4AF37]/20 flex justify-between items-center sticky top-0 bg-black z-10">
                <h2 className="text-xl font-bold text-white">Filters</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowMobileFilters(false)}
                  className="text-white hover:bg-[#D4AF37]/10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-6 space-y-8">
                {/* Category Filter */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Property Type</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className={`border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 text-white ${
                        activeCategory === "all" ? "bg-[#D4AF37] !text-black hover:bg-[#D4AF37]/90" : ""
                      }`}
                      onClick={() => setActiveCategory("all")}
                    >
                      All Types
                    </Button>
                    {propertyCategories.map((category) => (
                      <Button
                        key={category.id}
                        variant="outline"
                        className={`border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 text-white ${
                          activeCategory === category.id ? "bg-[#D4AF37] !text-black hover:bg-[#D4AF37]/90" : ""
                        }`}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        {category.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Lifestyle Filter */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Lifestyle</h3>
                  <div className="grid grid-cols-2 gap-2">
                    
                    {lifestyleOptions.map((lifestyle) => (
                      <Button
                        key={lifestyle.id}
                        variant="outline"
                        className={`border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 text-white ${
                          activeLifestyle === lifestyle.id ? "bg-[#D4AF37] !text-black hover:bg-[#D4AF37]/90" : ""
                        }`}
                        onClick={() => setActiveLifestyle(lifestyle.id)}
                      >
                        {lifestyle.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Price Range</h3>
                  <div className="mb-2">
                    <Slider
                      value={priceRange}
                      min={pageType === 'rent' ? 20000 : 500000}
                      max={pageType === 'rent' ? 1000000 : 50000000}
                      step={pageType === 'rent' ? 5000 : 50000}
                      onValueChange={(values) => setPriceRange(values as [number, number])}
                      className="my-4"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-white/70">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>

                {/* Area Range */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Area (sq.ft)</h3>
                  <div className="mb-2">
                    <Slider
                      value={areaRange}
                      min={100}
                      max={20000}
                      step={100}
                      onValueChange={(values) => setAreaRange(values as [number, number])}
                      className="my-4"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-white/70">
                    <span>{formatArea(areaRange[0])}</span>
                    <span>{formatArea(areaRange[1])}</span>
                  </div>
                </div>

                {/* Bedrooms */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Bedrooms</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      className={`border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 text-white ${
                        bedrooms === "any" ? "bg-[#D4AF37] !text-black hover:bg-[#D4AF37]/90" : ""
                      }`}
                      onClick={() => setBedrooms("any")}
                    >
                      Any
                    </Button>
                    <Button
                      variant="outline"
                      className={`border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 text-white ${
                        bedrooms === "studio" ? "bg-[#D4AF37] !text-black hover:bg-[#D4AF37]/90" : ""
                      }`}
                      onClick={() => setBedrooms("studio")}
                    >
                      Studio
                    </Button>
                    {["1", "2", "3", "4+"].map((num) => (
                      <Button
                        key={num}
                        variant="outline"
                        className={`border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 text-white ${
                          bedrooms === num ? "bg-[#D4AF37] !text-black hover:bg-[#D4AF37]/90" : ""
                        }`}
                        onClick={() => setBedrooms(num)}
                      >
                        {num === "4+" ? "4+" : num}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Bathrooms */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Bathrooms</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      className={`border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 text-white ${
                        bathrooms === "any" ? "bg-[#D4AF37] !text-black hover:bg-[#D4AF37]/90" : ""
                      }`}
                      onClick={() => setBathrooms("any")}
                    >
                      Any
                    </Button>
                    {["1", "2", "3", "4+"].map((num) => (
                      <Button
                        key={num}
                        variant="outline"
                        className={`border-[#D4AF37]/30 hover:bg-[#D4AF37]/10 text-white ${
                          bathrooms === num ? "bg-[#D4AF37] !text-black hover:bg-[#D4AF37]/90" : ""
                        }`}
                        onClick={() => setBathrooms(num)}
                      >
                        {num === "4+" ? "4+" : num}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Developers */}
                {availableDevelopers.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-3">Developer</h3>
                    <Select value={activeDeveloper} onValueChange={setActiveDeveloper}>
                      <SelectTrigger className="w-full bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white">
                        <SelectValue placeholder="Any Developer" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0F0F0F] border-[#D4AF37]/30">
                        <SelectItem value="all" className="text-white hover:bg-[#D4AF37]/10">All Developers</SelectItem>
                        {availableDevelopers.map((developer) => (
                          <SelectItem
                            key={developer}
                            value={developer}
                            className="text-white hover:bg-[#D4AF37]/10"
                          >
                            {developer}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Locations */}
                {availableLocations.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-3">Locations</h3>
                    <div className="max-h-40 overflow-y-auto pr-2 space-y-2">
                      {availableLocations.map((location) => (
                        <div key={location} className="flex items-center">
                          <Checkbox
                            id={`mob-location-${location}`}
                            checked={selectedLocations.includes(location)}
                            onCheckedChange={() => toggleLocation(location)}
                            className="border-[#D4AF37]/50 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                          />
                          <label
                            htmlFor={`mob-location-${location}`}
                            className="ml-2 text-sm text-white/90 cursor-pointer"
                          >
                            {location}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Filter Actions */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-black border-t border-[#D4AF37]/20 flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-[#D4AF37]/30 text-white hover:bg-[#D4AF37]/10"
                    onClick={resetFilters}
                  >
                    Reset
                  </Button>
                  <GradientButton className="flex-1" onClick={applyFilters}>
                    Apply Filters
                  </GradientButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}