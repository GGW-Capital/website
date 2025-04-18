"use client"

import type React from "react"

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface CarouselProps {
  children: React.ReactNode[]
  showArrows?: boolean
  showDots?: boolean
  autoPlay?: boolean
  interval?: number
  className?: string
  slideClassName?: string
  itemsPerView?: number
}

const Carousel = forwardRef<{ resetCarousel: () => void }, CarouselProps>(
  (
    {
      children,
      showArrows = true,
      showDots = true,
      autoPlay = false,
      interval = 5000,
      className,
      slideClassName,
      itemsPerView = 1,
    },
    ref,
  ) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isHovering, setIsHovering] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [isInitialized, setIsInitialized] = useState(false)
    const maxIndex = Math.max(0, Math.ceil(children.length / (isMobile ? 1 : itemsPerView)) - 1)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    // Check if we're on mobile
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }

      // Initial check
      checkMobile()

      // Mark as initialized after first render
      setIsInitialized(true)

      // Add event listener
      window.addEventListener("resize", checkMobile)

      // Cleanup
      return () => window.removeEventListener("resize", checkMobile)
    }, [])

    // Expose the resetCarousel method to parent components
    useImperativeHandle(ref, () => ({
      resetCarousel: () => {
        setCurrentIndex(0)
        if (timerRef.current) {
          clearInterval(timerRef.current)
          if (autoPlay && !isHovering) {
            timerRef.current = setInterval(goToNext, interval)
          }
        }
      },
    }))

    const goToNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1))
    }

    const goToPrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1))
    }

    const goToSlide = (index: number) => {
      setCurrentIndex(index)
    }

    useEffect(() => {
      if (autoPlay && !isHovering && isInitialized) {
        // Clear any existing interval
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
        // Set a new interval
        timerRef.current = setInterval(goToNext, interval)
      }
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current)
        }
      }
    }, [autoPlay, interval, isHovering, maxIndex, isInitialized])

    // Reset index when children change
    useEffect(() => {
      if (isInitialized) {
        setCurrentIndex(0)
      }
    }, [children.length, isInitialized])

    // Function to get visible children based on current index and items per view
    const getVisibleChildren = () => {
      if (isMobile) {
        // On mobile, show only one item at a time
        return [children[currentIndex]]
      } else {
        // On desktop, show multiple items based on itemsPerView
        const startIdx = currentIndex * itemsPerView
        return children.slice(startIdx, startIdx + itemsPerView)
      }
    }

    // Responsive grid classes based on items per view
    const getGridClasses = () => {
      if (isMobile) {
        return "grid-cols-1" // Always 1 column on mobile
      } else if (itemsPerView === 1) {
        return "grid-cols-1"
      } else if (itemsPerView === 2) {
        return "grid-cols-2 gap-4"
      } else if (itemsPerView === 3) {
        return "grid-cols-3 gap-4"
      } else {
        return "grid-cols-4 gap-4"
      }
    }

    // Ensure we have valid children to display
    const visibleChildren = getVisibleChildren()
    const hasValidChildren = visibleChildren && visibleChildren.length > 0

    return (
      <div
        className={cn("relative", className)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="overflow-hidden">
          {hasValidChildren ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={cn("grid", getGridClasses(), slideClassName)}
            >
              {visibleChildren}
            </motion.div>
          ) : (
            <div className="flex justify-center items-center h-64 bg-black/20 rounded-lg">
              <p className="text-white/50">No items to display</p>
            </div>
          )}
        </div>

        {showArrows && children.length > (isMobile ? 1 : itemsPerView) && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/60 border-white/20 text-white hover:bg-black/80 z-10"
              onClick={goToPrev}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/60 border-white/20 text-white hover:bg-black/80 z-10"
              onClick={goToNext}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </>
        )}

        {showDots && children.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  currentIndex === index ? "bg-[#D4AF37] w-4" : "bg-white/30 hover:bg-white/50",
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    )
  },
)

Carousel.displayName = "Carousel"
export default Carousel

