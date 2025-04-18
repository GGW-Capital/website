"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { getLifestyles, getNeighborhoods } from "@/lib/sanity";

// Default lifestyle options before Sanity data loads
const defaultLifestyleOptions = [
  { id: "luxury", label: "Luxury" },
  { id: "beachfront", label: "Beachfront" },
  { id: "family", label: "Family" },
  { id: "urban", label: "Urban" },
  { id: "investment", label: "Investment" },
];

interface ProjectFiltersProps {
  availableDevelopers?: string[];
  availableLocations?: string[];
  availableCompletionYears?: string[];
  availableNeighborhoods?: { id: string; name: string }[];
  initialMarketType?: string;
  onFilterChange?: (filters: any) => void;
}

export default function ProjectFilters({
  availableDevelopers = [],
  availableLocations = [],
  availableCompletionYears = [],
  availableNeighborhoods = [],
  initialMarketType,
  onFilterChange,
}: ProjectFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State for search and filters
  const [searchKeyword, setSearchKeyword] = useState(
    searchParams.get("keyword") || ""
  );
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Market type filter state
  const [activeMarketType, setActiveMarketType] = useState(
    searchParams.get("marketType") || initialMarketType || "all"
  );

  // Add state for neighborhoods and lifestyles
  const [neighborhoodOptions, setNeighborhoodOptions] = useState<
    { id: string; name: string }[]
  >(availableNeighborhoods);
  const [lifestyleOptions, setLifestyleOptions] = useState(
    defaultLifestyleOptions
  );

  // Filter states with defaults from search params
  const [activeDeveloper, setActiveDeveloper] = useState(
    searchParams.get("developer") || "all"
  );
  const [activeLifestyle, setActiveLifestyle] = useState(
    searchParams.get("lifestyle") || "all"
  );
  const [completionYear, setCompletionYear] = useState(
    searchParams.get("completionYear") || "any"
  );
  const [selectedLocations, setSelectedLocations] = useState<string[]>(
    searchParams.get("locations")?.split(",").filter(Boolean) || []
  );
  const [selectedNeighborhoods, setSelectedNeighborhoods] = useState<string[]>(
    searchParams.get("neighborhoods")?.split(",").filter(Boolean) || []
  );

  // Price range for projects
  const parsedMinPrice = searchParams.get("minPrice")
    ? parseInt(searchParams.get("minPrice") || "")
    : 500000;
  const parsedMaxPrice = searchParams.get("maxPrice")
    ? parseInt(searchParams.get("maxPrice") || "")
    : 50000000;

  const [priceRange, setPriceRange] = useState<[number, number]>([
    parsedMinPrice,
    parsedMaxPrice,
  ]);

  // Format price for display
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)}M AED`;
    } else {
      return `${(price / 1000).toFixed(0)}K AED`;
    }
  };

  // Handle search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ keyword: searchKeyword });
  };

  // Toggle location selection
  const toggleLocation = (locationId: string) => {
    setSelectedLocations((prev) =>
      prev.includes(locationId)
        ? prev.filter((id) => id !== locationId)
        : [...prev, locationId]
    );
  };

  // Toggle neighborhood selection
  const toggleNeighborhood = (neighborhoodId: string) => {
    setSelectedNeighborhoods((prev) =>
      prev.includes(neighborhoodId)
        ? prev.filter((id) => id !== neighborhoodId)
        : [...prev, neighborhoodId]
    );
  };

  // Update URL parameters and trigger filter change
  const updateFilters = (newFilters: Record<string, any>) => {
    // Create a new URLSearchParams object from the current parameters
    const params = new URLSearchParams(searchParams.toString());

    // Update parameters based on new filters
    Object.entries(newFilters).forEach(([key, value]) => {
      if (
        value === null ||
        value === undefined ||
        value === "" ||
        value === "all" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        params.delete(key);
      } else if (Array.isArray(value)) {
        params.set(key, value.join(","));
      } else {
        params.set(key, String(value));
      }
    });

    // Remove empty or default parameters
    Array.from(params.keys()).forEach((key) => {
      const value = params.get(key);
      if (value === "" || value === "all" || value === "any") {
        params.delete(key);
      }
    });

    // Build the new URL
    const newUrl = `${pathname}?${params.toString()}`;

    // Update the URL in history
    router.push(newUrl, { scroll: false });

    // Call the onFilterChange handler if provided
    if (onFilterChange) {
      // Construct the filter object
      const filterObject = {
        developer: activeDeveloper === "all" ? undefined : activeDeveloper,
        lifestyle: activeLifestyle === "all" ? undefined : activeLifestyle,
        completionYear: completionYear === "any" ? undefined : completionYear,
        locations: selectedLocations.length > 0 ? selectedLocations : undefined,
        neighborhoods:
          selectedNeighborhoods.length > 0 ? selectedNeighborhoods : undefined,
        priceRange: priceRange,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        keyword: searchKeyword || undefined,
        marketType: activeMarketType === "all" ? undefined : activeMarketType,
        ...newFilters,
      };

      onFilterChange(filterObject);
    }
  };

  // Apply developer filter immediately when changed
  useEffect(() => {
    if (activeDeveloper !== (searchParams.get("developer") || "all")) {
      updateFilters({ developer: activeDeveloper });
    }
  }, [activeDeveloper]);

  // Apply lifestyle filter immediately when changed
  useEffect(() => {
    if (activeLifestyle !== (searchParams.get("lifestyle") || "all")) {
      updateFilters({ lifestyle: activeLifestyle });
    }
  }, [activeLifestyle]);

  // Apply completion year filter immediately when changed
  useEffect(() => {
    if (completionYear !== (searchParams.get("completionYear") || "any")) {
      updateFilters({ completionYear: completionYear });
    }
  }, [completionYear]);

  // Apply market type filter immediately when changed
  useEffect(() => {
    if (
      activeMarketType !==
      (searchParams.get("marketType") || initialMarketType || "all")
    ) {
      updateFilters({ marketType: activeMarketType });
    }
  }, [activeMarketType]);

  // Apply all filters when Apply button is clicked
  const applyFilters = () => {
    updateFilters({
      locations: selectedLocations,
      priceRange:
        priceRange.length === 2 ? [priceRange[0], priceRange[1]] : undefined,
      neighborhoods: selectedNeighborhoods,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
    });

    setShowMobileFilters(false);
  };

  // Reset all filters
  const resetFilters = () => {
    setActiveDeveloper("all");
    setActiveLifestyle("all");
    setCompletionYear("any");
    setSelectedLocations([]);
    setSelectedNeighborhoods([]);
    setPriceRange([500000, 50000000]);
    setSearchKeyword("");
    setActiveMarketType(initialMarketType || "all");

    // Clear all search parameters and redirect to the base URL
    router.push(pathname, { scroll: false });

    // Call onFilterChange with empty filters
    if (onFilterChange) {
      onFilterChange({});
    }

    setShowMobileFilters(false);
  };

  // Fetch neighborhoods and lifestyle data
  useEffect(() => {
    async function fetchNeighborhoods() {
      try {
        // Skip if we already have neighborhoods provided through props
        if (availableNeighborhoods.length > 0) {
          setNeighborhoodOptions(availableNeighborhoods);
          return;
        }

        const neighborhoods = await getNeighborhoods();
        if (neighborhoods && neighborhoods.length > 0) {
          setNeighborhoodOptions(
            neighborhoods.map((n: any) => ({
              id: n._id,
              name: n.name,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching neighborhoods:", error);
      }
    }

    async function fetchLifestyles() {
      try {
        const lifestyleData = await getLifestyles(true); // true = include "All" option

        if (lifestyleData && lifestyleData.length > 0) {
          setLifestyleOptions(lifestyleData);
        }
      } catch (error) {
        console.error("Error fetching lifestyle data:", error);
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
              placeholder="Search projects by location, developer, features..."
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
          {/* Market Type Filter
          {/* Developer Filter */}
          {availableDevelopers.length > 0 && (
            <div className="hidden md:flex">
              <Select
                value={activeDeveloper}
                onValueChange={setActiveDeveloper}
              >
                <SelectTrigger className="w-36 bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white">
                  <SelectValue placeholder="Developer" />
                </SelectTrigger>
                <SelectContent className="bg-[#0F0F0F] border-[#D4AF37]/30">
                  <SelectItem
                    value="all"
                    className="text-white hover:bg-ggw-gold/10"
                  >
                    All Developers
                  </SelectItem>
                  {availableDevelopers.map((developer) => (
                    <SelectItem
                      key={developer}
                      value={developer}
                      className="text-white hover:bg-ggw-gold/10"
                    >
                      {developer}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

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
                    className="text-white hover:bg-ggw-gold/10"
                  >
                    {lifestyle.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Completion Year Filter */}
          {availableCompletionYears.length > 0 && (
            <div className="hidden md:flex">
              <Select value={completionYear} onValueChange={setCompletionYear}>
                <SelectTrigger className="w-36 bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white">
                  <SelectValue placeholder="Completion Year" />
                </SelectTrigger>
                <SelectContent className="bg-[#0F0F0F] border-[#D4AF37]/30">
                  <SelectItem
                    value="any"
                    className="text-white hover:bg-ggw-gold/10"
                  >
                    Any Year
                  </SelectItem>
                  {availableCompletionYears.map((year) => (
                    <SelectItem
                      key={year}
                      value={year}
                      className="text-white hover:bg-ggw-gold/10"
                    >
                      {year}
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
            className="hidden md:flex items-center border-[#D4AF37]/30 hover:bg-ggw-gold/10 text-white"
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
            className="md:hidden flex flex-1 items-center border-[#D4AF37]/30 hover:bg-ggw-gold/10 text-white"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price Range */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Price Range</h3>
                  <div className="mb-2">
                    <Slider
                      value={priceRange}
                      min={100000}
                      max={50000000}
                      step={50000}
                      onValueChange={(values) =>
                        setPriceRange(values as [number, number])
                      }
                      className="my-4"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-white/70">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>

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
                            className="border-[#D4AF37]/50 data-[state=checked]:bg-ggw-gradient data-[state=checked]:text-black"
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
              </div>

              {/* Additional Filters */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Neighborhoods */}
                {neighborhoodOptions.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-3">
                      Neighborhoods
                    </h3>
                    <div className="max-h-40 overflow-y-auto pr-2 space-y-2">
                      {neighborhoodOptions.map((neighborhood) => (
                        <div
                          key={neighborhood.id}
                          className="flex items-center"
                        >
                          <Checkbox
                            id={`neighborhood-${neighborhood.id}`}
                            checked={selectedNeighborhoods.includes(
                              neighborhood.id
                            )}
                            onCheckedChange={() =>
                              toggleNeighborhood(neighborhood.id)
                            }
                            className="border-[#D4AF37]/50 data-[state=checked]:bg-ggw-gradient data-[state=checked]:text-black"
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
              </div>

              {/* Filter Actions */}
              <div className="mt-8 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  className="border-[#D4AF37]/30 text-white hover:bg-ggw-gold/10"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
                <GradientButton onClick={applyFilters}>
                  Apply Filters
                </GradientButton>
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
                  className="text-white hover:bg-ggw-gold/10"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-6 space-y-8">
                {/* Market Type Filter */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Market Type</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className={`border-[#D4AF37]/30 hover:bg-ggw-gold/10 text-white ${
                        activeMarketType === "all"
                          ? "bg-ggw-gradient !text-black hover:bg-ggw-gold/90"
                          : ""
                      }`}
                      onClick={() => setActiveMarketType("all")}
                    >
                      All Projects
                    </Button>
                    <Button
                      variant="outline"
                      className={`border-[#D4AF37]/30 hover:bg-ggw-gold/10 text-white ${
                        activeMarketType === "secondary-market"
                          ? "bg-ggw-gradient !text-black hover:bg-ggw-gradient-hover"
                          : ""
                      }`}
                      onClick={() => setActiveMarketType("secondary-market")}
                    >
                      Secondary Market
                    </Button>
                    <Button
                      variant="outline"
                      className={`border-[#D4AF37]/30 hover:bg-ggw-gold/10 text-white ${
                        activeMarketType === "off-plan"
                          ? "bg-ggw-gradient !text-black hover:bg-ggw-gold/90"
                          : ""
                      }`}
                      onClick={() => setActiveMarketType("off-plan")}
                    >
                      Off-Plan
                    </Button>
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
                        className={`border-[#D4AF37]/30 hover:bg-ggw-gold/10 text-white ${
                          activeLifestyle === lifestyle.id
                            ? "bg-ggw-gradient !text-black hover:bg-ggw-gold/90"
                            : ""
                        }`}
                        onClick={() => setActiveLifestyle(lifestyle.id)}
                      >
                        {lifestyle.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Developer Filter */}
                {availableDevelopers.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-3">Developer</h3>
                    <Select
                      value={activeDeveloper}
                      onValueChange={setActiveDeveloper}
                    >
                      <SelectTrigger className="w-full bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white">
                        <SelectValue placeholder="Any Developer" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0F0F0F] border-[#D4AF37]/30">
                        <SelectItem
                          value="all"
                          className="text-white hover:bg-ggw-gold/10"
                        >
                          All Developers
                        </SelectItem>
                        {availableDevelopers.map((developer) => (
                          <SelectItem
                            key={developer}
                            value={developer}
                            className="text-white hover:bg-ggw-gold/10"
                          >
                            {developer}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Completion Year */}
                {availableCompletionYears.length > 0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-3">
                      Completion Year
                    </h3>
                    <Select
                      value={completionYear}
                      onValueChange={setCompletionYear}
                    >
                      <SelectTrigger className="w-full bg-black/50 border-[#D4AF37]/30 focus:border-[#D4AF37] text-white">
                        <SelectValue placeholder="Any Year" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#0F0F0F] border-[#D4AF37]/30">
                        <SelectItem
                          value="any"
                          className="text-white hover:bg-ggw-gold/10"
                        >
                          Any Year
                        </SelectItem>
                        {availableCompletionYears.map((year) => (
                          <SelectItem
                            key={year}
                            value={year}
                            className="text-white hover:bg-ggw-gold/10"
                          >
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Price Range */}
                <div>
                  <h3 className="text-white font-semibold mb-3">Price Range</h3>
                  <div className="mb-2">
                    <Slider
                      value={priceRange}
                      min={500000}
                      max={50000000}
                      step={50000}
                      onValueChange={(values) =>
                        setPriceRange(values as [number, number])
                      }
                      className="my-4"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-white/70">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>

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
                            className="border-[#D4AF37]/50 data-[state=checked]:bg-ggw-gradient data-[state=checked]:text-black"
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
                    className="flex-1 border-[#D4AF37]/30 text-white hover:bg-ggw-gold/10"
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
  );
}
