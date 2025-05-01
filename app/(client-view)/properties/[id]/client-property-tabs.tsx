"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"
import Link from "next/link"
import { GradientButton } from "@/components/ui/gradient-button"
import StaticMap from "@/components/client-google-map"
import Image from "next/image"
import { urlFor } from "@/lib/sanity"

interface ClientPropertyTabsProps {
  property: any
}

export default function ClientPropertyTabs({ property }: ClientPropertyTabsProps) {
  const [activeTab, setActiveTab] = useState("features")
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Extract developer name
  const developerName = property.developer?.name || property.developer || "Not specified"

  // Extract neighborhood name
  const neighborhoodName = property.neighborhood?.name || property.neighborhoodName || "Not specified"

  // Handle keyboard navigation for gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeTab !== "gallery" || !property.images?.length) return

      if (e.key === "ArrowLeft") {
        setSelectedImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1))
      } else if (e.key === "ArrowRight") {
        setSelectedImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1))
      } else if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeTab, property.images, selectedImageIndex, isFullscreen])

  const handlePrevImage = () => {
    if (!property.images?.length) return
    setSelectedImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    if (!property.images?.length) return
    setSelectedImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1))
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <div className="mb-12">
      <Tabs defaultValue="features" className="w-full" onValueChange={(value) => setActiveTab(value)}>
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
                    <span className="text-[#D4AF37]">•</span>
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
              <>
                {/* Fullscreen Gallery */}
                {isFullscreen && (
                  <div className="fixed inset-0 z-50 bg-black flex flex-col justify-center items-center">
                    <button
                      onClick={toggleFullscreen}
                      className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/80 transition-colors"
                      aria-label="Close fullscreen"
                    >
                      <X className="h-6 w-6" />
                    </button>

                    <div className="relative w-full h-[80vh] max-w-7xl">
                      <Image
                        src={urlFor(property.images[selectedImageIndex]).url() || "/placeholder.svg"}
                        alt={`Property image ${selectedImageIndex + 1}`}
                        fill
                        sizes="100vw"
                        style={{ objectFit: "contain" }}
                        className="transition-opacity duration-300"
                        priority
                      />
                    </div>

                    <div className="flex justify-center items-center gap-4 mt-4">
                      <button
                        onClick={handlePrevImage}
                        className="p-2 rounded-full bg-[#D4AF37]/20 hover:bg-[#D4AF37]/40 transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-6 w-6 text-[#D4AF37]" />
                      </button>
                      <span className="text-white/80 text-sm">
                        {selectedImageIndex + 1} / {property.images.length}
                      </span>
                      <button
                        onClick={handleNextImage}
                        className="p-2 rounded-full bg-[#D4AF37]/20 hover:bg-[#D4AF37]/40 transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-6 w-6 text-[#D4AF37]" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Main Gallery View */}
                <div className="flex flex-col gap-6">
                  {/* Main Image */}
                  <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden group">
                    <Image
                      src={urlFor(property.images[selectedImageIndex]).width(1600).height(900).url() || "/placeholder.svg"}
                      alt={`Property image ${selectedImageIndex + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 1200px"
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-500 group-hover:scale-105"
                      priority
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={handlePrevImage}
                          className="p-2 rounded-full bg-black/50 hover:bg-black/80 transition-colors"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-5 w-5 text-white" />
                        </button>
                        <button
                          onClick={handleNextImage}
                          className="p-2 rounded-full bg-black/50 hover:bg-black/80 transition-colors"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-5 w-5 text-white" />
                        </button>
                      </div>

                      <button
                        onClick={toggleFullscreen}
                        className="p-2 rounded-full bg-black/50 hover:bg-black/80 transition-colors"
                        aria-label="View fullscreen"
                      >
                        <Maximize2 className="h-5 w-5 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 overflow-x-auto">
                    {property.images.map((image: any, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative aspect-square rounded-md overflow-hidden transition-all duration-200 ${
                          selectedImageIndex === index
                            ? "ring-2 ring-[#D4AF37] scale-95"
                            : "opacity-70 hover:opacity-100"
                        }`}
                        aria-label={`View image ${index + 1}`}
                      >
                        <Image
                          src={urlFor(image).width(150).height(150).url() || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          sizes="150px"
                          style={{ objectFit: "cover" }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-white/70">No gallery images available for this property.</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="location" className="pt-6">
          <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Location</h3>

            <div className="mb-4">
              <p className="text-white/70 mb-1">Address:</p>
              <p className="font-medium">{property.location || "Address not specified"}</p>
            </div>

            <div className="mb-4">
              <p className="text-white/70 mb-1">Neighborhood:</p>
              <p className="font-medium">{neighborhoodName}</p>
            </div>

            {property.googleMapsUrl && (
              <div className="relative h-96 rounded-lg overflow-hidden mt-6">
                <StaticMap
                  googleMapsUrl={property.googleMapsUrl}
                  locationName={property.location || "Property Location"}
                />
              </div>
            )}
          </div>
        </TabsContent>

        {(property.projectName || property.projectId) && (
          <TabsContent value="project" className="pt-6">
            <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Project Details</h3>

              {property.projectName && (
                <div className="mb-4">
                  <p className="text-white/70 mb-1">Project:</p>
                  <p className="font-medium">{property.projectName}</p>
                </div>
              )}

              {developerName && (
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
                  <GradientButton className="w-full text-center">Explore {property.projectName}</GradientButton>
                </Link>
              )}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}
