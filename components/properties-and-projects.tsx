"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, BedDouble, Bath, Maximize2, ArrowRight, Building, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getFeaturedProperties, getProjects } from "@/lib/sanity"
import FilterToggle from "@/components/filter-toggle"
import Carousel from "@/components/carousel"
import { motion } from "framer-motion"
import ProjectCard from "@/components/project-card"
import GradientTitle from "./ui/gradient-title"
import ProjectCardNew from "./project-card-new"

// Define our filter options
const marketTypes = [
  { id: "buy", label: "For Sale" },
  { id: "rent", label: "For Rent" },
  { id: "off-plan", label: "Off-Plan" },
]

const propertyCategories = [
  { id: "apartment", label: "Apartment" },
  { id: "villa", label: "Villa" },
  { id: "penthouse", label: "Penthouse" },
  { id: "townhouse", label: "Townhouse" },
]

const lifestyleOptions = [
  { id: "luxury", label: "Luxury" },
  { id: "beachfront", label: "Beachfront" },
  { id: "family", label: "Family" },
  { id: "urban", label: "Urban" },
  { id: "investment", label: "Investment" },
]

const developerOptions = [
  { id: "Emaar", label: "Emaar" },
  { id: "Damac", label: "Damac" },
  { id: "Nakheel", label: "Nakheel" },
  { id: "Meraas", label: "Meraas" },
]

// Featured properties with real images (fallback data)
const FALLBACK_PROPERTIES = [
  {
    _id: "1",
    title: "Luxury Penthouse with Panoramic Views",
    type: "Penthouse",
    location: "Palm Jumeirah, Dubai",
    price: "AED 15,500,000",
    bedrooms: 4,
    bathrooms: 5,
    area: "5,200 sq.ft",
    images: ["/images/luxury-penthouse.avif"],
    status: "For Sale",
    marketType: "buy",
    category: "penthouse",
    lifestyle: "luxury",
  },
  {
    _id: "2",
    title: "Modern Villa with Private Pool",
    type: "Villa",
    location: "Emirates Hills, Dubai",
    price: "AED 22,000,000",
    bedrooms: 6,
    bathrooms: 7,
    area: "10,000 sq.ft",
    images: ["/images/modern-villa.jpg"],
    status: "For Sale",
    marketType: "buy",
    category: "villa",
    lifestyle: "luxury",
  },
  {
    _id: "3",
    title: "Waterfront Apartment with Marina Views",
    type: "Apartment",
    location: "Dubai Marina",
    price: "AED 3,800,000",
    bedrooms: 2,
    bathrooms: 3,
    area: "1,800 sq.ft",
    images: ["/images/waterfront-apartment.jpg"],
    status: "For Sale",
    marketType: "buy",
    category: "apartment",
    lifestyle: "urban",
  },
  {
    _id: "4",
    title: "Beachfront Villa with Private Access",
    type: "Villa",
    location: "Palm Jumeirah, Dubai",
    price: "AED 18,000,000",
    bedrooms: 5,
    bathrooms: 6,
    area: "7,500 sq.ft",
    images: ["/images/luxury-penthouse.jpg"],
    status: "For Sale",
    marketType: "buy",
    category: "villa",
    lifestyle: "beachfront",
  },
  {
    _id: "5",
    title: "Family Townhouse in Gated Community",
    type: "Townhouse",
    location: "Arabian Ranches, Dubai",
    price: "AED 4,200,000",
    bedrooms: 4,
    bathrooms: 4,
    area: "3,200 sq.ft",
    images: ["/images/modern-villa.jpg"],
    status: "For Sale",
    marketType: "buy",
    category: "townhouse",
    lifestyle: "family",
  },
  {
    _id: "6",
    title: "Luxury Apartment with Burj Khalifa View",
    type: "Apartment",
    location: "Downtown Dubai",
    price: "AED 5,500,000",
    bedrooms: 3,
    bathrooms: 4,
    area: "2,100 sq.ft",
    images: ["/images/waterfront-apartment.jpg"],
    status: "For Sale",
    marketType: "buy",
    category: "apartment",
    lifestyle: "luxury",
  },
]

