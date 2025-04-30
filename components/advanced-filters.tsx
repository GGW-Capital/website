"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { getNeighborhoods, getLifestyles, client } from "@/lib/sanity"
import {
  Search,
  Filter,
  ChevronDown,
  X,
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
  { id: "pool", label: "Swimming Pool" },
  { id: "gym", label: "Gym" },
  { id: "parking", label: "Parking" },
  { id: "security", label: "24/7 Security" },
  { id: "balcony", label: "Balcony" },
  { id: "wifi", label: "High-Speed Internet" },
  { id: "furnished", label: "Fully Furnished" },
  { id: "kitchen", label: "Equipped Kitchen" },
  { id: "view", label: "Panoramic View" },
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
  const [enablePriceFilter, setEnablePriceFilter] = useState(initialFilters.enablePriceFilter !== false)
  const [areaRange, setAreaRange] = useState<[number, number]>(initialFilters.areaRange || [500, 10000])
  const [enableAreaFilter, setEnableAreaFilter] = useState(initialFilters.enableAreaFilter !== false)
  const [bedrooms, setBedrooms] = useState(initialFilters.bedrooms || "any")
  const [bathrooms, setBathrooms] = useState(initialFilters.bathrooms || "any")
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(initialFilters.amenities || [])
  const [selectedViews, setSelectedViews] = useState<string[]>(initialFilters.views || [])
  const [completionYear, setCompletionYear] = useState(initialFilters.completionYear || "any")
  const [furnishingStatus, setFurnishingStatus] = useState(initialFilters.furnishingStatus || "any")
  const [rentalPeriod, setRentalPeriod] = useState(initialFilters.rentalPeriod || "any")

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
      priceRange: enablePriceFilter ? priceRange : null,
      enablePriceFilter,
      areaRange: enableAreaFilter ? areaRange : null,
      enableAreaFilter,
      bedrooms,
      bathrooms,
      amenities: selectedAmenities,
      views: selectedViews,
      neighborhoods: selectedNeighborhoods.map((id) => {
        const neighborhood = neighborhoodOptions.find((n) => n.id === id)
        return { id, name: neighborhood?.name || id }
      }),
      completionYear,
      furnishingStatus,
      rentalPeriod,
      keyword: searchKeyword,
    }

    onFilterChange(filters)
    
    // Close mobile filters after applying
    if (showMobileFilters) {
      setShowMobileFilters(false)
    }
  }

  // Reset all filters to defaults
  const resetFilters = () => {
    setActiveMarketType(isOffPlan ? "off-plan" : isRental ? "secondary-market" : "all")
    setActiveListingType("all")
    setActiveCategory("all")
    setActiveLifestyle("all")
    setActiveDeveloper("all")
    setSelectedLocations([])
    setSelectedNeighborhoods([])
    setPriceRange(isRental ? [50000, 500000] : [500000, 20000000])
    setEnablePriceFilter(true)
    setAreaRange([500, 10000])
    setEnableAreaFilter(true)
    setBedrooms("any")
    setBathrooms("any")
    setSelectedAmenities([])
    setSelectedViews([])
    setCompletionYear("any")
    setFurnishingStatus("any")
    setRentalPeriod("any")
    setSearchKeyword("")
    onReset()
    
    // Close mobile filters after resetting
    if (showMobileFilters) {
      setShowMobileFilters(false)
    }
  }

  // Fetch neighborhoods from Sanity
  useEffect(() => {
    async function fetchNeighborhoods() {
      try {
        const neighborhoods = await getNeighborhoods()
        setNeighborhoodOptions(
          neighborhoods.map((n: any) => ({
            id: n._id,
            name: n.name,
          }))
        )
      } catch (error) {
        console.error("Failed to fetch neighborhoods:", error)
      }
    }

    async function fetchLifestyles() {
      try {
        const lifestyles = await getLifestyles()
        
        if (lifestyles && lifestyles.length) {
          setLifestyleOptions(
            lifestyles.map((lifestyle: any) => ({
              id: lifestyle.value,
              label: lifestyle.title,
            }))
          )
        }
      } catch (error) {
        console.error("Failed to fetch lifestyles:", error)
      }
    }
    
    fetchNeighborhoods()
    fetchLifestyles()
  }, [])

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Search Bar (always visible) */}
      <div className="relative w-full max-w-full mx-auto">
        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="flex items-center">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search properties by location, developer, project..."
                className="pl-10 pr-4 py-3 rounded-l-md border-0 bg-[#080808] text-white shadow-md focus:ring-2 focus:ring-[#D4AF37]/30 focus:border-0"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search className="h-5 w-5" />
              </span>
            </div>
            
            {/* Filter toggle button (mobile only) */}
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="md:hidden border-0 shadow-md bg-[#080808] hover:bg-[#050505] text-white"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <Filter className="h-5 w-5" />
            </Button>
            
            {/* Advanced filters toggle (desktop) */}
            <Button
              type="button"
              variant="outline"
              className="hidden md:flex border-0 shadow-md rounded-r-md rounded-l-none px-4 py-3 h-10 bg-[#080808] hover:bg-[#050505] text-white"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              <Filter className="h-5 w-5 mr-2" />
              <span>Filters</span>
              <ChevronDown
                className={`ml-2 h-4 w-4 transition-transform ${
                  showAdvancedFilters ? "rotate-180" : ""
                }`}
              />
            </Button>

            <GradientButton
              type="submit"
              className="ml-2 px-6 text-sm"
            >
              Search
            </GradientButton>
          </div>
        </form>

        {/* Desktop filter panel */}
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
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold text-white/90">
                        Price Range ({isRental ? "AED/year" : "AED"})
                      </label>
                      <div className="flex items-center">
                        <Checkbox 
                          id="enablePriceFilter" 
                          className="border-[#D4AF37] data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                          checked={enablePriceFilter}
                          onCheckedChange={(checked) => setEnablePriceFilter(checked as boolean)}
                        />
                        <label htmlFor="enablePriceFilter" className="ml-2 text-xs text-white/70">
                          Enable filter
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
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
                            min={isRental ? 10000 : 200000}
                            step={isRental ? 1000 : 10000}
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
                            min={isRental ? 10000 : 200000}
                            step={isRental ? 1000 : 10000}
                            disabled={!enablePriceFilter}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-white/50 font-medium mt-1">
                        <span>Min: {formatPrice(priceRange[0])}</span>
                        <span>Max: {formatPrice(priceRange[1])}</span>
                      </div>
                    </div>
                  </div>

                  {/* Area Range */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-semibold text-white/90">Area (sq.ft)</label>
                      <div className="flex items-center">
                        <Checkbox 
                          id="enableAreaFilter" 
                          className="border-[#D4AF37] data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                          checked={enableAreaFilter}
                          onCheckedChange={(checked) => setEnableAreaFilter(checked as boolean)}
                        />
                        <label htmlFor="enableAreaFilter" className="ml-2 text-xs text-white/70">
                          Enable filter
                        </label>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
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
                            step={50}
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
                            step={50}
                            disabled={!enableAreaFilter}
                          />
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-white/50 font-medium mt-1">
                        <span>Min: {formatArea(areaRange[0])}</span>
                        <span>Max: {formatArea(areaRange[1])}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bedrooms */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white/90">Bedrooms</label>
                    <Select value={bedrooms} onValueChange={setBedrooms}>
                      <SelectTrigger className="border border-[#D4AF37]/30 bg-black text-white hover:border-[#D4AF37]">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border border-[#D4AF37]/30 text-white">
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                        <SelectItem value="1">1 Bedroom</SelectItem>
                        <SelectItem value="2">2 Bedrooms</SelectItem>
                        <SelectItem value="3">3 Bedrooms</SelectItem>
                        <SelectItem value="4">4 Bedrooms</SelectItem>
                        <SelectItem value="5+">5+ Bedrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Bathrooms */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white/90">Bathrooms</label>
                    <Select value={bathrooms} onValueChange={setBathrooms}>
                      <SelectTrigger className="border border-[#D4AF37]/30 bg-black text-white hover:border-[#D4AF37]">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border border-[#D4AF37]/30 text-white">
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1 Bathroom</SelectItem>
                        <SelectItem value="2">2 Bathrooms</SelectItem>
                        <SelectItem value="3">3 Bathrooms</SelectItem>
                        <SelectItem value="4">4 Bathrooms</SelectItem>
                        <SelectItem value="5+">5+ Bathrooms</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rental Period - Only show for rental properties */}
                  {isRental && (
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-white/90">Rental Period</label>
                      <Select value={rentalPeriod} onValueChange={setRentalPeriod}>
                        <SelectTrigger className="border border-[#D4AF37]/30 bg-black text-white hover:border-[#D4AF37]">
                          <SelectValue placeholder="Any Period" />
                        </SelectTrigger>
                        <SelectContent className="bg-black border border-[#D4AF37]/30 text-white">
                          <SelectItem value="any">Any Period</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Property Category */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white/90">Property Type</label>
                    <div className="border border-[#D4AF37]/30 rounded-md bg-black p-2">
                      <FilterToggle
                        options={[{ id: "all", label: "All" }, ...propertyCategories]}
                        activeId={activeCategory}
                        onChange={setActiveCategory}
                        showAll={true}
                      />
                    </div>
                  </div>

                  {/* Lifestyle */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-white/90">Lifestyle</label>
                    <div className="border border-[#D4AF37]/30 rounded-md bg-black p-2">
                      <FilterToggle
                        options={[{ id: "all", label: "All" }, ...lifestyleOptions]}
                        activeId={activeLifestyle}
                        onChange={setActiveLifestyle}
                        showAll={true}
                      />
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mt-6">
                  <label className="text-sm font-semibold text-white/90 mb-3 block">Amenities</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                    {amenities.map((amenity) => (
                      <div
                        key={amenity.id}
                        className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${
                          selectedAmenities.includes(amenity.id)
                            ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                            : "text-white/70 hover:bg-[#D4AF37]/5"
                        }`}
                        onClick={() => toggleAmenity(amenity.id)}
                      >
                        <Checkbox
                          checked={selectedAmenities.includes(amenity.id)}
                          className="border-[#D4AF37] data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                        />
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">{amenity.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* View types */}
                <div className="mt-6">
                  <label className="text-sm font-semibold text-white/90 mb-3 block">Views</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-2">
                    {viewOptions.map((view) => (
                      <div
                        key={view.id}
                        className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${
                          selectedViews.includes(view.id)
                            ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                            : "text-white/70 hover:bg-[#D4AF37]/5"
                        }`}
                        onClick={() => toggleView(view.id)}
                      >
                        <Checkbox
                          checked={selectedViews.includes(view.id)}
                          className="border-[#D4AF37] data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                        />
                        <span className="text-sm">{view.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Neighborhoods */}
                {neighborhoodOptions.length > 0 && (
                  <div className="mt-6">
                    <label className="text-sm font-semibold text-white/90 mb-3 block">Neighborhoods</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                      {neighborhoodOptions.map((neighborhood) => (
                        <div
                          key={neighborhood.id}
                          className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${
                            selectedNeighborhoods.includes(neighborhood.id)
                              ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                              : "text-white/70 hover:bg-[#D4AF37]/5"
                          }`}
                          onClick={() => toggleNeighborhood(neighborhood.id)}
                        >
                          <Checkbox
                            checked={selectedNeighborhoods.includes(neighborhood.id)}
                            className="border-[#D4AF37] data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                          />
                          <span className="text-sm">{neighborhood.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="mt-8 flex justify-end gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-white/70 hover:text-white hover:bg-black"
                    onClick={resetFilters}
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={applyFilters}
                    className="bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile filter panel */}
        <AnimatePresence>
          {showMobileFilters && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 overflow-y-auto pb-20"
            >
              <div className="bg-[#0a0a0a] border-b border-[#D4AF37]/30 p-4 sticky top-0 z-10">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg text-white font-semibold">Filters</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white"
                    onClick={() => setShowMobileFilters(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="p-4 space-y-8">
                {/* Market Type */}
                <div>
                  <label className="text-sm font-semibold text-white mb-3 block">Market Type</label>
                  <div className="border border-[#D4AF37]/30 rounded-md bg-black p-2">
                    <FilterToggle
                      options={[{ id: "all", label: "All" }, ...marketTypes]}
                      activeId={activeMarketType}
                      onChange={setActiveMarketType}
                      showAll={true}
                    />
                  </div>
                </div>

                {/* Listing Type */}
                <div>
                  <label className="text-sm font-semibold text-white mb-3 block">Listing Type</label>
                  <div className="border border-[#D4AF37]/30 rounded-md bg-black p-2">
                    <FilterToggle
                      options={[{ id: "all", label: "All" }, ...listingTypes]}
                      activeId={activeListingType}
                      onChange={setActiveListingType}
                      showAll={true}
                    />
                  </div>
                </div>

                {/* Property Category */}
                <div>
                  <label className="text-sm font-semibold text-white mb-3 block">Property Type</label>
                  <div className="border border-[#D4AF37]/30 rounded-md bg-black p-2">
                    <FilterToggle
                      options={[{ id: "all", label: "All" }, ...propertyCategories]}
                      activeId={activeCategory}
                      onChange={setActiveCategory}
                      showAll={true}
                    />
                  </div>
                </div>

                {/* Lifestyle */}
                <div>
                  <label className="text-sm font-semibold text-white mb-3 block">Lifestyle</label>
                  <div className="border border-[#D4AF37]/30 rounded-md bg-black p-2">
                    <FilterToggle
                      options={[{ id: "all", label: "All" }, ...lifestyleOptions]}
                      activeId={activeLifestyle}
                      onChange={setActiveLifestyle}
                      showAll={true}
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-white">
                      Price Range ({isRental ? "AED/year" : "AED"})
                    </label>
                    <div className="flex items-center">
                      <Checkbox 
                        id="enablePriceFilterMobile" 
                        className="border-[#D4AF37] data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                        checked={enablePriceFilter}
                        onCheckedChange={(checked) => setEnablePriceFilter(checked as boolean)}
                      />
                      <label htmlFor="enablePriceFilterMobile" className="ml-2 text-xs text-white/70">
                        Enable filter
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
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
                          min={isRental ? 10000 : 100000}
                          step={isRental ? 1000 : 10000}
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
                          min={isRental ? 10000 : 100000}
                          step={isRental ? 1000 : 10000}
                          disabled={!enablePriceFilter}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-white/50 font-medium mt-1">
                      <span>Min: {formatPrice(priceRange[0])}</span>
                      <span>Max: {formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                {/* Area Range */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-white">Area (sq.ft)</label>
                    <div className="flex items-center">
                      <Checkbox 
                        id="enableAreaFilterMobile" 
                        className="border-[#D4AF37] data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                        checked={enableAreaFilter}
                        onCheckedChange={(checked) => setEnableAreaFilter(checked as boolean)}
                      />
                      <label htmlFor="enableAreaFilterMobile" className="ml-2 text-xs text-white/70">
                        Enable filter
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
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
                          step={50}
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
                          step={50}
                          disabled={!enableAreaFilter}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-white/50 font-medium mt-1">
                      <span>Min: {formatArea(areaRange[0])}</span>
                      <span>Max: {formatArea(areaRange[1])}</span>
                    </div>
                  </div>
                </div>

                {/* Bedrooms */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white">Bedrooms</label>
                  <Select value={bedrooms} onValueChange={setBedrooms}>
                    <SelectTrigger className="border border-[#D4AF37]/30 bg-black text-white hover:border-[#D4AF37]">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border border-[#D4AF37]/30 text-white">
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="1">1 Bedroom</SelectItem>
                      <SelectItem value="2">2 Bedrooms</SelectItem>
                      <SelectItem value="3">3 Bedrooms</SelectItem>
                      <SelectItem value="4">4 Bedrooms</SelectItem>
                      <SelectItem value="5+">5+ Bedrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bathrooms */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-white">Bathrooms</label>
                  <Select value={bathrooms} onValueChange={setBathrooms}>
                    <SelectTrigger className="border border-[#D4AF37]/30 bg-black text-white hover:border-[#D4AF37]">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border border-[#D4AF37]/30 text-white">
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1 Bathroom</SelectItem>
                      <SelectItem value="2">2 Bathrooms</SelectItem>
                      <SelectItem value="3">3 Bathrooms</SelectItem>
                      <SelectItem value="4">4 Bathrooms</SelectItem>
                      <SelectItem value="5+">5+ Bathrooms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Rental Period - Only show for rental properties */}
                {isRental && (
                  <div>
                    <label className="text-sm font-semibold text-white">Rental Period</label>
                    <Select value={rentalPeriod} onValueChange={setRentalPeriod}>
                      <SelectTrigger className="border border-[#D4AF37]/30 bg-black text-white hover:border-[#D4AF37]">
                        <SelectValue placeholder="Any Period" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border border-[#D4AF37]/30 text-white">
                        <SelectItem value="any">Any Period</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Amenities */}
                <div>
                  <label className="text-sm font-semibold text-white mb-3 block">Amenities</label>
                  <div className="grid grid-cols-1 gap-2">
                    {amenities.map((amenity) => (
                      <div
                        key={amenity.id}
                        className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${
                          selectedAmenities.includes(amenity.id)
                            ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                            : "text-white/70 hover:bg-[#D4AF37]/5"
                        }`}
                        onClick={() => toggleAmenity(amenity.id)}
                      >
                        <Checkbox
                          checked={selectedAmenities.includes(amenity.id)}
                          className="border-[#D4AF37] data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                        />
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">{amenity.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Views */}
                <div>
                  <label className="text-sm font-semibold text-white mb-3 block">Views</label>
                  <div className="grid grid-cols-1 gap-2">
                    {viewOptions.map((view) => (
                      <div
                        key={view.id}
                        className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${
                          selectedViews.includes(view.id)
                            ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                            : "text-white/70 hover:bg-[#D4AF37]/5"
                        }`}
                        onClick={() => toggleView(view.id)}
                      >
                        <Checkbox
                          checked={selectedViews.includes(view.id)}
                          className="border-[#D4AF37] data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                        />
                        <span className="text-sm">{view.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Neighborhoods */}
                {neighborhoodOptions.length > 0 && (
                  <div>
                    <label className="text-sm font-semibold text-white mb-3 block">Neighborhoods</label>
                    <div className="grid grid-cols-1 gap-2">
                      {neighborhoodOptions.map((neighborhood) => (
                        <div
                          key={neighborhood.id}
                          className={`flex items-center gap-2 p-2 rounded-md cursor-pointer transition-colors ${
                            selectedNeighborhoods.includes(neighborhood.id)
                              ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                              : "text-white/70 hover:bg-[#D4AF37]/5"
                          }`}
                          onClick={() => toggleNeighborhood(neighborhood.id)}
                        >
                          <Checkbox
                            checked={selectedNeighborhoods.includes(neighborhood.id)}
                            className="border-[#D4AF37] data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                          />
                          <span className="text-sm">{neighborhood.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0a0a0a] border-t border-[#D4AF37]/30 flex gap-3">
                  <Button
                    type="button"
                    variant="ghost"
                    className="flex-1 text-white/70 hover:text-white hover:bg-black"
                    onClick={resetFilters}
                  >
                    Reset
                  </Button>
                  <Button
                    onClick={applyFilters}
                    className="flex-1 bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}