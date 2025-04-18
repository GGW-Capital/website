"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import ProjectCardNew from "@/components/project-card-new"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getFeaturedProjects, getLifestyles } from "@/lib/sanity"
import FilterToggle from "@/components/filter-toggle"
import Carousel from "@/components/carousel"
import { motion } from "framer-motion"

// Define our filter options
const propertyCategories = [
  { id: "all", label: "All" },
  { id: "apartment", label: "Apartment" },
  { id: "villa", label: "Villa" },
  { id: "penthouse", label: "Penthouse" },
  { id: "townhouse", label: "Townhouse" },
]

// Default lifestyle options until we load from Sanity
const defaultLifestyleOptions = [
  { id: "luxury", label: "Luxury" },
  { id: "beachfront", label: "Beachfront" },
  { id: "family", label: "Family" },
  { id: "urban", label: "Urban" },
  { id: "investment", label: "Investment" },
]

// We'll dynamically populate this based on the data we get from Sanity
const developerOptions = [
  { id: "all", label: "All" },
]

export default function ProjectsSection() {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [developers, setDevelopers] = useState<{id: string, label: string}[]>([
    { id: "all", label: "All" }
  ])
  const [lifestyleOptions, setLifestyleOptions] = useState(defaultLifestyleOptions)

  // Filter states
  const [activeCategory, setActiveCategory] = useState("all")
  const [activeLifestyle, setActiveLifestyle] = useState("all")
  const [activeDeveloper, setActiveDeveloper] = useState("all")
  const [filteredProjects, setFilteredProjects] = useState<any[]>([])

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await getFeaturedProjects()
        if (data && data.length > 0) {
          setProjects(data)
          setFilteredProjects(data)
          
          // Extract unique developers from the project data
          const uniqueDevelopers = new Set<string>()
          data.forEach((project: any) => {
            if (project.developer) {
              uniqueDevelopers.add(project.developer)
            }
          })
          
          // Create developer options from the unique developers
          const devOptions = [{ id: "all", label: "All" }]
          uniqueDevelopers.forEach((dev) => {
            devOptions.push({ id: dev, label: dev })
          })
          
          setDevelopers(devOptions)
        } else {
          console.warn("No featured projects returned from Sanity")
        }
      } catch (error) {
        console.error("Error loading projects:", error)
      } finally {
        setLoading(false)
      }
    }
    
    async function fetchLifestyles() {
      try {
        const lifestylesData = await getLifestyles(true) // true = include "All" option
        if (lifestylesData && lifestylesData.length > 0) {
          setLifestyleOptions(lifestylesData)
        }
      } catch (error) {
        console.error('Error fetching lifestyles:', error)
        // Keep the default options if there's an error
      }
    }

    loadProjects()
    fetchLifestyles()
  }, [])

  // Apply filters when they change
  useEffect(() => {
    let filtered = projects

    if (activeCategory !== "all") {
      filtered = filtered.filter((project) => project.category === activeCategory)
    }

    if (activeLifestyle !== "all") {
      filtered = filtered.filter((project) => project.lifestyle === activeLifestyle)
    }

    if (activeDeveloper !== "all") {
      filtered = filtered.filter((project) => project.developer === activeDeveloper)
    }

    setFilteredProjects(filtered)
  }, [activeCategory, activeLifestyle, activeDeveloper, projects])

  if (loading) {
    return (
      <section className="py-24 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-[#050505] to-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              <span className="text-[#D4AF37]">Exclusive</span> Off-Plan Projects
            </h2>
            <div className="w-24 h-1 bg-[#D4AF37]/60 mb-6"></div>
            <p className="text-lg md:text-xl text-white/80 max-w-3xl">
              Discover our curated collection of prestigious off-plan developments, designed for those who demand
              nothing but the finest in luxury real estate.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 px-4 md:px-8 lg:px-12 bg-gradient-to-b from-[#050505] to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <h2 className="heading-2 mb-6 text-white">
            <span className="text-ggw-gold">Exclusive</span> Off-Plan Projects
          </h2>
          <div className="w-24 h-1 bg-ggw-gold/60 mb-6"></div>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl font-sans">
            Discover our curated collection of prestigious off-plan developments, designed for those who demand nothing
            but the finest in luxury real estate.
          </p>
        </motion.div>

        <div className="mb-10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Property Type:</label>
              <FilterToggle options={propertyCategories} activeId={activeCategory} onChange={setActiveCategory} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Lifestyle:</label>
              <FilterToggle options={lifestyleOptions} activeId={activeLifestyle} onChange={setActiveLifestyle} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/90">Developer:</label>
              <FilterToggle options={developers} activeId={activeDeveloper} onChange={setActiveDeveloper} />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div className="text-white text-lg font-medium">Showing {filteredProjects.length} exclusive projects</div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-12 bg-[#0a0a0a] border border-ggw-gold/20 rounded-[2px]">
            <p className="text-white/80 mb-4 font-sans">No projects found matching your filters.</p>
            <Button
              variant="outline"
              className="font-sans rounded-[2px]"
              onClick={() => {
                setActiveCategory("all")
                setActiveLifestyle("all")
                setActiveDeveloper("all")
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <Carousel
            showArrows={true}
            showDots={true}
            autoPlay={true}
            interval={6000}
            itemsPerView={3}
            className="mb-16"
          >
            {filteredProjects.map((project) => (
              <ProjectCardNew key={project._id} project={project} />
            ))}
          </Carousel>
        )}

        <div className="flex justify-center mt-16">
          <Link href="/off-plan?page=1">
            <Button className="bg-black border border-ggw-gold text-ggw-gold hover:bg-ggw-gold/10 px-8 py-6 text-lg flex items-center gap-2 rounded-[2px] transition-all duration-300 transform hover:scale-105 font-sans">
              View All Projects <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

