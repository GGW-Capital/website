"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, Heart, Share2, Info, MapPin, Home } from "lucide-react"
import { urlFor } from "@/lib/sanity"


interface ClientProjectDetailsProps {
  project: any
}

export default function ClientProjectDetails({ project }: ClientProjectDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  // Handle image navigation
  const nextImage = () => {
    if (project?.images) {
      setCurrentImageIndex((prev) => (prev === project.images.length - 1 ? 0 : prev + 1))
    }
  }

  const prevImage = () => {
    if (project?.images) {
      setCurrentImageIndex((prev) => (prev === 0 ? project.images.length - 1 : prev - 1))
    }
  }

  // Share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.name,
        text: `Check out ${project.name} in ${project.location}`,
        url: window.location.href,
      })
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <>
      {/* Project Images and Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Project Images - Left Section (3 columns on large screens) */}
        <div className="lg:col-span-3">
          <div className="relative h-[300px] md:h-[500px] rounded-xl overflow-hidden bg-[#0a0a0a] border border-[#D4AF37]/20">
            {project.images && project.images.length > 0 ? (
              <>
                <Image
                  src={urlFor(project.images[currentImageIndex]).width(1600).height(1066).url()}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
                
                {/* Image Controls */}
                <div className="absolute inset-x-0 bottom-0 p-4 flex justify-between">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="h-10 w-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`} />
                    </button>
                    <button
                      onClick={handleShare}
                      className="h-10 w-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <Share2 className="h-5 w-5 text-white" />
                    </button>
                  </div>
                  
                  {project.images.length > 1 && (
                    <div className="flex space-x-2">
                      <button
                        onClick={prevImage}
                        className="h-10 w-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
                      >
                        <ChevronLeft className="h-5 w-5 text-white" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="h-10 w-10 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
                      >
                        <ChevronRight className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Image Counter */}
                {project.images.length > 1 && (
                  <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {project.images.length}
                  </div>
                )}
              </>
            ) : project.mainImage ? (
              <Image
                src={urlFor(project.mainImage).width(1600).height(1066).url()}
                alt={project.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-white/30">No Images Available</span>
              </div>
            )}
          </div>
          
          {/* Thumbnail Navigation (for desktop) */}
          {project.images && project.images.length > 1 && (
            <div className="hidden md:grid grid-cols-5 gap-2 mt-3">
              {project.images.slice(0, 5).map((image: any, index: number) => (
                <div
                  key={index}
                  className={`relative h-24 rounded-md overflow-hidden cursor-pointer border-2 ${
                    currentImageIndex === index ? "border-[#D4AF37]" : "border-transparent"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={urlFor(image).width(800).height(533).url()}
                    alt={`${project.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Project Info Tabs - Right Section (2 columns on large screens) */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full bg-[#0a0a0a] border-b border-[#D4AF37]/20">
              <TabsTrigger value="details" className="flex-1">
                <Info className="h-4 w-4 mr-1.5" />
                Details
              </TabsTrigger>
              <TabsTrigger value="location" className="flex-1">
                <MapPin className="h-4 w-4 mr-1.5" />
                Location
              </TabsTrigger>
              <TabsTrigger value="amenities" className="flex-1">
                <Home className="h-4 w-4 mr-1.5" />
                Amenities
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="p-4 border border-[#D4AF37]/10 rounded-b-xl bg-[#0a0a0a]">
              {/* Project details content */}
              <div className="space-y-4">
                <div className="flex flex-col mb-2">
                  <span className="text-white/60 text-sm">Location</span>
                  <span className="font-medium">{project.location}</span>
                </div>
                
                {project.category && (
                  <div className="flex flex-col mb-2">
                    <span className="text-white/60 text-sm">Property Type</span>
                    <span className="font-medium capitalize">{project.category}</span>
                  </div>
                )}
                
                {project.lifestyle && (
                  <div className="flex flex-col mb-2">
                    <span className="text-white/60 text-sm">Lifestyle</span>
                    <span className="font-medium capitalize">
                      {typeof project.lifestyle === 'string' 
                        ? project.lifestyle 
                        : project.lifestyle.name || project.lifestyleTitle}
                    </span>
                  </div>
                )}
                
                {project.completionDate && (
                  <div className="flex flex-col mb-2">
                    <span className="text-white/60 text-sm">Completion Date</span>
                    <span className="font-medium">{project.completionDate}</span>
                  </div>
                )}
                
                {project.neighborhood && (
                  <div className="flex flex-col mb-2">
                    <span className="text-white/60 text-sm">Neighborhood</span>
                    <span className="font-medium">
                      {typeof project.neighborhood === 'string' 
                        ? project.neighborhood 
                        : project.neighborhoodName || (project.neighborhood.name || '')}
                    </span>
                  </div>
                )}
                
                {project.bedrooms && (
                  <div className="flex flex-col mb-2">
                    <span className="text-white/60 text-sm">Bedrooms</span>
                    <span className="font-medium">{project.bedrooms}</span>
                  </div>
                )}
                
                {project.bathrooms && (
                  <div className="flex flex-col mb-2">
                    <span className="text-white/60 text-sm">Bathrooms</span>
                    <span className="font-medium">{project.bathrooms}</span>
                  </div>
                )}
                
                {project.area && (
                  <div className="flex flex-col mb-2">
                    <span className="text-white/60 text-sm">Area</span>
                    <span className="font-medium">{project.area.toLocaleString()} sq.ft</span>
                  </div>
                )}
                
                {project.developer && (
                  <div className="flex flex-col mb-2">
                    <span className="text-white/60 text-sm">Developer</span>
                    <span className="font-medium">
                      {typeof project.developer === 'string' 
                        ? project.developer 
                        : project.developer.name || ''}
                    </span>
                  </div>
                )}
                
                {project.marketType && (
                  <div className="flex flex-col mb-2">
                    <span className="text-white/60 text-sm">Market Type</span>
                    <span className="font-medium capitalize">
                      {project.marketType === 'off-plan' 
                        ? 'Off-Plan' 
                        : project.marketType === 'secondary-market' 
                          ? 'Secondary Market' 
                          : project.marketType}
                    </span>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="location" className="p-4 border border-[#D4AF37]/10 rounded-b-xl bg-[#0a0a0a]">
              <div className="space-y-4">
                <p className="text-white/70 mb-4">
                  {project.name} is located in {project.location}
                  {project.neighborhood && typeof project.neighborhood !== 'string' && project.neighborhood.name && (
                    <>, within the {project.neighborhood.name} neighborhood</>
                  )}
                  {project.neighborhoodName && (
                    <>, within the {project.neighborhoodName} neighborhood</>
                  )}.
                </p>
                
                <div className="text-white/70">
                  <p>View the full location details in the map section below.</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="amenities" className="p-4 border border-[#D4AF37]/10 rounded-b-xl bg-[#0a0a0a]">
              <div className="space-y-4">
                <p className="text-white/70 mb-4">Key features and amenities:</p>
                
                {project.features && project.features.length > 0 ? (
                  <div className="grid grid-cols-1 gap-2">
                    {project.features.slice(0, 8).map((feature: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mt-0.5">
                          <ChevronRight className="h-3 w-3 text-[#D4AF37]" />
                        </div>
                        <span className="ml-2 text-white/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-white/70">
                    Contact us for detailed information about the amenities offered in this project.
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}