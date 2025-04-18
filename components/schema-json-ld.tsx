'use client'

import { useEffect } from 'react'

interface SchemaJsonLdProps {
  data: any
}

/**
 * Component to inject JSON-LD structured data into the page
 * This helps search engines better understand the content
 */
export default function SchemaJsonLd({ data }: SchemaJsonLdProps) {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
    
    // Cleanup function
    return () => {
      document.head.removeChild(script)
    }
  }, [data])
  
  // This component doesn't render anything visible
  return null
}