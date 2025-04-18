"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ClientCarouselControlsProps {
  totalItems: number;
  itemsPerView: number;
  carouselId: string;
  autoPlay?: boolean;
  interval?: number;
}

export default function ClientCarouselControls({
  totalItems,
  itemsPerView,
  carouselId,
  autoPlay = false,
  interval = 5000,
}: ClientCarouselControlsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Calculate the max index based on the number of items and items per view
  const maxIndex = Math.max(0, Math.ceil(totalItems / (isMobile ? 1 : itemsPerView)) - 1);
  
  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener
    window.addEventListener("resize", checkMobile);
    
    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  // Apply the carousel logic to manage the visibility of items
  useEffect(() => {
    // Get all carousel items
    const carouselContainer = document.getElementById(carouselId);
    if (!carouselContainer) return;
    
    const items = carouselContainer.querySelectorAll(".carousel-item");
    
    // Hide all items first
    items.forEach((item) => {
      (item as HTMLElement).style.display = "none";
    });
    
    // Calculate visible items range based on current index and items per view
    const startIdx = currentIndex * (isMobile ? 1 : itemsPerView);
    const endIdx = Math.min(startIdx + (isMobile ? 1 : itemsPerView), totalItems);
    
    // Show only the current items in view
    for (let i = startIdx; i < endIdx; i++) {
      const item = items[i];
      if (item) {
        (item as HTMLElement).style.display = "block";
      }
    }
  }, [currentIndex, totalItems, itemsPerView, carouselId, isMobile]);
  
  // Set up autoplay
  useEffect(() => {
    if (autoPlay && !isHovering) {
      // Clear any existing interval
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // Set a new interval
      timerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1));
      }, interval);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoPlay, interval, isHovering, maxIndex]);
  
  // Navigation functions
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === maxIndex ? 0 : prevIndex + 1));
  };
  
  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? maxIndex : prevIndex - 1));
  };
  
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };
  
  // Don't render controls if there's only one page of items
  if (totalItems <= itemsPerView && !isMobile) {
    return null;
  }
  
  return (
    <div
      className="carousel-controls" 
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Pagination dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              currentIndex === index ? "bg-[#D4AF37] w-4" : "bg-white/30 hover:bg-white/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Arrow controls */}
      {totalItems > (isMobile ? 1 : itemsPerView) && (
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
    </div>
  );
}