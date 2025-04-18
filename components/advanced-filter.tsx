"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { useParams, useSearchParams } from "next/navigation";

interface AdvancedFilterProps {
  onFilterChange: (filters: any) => void;
  isMobile?: boolean;
}

export default function AdvancedFilter({
  onFilterChange,
  isMobile = false,
}: AdvancedFilterProps) {
  const params = useSearchParams();
  const [priceRange, setPriceRange] = useState([
    Number(params.get('minPrice')) || 100000,
    Number(params.get('maxPrice')) || 5000000,
  ]);
  const [areaRange, setAreaRange] = useState([500, 5000]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [completionStatus, setCompletionStatus] = useState<string>("");
  const [locations, setLocations] = useState<string[]>([]);

  const handlePropertyTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setPropertyTypes((prev) => [...prev, type]);
    } else {
      setPropertyTypes((prev) => prev.filter((t) => t !== type));
    }
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setAmenities((prev) => [...prev, amenity]);
    } else {
      setAmenities((prev) => prev.filter((a) => a !== amenity));
    }
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    if (checked) {
      setLocations((prev) => [...prev, location]);
    } else {
      setLocations((prev) => prev.filter((l) => l !== location));
    }
  };

  const applyFilters = () => {
    onFilterChange({
      priceRange,
      areaRange,
      propertyTypes,
      amenities,
      completionStatus,
      locations,
    });
  };

  const resetFilters = () => {
    setPriceRange([500000, 5000000]);
    setAreaRange([500, 5000]);
    setPropertyTypes([]);
    setAmenities([]);
    setCompletionStatus("");
    setLocations([]);

    onFilterChange({
      priceRange: [500000, 5000000],
      areaRange: [500, 5000],
      propertyTypes: [],
      amenities: [],
      completionStatus: "",
      locations: [],
    });
  };

  const filterContent = (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Price Range (AED)</h3>
        <div className="pt-6 px-2">
          <Slider
            value={priceRange}
            min={100000}
            max={20000000}
            step={100000}
            onValueChange={(value) => setPriceRange(value as number[])}
          />
        </div>
        <div className="flex justify-between text-sm text-white/60">
          <span>{(priceRange[0] / 1000000).toFixed(1)}M AED</span>
          <span>{(priceRange[1] / 1000000).toFixed(1)}M AED</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Area (sq.ft)</h3>
        <div className="pt-6 px-2">
          <Slider
            value={areaRange}
            min={100}
            max={20000}
            step={100}
            onValueChange={(value) => setAreaRange(value as number[])}
          />
        </div>
        <div className="flex justify-between text-sm text-white/60">
          <span>{areaRange[0]} sq.ft</span>
          <span>{areaRange[1]} sq.ft</span>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="property-type" className="border-[#D4AF37]/20">
          <AccordionTrigger className="text-white hover:text-[#D4AF37] hover:no-underline">
            Property Type
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {["Apartment", "Villa", "Penthouse", "Townhouse", "Duplex"].map(
                (type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${type}`}
                      checked={propertyTypes.includes(type)}
                      onCheckedChange={(checked) =>
                        handlePropertyTypeChange(type, checked as boolean)
                      }
                      className="border-[#D4AF37] data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                    />
                    <Label
                      htmlFor={`type-${type}`}
                      className="text-white cursor-pointer"
                    >
                      {type}
                    </Label>
                  </div>
                )
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="amenities" className="border-[#D4AF37]/20">
          <AccordionTrigger className="text-white hover:text-[#D4AF37] hover:no-underline">
            Amenities
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {[
                "Swimming Pool",
                "Gym",
                "Parking",
                "Balcony",
                "Beach Access",
                "Concierge",
                "Smart Home",
                "Private Garden",
                "Security",
              ].map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`amenity-${amenity}`}
                    checked={amenities.includes(amenity)}
                    onCheckedChange={(checked) =>
                      handleAmenityChange(amenity, checked as boolean)
                    }
                    className="border-[#D4AF37] data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                  />
                  <Label
                    htmlFor={`amenity-${amenity}`}
                    className="text-white cursor-pointer"
                  >
                    {amenity}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="completion" className="border-[#D4AF37]/20">
          <AccordionTrigger className="text-white hover:text-[#D4AF37] hover:no-underline">
            Completion Status
          </AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              value={completionStatus}
              onValueChange={setCompletionStatus}
              className="space-y-3 pt-2"
            >
              {["Ready", "Off-Plan", "Under Construction"].map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={status}
                    id={`status-${status}`}
                    className="border-[#D4AF37] text-[#D4AF37]"
                  />
                  <Label
                    htmlFor={`status-${status}`}
                    className="text-white cursor-pointer"
                  >
                    {status}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="location" className="border-[#D4AF37]/20">
          <AccordionTrigger className="text-white hover:text-[#D4AF37] hover:no-underline">
            Location
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {[
                "Downtown Dubai",
                "Palm Jumeirah",
                "Dubai Marina",
                "Jumeirah Beach Residence",
                "Business Bay",
                "Emirates Hills",
                "Arabian Ranches",
                "Dubai Hills Estate",
              ].map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={`location-${location}`}
                    checked={locations.includes(location)}
                    onCheckedChange={(checked) =>
                      handleLocationChange(location, checked as boolean)
                    }
                    className="border-[#D4AF37] data-[state=checked]:bg-[#D4AF37] data-[state=checked]:text-black"
                  />
                  <Label
                    htmlFor={`location-${location}`}
                    className="text-white cursor-pointer"
                  >
                    {location}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10 flex items-center gap-2"
          >
            <Filter className="h-4 w-4" /> Advanced Filters
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          className="bg-black border-t border-[#D4AF37]/20 text-white h-[80vh] overflow-y-auto"
        >
          <SheetHeader>
            <SheetTitle className="text-white">Advanced Filters</SheetTitle>
            <SheetDescription className="text-white/60">
              Refine your property search with detailed filters
            </SheetDescription>
          </SheetHeader>

          {filterContent}

          <SheetFooter className="flex justify-between mt-6 pt-4 border-t border-[#D4AF37]/20">
            <Button
              variant="outline"
              onClick={resetFilters}
              className="border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37]/10"
            >
              Reset All
            </Button>
            <SheetClose asChild>
              <Button
                onClick={applyFilters}
                className="bg-[#D4AF37] text-black hover:bg-[#C4A030]"
              >
                Apply Filters
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="bg-black border border-[#D4AF37]/20 rounded-xl p-6 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-white flex items-center gap-2">
          <Filter className="h-5 w-5 text-[#D4AF37]" /> Advanced Filters
        </h2>
        <Button
          variant="ghost"
          onClick={resetFilters}
          className="h-8 text-[#D4AF37] hover:text-[#D4AF37]/80 hover:bg-transparent"
        >
          Reset All
        </Button>
      </div>

      {filterContent}

      <div className="mt-6 pt-4 border-t border-[#D4AF37]/20">
        <Button
          onClick={applyFilters}
          className="w-full bg-[#D4AF37] text-black hover:bg-[#C4A030]"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
