"use client";

import { useEffect } from "react";
import LoadingScreen from "./loading-screen";
import { useState } from "react";

// This component ONLY handles the loading screen overlay
// It doesn't wrap any content, preserving server rendering
export default function ClientVisitDetector() {
  const [showLoading, setShowLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Skip loading for search engines
    const isSearchEngine =
      /bot|crawler|spider|googlebot|bingbot|yahoo|baidu/i.test(
        window.navigator.userAgent
      );

    // For testing - Always show loading screen (except for search engines)
    if (!isSearchEngine) {
      // Force a small delay to ensure it's visible
      setShowLoading(true);
    }
  }, []);
  // Only render the loading screen, no content wrapping
  if (!isMounted || !showLoading) {
    return null;
  }

  return (
    <>
      
      <LoadingScreen
        onComplete={() => {
          setShowLoading(false);
        }}
      />
    </>
  );
}