// Projects with real images (fallback data)
const FALLBACK_PROJECTS = [
  {
    id: "1",
    name: "The Royal Residences",
    location: "Palm Jumeirah, Dubai",
    price: "Starting from $2,500,000",
    description:
      "An exclusive collection of beachfront villas offering unparalleled luxury and panoramic sea views. Features include private pools, smart home technology, and direct beach access.",
    completionDate: "Q4 2025",
    coordinates: { lat: 25.1124, lng: 55.139 },
    images: ["/images/royal-residences-1.jpg", "/images/royal-residences-2.jpg", "/images/royal-residences-3.jpg"],
    features: ["Private Beach Access", "Smart Home Technology", "Concierge Service", "Infinity Pool"],
    bedrooms: "3-5",
    bathrooms: "4-6",
    area: "4,500-8,200 sq ft",
    category: "villa",
    lifestyle: "luxury",
    developer: "Emaar",
  },
  {
    id: "2",
    name: "Celestial Heights",
    location: "Downtown, Dubai",
    price: "Starting from $1,800,000",
    description:
      "A landmark skyscraper featuring premium apartments with floor-to-ceiling windows offering breathtaking city views. Residents enjoy exclusive access to world-class amenities.",
    completionDate: "Q2 2026",
    coordinates: { lat: 25.2048, lng: 55.2708 },
    images: ["/images/celestial-heights-1.jpg", "/images/celestial-heights-2.jpg", "/images/celestial-heights-3.jpg"],
    features: ["Sky Lounge", "Indoor Pool", "Fitness Center", "Valet Parking"],
    bedrooms: "1-4",
    bathrooms: "2-5",
    area: "1,200-5,500 sq ft",
    category: "apartment",
    lifestyle: "urban",
    developer: "Damac",
  },
  {
    id: "3",
    name: "Elysian Gardens",
    location: "Emirates Hills, Dubai",
    price: "Starting from $5,500,000",
    description:
      "An ultra-exclusive gated community of mansion-style homes surrounded by lush landscaping and a championship golf course. The epitome of luxury living.",
    completionDate: "Q3 2025",
    coordinates: { lat: 25.0657, lng: 55.1623 },
    images: ["/images/elysian-gardens-1.jpg", "/images/elysian-gardens-2.jpg", "/images/elysian-gardens-3.jpg"],
    features: ["Private Garden", "Home Theater", "Wine Cellar", "Staff Quarters"],
    bedrooms: "5-8",
    bathrooms: "6-10",
    area: "10,000-20,000 sq ft",
    category: "villa",
    lifestyle: "family",
    developer: "Nakheel",
  },
]

