"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PropertyCard from "@/components/property-card"
import ProjectCard from "@/components/project-card"
import StaticMap from "@/components/client-google-map"
import { urlFor } from "@/lib/sanity"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import ProjectCardNew from "@/components/project-card-new"

interface Neighborhood {
  _id: string
  name: string
  description?: string
  image?: any
  features?: string[]
  propertyTypes?: string[]
  googleMapsUrl?: string
  locationDetails?: string
  lifestyle?: string
  slug?: { current: string }
}

interface ClientNeighborhoodTabsProps {
  neighborhood: Neighborhood
  properties: any[]
  projects: any[]
}

export default function ClientNeighborhoodTabs({ 
  neighborhood, 
  properties, 
  projects 
}: ClientNeighborhoodTabsProps) {
  const [activeTab, setActiveTab] = useState("overview")
  
  return (
    <section className="container mx-auto px-4 py-12">
      <Tabs
        defaultValue="overview"
        className="w-full"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="bg-[#0a0a0a] border border-[#D4AF37]/20 p-1 mb-8">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-ggw-gradient data-[state=active]:text-black"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="properties"
            className="data-[state=active]:bg-ggw-gradient data-[state=active]:text-black"
          >
            Properties
          </TabsTrigger>
          <TabsTrigger
            value="projects"
            className="data-[state=active]:bg-ggw-gradient data-[state=active]:text-black"
          >
            Projects
          </TabsTrigger>
          <TabsTrigger
            value="location"
            className="data-[state=active]:bg-ggw-gradient data-[state=active]:text-black"
          >
            Location
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-8">
              <h2 className="text-2xl font-bold text-white mb-4">About {neighborhood.name}</h2>
              <p className="text-white/80 mb-6">{neighborhood.description}</p>
              
              {neighborhood.propertyTypes && neighborhood.propertyTypes.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-white mb-2">Property Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {neighborhood.propertyTypes.map((type, index) => (
                      <span
                        key={index}
                        className="bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full text-sm"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {neighborhood.features && neighborhood.features.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Key Features</h3>
                  <ul className="list-disc list-inside text-white/80 space-y-1">
                    {neighborhood.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src={
                  neighborhood.image
                    ? urlFor(neighborhood.image).width(800).height(600).url()
                    : "/placeholder.jpg"
                }
                alt={neighborhood.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Property Preview */}
          {properties.length > 0 && (
            <div className="mt-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Featured Properties in {neighborhood.name}</h2>
                {properties.length > 5 && (
                  <Link href={`/buy?neighborhood=${neighborhood._id}`}>
                    <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10">
                      View All <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.slice(0, 5).map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            </div>
          )}
          
          {/* Project Preview */}
          {projects.length > 0 && (
            <div className="mt-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Developments in {neighborhood.name}</h2>
                {projects.length > 5 && (
                  <Link href={`/projects?neighborhood=${neighborhood._id}`}>
                    <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10">
                      View All <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.slice(0, 5).map((project) => (
                  <ProjectCardNew key={project._id} project={project} />
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="properties" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Properties in {neighborhood.name}</h2>
            {properties.length > 5 && (
              <Link href={`/buy?neighborhood=${neighborhood._id}`}>
                <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10">
                  View All Properties <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
          
          {properties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          ) : (
            <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-8 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">No Properties Available</h3>
              <p className="text-white/70">
                We currently don't have any properties listed in {neighborhood.name}. 
                Please check back later or contact us directly.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="projects" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Projects in {neighborhood.name}</h2>
            {projects.length > 5 && (
              <Link href={`/projects?neighborhood=${neighborhood._id}`}>
                <Button variant="outline" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10">
                  View All Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
          
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCardNew key={project._id} project={project} />
              ))}
            </div>
          ) : (
            <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-8 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">No Projects Available</h3>
              <p className="text-white/70">
                We currently don't have any projects listed in {neighborhood.name}. 
                Please check back later or contact us directly.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="location" className="mt-6">
          <h2 className="text-2xl font-bold text-white mb-6">{neighborhood.name} Location</h2>
          
          <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-8">
            <div className="h-[500px] rounded-lg overflow-hidden">
              <StaticMap 
                googleMapsUrl={neighborhood.googleMapsUrl}
                locationName={neighborhood.name}
              />
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-4">Location Details</h3>
              <p className="text-white/80 mb-4">
                {neighborhood.name} is one of Dubai's premier locations offering luxury living 
                with excellent accessibility and amenities.
              </p>
              
              {neighborhood.locationDetails && (
                <div className="text-white/80">
                  {neighborhood.locationDetails}
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}