"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Quote } from "lucide-react"
import { getTestimonials, urlFor } from "@/lib/sanity"
import Carousel from "@/components/carousel"
import { motion } from "framer-motion"
import GradientTitle from "./ui/gradient-title"

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const carouselRef = useRef<{ resetCarousel: () => void } | null>(null)
  const [carouselKey, setCarouselKey] = useState(0)

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const data = await getTestimonials();
        if (data && data.length > 0) {
          setTestimonials(data)
        } else {
          console.warn("No testimonials returned from Sanity")
        }
      } catch (error) {
        console.error("Error loading testimonials:", error)
      } finally {
        setLoading(false)
      }
    }

    loadTestimonials()
  }, [])

  // Force carousel re-render when window is resized
  useEffect(() => {
    const handleResize = () => {
      setCarouselKey((prev) => prev + 1)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Reset carousel when testimonials change
  useEffect(() => {
    if (carouselRef.current && !loading) {
      carouselRef.current.resetCarousel()
    }
  }, [testimonials, loading])

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-black to-[#050505]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-5xl heading-2 font-bold mb-6 text-white">
              What Our <GradientTitle element="span">Clients</GradientTitle> Say
            </h2>
            <div className="w-24 h-1 bg-[#D4AF37]/60 mx-auto mb-6"></div>
            <p className="text-lg text-white/80">
              Hear from our satisfied clients about their experience working with GGW Real Estate.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    )
  }

  // Return nothing if no testimonials available
  if (testimonials.length === 0) {
    return null
  }

  const TestimonialCard = ({ testimonial }: { testimonial: any }) => {
    // Get image URL from Sanity image reference
    const imageUrl = testimonial.image ? urlFor(testimonial.image).width(200).height(200).url() : "/placeholder-user.jpg"
    
    return (
      <div className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl p-8 shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-500 h-full">
        <Quote className="h-12 w-12 text-[#D4AF37]/30 mb-6" />

        <p className="text-white/80 italic mb-8 text-lg leading-relaxed font-medium">"{testimonial.quote}"</p>

        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-[#D4AF37]/30">
            <Image 
              src={imageUrl} 
              alt={testimonial.name} 
              fill 
              className="object-cover" 
            />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{testimonial.name}</h3>
            <p className="text-[#D4AF37] text-sm font-medium">{testimonial.title}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="py-24 bg-gradient-to-b from-black to-[#050505]">
      <div className="container mx-auto px-4">
        <div
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl heading-2 font-bold mb-6 text-white">
            What Our <GradientTitle element="span">Clients</GradientTitle> Say
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37]/60 mx-auto mb-6"></div>
          <p className="text-lg text-white/80 font-medium">
            Hear from our satisfied clients about their experience working with GGW Real Estate.
          </p>
        </div>

        <Carousel
          key={carouselKey}
          ref={carouselRef}
          showArrows={true}
          showDots={true}
          autoPlay={true}
          interval={7000}
          itemsPerView={3}
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial._id} testimonial={testimonial} />
          ))}
        </Carousel>
      </div>
    </section>
  )
}

