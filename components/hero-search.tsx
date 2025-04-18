"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import FilterToggle from "@/components/filter-toggle";
import { getDevelopers, getLifestyles } from "@/lib/sanity";

// Define our filter options
const listingTypes = [
  { id: "property", label: "Properties" },
  { id: "project", label: "Projects" },
];

const marketTypes = [
  { id: "secondary-market", label: "Secondary Market" },
  { id: "off-plan", label: "Off-Plan" },
];

const transactionTypes = [
  { id: "buy", label: "Buy" },
  { id: "rent", label: "Rent" },
];

const propertyCategories = [
  { id: "apartment", label: "Apartment" },
  { id: "villa", label: "Villa" },
  { id: "penthouse", label: "Penthouse" },
  { id: "townhouse", label: "Townhouse" },
];

// Default lifestyle options that will be replaced with data from Sanity
const defaultLifestyleOptions = [
  { id: "luxury", label: "Luxury" },
  { id: "beachfront", label: "Beachfront" },
  { id: "family", label: "Family" },
  { id: "urban", label: "Urban" },
  { id: "investment", label: "Investment" },
];

export default function HeroSearch() {
  const router = useRouter();
  const [priceRange, setPriceRange] = useState([200, 500]);
  const [bedrooms, setBedrooms] = useState("any");
  const [location, setLocation] = useState("");
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [lifestyleOptions, setLifestyleOptions] = useState(
    defaultLifestyleOptions
  );
  const [developerOptions, setDeveloperOptions] = useState([
    { id: "all", label: "All Developers" },
  ]);

  // New state for our filters
  const [activeListingType, setActiveListingType] = useState("property");
  const [activeMarketType, setActiveMarketType] = useState("secondary-market");
  const [activeTransactionType, setActiveTransactionType] = useState("buy");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLifestyle, setActiveLifestyle] = useState("all");
  const [activeDeveloper, setActiveDeveloper] = useState("all");

  // Fetch developers and lifestyles from Sanity
  useEffect(() => {
    async function fetchDevelopers() {
      try {
        const developersData = await getDevelopers();
        const formattedDevelopers = developersData.map((developer: any) => ({
          id: developer._id,
          label: developer.name,
        }));

        setDeveloperOptions([
          { id: "all", label: "All Developers" },
          ...formattedDevelopers,
        ]);
      } catch (error) {
        console.error("Error fetching developers:", error);
      }
    }

    async function fetchLifestyles() {
      try {
        const lifestylesData = await getLifestyles(false); // false = don't include "All" option
        if (lifestylesData && lifestylesData.length > 0) {
          setLifestyleOptions(lifestylesData);
        }
      } catch (error) {
        console.error("Error fetching lifestyles:", error);
        // Keep the default options if there's an error
      }
    }

    fetchDevelopers();
    fetchLifestyles();
  }, []);

  const handleSearch = () => {
    // Build query parameters
    const params = new URLSearchParams();
    params.append("minPrice", (priceRange[0] * 1000).toString());
    params.append("maxPrice", (priceRange[1] * 1000).toString());

    if (bedrooms !== "any") {
      params.append("bedrooms", bedrooms);
    }

    if (location) {
      params.append("location", location);
    }

    // Different parameters needed for different pages
    // For projects page only
    if (activeListingType === "project") {
      // Don't include listingType param as it's not used by the projects page
      if (activeMarketType !== "all") {
        params.append("marketType", activeMarketType);
      }

      if (activeDeveloper !== "all") {
        params.append("developer", activeDeveloper);
      }

      if (activeLifestyle !== "all") {
        params.append("lifestyle", activeLifestyle);
      }
    } 
    // For property pages (buy, rent, off-plan)
    else {
      if (activeCategory !== "all") {
        params.append("category", activeCategory);
      }

      if (activeLifestyle !== "all") {
        params.append("lifestyle", activeLifestyle);
      }

      // Developer is only used for off-plan properties
      if (activeMarketType === "off-plan" && activeDeveloper !== "all") {
        params.append("developer", activeDeveloper);
      }
    }

    // Navigate to the appropriate page based on selections
    let basePath = "/buy";

    if (activeListingType === "property") {
      if (activeMarketType === "secondary-market") {
        basePath = activeTransactionType === "buy" ? "/buy" : "/rent";
      } else {
        basePath = "/off-plan";
      }
    } else {
      // For projects
      basePath = "/projects";
    }

    router.push(`${basePath}?${params.toString()}`);
  };

  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="flex justify-center w-[95%] mx-auto">
        <GradientButton
          onClick={() => setShowSearchPanel(!showSearchPanel)}
          className="max-w-full px-10 py-6 md:text-lg font-semibold rounded-[2px] transition-all transform hover:scale-105 flex items-center gap-2"
        >
          <Search className="h-5 w-5" />
          Find Your Dream Property
          <ChevronDown
            className={`h-5 w-5 transition-transform duration-300 ${showSearchPanel ? "rotate-180" : ""}`}
          />
        </GradientButton>
      </div>

      {showSearchPanel && (
        <div className="max-w-5xl mx-auto bg-black/80 backdrop-blur-md border border-ggw-gold/30 rounded-xl p-8 shadow-[0_0_25px_rgba(212,175,55,0.2)] mt-6">
          {/* Step 1: Choose between Properties and Projects */}
          <div className="mb-8">
            <label className="text-sm font-semibold text-white/90 mb-2 block">
              I'm looking for:
            </label>
            <FilterToggle
              options={listingTypes}
              activeId={activeListingType}
              onChange={setActiveListingType}
              showAll={false}
            />
          </div>

          {/* Step 2: Choose Market Type - For both Properties and Projects */}
          <div className="mb-8">
            <label className="text-sm font-semibold text-white/90 mb-2 block">
              Market Type:
            </label>
            <FilterToggle
              options={marketTypes}
              activeId={activeMarketType}
              onChange={setActiveMarketType}
              showAll={false}
            />
          </div>

          {/* Step 3: For Secondary Market - Choose Transaction Type */}
          {activeMarketType === "secondary-market" &&
            activeListingType === "property" && (
              <div className="mb-8">
                <label className="text-sm font-semibold text-white/90 mb-2 block">
                  Transaction Type:
                </label>
                <FilterToggle
                  options={transactionTypes}
                  activeId={activeTransactionType}
                  onChange={setActiveTransactionType}
                  showAll={false}
                />
              </div>
            )}

          {/* Property Type Filter - Only show when Properties is selected */}
          {activeListingType === "property" && (
            <div className="mb-8">
              <label className="text-sm font-semibold text-white/90 mb-2 block">
                Property Type:
              </label>
              <FilterToggle
                options={propertyCategories}
                activeId={activeCategory}
                onChange={setActiveCategory}
              />
            </div>
          )}

          {/* Lifestyle Filter */}
          <div className="mb-8">
            <label className="text-sm font-semibold text-white/90 mb-2 block">
              Lifestyle:
            </label>
            <FilterToggle
              options={lifestyleOptions}
              activeId={activeLifestyle}
              onChange={setActiveLifestyle}
            />
          </div>

          {/* Developer Filter - Only for Projects or Off-Plan Properties/Market */}
          {(activeListingType === "project" ||
            activeMarketType === "off-plan") && (
            <div className="mb-8">
              <label className="text-sm font-semibold text-white/90 mb-2 block">
                Developer:
              </label>
              <FilterToggle
                options={developerOptions}
                activeId={activeDeveloper}
                onChange={setActiveDeveloper}
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-white/90">
                Price Range (kAED)
              </label>
              <div className="pt-6 px-2">
                <Slider
                  defaultValue={[200, 500]}
                  max={activeListingType === "project" ? 200000 : 50000}
                  step={100}
                  min={activeListingType === "project" ? 5000 : 200}
                  value={[priceRange[0], priceRange[1]]}
                  onValueChange={(value) => setPriceRange(value as number[])}
                />
              </div>
              <div className="flex justify-between text-sm text-white/70 font-medium">
                <span>{priceRange[0]}k AED</span>
                <span>{priceRange[1]}k AED</span>
              </div>
            </div>

            {activeListingType === "property" && (
              <div className="space-y-3">
                <label className="text-sm font-semibold text-white/90">
                  Bedrooms
                </label>
                <Select onValueChange={setBedrooms} defaultValue="any">
                  <SelectTrigger className="bg-transparent border-ggw-gold/40 text-white h-12 font-medium">
                    <SelectValue placeholder="Select bedrooms" />
                  </SelectTrigger>
                  <SelectContent className="bg-black border-ggw-gold/40 text-white">
                    <SelectItem value="any" className="font-medium">
                      Any
                    </SelectItem>
                    <SelectItem value="studio" className="font-medium">
                      Studio
                    </SelectItem>
                    <SelectItem value="1" className="font-medium">
                      1 Bedroom
                    </SelectItem>
                    <SelectItem value="2" className="font-medium">
                      2 Bedrooms
                    </SelectItem>
                    <SelectItem value="3" className="font-medium">
                      3 Bedrooms
                    </SelectItem>
                    <SelectItem value="4" className="font-medium">
                      4+ Bedrooms
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-sm font-semibold text-white/90">
                Location
              </label>
              <Input
                type="text"
                placeholder="City or neighborhood"
                className="bg-transparent border-ggw-gold/40 text-white h-12 font-medium"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <GradientButton
              size="lg"
              className="rounded-[2px] transition-all transform hover:scale-105"
              onClick={handleSearch}
            >
              <Search className="mr-2 h-5 w-5" /> Search Properties
            </GradientButton>
          </div>
        </div>
      )}
    </div>
  );
}