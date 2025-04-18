"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Maximize2,
  BedDouble,
  Bath,
  Home,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import GoogleMap from "@/components/google-map";
import { urlFor } from "@/lib/sanity";
import PropertyCardNew from "@/components/property-card-new";
import { formatCurrency } from "@/lib/utils";

interface ProjectCardProps {
  project: any;
}

export default function ProjectCardNew({ project }: ProjectCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const [showProperties, setShowProperties] = useState(false);

  // Format project images from Sanity
  const projectImages = [];

  // Add main image if it exists
  if (project.mainImage) {
    projectImages.push(urlFor(project.mainImage).width(1200).height(900).url());
  }

  // Add additional images if they exist
  if (project.images && project.images.length > 0) {
    project.images.forEach((img: any) => {
      projectImages.push(urlFor(img).width(1200).height(900).url());
    });
  }

  // If no images are found, use placeholder
  if (projectImages.length === 0) {
    projectImages.push("/placeholder.jpg");
  }

  // Format project features array
  const projectFeatures = project.features || [];

  // Get project slug or ID for links
  const projectId = project.slug.current || project._id;

  // Check for related properties
  const hasRelatedProperties =
    project.properties && project.properties.length > 0;

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === projectImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? projectImages.length - 1 : prev - 1
    );
  };

  return (
    <Card className="overflow-hidden border-0 bg-[#0a0a0a] shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-500 h-full rounded-[2px]">
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
          <Badge className="bg-ggw-gold text-black font-semibold px-3 py-1 rounded-[2px] font-sans">
            {project.marketType === "off-plan" 
              ? "Off-Plan" 
              : project.marketType === "secondary-market" 
                ? "Secondary Market" 
                : "Project"}
          </Badge>
        </div>

        {project.category && (
          <div className="absolute top-4 right-4 z-20">
            <Badge className="bg-black/70 text-white border border-ggw-gold/30 px-3 py-1 rounded-[2px] font-sans">
              {project.category === "apartment"
                ? "Apartment"
                : project.category === "villa"
                  ? "Villa"
                  : project.category === "penthouse"
                    ? "Penthouse"
                    : project.category === "townhouse"
                      ? "Townhouse"
                      : project.category}
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
          <h3 className="text-2xl font-serif font-bold text-white mb-2">
            {project.name}
          </h3>
          <div className="flex items-center text-ggw-gold mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm font-sans">{project.location}</span>
          </div>

          {project.developer && (
            <div className="flex items-center text-white/70 mb-3 text-sm font-sans">
              <Building className="h-4 w-4 mr-1 text-ggw-gold" />
              <span>Developer: {project.developer}</span>
            </div>
          )}

          <div className="text-white/80 text-sm mb-5 line-clamp-3 font-sans">
            {project.description}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="flex flex-col items-center">
              <BedDouble className="h-6 w-6 text-ggw-gold mb-2" />
              <span className="text-white text-sm font-sans">
                {project.bedrooms} Beds
              </span>
            </div>
            <div className="flex flex-col items-center">
              <Bath className="h-6 w-6 text-ggw-gold mb-2" />
              <span className="text-white text-sm font-sans">
                {project.bathrooms} Baths
              </span>
            </div>
            <div className="flex flex-col items-center">
              <Maximize2 className="h-6 w-6 text-ggw-gold mb-2" />
              <span className="text-white text-sm font-sans">
                {project.area} sq.ft
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-5">
            {project.completionDate && (
              <div className="flex items-center text-white/80 text-sm font-sans">
                <Calendar className="h-4 w-4 mr-1 text-ggw-gold" />
                <span>Completion: {project.completionDate}</span>
              </div>
            )}
            <div className="text-ggw-gold font-semibold font-sans">
              {formatCurrency(project.price)}
            </div>
          </div>

          {project.lifestyle && (
            <div className="mb-5">
              <Badge
                variant="outline"
                className="border-ggw-gold/50 text-white/80 font-sans rounded-[2px]"
              >
                {project.lifestyle === "luxury"
                  ? "Luxury"
                  : project.lifestyle === "beachfront"
                    ? "Beachfront"
                    : project.lifestyle === "family"
                      ? "Family"
                      : project.lifestyle === "urban"
                        ? "Urban"
                        : project.lifestyle === "investment"
                          ? "Investment"
                          : project.lifestyle}{" "}
                Lifestyle
              </Badge>
            </div>
          )}

          {/* Display toggles for map and properties if they exist */}
          <div className="flex gap-3 mb-5">
            {project.coordinates && (
              <Button
                variant="outline"
                className="flex-1 py-5 font-sans rounded-[2px]"
                onClick={() => {
                  setShowMap(!showMap);
                  setShowProperties(false);
                }}
              >
                {showMap ? "Hide Location" : "View Location"}
              </Button>
            )}

            {hasRelatedProperties && (
              <Button
                variant="outline"
                className="flex-1 py-5 font-sans rounded-[2px]"
                onClick={() => {
                  setShowProperties(!showProperties);
                  setShowMap(false);
                }}
              >
                {showProperties
                  ? "Hide Properties"
                  : `View ${project.properties.length} Properties`}
              </Button>
            )}
          </div>

          {/* Content area for map/features/properties */}
          <div className="mb-5">
            {showMap && project.coordinates ? (
              <div className="h-[220px] w-full overflow-hidden rounded-md">
                <GoogleMap
                  coordinates={project.coordinates}
                  locationName={project.name}
                />
              </div>
            ) : showProperties && hasRelatedProperties ? (
              <div className="space-y-4">
                <h4 className="text-white font-medium">
                  Properties in {project.name}
                </h4>
                <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-2">
                  {project.properties.map((property: any) => (
                    <div
                      key={property._id}
                      className="border border-[#D4AF37]/20 rounded-md p-2"
                    >
                      <Link
                        href={`/properties/${property.slug.current || property._id}`}
                        className="hover:text-[#D4AF37]"
                      >
                        <div className="flex items-center gap-3">
                          {property.mainImage && (
                            <div className="relative h-16 w-16 rounded-md overflow-hidden">
                              <Image
                                src={urlFor(property.mainImage)
                                  .width(100)
                                  .height(100)
                                  .url()}
                                alt={property.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <h5 className="text-white text-sm font-medium">
                              {property.title}
                            </h5>
                            <p className="text-[#D4AF37] text-xs">
                              {formatCurrency(property.price)}
                            </p>
                            <div className="flex gap-4 text-white/70 text-xs mt-1">
                              <span>
                                {property.bedrooms}{" "}
                                {property.bedrooms === 1 ? "Bed" : "Beds"}
                              </span>
                              <span>
                                {property.bathrooms}{" "}
                                {property.bathrooms === 1 ? "Bath" : "Baths"}
                              </span>
                              <span>{property.area} sq.ft</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              projectFeatures.length > 0 && (
                <div className="h-[220px] w-full overflow-hidden rounded-md">
                  <div className="flex items-center justify-center h-full bg-black/50 border border-[#D4AF37]/30 rounded-md">
                    <div className="text-center">
                      <Home className="h-10 w-10 text-[#D4AF37] mx-auto mb-3" />
                      <h4 className="text-white font-medium mb-2">
                        Project Features
                      </h4>
                      <div className="flex flex-wrap justify-center gap-2 mt-3">
                        {projectFeatures.map(
                          (feature: string, index: number) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="border-[#D4AF37]/50 text-white/80"
                            >
                              {feature}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="mt-5">
            <Link href={`/projects/${projectId}`}>
              <Button className="w-full bg-black border border-ggw-gold text-ggw-gold hover:bg-ggw-gold/10 py-5 font-medium transition-all duration-300 rounded-[2px] font-sans">
                Request Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
