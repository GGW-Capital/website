"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from "lucide-react";
import Link from "next/link";
import { GradientButton } from "@/components/ui/gradient-button";
import StaticMap from "@/components/client-google-map";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { getAmenityIcon } from "@/utils/amenities";

interface ClientPropertyTabsProps {
  property: any;
}

export default function ClientPropertyTabs({ property }: ClientPropertyTabsProps) {
  const [activeTab, setActiveTab] = useState("features");
  
  // Extract developer name
  const developerName = property.developer?.name || property.developer || "Not specified";
  
  // Extract neighborhood name
  const neighborhoodName = property.neighborhood?.name || property.neighborhoodName || "Not specified";
  
  return (
    <div className="mb-12">
      <Tabs defaultValue="features" className="w-full">
        <TabsList className="bg-[#0a0a0a] border border-[#D4AF37]/20 mb-6">
          <TabsTrigger 
            value="features" 
            className="data-[state=active]:bg-[#D4AF37]/10 data-[state=active]:text-[#D4AF37] data-[state=active]:border-b-2 data-[state=active]:border-[#D4AF37]"
          >
            Features
          </TabsTrigger>
          <TabsTrigger 
            value="amenities"
            className="data-[state=active]:bg-[#D4AF37]/10 data-[state=active]:text-[#D4AF37] data-[state=active]:border-b-2 data-[state=active]:border-[#D4AF37]"
          >
            Amenities
          </TabsTrigger>
          <TabsTrigger 
            value="gallery"
            className="data-[state=active]:bg-[#D4AF37]/10 data-[state=active]:text-[#D4AF37] data-[state=active]:border-b-2 data-[state=active]:border-[#D4AF37]"
          >
            Gallery
          </TabsTrigger>
          <TabsTrigger 
            value="location"
            className="data-[state=active]:bg-[#D4AF37]/10 data-[state=active]:text-[#D4AF37] data-[state=active]:border-b-2 data-[state=active]:border-[#D4AF37]"
          >
            Location
          </TabsTrigger>
          {(property.projectName || property.projectId) && (
            <TabsTrigger 
              value="project"
              className="data-[state=active]:bg-[#D4AF37]/10 data-[state=active]:text-[#D4AF37] data-[state=active]:border-b-2 data-[state=active]:border-[#D4AF37]"
            >
              Project
            </TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="features" className="pt-6">
          <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Property Features</h3>
            
            {property.features && property.features.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {property.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-[#D4AF37]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/70">No features specified for this property.</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="amenities" className="pt-6">
          <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Amenities</h3>
            
            {property.amenities && property.amenities.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="text-[#D4AF37]">
                      {getAmenityIcon(amenity)}
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/70">No amenities specified for this property.</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="gallery" className="pt-6">
          <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Property Gallery</h3>
            
            {property.images && property.images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {property.images.map((image: any, index: number) => (
                  <div key={index} className="relative h-60 rounded-md overflow-hidden">
                    <Image
                      src={urlFor(image).url()}
                      alt={`${property.title} image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/70">No additional images available for this property.</p>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="location" className="pt-6">
          <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Location</h3>
            
            <div className="mb-6">
              <p className="text-white/80">
                {property.location}
                {property.neighborhood && (
                  <>, <Link href={`/neighborhoods/${property.neighborhood?.slug?.current || '#'}`} className="text-[#D4AF37] hover:underline">
                    {neighborhoodName}
                  </Link>
                </>
                )}
              </p>
            </div>
            
            {/* Google Map */}
            <div className="h-[400px] rounded-xl overflow-hidden">
            {property.googleMapsUrl ? (
                  <StaticMap 
                    googleMapsUrl={property.googleMapsUrl}
                    locationName={property.location}
                  />
                ) : property.coordinates ? (
                  <StaticMap 
                    googleMapsUrl={`https://www.google.com/maps/search/?api=1&query=${property.coordinates.lat},${property.coordinates.lng}`}
                    locationName={property.location}
                  />
                ) : (
                  <StaticMap locationName={property.location} />
                )}
            </div>
          </div>
        </TabsContent>
        
        {(property.projectName || property.projectId) && (
          <TabsContent value="project" className="pt-6">
            <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">{property.projectName || "Project Information"}</h3>
              
              {property.developer && (
                <div className="mb-4">
                  <p className="text-white/70 mb-1">Developer:</p>
                  <p className="font-medium">{developerName}</p>
                </div>
              )}
              
              {property.completionDate && property.marketType === "off-plan" && (
                <div className="mb-4">
                  <p className="text-white/70 mb-1">Expected Completion:</p>
                  <p className="font-medium">{property.completionDate}</p>
                </div>
              )}
              
              {property.projectSlug && (
                <Link href={`/projects/${property.projectSlug.current}`} className="mt-4 block">
                  <GradientButton className="w-full text-center">
                    Explore {property.projectName}
                  </GradientButton>
                </Link>
              )}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}