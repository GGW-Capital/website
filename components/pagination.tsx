"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  createPageUrl: (page: number) => string;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  createPageUrl,
  className = "",
}: PaginationProps) {
  // If only 1 page, don't show pagination
  if (totalPages <= 1) return null;

  // Create array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      // Calculate start and end of page window
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust window to show 3 pages
      if (currentPage <= 3) {
        endPage = 4;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }
      
      // Add ellipsis before middle pages if needed
      if (startPage > 2) {
        pageNumbers.push('ellipsis-start');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis after middle pages if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push('ellipsis-end');
      }
      
      // Always show last page
      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div className={`flex justify-center mt-12 ${className}`}>
      <div className="flex flex-wrap items-center gap-2">
        {/* Previous button */}
        <Button
          variant="outline"
          size="sm"
          className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
          disabled={currentPage <= 1}
          asChild={currentPage > 1}
        >
          {currentPage > 1 ? (
            <Link href={createPageUrl(currentPage - 1)}>Previous</Link>
          ) : (
            <span>Previous</span>
          )}
        </Button>

        {/* Page numbers */}
        {getPageNumbers().map((pageNum, index) => {
          if (pageNum === 'ellipsis-start' || pageNum === 'ellipsis-end') {
            return (
              <span 
                key={`ellipsis-${index}`} 
                className="px-3 text-[#D4AF37]"
              >
                ...
              </span>
            );
          }
          
          return (
            <Button
              key={`page-${pageNum}`}
              variant="outline"
              size="sm"
              className={`${
                pageNum === currentPage
                  ? "border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37]"
                  : "border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
              }`}
              asChild={pageNum !== currentPage}
            >
              {pageNum !== currentPage ? (
                <Link href={createPageUrl(pageNum as number)}>{pageNum}</Link>
              ) : (
                <span>{pageNum}</span>
              )}
            </Button>
          );
        })}

        {/* Next button */}
        <Button
          variant="outline"
          size="sm"
          className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
          disabled={currentPage >= totalPages}
          asChild={currentPage < totalPages}
        >
          {currentPage < totalPages ? (
            <Link href={createPageUrl(currentPage + 1)}>Next</Link>
          ) : (
            <span>Next</span>
          )}
        </Button>
      </div>
    </div>
  );
}