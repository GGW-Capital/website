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
  
  // State for enabling price and area filters
  const [enablePriceFilter, setEnablePriceFilter] = useState(searchParams.get('enablePriceFilter') !== 'false')
  const [enableAreaFilter, setEnableAreaFilter] = useState(searchParams.get('enableAreaFilter') !== 'false')

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
  
  // Rental Period - only used for rent page
  const [rentalPeriod, setRentalPeriod] = useState(searchParams.get('rentalPeriod') || 'any')

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
        priceRange: enablePriceFilter ? priceRange : null,
        areaRange: enableAreaFilter ? areaRange : null,
        bedrooms: bedrooms === 'any' ? undefined : bedrooms,
        bathrooms: bathrooms === 'any' ? undefined : bathrooms,
        amenities: selectedAmenities.length > 0 ? selectedAmenities : undefined,
        views: selectedViews.length > 0 ? selectedViews : undefined,
        completionYear: completionYear === 'any' ? undefined : completionYear,
        furnishingStatus: furnishingStatus === 'any' ? undefined : furnishingStatus,
        neighborhoods: selectedNeighborhoods.length > 0 ? selectedNeighborhoods : undefined,
        rentalPeriod: rentalPeriod === 'any' ? undefined : rentalPeriod,
        keyword: searchKeyword || undefined,
        enablePriceFilter,
        enableAreaFilter,
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
      minPrice: enablePriceFilter ? priceRange[0] : null,
      maxPrice: enablePriceFilter ? priceRange[1] : null,
      minArea: enableAreaFilter ? areaRange[0] : null,
      maxArea: enableAreaFilter ? areaRange[1] : null,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      amenities: selectedAmenities,
      views: selectedViews,
      completionYear: completionYear,
      furnishingStatus: furnishingStatus,
      neighborhoods: selectedNeighborhoods,
      rentalPeriod: rentalPeriod,
      enablePriceFilter,
      enableAreaFilter
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
    setRentalPeriod('any')
    setSearchKeyword('')
    setEnablePriceFilter(true)
    setEnableAreaFilter(true)
    
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

          {/* Advanced Filters button - Desktop only */}
          <Button
            variant="outline"
            className="hidden md:flex text-white border-[#D4AF37]/50 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
          </Button>

          {/* Mobile Filters button */}
          <Button
            variant="outline"
            className="md:hidden text-white border-[#D4AF37]/50 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10"
            onClick={() => setShowMobileFilters(true)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Advanced Filters Dropdown */}
      <AnimatePresence>
        {showAdvancedFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-[#121212] border border-[#D4AF37]/30 rounded-lg p-6 mb-6 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Price Range Filter */}
              <div>
                <div className="flex items-center mb-2">
                  <h3 className="text-white font-semibold">Price Range</h3>
                  <div className="ml-auto">
                    <Checkbox 
                      id="enablePriceFilter" 
                      className="border-[#D4AF37]/50 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black" 
                      checked={enablePriceFilter}
                      onCheckedChange={() => setEnablePriceFilter(!enablePriceFilter)}
                    />
                    <label htmlFor="enablePriceFilter" className="ml-2 text-xs text-white/70">
                      Enable price filter
                    </label>
                  </div>
                </div>
                <div className="flex flex-col space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs text-white/70">Min Price</label>
                      <Input
                        type="number"
                        className="bg-black border-[#D4AF37]/30 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]/10"
                        value={priceRange[0]}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          setPriceRange([val, priceRange[1]]);
                        }}
                        placeholder="Min price"
                        min={pageType === 'rent' ? 10000 : 200000}
                        step={pageType === 'rent' ? 1000 : 10000}
                        disabled={!enablePriceFilter}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-white/70">Max Price</label>
                      <Input
                        type="number"
                        className="bg-black border-[#D4AF37]/30 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]/10"
                        value={priceRange[1]}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          setPriceRange([priceRange[0], val]);
                        }}
                        placeholder="Max price"
                        min={pageType === 'rent' ? 10000 : 200000}
                        step={pageType === 'rent' ? 1000 : 10000}
                        disabled={!enablePriceFilter}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-white/50 font-medium">
                    <span>Min: {formatPrice(priceRange[0])}</span>
                    <span>Max: {formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              {/* Area Range */}
              <div>
                <div className="flex items-center mb-2">
                  <h3 className="text-white font-semibold">Area (sq.ft)</h3>
                  <div className="ml-auto">
                    <Checkbox 
                      id="enableAreaFilter" 
                      className="border-[#D4AF37]/50 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black" 
                      checked={enableAreaFilter}
                      onCheckedChange={() => setEnableAreaFilter(!enableAreaFilter)}
                    />
                    <label htmlFor="enableAreaFilter" className="ml-2 text-xs text-white/70">
                      Enable area filter
                    </label>
                  </div>
                </div>
                <div className="flex flex-col space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs text-white/70">Min Area</label>
                      <Input
                        type="number"
                        className="bg-black border-[#D4AF37]/30 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]/10"
                        value={areaRange[0]}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          setAreaRange([val, areaRange[1]]);
                        }}
                        placeholder="Min area"
                        min={100}
                        step={100}
                        disabled={!enableAreaFilter}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-white/70">Max Area</label>
                      <Input
                        type="number"
                        className="bg-black border-[#D4AF37]/30 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]/10"
                        value={areaRange[1]}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          setAreaRange([areaRange[0], val]);
                        }}
                        placeholder="Max area"
                        min={100}
                        step={100}
                        disabled={!enableAreaFilter}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-white/50 font-medium">
                    <span>Min: {formatArea(areaRange[0])}</span>
                    <span>Max: {formatArea(areaRange[1])}</span>
                  </div>
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <h3 className="text-white font-semibold mb-3">Bedrooms</h3>
                <Select value={bedrooms} onValueChange={setBedrooms}>
                  <SelectTrigger className="bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0F0F0F] border-[#D4AF37]/30">
                    <SelectItem value="any" className="text-white hover:bg-[#D4AF37]/10">Any</SelectItem>
                    <SelectItem value="studio" className="text-white hover:bg-[#D4AF37]/10">Studio</SelectItem>
                    <SelectItem value="1" className="text-white hover:bg-[#D4AF37]/10">1 Bedroom</SelectItem>
                    <SelectItem value="2" className="text-white hover:bg-[#D4AF37]/10">2 Bedrooms</SelectItem>
                    <SelectItem value="3" className="text-white hover:bg-[#D4AF37]/10">3 Bedrooms</SelectItem>
                    <SelectItem value="4" className="text-white hover:bg-[#D4AF37]/10">4+ Bedrooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bathrooms */}
              <div>
                <h3 className="text-white font-semibold mb-3">Bathrooms</h3>
                <Select value={bathrooms} onValueChange={setBathrooms}>
                  <SelectTrigger className="bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0F0F0F] border-[#D4AF37]/30">
                    <SelectItem value="any" className="text-white hover:bg-[#D4AF37]/10">Any</SelectItem>
                    <SelectItem value="1" className="text-white hover:bg-[#D4AF37]/10">1 Bathroom</SelectItem>
                    <SelectItem value="2" className="text-white hover:bg-[#D4AF37]/10">2 Bathrooms</SelectItem>
                    <SelectItem value="3" className="text-white hover:bg-[#D4AF37]/10">3 Bathrooms</SelectItem>
                    <SelectItem value="4" className="text-white hover:bg-[#D4AF37]/10">4+ Bathrooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Rental Period - Only for rent page */}
              {pageType === 'rent' && (
                <div>
                  <h3 className="text-white font-semibold mb-3">Rental Period</h3>
                  <Select value={rentalPeriod} onValueChange={setRentalPeriod}>
                    <SelectTrigger className="bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white">
                      <SelectValue placeholder="Any Period" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0F0F0F] border-[#D4AF37]/30">
                      <SelectItem value="any" className="text-white hover:bg-[#D4AF37]/10">Any Period</SelectItem>
                      <SelectItem value="weekly" className="text-white hover:bg-[#D4AF37]/10">Weekly</SelectItem>
                      <SelectItem value="monthly" className="text-white hover:bg-[#D4AF37]/10">Monthly</SelectItem>
                      <SelectItem value="yearly" className="text-white hover:bg-[#D4AF37]/10">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Furnishing Status */}
              {pageType === 'rent' && (
                <div>
                  <h3 className="text-white font-semibold mb-3">Furnishing</h3>
                  <Select value={furnishingStatus} onValueChange={setFurnishingStatus}>
                    <SelectTrigger className="bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0F0F0F] border-[#D4AF37]/30">
                      <SelectItem value="any" className="text-white hover:bg-[#D4AF37]/10">Any</SelectItem>
                      <SelectItem value="furnished" className="text-white hover:bg-[#D4AF37]/10">Furnished</SelectItem>
                      <SelectItem value="unfurnished" className="text-white hover:bg-[#D4AF37]/10">Unfurnished</SelectItem>
                      <SelectItem value="partially-furnished" className="text-white hover:bg-[#D4AF37]/10">Partially Furnished</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Completion Year */}
              {pageType === 'off-plan' && availableCompletionYears.length > 0 && (
                <div>
                  <h3 className="text-white font-semibold mb-3">Completion Year</h3>
                  <Select value={completionYear} onValueChange={setCompletionYear}>
                    <SelectTrigger className="bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#0F0F0F] border-[#D4AF37]/30">
                      <SelectItem value="any" className="text-white hover:bg-[#D4AF37]/10">Any</SelectItem>
                      {availableCompletionYears.map((year) => (
                        <SelectItem key={year} value={year} className="text-white hover:bg-[#D4AF37]/10">
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Location Filter */}
            {availableLocations.length > 0 && (
              <div className="mt-6">
                <h3 className="text-white font-semibold mb-3">Locations</h3>
                <div className="flex flex-wrap gap-2">
                  {availableLocations.map((location) => (
                    <Button
                      key={location}
                      type="button"
                      variant="outline"
                      className={`text-sm py-1 h-auto ${
                        selectedLocations.includes(location)
                          ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]'
                          : 'text-white/70 border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10'
                      }`}
                      onClick={() => toggleLocation(location)}
                    >
                      {location}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Neighborhood Filter */}
            {neighborhoodOptions.length > 0 && (
              <div className="mt-6">
                <h3 className="text-white font-semibold mb-3">Neighborhoods</h3>
                <div className="flex flex-wrap gap-2">
                  {neighborhoodOptions.map((neighborhood) => (
                    <Button
                      key={neighborhood.id}
                      type="button"
                      variant="outline"
                      className={`text-sm py-1 h-auto ${
                        selectedNeighborhoods.includes(neighborhood.id)
                          ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]'
                          : 'text-white/70 border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10'
                      }`}
                      onClick={() => toggleNeighborhood(neighborhood.id)}
                    >
                      {neighborhood.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities Filter */}
            {availableAmenities.length > 0 && (
              <div className="mt-6">
                <h3 className="text-white font-semibold mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {availableAmenities.map((amenity) => (
                    <Button
                      key={amenity}
                      type="button"
                      variant="outline"
                      className={`text-sm py-1 h-auto ${
                        selectedAmenities.includes(amenity)
                          ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]'
                          : 'text-white/70 border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10'
                      }`}
                      onClick={() => toggleAmenity(amenity)}
                    >
                      <span className="mr-1">
                        {amenityIcons[amenity.toLowerCase()] || null}
                      </span>
                      {amenity}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Views Filter */}
            {availableViews.length > 0 && (
              <div className="mt-6">
                <h3 className="text-white font-semibold mb-3">Views</h3>
                <div className="flex flex-wrap gap-2">
                  {availableViews.map((view) => (
                    <Button
                      key={view}
                      type="button"
                      variant="outline"
                      className={`text-sm py-1 h-auto ${
                        selectedViews.includes(view)
                          ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]'
                          : 'text-white/70 border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10'
                      }`}
                      onClick={() => toggleView(view)}
                    >
                      {view}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Filter Action Buttons */}
            <div className="mt-6 flex justify-end space-x-4">
              <Button
                variant="outline"
                className="text-white/70 border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
              <GradientButton onClick={applyFilters}>
                Apply Filters
              </GradientButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Filters Sidebar */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity ${
          showMobileFilters ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setShowMobileFilters(false)}
      >
        <div
          className={`absolute top-0 right-0 bottom-0 w-full max-w-md bg-[#121212] transition-transform duration-300 p-6 overflow-y-auto ${
            showMobileFilters ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Filters</h2>
            <Button
              variant="ghost"
              className="text-white/70 hover:text-white hover:bg-transparent p-0 h-auto"
              onClick={() => setShowMobileFilters(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="text-white font-semibold mb-3">Property Type</h3>
              <Select value={activeCategory} onValueChange={setActiveCategory}>
                <SelectTrigger className="bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white">
                  <SelectValue placeholder="All Types" />
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
            <div>
              <h3 className="text-white font-semibold mb-3">Lifestyle</h3>
              <Select value={activeLifestyle} onValueChange={setActiveLifestyle}>
                <SelectTrigger className="bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white">
                  <SelectValue placeholder="All Lifestyles" />
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
              <div>
                <h3 className="text-white font-semibold mb-3">Developer</h3>
                <Select value={activeDeveloper} onValueChange={setActiveDeveloper}>
                  <SelectTrigger className="bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white">
                    <SelectValue placeholder="All Developers" />
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

            {/* Price Range Filter */}
            <div className="space-y-3">
              <div className="flex items-center">
                <h3 className="text-white font-semibold">Price Range</h3>
                <div className="ml-auto">
                  <Checkbox 
                    id="enablePriceFilterMobile" 
                    className="border-[#D4AF37]/50 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black" 
                    checked={enablePriceFilter}
                    onCheckedChange={() => setEnablePriceFilter(!enablePriceFilter)}
                  />
                  <label htmlFor="enablePriceFilterMobile" className="ml-2 text-xs text-white/70">
                    Enable price filter
                  </label>
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-white/70">Min Price</label>
                    <Input
                      type="number"
                      className="bg-black border-[#D4AF37]/30 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]/10"
                      value={priceRange[0]}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setPriceRange([val, priceRange[1]]);
                      }}
                      placeholder="Min price"
                      min={pageType === 'rent' ? 10000 : 200000}
                      step={pageType === 'rent' ? 1000 : 10000}
                      disabled={!enablePriceFilter}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-white/70">Max Price</label>
                    <Input
                      type="number"
                      className="bg-black border-[#D4AF37]/30 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]/10"
                      value={priceRange[1]}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setPriceRange([priceRange[0], val]);
                      }}
                      placeholder="Max price"
                      min={pageType === 'rent' ? 10000 : 200000}
                      step={pageType === 'rent' ? 1000 : 10000}
                      disabled={!enablePriceFilter}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-white/50 font-medium">
                  <span>Min: {formatPrice(priceRange[0])}</span>
                  <span>Max: {formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </div>

            {/* Area Range */}
            <div className="space-y-3">
              <div className="flex items-center">
                <h3 className="text-white font-semibold">Area (sq.ft)</h3>
                <div className="ml-auto">
                  <Checkbox 
                    id="enableAreaFilterMobile" 
                    className="border-[#D4AF37]/50 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black" 
                    checked={enableAreaFilter}
                    onCheckedChange={() => setEnableAreaFilter(!enableAreaFilter)}
                  />
                  <label htmlFor="enableAreaFilterMobile" className="ml-2 text-xs text-white/70">
                    Enable area filter
                  </label>
                </div>
              </div>
              <div className="flex flex-col space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-white/70">Min Area</label>
                    <Input
                      type="number"
                      className="bg-black border-[#D4AF37]/30 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]/10"
                      value={areaRange[0]}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setAreaRange([val, areaRange[1]]);
                      }}
                      placeholder="Min area"
                      min={100}
                      step={100}
                      disabled={!enableAreaFilter}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-white/70">Max Area</label>
                    <Input
                      type="number"
                      className="bg-black border-[#D4AF37]/30 text-white focus:border-[#D4AF37] focus:ring-[#D4AF37]/10"
                      value={areaRange[1]}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setAreaRange([areaRange[0], val]);
                      }}
                      placeholder="Max area"
                      min={100}
                      step={100}
                      disabled={!enableAreaFilter}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-xs text-white/50 font-medium">
                  <span>Min: {formatArea(areaRange[0])}</span>
                  <span>Max: {formatArea(areaRange[1])}</span>
                </div>
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <h3 className="text-white font-semibold mb-3">Bedrooms</h3>
              <Select value={bedrooms} onValueChange={setBedrooms}>
                <SelectTrigger className="bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent className="bg-[#0F0F0F] border-[#D4AF37]/30">
                  <SelectItem value="any" className="text-white hover:bg-[#D4AF37]/10">Any</SelectItem>
                  <SelectItem value="studio" className="text-white hover:bg-[#D4AF37]/10">Studio</SelectItem>
                  <SelectItem value="1" className="text-white hover:bg-[#D4AF37]/10">1 Bedroom</SelectItem>
                  <SelectItem value="2" className="text-white hover:bg-[#D4AF37]/10">2 Bedrooms</SelectItem>
                  <SelectItem value="3" className="text-white hover:bg-[#D4AF37]/10">3 Bedrooms</SelectItem>
                  <SelectItem value="4" className="text-white hover:bg-[#D4AF37]/10">4+ Bedrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bathrooms */}
            <div>
              <h3 className="text-white font-semibold mb-3">Bathrooms</h3>
              <Select value={bathrooms} onValueChange={setBathrooms}>
                <SelectTrigger className="bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent className="bg-[#0F0F0F] border-[#D4AF37]/30">
                  <SelectItem value="any" className="text-white hover:bg-[#D4AF37]/10">Any</SelectItem>
                  <SelectItem value="1" className="text-white hover:bg-[#D4AF37]/10">1 Bathroom</SelectItem>
                  <SelectItem value="2" className="text-white hover:bg-[#D4AF37]/10">2 Bathrooms</SelectItem>
                  <SelectItem value="3" className="text-white hover:bg-[#D4AF37]/10">3 Bathrooms</SelectItem>
                  <SelectItem value="4" className="text-white hover:bg-[#D4AF37]/10">4+ Bathrooms</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Rental Period - Only for rent page */}
            {pageType === 'rent' && (
              <div>
                <h3 className="text-white font-semibold mb-3">Rental Period</h3>
                <Select value={rentalPeriod} onValueChange={setRentalPeriod}>
                  <SelectTrigger className="bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white">
                    <SelectValue placeholder="Any Period" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0F0F0F] border-[#D4AF37]/30">
                    <SelectItem value="any" className="text-white hover:bg-[#D4AF37]/10">Any Period</SelectItem>
                    <SelectItem value="weekly" className="text-white hover:bg-[#D4AF37]/10">Weekly</SelectItem>
                    <SelectItem value="monthly" className="text-white hover:bg-[#D4AF37]/10">Monthly</SelectItem>
                    <SelectItem value="yearly" className="text-white hover:bg-[#D4AF37]/10">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Furnishing Status */}
            {pageType === 'rent' && (
              <div>
                <h3 className="text-white font-semibold mb-3">Furnishing</h3>
                <Select value={furnishingStatus} onValueChange={setFurnishingStatus}>
                  <SelectTrigger className="bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0F0F0F] border-[#D4AF37]/30">
                    <SelectItem value="any" className="text-white hover:bg-[#D4AF37]/10">Any</SelectItem>
                    <SelectItem value="furnished" className="text-white hover:bg-[#D4AF37]/10">Furnished</SelectItem>
                    <SelectItem value="unfurnished" className="text-white hover:bg-[#D4AF37]/10">Unfurnished</SelectItem>
                    <SelectItem value="partially-furnished" className="text-white hover:bg-[#D4AF37]/10">Partially Furnished</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Completion Year */}
            {pageType === 'off-plan' && availableCompletionYears.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-3">Completion Year</h3>
                <Select value={completionYear} onValueChange={setCompletionYear}>
                  <SelectTrigger className="bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0F0F0F] border-[#D4AF37]/30">
                    <SelectItem value="any" className="text-white hover:bg-[#D4AF37]/10">Any</SelectItem>
                    {availableCompletionYears.map((year) => (
                      <SelectItem key={year} value={year} className="text-white hover:bg-[#D4AF37]/10">
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Location Filter */}
            {availableLocations.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-3">Locations</h3>
                <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto pr-2">
                  {availableLocations.map((location) => (
                    <Button
                      key={location}
                      type="button"
                      variant="outline"
                      className={`text-sm py-1 h-auto ${
                        selectedLocations.includes(location)
                          ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]'
                          : 'text-white/70 border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10'
                      }`}
                      onClick={() => toggleLocation(location)}
                    >
                      {location}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Neighborhood Filter */}
            {neighborhoodOptions.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-3">Neighborhoods</h3>
                <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto pr-2">
                  {neighborhoodOptions.map((neighborhood) => (
                    <Button
                      key={neighborhood.id}
                      type="button"
                      variant="outline"
                      className={`text-sm py-1 h-auto ${
                        selectedNeighborhoods.includes(neighborhood.id)
                          ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]'
                          : 'text-white/70 border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10'
                      }`}
                      onClick={() => toggleNeighborhood(neighborhood.id)}
                    >
                      {neighborhood.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities Filter */}
            {availableAmenities.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto pr-2">
                  {availableAmenities.map((amenity) => (
                    <Button
                      key={amenity}
                      type="button"
                      variant="outline"
                      className={`text-sm py-1 h-auto ${
                        selectedAmenities.includes(amenity)
                          ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]'
                          : 'text-white/70 border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10'
                      }`}
                      onClick={() => toggleAmenity(amenity)}
                    >
                      <span className="mr-1">
                        {amenityIcons[amenity.toLowerCase()] || null}
                      </span>
                      {amenity}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Views Filter */}
            {availableViews.length > 0 && (
              <div>
                <h3 className="text-white font-semibold mb-3">Views</h3>
                <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto pr-2">
                  {availableViews.map((view) => (
                    <Button
                      key={view}
                      type="button"
                      variant="outline"
                      className={`text-sm py-1 h-auto ${
                        selectedViews.includes(view)
                          ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]'
                          : 'text-white/70 border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10'
                      }`}
                      onClick={() => toggleView(view)}
                    >
                      {view}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Filter Action Buttons */}
          <div className="mt-8 flex flex-col space-y-3">
            <GradientButton onClick={applyFilters} className="w-full">
              Apply Filters
            </GradientButton>
            <Button
              variant="outline"
              className="w-full text-white/70 border-[#D4AF37]/20 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/10"
              onClick={resetFilters}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}