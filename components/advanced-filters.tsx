"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { getNeighborhoods, getLifestyles, client } from "@/lib/sanity"
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

// Define our filter options
const marketTypes = [
  { id: "secondary-market", label: "Secondary Market" },
  { id: "off-plan", label: "Off-Plan" },
]

const listingTypes = [
  { id: "property", label: "Properties" },
  { id: "project", label: "Projects" },
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

const developerOptions = [
  { id: "Emaar", label: "Emaar" },
  { id: "Damac", label: "Damac" },
  { id: "Nakheel", label: "Nakheel" },
  { id: "Meraas", label: "Meraas" },
]

const locationOptions = [
  { id: "Palm Jumeirah", label: "Palm Jumeirah" },
  { id: "Dubai Marina", label: "Dubai Marina" },
  { id: "Downtown Dubai", label: "Downtown Dubai" },
  { id: "Emirates Hills", label: "Emirates Hills" },
  { id: "Jumeirah Beach Residence", label: "Jumeirah Beach Residence" },
  { id: "Business Bay", label: "Business Bay" },
  { id: "Arabian Ranches", label: "Arabian Ranches" },
  { id: "Dubai Hills Estate", label: "Dubai Hills Estate" },
]

const viewOptions = [
  { id: "sea", label: "Sea View" },
  { id: "city", label: "City View" },
  { id: "garden", label: "Garden View" },
  { id: "golf", label: "Golf Course View" },
  { id: "burj", label: "Burj Khalifa View" },
]

const amenities = [
  { id: "pool", label: "Swimming Pool", icon: <Pool className="h-4 w-4" /> },
  { id: "gym", label: "Gym", icon: <Dumbbell className="h-4 w-4" /> },
  { id: "parking", label: "Parking", icon: <Car className="h-4 w-4" /> },
  { id: "security", label: "24/7 Security", icon: <Lock className="h-4 w-4" /> },
  { id: "balcony", label: "Balcony", icon: <Palmtree className="h-4 w-4" /> },
  { id: "wifi", label: "High-Speed Internet", icon: <Wifi className="h-4 w-4" /> },
  { id: "furnished", label: "Fully Furnished", icon: <Sparkles className="h-4 w-4" /> },
  { id: "kitchen", label: "Equipped Kitchen", icon: <UtensilsCrossed className="h-4 w-4" /> },
  { id: "view", label: "Panoramic View", icon: <Mountain className="h-4 w-4" /> },
]

interface AdvancedFiltersProps {
  isRental?: boolean
  isOffPlan?: boolean
  initialFilters?: any
  onFilterChange: (filters: any) => void
  onSearch: (keyword: string) => void
  onReset: () => void
}

export default function AdvancedFilters({
  isRental = false,
  isOffPlan = false,
  initialFilters = {},
  onFilterChange,
  onSearch,
  onReset,
}: AdvancedFiltersProps) {
  // State for search and filters
  const [searchKeyword, setSearchKeyword] = useState(initialFilters.keyword || "")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [neighborhoodOptions, setNeighborhoodOptions] = useState<{ id: string; name: string }[]>([])
  
  // Add state for lifestyle options
  const [lifestyleOptions, setLifestyleOptions] = useState(defaultLifestyleOptions)

  // Filter states with defaults from initialFilters
  const [activeMarketType, setActiveMarketType] = useState(
    initialFilters.marketType || (isOffPlan ? "off-plan" : isRental ? "secondary-market" : "all"),
  )
  const [activeListingType, setActiveListingType] = useState(initialFilters.listingType || "all")
  const [activeCategory, setActiveCategory] = useState(initialFilters.category || "all")
  const [activeLifestyle, setActiveLifestyle] = useState(initialFilters.lifestyle || "all")
  const [activeDeveloper, setActiveDeveloper] = useState(initialFilters.developer || "all")
  const [selectedLocations, setSelectedLocations] = useState<string[]>(initialFilters.locations || [])
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>(initialFilters.neighborhoods?.map((n: any) => n.id) || [])
  const [priceRange, setPriceRange] = useState<[number, number]>(
    initialFilters.priceRange || (isRental ? [50000, 500000] : [500000, 20000000]),
  )
  const [areaRange, setAreaRange] = useState<[number, number]>(initialFilters.areaRange || [500, 10000])
  const [bedrooms, setBedrooms] = useState(initialFilters.bedrooms || "any")
  const [bathrooms, setBathrooms] = useState(initialFilters.bathrooms || "any")
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(initialFilters.amenities || [])
  const [selectedViews, setSelectedViews] = useState<string[]>(initialFilters.views || [])
  const [completionYear, setCompletionYear] = useState(initialFilters.completionYear || "any")
  const [furnishingStatus, setFurnishingStatus] = useState(initialFilters.furnishingStatus || "any")

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
    onSearch(searchKeyword)
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
  
  // Apply all filters
  const applyFilters = () => {
    const filters = {
      marketType: activeMarketType,
      listingType: activeListingType,
      category: activeCategory,
      lifestyle: activeLifestyle,
      developer: activeDeveloper,
      locations: selectedLocations,
      priceRange,
      areaRange,
      bedrooms,
      bathrooms,
      amenities: selectedAmenities,
      views: selectedViews,
      completionYear,
      furnishingStatus,
      neighborhoods: selectedNeighborhoods,
      keyword: searchKeyword,
    }

    onFilterChange(filters)
    setShowMobileFilters(false)
  }

  // Reset all filters
  const resetFilters = () => {
    setActiveMarketType(isOffPlan ? "off-plan" : isRental ? "secondary-market" : "all")
    setActiveListingType("all")
    setActiveCategory("all")
    setActiveLifestyle("all")
    setActiveDeveloper("all")
    setSelectedLocations([])
    setSelectedNeighborhoods([])
    setPriceRange(isRental ? [50000, 500000] : [500000, 20000000])
    setAreaRange([500, 10000])
    setBedrooms("any")
    setBathrooms("any")
    setSelectedAmenities([])
    setSelectedViews([])
    setCompletionYear("any")
    setFurnishingStatus("any")
    setSearchKeyword("")
    onReset()
    setShowMobileFilters(false)
  }

  // Fetch neighborhoods and lifestyle data
  useEffect(() => {
    async function fetchNeighborhoods() {
      try {
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
        // Use the centralized getLifestyles utility function
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
  }, []);

  // Initial mounting flag to prevent auto-filtering on first render
  const [initialRender, setInitialRender] = useState(true);
  
  // Update filters when any filter changes (for desktop view)
  useEffect(() => {
    // Skip filter application on the first render to show all properties initially
    if (initialRender) {
      setInitialRender(false);
      return;
    }
    
    // Apply filters on subsequent changes
    if (!showMobileFilters) {
      applyFilters()
    }
  }, [
    activeMarketType,
    activeListingType,
    activeCategory,
    activeLifestyle,
    activeDeveloper,
    // We don't include the other filters here because they have their own apply buttons
    // or are part of the advanced filters that need to be explicitly applied
  ])

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="mb-6">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Input
            type="text"
            placeholder="Search by keyword, property name, or reference..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="bg-[#0a0a0a] border-[#D4AF37]/30 focus:border-[#D4AF37] text-white h-12 pl-10 pr-4"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#D4AF37]/70" />
          <Button
            type="submit"
            variant="ghost"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 text-[#D4AF37] hover:bg-[#D4AF37]/10"
          >
            Search
          </Button>
        </form>
      </div>

      {/* Basic Filters - Desktop */}
      <div className="hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Listing Type Filter (Property or Project) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/90">Listing Type:</label>
            <FilterToggle options={listingTypes} activeId={activeListingType} onChange={setActiveListingType} />
          </div>

          {/* Market Type Filter (if not on a specific market page) */}
          {!isOffPlan && !isRental && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Market Type:</label>
              <FilterToggle options={marketTypes} activeId={activeMarketType} onChange={setActiveMarketType} />
            </div>
          )}

          {/* Property Type Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/90">Property Type:</label>
            <FilterToggle options={propertyCategories} activeId={activeCategory} onChange={setActiveCategory} />
          </div>

          {/* Lifestyle Filter */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/90">Lifestyle:</label>
            <FilterToggle options={lifestyleOptions} activeId={activeLifestyle} onChange={setActiveLifestyle} />
          </div>

          {/* Developer Filter (always shown for off-plan, optional for others) */}
          {(isOffPlan || activeMarketType === "off-plan") && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Developer:</label>
              <FilterToggle options={developerOptions} activeId={activeDeveloper} onChange={setActiveDeveloper} />
            </div>
          )}
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex justify-between items-center mb-6">
          <Button
            variant="outline"
            className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 flex items-center gap-2"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          >
            <Filter className="h-4 w-4" />
            Advanced Filters
            <ChevronDown className={`h-4 w-4 transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`} />
          </Button>

          <Button
            variant="outline"
            className="border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10"
            onClick={resetFilters}
          >
            <X className="h-4 w-4 mr-2" />
            Reset Filters
          </Button>
        </div>

        {/* Advanced Filters Panel */}
        <AnimatePresence>
          {showAdvancedFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                  {/* Price Range */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white/90">
                      Price Range ({isRental ? "AED/year" : "AED"})
                    </label>
                    <div className="pt-6 px-2">
                      <Slider
                        value={priceRange}
                        min={isRental ? 10000 : 200000}
                        max={isRental ? 1000000 : 50000000}
                        step={isRental ? 1000 : 10000}
                        onValueChange={(value) => setPriceRange(value as [number, number])}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-white/70 font-medium">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>

                  {/* Area Range */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white/90">Area (sq.ft)</label>
                    <div className="pt-6 px-2">
                      <Slider
                        value={areaRange}
                        min={100}
                        max={20000}
                        step={100}
                        onValueChange={(value) => setAreaRange(value as [number, number])}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-white/70 font-medium">
                      <span>{formatArea(areaRange[0])}</span>
                      <span>{formatArea(areaRange[1])}</span>
                    </div>
                  </div>

                  {/* Bedrooms */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white/90">Bedrooms</label>
                    <Select value={bedrooms} onValueChange={setBedrooms}>
                      <SelectTrigger className="bg-transparent border-[#D4AF37]/40 text-white h-10 font-medium">
                        <SelectValue placeholder="Select bedrooms" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-[#D4AF37]/40 text-white">
                        <SelectItem value="any" className="font-medium">Any</SelectItem>
                        <SelectItem value="studio" className="font-medium">Studio</SelectItem>
                        <SelectItem value="1" className="font-medium">1 Bedroom</SelectItem>
                        <SelectItem value="2" className="font-medium">2 Bedrooms</SelectItem>
                        <SelectItem value="3" className="font-medium">3 Bedrooms</SelectItem>
                        <SelectItem value="4" className="font-medium">4 Bedrooms</SelectItem>
                        <SelectItem value="5+" className="font-medium">5+ Bedrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Bathrooms */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white/90">Bathrooms</label>
                    <Select value={bathrooms} onValueChange={setBathrooms}>
                      <SelectTrigger className="bg-transparent border-[#D4AF37]/40 text-white h-10 font-medium">
                        <SelectValue placeholder="Select bathrooms" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-[#D4AF37]/40 text-white">
                        <SelectItem value="any" className="font-medium">Any</SelectItem>
                        <SelectItem value="1" className="font-medium">1 Bathroom</SelectItem>
                        <SelectItem value="2" className="font-medium">2 Bathrooms</SelectItem>
                        <SelectItem value="3" className="font-medium">3 Bathrooms</SelectItem>
                        <SelectItem value="4" className="font-medium">4 Bathrooms</SelectItem>
                        <SelectItem value="5+" className="font-medium">5+ Bathrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white/90">Location</label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {locationOptions.map((location) => (
                        <div key={location.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`location-${location.id}`}
                            checked={selectedLocations.includes(location.id)}
                            onCheckedChange={() => toggleLocation(location.id)}
                            className="border-[#D4AF37]/40 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                          />
                          <label
                            htmlFor={`location-${location.id}`}
                            className="text-sm font-medium text-white/90 cursor-pointer"
                          >
                            {location.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Neighborhood Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white/90">Neighborhood</label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {neighborhoodOptions.length > 0 ? (
                        neighborhoodOptions.map((neighborhood) => (
                          <div key={neighborhood.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`neighborhood-${neighborhood.id}`}
                              checked={selectedNeighborhoods.includes(neighborhood.id)}
                              onCheckedChange={() => toggleNeighborhood(neighborhood.id)}
                              className="border-[#D4AF37]/40 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                            />
                            <label
                              htmlFor={`neighborhood-${neighborhood.id}`}
                              className="text-sm font-medium text-white/90 cursor-pointer"
                            >
                              {neighborhood.name}
                            </label>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-white/50 italic">No neighborhoods available</p>
                      )}
                    </div>
                  </div>

                  {/* Views Selection */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white/90">Views</label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {viewOptions.map((view) => (
                        <div key={view.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`view-${view.id}`}
                            checked={selectedViews.includes(view.id)}
                            onCheckedChange={() => toggleView(view.id)}
                            className="border-[#D4AF37]/40 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                          />
                          <label
                            htmlFor={`view-${view.id}`}
                            className="text-sm font-medium text-white/90 cursor-pointer"
                          >
                            {view.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Amenities Selection */}
                  <div className="space-y-3 lg:col-span-2">
                    <label className="text-sm font-semibold text-white/90">Amenities</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                      {amenities.map((amenity) => (
                        <div key={amenity.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`amenity-${amenity.id}`}
                            checked={selectedAmenities.includes(amenity.id)}
                            onCheckedChange={() => toggleAmenity(amenity.id)}
                            className="border-[#D4AF37]/40 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                          />
                          <label
                            htmlFor={`amenity-${amenity.id}`}
                            className="text-sm font-medium text-white/90 cursor-pointer flex items-center gap-1.5"
                          >
                            {amenity.icon}
                            {amenity.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Completion Year (for off-plan properties) */}
                  {(isOffPlan || activeMarketType === "off-plan") && (
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-white/90">Completion Year</label>
                      <Select value={completionYear} onValueChange={setCompletionYear}>
                        <SelectTrigger className="bg-transparent border-[#D4AF37]/40 text-white h-10 font-medium">
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-[#D4AF37]/40 text-white">
                          <SelectItem value="any" className="font-medium">Any</SelectItem>
                          <SelectItem value="2023" className="font-medium">2023</SelectItem>
                          <SelectItem value="2024" className="font-medium">2024</SelectItem>
                          <SelectItem value="2025" className="font-medium">2025</SelectItem>
                          <SelectItem value="2026" className="font-medium">2026</SelectItem>
                          <SelectItem value="2027+" className="font-medium">2027+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Furnishing Status (for rental properties) */}
                  {isRental && (
                    <div className="space-y-3">
                      <label className="text-sm font-semibold text-white/90">Furnishing Status</label>
                      <Select value={furnishingStatus} onValueChange={setFurnishingStatus}>
                        <SelectTrigger className="bg-transparent border-[#D4AF37]/40 text-white h-10 font-medium">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border-[#D4AF37]/40 text-white">
                          <SelectItem value="any" className="font-medium">Any</SelectItem>
                          <SelectItem value="furnished" className="font-medium">Furnished</SelectItem>
                          <SelectItem value="unfurnished" className="font-medium">Unfurnished</SelectItem>
                          <SelectItem value="partially-furnished" className="font-medium">Partially Furnished</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Apply Button (for desktop advanced filters) */}
                  <div className="flex items-end mt-4">
                    <GradientButton className="w-full" onClick={applyFilters}>
                      Apply Filters
                    </GradientButton>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Filters Button */}
      <div className="md:hidden mb-6">
        <Button
          variant="outline"
          className="w-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 flex items-center justify-center gap-2"
          onClick={() => setShowMobileFilters(true)}
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Mobile Filters Panel */}
      <AnimatePresence>
        {showMobileFilters && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/90 z-50 overflow-y-auto pb-20"
          >
            <div className="container mx-auto py-6 px-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Filters</h2>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10"
                  onClick={() => setShowMobileFilters(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Mobile Filter Content */}
              <div className="space-y-8">
                {/* Listing Type Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white">Listing Type</label>
                  <FilterToggle options={listingTypes} activeId={activeListingType} onChange={setActiveListingType} />
                </div>

                {/* Market Type Filter (if not on a specific market page) */}
                {!isOffPlan && !isRental && (
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white">Market Type</label>
                    <FilterToggle options={marketTypes} activeId={activeMarketType} onChange={setActiveMarketType} />
                  </div>
                )}

                {/* Property Type Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white">Property Type</label>
                  <FilterToggle options={propertyCategories} activeId={activeCategory} onChange={setActiveCategory} />
                </div>

                {/* Lifestyle Filter */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white">Lifestyle</label>
                  <FilterToggle options={lifestyleOptions} activeId={activeLifestyle} onChange={setActiveLifestyle} />
                </div>

                {/* Developer Filter (always shown for off-plan, optional for others) */}
                {(isOffPlan || activeMarketType === "off-plan") && (
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white">Developer</label>
                    <FilterToggle options={developerOptions} activeId={activeDeveloper} onChange={setActiveDeveloper} />
                  </div>
                )}

                {/* Price Range */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white">
                    Price Range ({isRental ? "AED/year" : "AED"})
                  </label>
                  <div className="pt-6 px-2">
                    <Slider
                      value={priceRange}
                      min={isRental ? 10000 : 100000}
                      max={isRental ? 1000000 : 50000000}
                      step={isRental ? 1000 : 10000}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-white/70 font-medium">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>

                {/* Area Range */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white">Area (sq.ft)</label>
                  <div className="pt-6 px-2">
                    <Slider
                      value={areaRange}
                      min={100}
                      max={20000}
                      step={100}
                      onValueChange={(value) => setAreaRange(value as [number, number])}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-white/70 font-medium">
                    <span>{formatArea(areaRange[0])}</span>
                    <span>{formatArea(areaRange[1])}</span>
                  </div>
                </div>

                {/* Bedrooms */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white">Bedrooms</label>
                  <Select value={bedrooms} onValueChange={setBedrooms}>
                    <SelectTrigger className="bg-transparent border-[#D4AF37]/40 text-white h-10 font-medium">
                      <SelectValue placeholder="Select bedrooms" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#D4AF37]/40 text-white">
                      <SelectItem value="any" className="font-medium">Any</SelectItem>
                      <SelectItem value="studio" className="font-medium">Studio</SelectItem>
                      <SelectItem value="1" className="font-medium">1 Bedroom</SelectItem>
                      <SelectItem value="2" className="font-medium">2 Bedrooms</SelectItem>
                      <SelectItem value="3" className="font-medium">3 Bedrooms</SelectItem>
                      <SelectItem value="4" className="font-medium">4 Bedrooms</SelectItem>
                      <SelectItem value="5+" className="font-medium">5+ Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bathrooms */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white">Bathrooms</label>
                  <Select value={bathrooms} onValueChange={setBathrooms}>
                    <SelectTrigger className="bg-transparent border-[#D4AF37]/40 text-white h-10 font-medium">
                      <SelectValue placeholder="Select bathrooms" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-[#D4AF37]/40 text-white">
                      <SelectItem value="any" className="font-medium">Any</SelectItem>
                      <SelectItem value="1" className="font-medium">1 Bathroom</SelectItem>
                      <SelectItem value="2" className="font-medium">2 Bathrooms</SelectItem>
                      <SelectItem value="3" className="font-medium">3 Bathrooms</SelectItem>
                      <SelectItem value="4" className="font-medium">4 Bathrooms</SelectItem>
                      <SelectItem value="5+" className="font-medium">5+ Bathrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white">Location</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {locationOptions.map((location) => (
                      <div key={location.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mobile-location-${location.id}`}
                          checked={selectedLocations.includes(location.id)}
                          onCheckedChange={() => toggleLocation(location.id)}
                          className="border-[#D4AF37]/40 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                        />
                        <label
                          htmlFor={`mobile-location-${location.id}`}
                          className="text-sm font-medium text-white cursor-pointer"
                        >
                          {location.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Neighborhood Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white">Neighborhood</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {neighborhoodOptions.length > 0 ? (
                      neighborhoodOptions.map((neighborhood) => (
                        <div key={neighborhood.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`mobile-neighborhood-${neighborhood.id}`}
                            checked={selectedNeighborhoods.includes(neighborhood.id)}
                            onCheckedChange={() => toggleNeighborhood(neighborhood.id)}
                            className="border-[#D4AF37]/40 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                          />
                          <label
                            htmlFor={`mobile-neighborhood-${neighborhood.id}`}
                            className="text-sm font-medium text-white cursor-pointer"
                          >
                            {neighborhood.name}
                          </label>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-white/50 italic">No neighborhoods available</p>
                    )}
                  </div>
                </div>

                {/* Views Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white">Views</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {viewOptions.map((view) => (
                      <div key={view.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mobile-view-${view.id}`}
                          checked={selectedViews.includes(view.id)}
                          onCheckedChange={() => toggleView(view.id)}
                          className="border-[#D4AF37]/40 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                        />
                        <label
                          htmlFor={`mobile-view-${view.id}`}
                          className="text-sm font-medium text-white cursor-pointer"
                        >
                          {view.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities Selection */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-white">Amenities</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {amenities.map((amenity) => (
                      <div key={amenity.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`mobile-amenity-${amenity.id}`}
                          checked={selectedAmenities.includes(amenity.id)}
                          onCheckedChange={() => toggleAmenity(amenity.id)}
                          className="border-[#D4AF37]/40 data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                        />
                        <label
                          htmlFor={`mobile-amenity-${amenity.id}`}
                          className="text-sm font-medium text-white cursor-pointer flex items-center gap-1.5"
                        >
                          {amenity.icon}
                          {amenity.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Completion Year (for off-plan properties) */}
                {(isOffPlan || activeMarketType === "off-plan") && (
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white">Completion Year</label>
                    <Select value={completionYear} onValueChange={setCompletionYear}>
                      <SelectTrigger className="bg-transparent border-[#D4AF37]/40 text-white h-10 font-medium">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-[#D4AF37]/40 text-white">
                        <SelectItem value="any" className="font-medium">Any</SelectItem>
                        <SelectItem value="2023" className="font-medium">2023</SelectItem>
                        <SelectItem value="2024" className="font-medium">2024</SelectItem>
                        <SelectItem value="2025" className="font-medium">2025</SelectItem>
                        <SelectItem value="2026" className="font-medium">2026</SelectItem>
                        <SelectItem value="2027+" className="font-medium">2027+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Furnishing Status (for rental properties) */}
                {isRental && (
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-white">Furnishing Status</label>
                    <Select value={furnishingStatus} onValueChange={setFurnishingStatus}>
                      <SelectTrigger className="bg-transparent border-[#D4AF37]/40 text-white h-10 font-medium">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-[#D4AF37]/40 text-white">
                        <SelectItem value="any" className="font-medium">Any</SelectItem>
                        <SelectItem value="furnished" className="font-medium">Furnished</SelectItem>
                        <SelectItem value="unfurnished" className="font-medium">Unfurnished</SelectItem>
                        <SelectItem value="partially-furnished" className="font-medium">Partially Furnished</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Mobile Filter Action Buttons */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="w-full border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10"
                    onClick={resetFilters}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <GradientButton className="w-full" onClick={applyFilters}>
                    Apply Filters
                  </GradientButton>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}