export default function PropertiesAndProjects() {
  // Tab state
  const [activeTab, setActiveTab] = useState("properties")

  // Properties state
  const [properties, setProperties] = useState(FALLBACK_PROPERTIES)
  const [activeMarketType, setActiveMarketType] = useState("all")
  const [activePropertyCategory, setActivePropertyCategory] = useState("all")
  const [activePropertyLifestyle, setActivePropertyLifestyle] = useState("all")
  const [filteredProperties, setFilteredProperties] = useState(FALLBACK_PROPERTIES)
  const [loadingProperties, setLoadingProperties] = useState(true)

  // Projects state
  const [projects, setProjects] = useState(FALLBACK_PROJECTS)
  const [activeProjectCategory, setActiveProjectCategory] = useState("all")
  const [activeProjectLifestyle, setActiveProjectLifestyle] = useState("all")
  const [activeDeveloper, setActiveDeveloper] = useState("all")
  const [filteredProjects, setFilteredProjects] = useState(FALLBACK_PROJECTS)
  const [loadingProjects, setLoadingProjects] = useState(true)

  // Add a carousel key state:
  const [carouselKey, setCarouselKey] = useState(0)

  // In the component, let's add refs to track the carousel states
  const propertiesCarouselRef = useRef<{ resetCarousel: () => void } | null>(null)
  const projectsCarouselRef = useRef<{ resetCarousel: () => void } | null>(null)

  // Load properties and projects
  useEffect(() => {
    async function loadData() {
      try {
        // Load properties
        const propertiesData = await getFeaturedProperties()
        if (propertiesData && propertiesData.length > 0) {
          setProperties(propertiesData)
        }
        setLoadingProperties(false)

        // Load projects
        const projectsData = await getProjects()
        if (projectsData && projectsData.length > 0) {
          // Transform the data to match the expected format
          const formattedData = projectsData.map((project: any) => ({
            ...project,
            id: project._id,
          }))
          setProjects(formattedData)
        }
        setLoadingProjects(false)
      } catch (error) {
        console.error("Error loading data:", error)
        setLoadingProperties(false)
        setLoadingProjects(false)
      }
    }

    loadData()
  }, [])

  // Apply property filters when they change
  useEffect(() => {
    let filtered = properties

    if (activeMarketType !== "all") {
      filtered = filtered.filter((property) => property.marketType === activeMarketType)
    }

    if (activePropertyCategory !== "all") {
      filtered = filtered.filter((property) => property.category === activePropertyCategory)
    }

    if (activePropertyLifestyle !== "all") {
      filtered = filtered.filter((property) => property.lifestyle === activePropertyLifestyle)
    }

    setFilteredProperties(filtered)
  }, [activeMarketType, activePropertyCategory, activePropertyLifestyle, properties])

  // Apply project filters when they change
  useEffect(() => {
    let filtered = projects

    if (activeProjectCategory !== "all") {
      filtered = filtered.filter((project) => project.category === activeProjectCategory)
    }

    if (activeProjectLifestyle !== "all") {
      filtered = filtered.filter((project) => project.lifestyle === activeProjectLifestyle)
    }

    if (activeDeveloper !== "all") {
      filtered = filtered.filter((project) => project.developer === activeDeveloper)
    }

    setFilteredProjects(filtered)
  }, [activeProjectCategory, activeProjectLifestyle, activeDeveloper, projects])

  // Modify the handleTabChange function to directly reset the carousels
  const handleTabChange = (value: string) => {
    setActiveTab(value)

    if (value === "properties") {
      setActiveMarketType("all")
      setActivePropertyCategory("all")
      setActivePropertyLifestyle("all")
      if (propertiesCarouselRef.current) {
        propertiesCarouselRef.current.resetCarousel()
      }
    } else {
      setActiveProjectCategory("all")
      setActiveProjectLifestyle("all")
      setActiveDeveloper("all")
      if (projectsCarouselRef.current) {
        projectsCarouselRef.current.resetCarousel()
      }
    }
  }

  const PropertyCard = ({ property }: { property: any }) => (
    <Link href={`/properties/${property._id}`} className="group">
      <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-500 h-full">
        <div className="relative h-[300px]">
          <Image
            src={property.images[0] || "/placeholder.svg"}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4">
            <span className="bg-[#D4AF37] text-black px-3 py-1 rounded-md text-sm font-medium">
              {property.marketType === "buy" ? "For Sale" : 
               property.marketType === "rent" ? "For Rent" : 
               property.marketType === "off-plan" ? "Off Plan" : ""}
            </span>
          </div>
          <div className="absolute top-4 right-4">
            <span className="bg-black/70 text-white px-3 py-1 rounded-md text-sm font-medium border border-[#D4AF37]/30">
              {property.type}
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
            {property.title}
          </h3>

          <div className="flex items-center text-[#D4AF37] mb-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm">{property.location}</span>
          </div>

          <div className="flex items-center justify-between text-white/80 text-sm mb-4">
            <div className="flex items-center">
              <BedDouble className="h-4 w-4 mr-1 text-[#D4AF37]" />
              <span>
                {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
              </span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1 text-[#D4AF37]" />
              <span>
                {property.bathrooms} {property.bathrooms === 1 ? "Bath" : "Baths"}
              </span>
            </div>
            <div className="flex items-center">
              <Maximize2 className="h-4 w-4 mr-1 text-[#D4AF37]" />
              <span>{property.area} sq.ft</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-[#D4AF37]">{property.price}</span>
            <Link href={`#`}>
            {/* <Link href={`/properties/${property._id}`}> */}
              <Button variant="outline" size="sm" className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Link>
  )

  return (
    <section className="py-24 bg-gradient-to-b from-black to-[#050505]">
      <div className="container !max-w-[1600px] mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Discover <GradientTitle element="span">Luxury</GradientTitle> Real Estate
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37]/60 mx-auto mb-6"></div>
          <p className="text-lg text-white/80">
            Explore our curated collection of prestigious properties and exclusive off-plan developments.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto mb-10">
          <Tabs defaultValue="properties" value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="w-full h-14 bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-1.5 grid grid-cols-2 gap-1">
              <TabsTrigger
                value="properties"
                className="h-full rounded-lg text-base font-medium data-[state=active]:bg-ggw-gradient data-[state=active]:text-black data-[state=inactive]:bg-transparent data-[state=inactive]:text-white/80 flex items-center justify-center"
              >
                <Building className="h-5 w-5 mr-2" />
                Properties
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="h-full rounded-lg text-base font-medium data-[state=active]:bg-ggw-gradient data-[state=active]:text-black data-[state=inactive]:bg-transparent data-[state=inactive]:text-white/80 flex items-center justify-center"
              >
                <Calendar className="h-5 w-5 mr-2" />
                Off-Plan Projects
              </TabsTrigger>
            </TabsList>

            <TabsContent value="properties" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/90">Market Type:</label>
                  <FilterToggle options={marketTypes} activeId={activeMarketType} onChange={setActiveMarketType} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/90">Property Type:</label>
                  <FilterToggle
                    options={propertyCategories}
                    activeId={activePropertyCategory}
                    onChange={setActivePropertyCategory}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/90">Lifestyle:</label>
                  <FilterToggle
                    options={lifestyleOptions}
                    activeId={activePropertyLifestyle}
                    onChange={setActivePropertyLifestyle}
                  />
                </div>
              </div>

              {loadingProperties ? (
                <div className="flex justify-center py-12">
                  <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : filteredProperties.length === 0 ? (
                <div className="text-center py-12 bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl">
                  <p className="text-white/80 mb-4">No properties found matching your filters.</p>
                  <Button
                    variant="outline"
                    className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
                    onClick={() => {
                      setActiveMarketType("all")
                      setActivePropertyCategory("all")
                      setActivePropertyLifestyle("all")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <Carousel
                  ref={propertiesCarouselRef}
                  showArrows={true}
                  showDots={true}
                  autoPlay={true}
                  interval={5000}
                  itemsPerView={3}
                  className="mb-16"
                >
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property._id} property={property} />
                  ))}
                </Carousel>
              )}

              <div className="flex justify-center">
                <Link href="#">
                  <Button className="bg-[#D4AF37] text-black hover:bg-[#C4A030] flex items-center gap-2 px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105">
                    View All Properties <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/90">Property Type:</label>
                  <FilterToggle
                    options={propertyCategories}
                    activeId={activeProjectCategory}
                    onChange={setActiveProjectCategory}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/90">Lifestyle:</label>
                  <FilterToggle
                    options={lifestyleOptions}
                    activeId={activeProjectLifestyle}
                    onChange={setActiveProjectLifestyle}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/90">Developer:</label>
                  <FilterToggle options={developerOptions} activeId={activeDeveloper} onChange={setActiveDeveloper} />
                </div>
              </div>

              {loadingProjects ? (
                <div className="flex justify-center py-12">
                  <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : filteredProjects.length === 0 ? (
                <div className="text-center py-12 bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl">
                  <p className="text-white/80 mb-4">No projects found matching your filters.</p>
                  <Button
                    variant="outline"
                    className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
                    onClick={() => {
                      setActiveProjectCategory("all")
                      setActiveProjectLifestyle("all")
                      setActiveDeveloper("all")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <Carousel
                  ref={projectsCarouselRef}
                  showArrows={true}
                  showDots={true}
                  autoPlay={true}
                  interval={6000}
                  itemsPerView={3}
                  className="mb-16"
                >
                  {filteredProjects.map((project) => (
                    <ProjectCardNew key={project.id} project={project} />
                  ))}
                </Carousel>
              )}

              <div className="flex justify-center">
                <Link href="/off-plan">
                  <Button className="bg-[#D4AF37] text-black hover:bg-[#C4A030] flex items-center gap-2 px-8 py-6 text-lg rounded-md transition-all duration-300 transform hover:scale-105">
                    View All Projects <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

