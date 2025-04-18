"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function PropertyCardSkeleton() {
  return (
    <div className="bg-[#0a0a0a] border border-[#D4AF37]/10 rounded-md overflow-hidden shadow-lg">
      <div className="relative">
        <Skeleton className="w-full h-48 rounded-md" />
        <div className="absolute top-2 right-2">
          <Skeleton className="w-24 h-6 rounded-full" />
        </div>
      </div>
      
      <div className="p-4">
        <Skeleton className="h-7 w-3/4 mb-2" />
        <Skeleton className="h-5 w-1/2 mb-3" />
        
        <div className="flex justify-between mb-3">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-1/3" />
        </div>
        
        <div className="flex space-x-4 mb-4">
          <Skeleton className="h-5 w-10" />
          <Skeleton className="h-5 w-10" />
          <Skeleton className="h-5 w-10" />
        </div>
        
        <Skeleton className="h-10 w-full mt-2" />
      </div>
    </div>
  )
}