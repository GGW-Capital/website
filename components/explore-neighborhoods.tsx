"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Carousel from "@/components/carousel"
import { getNeighborhoods, urlFor } from "@/lib/sanity"
import GradientTitle from "./ui/gradient-title"

export default function ExploreNeighborhoods() {
  const [neighborhoods, setNeighborhoods] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  // Use useRef instead of useState to avoid infinite re-renders
  const carouselRef = useRef<{ resetCarousel: () => void } | null>(null)
  
  useEffect(() => {
    async function loadNeighborhoods() {
      try {
        const data = await getNeighborhoods()
        if (data && data.length > 0) {
          setNeighborhoods(data)
        } else {
          console.warn("No neighborhoods returned from Sanity")
        }
      } catch (error) {
        console.error("Error loading neighborhoods:", error)
      } finally {
        setLoading(false)
      }
    }
    
    loadNeighborhoods()
  }, [])

  const NeighborhoodCard = ({ neighborhood }: { neighborhood: any }) => {
    // Format the image URL using Sanity's URL builder
    const imageUrl = neighborhood.image 
      ? urlFor(neighborhood.image).width(800).height(600).url()
      : "/placeholder.jpg"
      
    // Format the slug for the URL
    const neighborhoodSlug = neighborhood.slug?.current || neighborhood._id
    
    // Get property types and other details from Sanity data
    const propertyTypes = neighborhood.propertyTypes || ["Properties"]
    const priceRange = neighborhood.priceRange || "Contact for pricing"
    const lifestyle = neighborhood.lifestyle || "Luxury"
    
    return (
      <div className="bg-[#0a0a0a] border border-ggw-gold/20 rounded-[2px] overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-500 h-full group">
        <div className="relative h-[250px]">
          <Image
            src={imageUrl}
            alt={neighborhood.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t transition-transform duration-700 from-black/70 group-hover:scale-110 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-2xl font-serif font-bold text-white group-hover:text-ggw-gold transition-colors">
              {neighborhood.name}
            </h3>
          </div>
        </div>

        <div className="p-6">
          <p className="text-white/80 mb-4 font-sans">{neighborhood.description}</p>

          <div className="space-y-3 mb-4">
            {propertyTypes.length > 0 && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-ggw-gold" />
                <span className="text-white/70 text-sm font-sans">Property Types: {Array.isArray(propertyTypes) ? propertyTypes.join(", ") : propertyTypes}</span>
              </div>
            )}

            {priceRange && (
              <div className="flex items-center gap-2">
                <span className="text-white/70 text-sm font-sans">Price Range: {priceRange}</span>
              </div>
            )}

            {lifestyle && (
              <div className="flex items-center gap-2">
                <span className="text-white/70 text-sm font-sans">Lifestyle: {lifestyle}</span>
              </div>
            )}
          </div>

          <Link href={`/neighborhoods/${neighborhoodSlug}`}>
            <Button
              variant="outline"
              className="w-full font-sans rounded-[2px] flex items-center justify-center gap-2"
            >
              Explore Area <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }
  
  if (loading) {
    return (
      <section className="py-24 bg-[#050505]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="heading-2 mb-6 text-white">
              Explore <GradientTitle element="span">Neighborhoods</GradientTitle>
            </h2>
            <div className="w-24 h-1 bg-ggw-gold/60 mx-auto mb-6"></div>
            <p className="text-lg text-white/80 font-sans">
              Discover Dubai's most prestigious areas and find your perfect luxury home
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-ggw-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    )
  }
  
  // If no neighborhoods data is available, don't render this section
  if (neighborhoods.length === 0) {
    return null
  }

  return (
    <section className="py-24 bg-[#050505]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="heading-2 mb-6 text-white">
            Explore <GradientTitle element="span">Neighborhoods</GradientTitle>
          </h2>
          <div className="w-24 h-1 bg-ggw-gold/60 mx-auto mb-6"></div>
          <p className="text-lg text-white/80 font-sans">
            Discover Dubai's most prestigious areas and find your perfect luxury home
          </p>
        </motion.div>

        <Carousel
          ref={carouselRef}
          showArrows={true}
          showDots={true}
          autoPlay={true}
          interval={6000}
          itemsPerView={3}
          className="mb-16"
        >
          {neighborhoods.map((neighborhood) => (
            <NeighborhoodCard key={neighborhood._id} neighborhood={neighborhood} />
          ))}
        </Carousel>

        <div className="flex justify-center mt-10">
          <Link href="/neighborhoods">
            <Button className="bg-ggw-gold text-black hover:bg-ggw-gold/90 px-10 py-6 text-lg font-medium rounded-[2px] transition-all duration-300 transform hover:scale-105 font-sans">
              Explore All Neighborhoods
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

