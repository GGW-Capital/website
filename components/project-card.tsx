"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, MapPin, Calendar, Maximize2, BedDouble, Bath, Home, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import GoogleMap from "@/components/google-map"
import { urlFor } from "@/lib/sanity"

interface ProjectCardProps {
  project: any
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showMap, setShowMap] = useState(false)
  
  // Format project images from Sanity
  const projectImages = []
  
  // Add main image if it exists
  if (project.mainImage) {
    projectImages.push(urlFor(project.mainImage).width(800).height(600).url())
  }
  
  // Add additional images if they exist
  if (project.images && project.images.length > 0) {
    project.images.forEach((img: any) => {
      projectImages.push(urlFor(img).width(800).height(600).url())
    })
  }
  
  // If no images are found, use placeholder
  if (projectImages.length === 0) {
    projectImages.push("/placeholder.jpg")
  }
  
  // Format project features array
  const projectFeatures = project.features || []
  
  // Get project slug or ID for links
  const projectId = project.slug?.current || project._id
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === projectImages.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? projectImages.length - 1 : prev - 1))
  }

  return (
    <Card className="overflow-hidden border-0 bg-[#0a0a0a] shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-500 h-full">
      <div className="relative h-[320px] w-full">
        <div className="absolute inset-0 z-10">
          <Image
            src={projectImages[currentImageIndex]}
            alt={`${project.name} - Image ${currentImageIndex + 1}`}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>

        <div className="absolute top-4 left-4 z-20">
          <Badge className="bg-[#D4AF37] text-black font-semibold px-3 py-1">Off-Plan</Badge>
        </div>

        {project.category && (
          <div className="absolute top-4 right-4 z-20">
            <Badge className="bg-black/70 text-white border border-[#D4AF37]/30 px-3 py-1">
              {project.category === 'apartment' ? 'Apartment' : 
               project.category === 'villa' ? 'Villa' : 
               project.category === 'penthouse' ? 'Penthouse' : 
               project.category === 'townhouse' ? 'Townhouse' : 
               project.category}
            </Badge>
          </div>
        )}

        {projectImages.length > 1 && (
          <>
            <div className="absolute bottom-4 right-4 z-20 flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full bg-black/60 border-white/20 text-white hover:bg-black/80"
                onClick={prevImage}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full bg-black/60 border-white/20 text-white hover:bg-black/80"
                onClick={nextImage}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="absolute bottom-4 left-4 z-20 text-white text-sm bg-black/60 px-2 py-1 rounded">
              {currentImageIndex + 1}/{projectImages.length}
            </div>
          </>
        )}
      </div>

      <CardContent className="p-6 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-white mb-2">{project.name}</h3>
          <div className="flex items-center text-[#D4AF37] mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{project.location}</span>
          </div>

          {project.developer && (
            <div className="flex items-center text-white/70 mb-3 text-sm">
              <Building className="h-4 w-4 mr-1 text-[#D4AF37]" />
              <span>Developer: {project.developer}</span>
            </div>
          )}

          <div className="text-white/80 text-sm mb-5 line-clamp-3">{project.description}</div>

          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="flex flex-col items-center">
              <BedDouble className="h-6 w-6 text-[#D4AF37] mb-2" />
              <span className="text-white text-sm">{project.bedrooms} Beds</span>
            </div>
            <div className="flex flex-col items-center">
              <Bath className="h-6 w-6 text-[#D4AF37] mb-2" />
              <span className="text-white text-sm">{project.bathrooms} Baths</span>
            </div>
            <div className="flex flex-col items-center">
              <Maximize2 className="h-6 w-6 text-[#D4AF37] mb-2" />
              <span className="text-white text-sm">{project.area} sq.ft</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center text-white/80 text-sm">
              <Calendar className="h-4 w-4 mr-1 text-[#D4AF37]" />
              <span>Completion: {project.completionDate}</span>
            </div>
            <div className="text-[#D4AF37] font-semibold">{project.price}</div>
          </div>

          {project.lifestyle && (
            <div className="mb-5">
              <Badge variant="outline" className="border-[#D4AF37]/50 text-white/80">
                {project.lifestyleTitle || 
                (project.lifestyle === 'luxury' ? 'Luxury' :
                 project.lifestyle === 'beachfront' ? 'Beachfront' :
                 project.lifestyle === 'family' ? 'Family' :
                 project.lifestyle === 'urban' ? 'Urban' :
                 project.lifestyle === 'investment' ? 'Investment' :
                 project.lifestyle)} Lifestyle
              </Badge>
            </div>
          )}

          {project.coordinates && (
            <div className="mb-5">
              <Button
                variant="outline"
                className="w-full border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 py-5"
                onClick={() => setShowMap(!showMap)}
              >
                {showMap ? "View Gallery" : "View Location"}
              </Button>
            </div>
          )}

          <div className="h-[220px] w-full overflow-hidden rounded-md">
            {showMap && project.coordinates ? (
              <GoogleMap coordinates={project.coordinates} locationName={project.name} />
            ) : (
              <div className="flex items-center justify-center h-full bg-black/50 border border-[#D4AF37]/30 rounded-md">
                <div className="text-center">
                  <Home className="h-10 w-10 text-[#D4AF37] mx-auto mb-3" />
                  <h4 className="text-white font-medium mb-2">Project Features</h4>
                  <div className="flex flex-wrap justify-center gap-2 mt-3">
                    {projectFeatures.map((feature: string, index: number) => (
                      <Badge key={index} variant="outline" className="border-[#D4AF37]/50 text-white/80">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-5">
            <Link href={`/projects/${projectId}`}>
              <Button className="w-full bg-[#D4AF37] text-black hover:bg-[#C4A030] py-5 font-medium transition-all duration-300">
                Request Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

