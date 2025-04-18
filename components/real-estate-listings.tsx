"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, BedDouble, Bath, Maximize2, Building, Calendar, Home, Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Carousel from "@/components/carousel"
import { motion } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getPropertiesByMarketType, getProjects, urlFor } from "@/lib/sanity"
import GradientTitle from "./ui/gradient-title"
import { GradientButton } from "./ui/gradient-button"

export default function RealEstateListings() {
  // State for listings and filters
  const [listings, setListings] = useState<any[]>([])
  const [filteredListings, setFilteredListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [carouselKey, setCarouselKey] = useState(0)

  // Filter states
  const [propertyType, setPropertyType] = useState("all")
  const [location, setLocation] = useState("all")
  const [developer, setDeveloper] = useState("all")
  
  // Lists for filter options
  const [locations, setLocations] = useState<string[]>([])
  const [developers, setDevelopers] = useState<string[]>([])
  const [propertyTypes, setPropertyTypes] = useState<string[]>([])

  // Load data from Sanity
  useEffect(() => {
    async function loadData() {
      try {
        // Fetch secondary market properties
        const properties = await getPropertiesByMarketType("buy");
        
        // Fetch projects (off-plan)
        const projects = await getProjects();
        
        // Process properties to match the expected format
        const formattedProperties = properties.map((property: any) => ({
          ...property,
          listingType: "property",
          images: property.images?.map((img: any) => urlFor(img).url()) || 
                 (property.mainImage ? [urlFor(property.mainImage).url()] : ["/placeholder.jpg"]),
          slug: property.slug?.current
        }));
        
        // Process projects to match the expected format
        const formattedProjects = projects.map((project: any) => ({
          ...project,
          listingType: "project",
          title: project.name,
          images: project.images?.map((img: any) => urlFor(img).url()) || 
                (project.mainImage ? [urlFor(project.mainImage).url()] : ["/placeholder.jpg"]),
          slug: project.slug?.current || project.slug|| project._id
        }));
        
        // Combine both types of listings
        const allListings = [...formattedProperties, ...formattedProjects];
        
        if (allListings.length > 0) {
          setListings(allListings);
          setFilteredListings(allListings);
          
          // Extract unique locations, developers, and property types for filters
          const uniqueLocations = Array.from(new Set(allListings.map((item: any) => item.location)))
            .filter(Boolean) as string[];
          setLocations(uniqueLocations);
          
          const uniqueDevelopers = Array.from(new Set(allListings
            .filter((item: any) => item.developer)
            .map((item: any) => item.developer)))
            .filter(Boolean) as string[];
          setDevelopers(uniqueDevelopers);
          
          const uniqueTypes = Array.from(new Set(allListings
            .filter((item: any) => item.category)
            .map((item: any) => item.category)))
            .filter(Boolean) as string[];
          setPropertyTypes(uniqueTypes);
        }
      } catch (error) {
        console.error("Error loading listings:", error);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, [])

  // Apply filters when they change
  useEffect(() => {
    let filtered = listings

    // Filter by listing type (property or project)
    if (activeTab !== "all") {
      filtered = filtered.filter((listing) => listing.listingType === activeTab)
    }

    // Filter by property type
    if (propertyType !== "all") {
      filtered = filtered.filter((listing) => listing.category === propertyType)
    }

    // Filter by location (simplified for demo)
    if (location !== "all") {
      filtered = filtered.filter((listing) => listing.location.includes(location))
    }

    // Filter by developer
    if (developer !== "all") {
      filtered = filtered.filter((listing) => listing.listingType !== "project" || listing.developer === developer)
    }

    setFilteredListings(filtered)
  }, [activeTab, propertyType, location, developer, listings])

  const resetFilters = () => {
    setPropertyType("all")
    setLocation("all")
    setDeveloper("all")
  }

  // In the component, let's add a ref to track the current carousel state
  const carouselRef = useRef<{ resetCarousel: () => void } | null>(null)

  // Modify the handleTabChange function to directly reset the carousel
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    resetFilters()

    // Reset carousel to first slide
    if (carouselRef.current) {
      carouselRef.current.resetCarousel()
    }
  }

  const ListingCard = ({ listing }: { listing: any }) => {
    // For properties (secondary market)
    if (listing.listingType === "property") {
      return (
        <Link href={`/properties/${listing.slug.current}`} className="group">
          <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-500 h-full">
            <div className="relative h-[300px]">
              <Image
                src={listing.images[0] || "/placeholder.svg"}
                alt={listing.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-ggw-gradient text-black px-3 py-1 rounded-md text-sm font-medium">
                  {listing.status}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="bg-black/70 text-white px-3 py-1 rounded-md text-sm font-medium border border-[#D4AF37]/30">
                  {listing.type}
                </span>
              </div>
              <div className="absolute group-hover:scale-110 transition-all duration-700 inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100"></div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                {listing.title}
              </h3>

              <div className="flex items-center text-[#D4AF37] mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{listing.location}</span>
              </div>

              <div className="flex items-center justify-between text-white/80 text-sm mb-4">
                <div className="flex items-center">
                  <BedDouble className="h-4 w-4 mr-1 text-[#D4AF37]" />
                  <span>
                    {listing.bedrooms} {listing.bedrooms === 1 ? "Bed" : "Beds"}
                  </span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-4 w-4 mr-1 text-[#D4AF37]" />
                  <span>
                    {listing.bathrooms} {listing.bathrooms === 1 ? "Bath" : "Baths"}
                  </span>
                </div>
                <div className="flex items-center">
                  <Maximize2 className="h-4 w-4 mr-1 text-[#D4AF37]" />
                  <span>{listing.area} sq.ft</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-semibold text-[#D4AF37]">{listing.price}</span>
                <Link href={`/properties/${listing._id}`}>
                  <Button variant="outline" size="sm" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Link>
      )
    }

    // For projects (off-plan)
    return (
      <Link href={`/projects/${listing.slug}`} className="group">
        <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-500 h-full">
          <div className="relative h-[300px]">
            <Image
              src={listing.images[0] || listing.mainImage || "/placeholder.svg"}
              alt={listing.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 group-hover:scale-110 transition-all duration-700 via-transparent to-transparent opacity-0 group-hover:opacity-100"></div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
              {listing.title}
            </h3>

            <div className="flex items-center text-[#D4AF37] mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{listing.location}</span>
            </div>

            {listing.developer && (
              <div className="flex items-center text-white/70 mb-3 text-sm">
                <Building className="h-4 w-4 mr-1 text-[#D4AF37]" />
                <span>Developer: {listing.developer}</span>
              </div>
            )}

            {listing.completionDate && <div className="flex items-center text-white/70 mb-4 text-sm">
              <Calendar className="h-4 w-4 mr-1 text-[#D4AF37]" />
              <span>Completion: {listing.completionDate}</span>
            </div>}

            <div className="flex items-center justify-between text-white/80 text-sm mb-4">
              <div className="flex items-center">
                <BedDouble className="h-4 w-4 mr-1 text-[#D4AF37]" />
                <span>{listing.bedrooms} Beds</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-4 w-4 mr-1 text-[#D4AF37]" />
                <span>{listing.bathrooms} Baths</span>
              </div>
              <div className="flex items-center">
                <Maximize2 className="h-4 w-4 mr-1 text-[#D4AF37]" />
                <span>{listing.area} sq.ft</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="font-semibold text-[#D4AF37]">AED {listing.price}</span>
              <Link href={`/projects/${listing._id}`}>
                <Button variant="outline" size="sm" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <section  id="featured-listings" className="py-16 md:py-24 bg-gradient-to-b from-black to-[#050505]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h2 className="heading-2 mb-6 text-white">
            Discover <GradientTitle element="span">Luxury</GradientTitle> Real Estate
          </h2>
          <div className="w-24 h-1 bg-ggw-gold/60 mx-auto mb-6"></div>
          <p className="text-lg text-white/80 font-sans">
            Explore our curated collection of prestigious properties and exclusive developments
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto mb-10">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="w-full h-14 bg-[#0a0a0a] border border-ggw-gold/20 rounded-[2px] p-1.5 grid grid-cols-3 gap-1">
              <TabsTrigger
                value="all"
                className="h-full rounded-[2px] text-base font-medium font-sans data-[state=active]:bg-ggw-gradient data-[state=active]:text-black data-[state=inactive]:bg-transparent data-[state=inactive]:text-white/80"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="property"
                className="h-full rounded-[2px] text-base font-medium font-sans data-[state=active]:bg-ggw-gradient data-[state=active]:text-black data-[state=inactive]:bg-transparent data-[state=inactive]:text-white/80"
              >
                Properties
              </TabsTrigger>
              <TabsTrigger
                value="project"
                className="h-full rounded-[2px] text-base font-medium font-sans data-[state=active]:bg-ggw-gradient data-[state=active]:text-black data-[state=inactive]:bg-transparent data-[state=inactive]:text-white/80"
              >
                Projects
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              {/* Filter Button */}
              <div className="flex justify-between items-center mb-8">
                <div className="text-white/80">Showing {filteredListings.length} listings</div>
                <Button
                  variant="outline"
                  className="border-ggw-gold text-ggw-gold hover:bg-ggw-gold/10 flex items-center gap-2 rounded-[2px] font-sans"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                  <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                </Button>
              </div>

              {/* Collapsible Filters */}
              {showFilters && (
                <div className="bg-[#0a0a0a] border border-ggw-gold/20 rounded-[2px] p-6 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-white/90 mb-2 block">Property Type</label>
                    <Select value={propertyType} onValueChange={setPropertyType}>
                      <SelectTrigger className="bg-transparent border-ggw-gold/40 text-white rounded-[2px] font-sans">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-ggw-gold/40 text-white rounded-[2px]">
                        <SelectItem value="all">All Types</SelectItem>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/90 mb-2 block">Location</label>
                    <Select value={location} onValueChange={setLocation}>
                      <SelectTrigger className="bg-transparent border-ggw-gold/40 text-white rounded-[2px] font-sans">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-ggw-gold/40 text-white rounded-[2px]">
                        <SelectItem value="all">All Locations</SelectItem>
                        {locations.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-white/90 mb-2 block">Developer</label>
                    <Select value={developer} onValueChange={setDeveloper} disabled={activeTab === "property"}>
                      <SelectTrigger className="bg-transparent border-ggw-gold/40 text-white rounded-[2px] font-sans">
                        <SelectValue placeholder="Select developer" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-ggw-gold/40 text-white rounded-[2px]">
                        <SelectItem value="all">All Developers</SelectItem>
                        {developers.map((dev) => (
                          <SelectItem key={dev} value={dev}>
                            {dev}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-3 mt-2">
                    <Button
                      variant="outline"
                      className="w-full border-ggw-gold/40 text-ggw-gold hover:bg-ggw-gold/10 rounded-[2px] font-sans"
                      onClick={resetFilters}
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
              )}

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="w-16 h-16 border-4 border-ggw-gold border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : filteredListings.length === 0 ? (
                <div className="text-center py-12 bg-[#0a0a0a] border border-ggw-gold/20 rounded-[2px]">
                  <p className="text-white/80 mb-4 font-sans">No listings found matching your filters.</p>
                  <Button
                    variant="outline"
                    className="border-ggw-gold text-ggw-gold hover:bg-ggw-gold/10 rounded-[2px] font-sans"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <Carousel
                  ref={carouselRef}
                  showArrows={true}
                  showDots={true}
                  autoPlay={true}
                  interval={5000}
                  itemsPerView={3}
                  className="mb-16"
                >
                  {filteredListings.map((listing) => (
                    <ListingCard key={listing._id} listing={listing} />
                  ))}
                </Carousel>

              )}
            </div>
          </Tabs>

          <div className="flex justify-center flex-wrap gap-6 mt-10">
            <Link href="/buy">
              <GradientButton className="flex items-center gap-2 px-6 py-5 text-lg transition-all transform hover:scale-105 font-sans">
                <Home className="h-5 w-5" />
                Browse Properties
              </GradientButton>
            </Link>
            <Link href="/off-plan">
              <GradientButton className="flex items-center gap-2 px-6 py-5 text-lg transition-all transform hover:scale-105 font-sans">
                <Building className="h-5 w-5" />
                Explore Projects
              </GradientButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

