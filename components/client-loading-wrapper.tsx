"use client"

import { useState } from "react"
import LoadingScreen from "./loading-screen"

interface ClientLoadingWrapperProps {
  children: React.ReactNode
}

/**
 * Client-side wrapper component for server components that need a loading screen
 * This allows us to leverage server components for SEO while still having a nice loading animation
 */
export default function ClientLoadingWrapper({ children }: ClientLoadingWrapperProps) {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      {!loading && children}
    </>
  )
}