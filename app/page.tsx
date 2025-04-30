import Hero from "@/components/hero"
import ExploreNeighborhoods from "@/components/explore-neighborhoods"
import WhyChooseUs from "@/components/why-choose-us"
import FeaturedPropertiesSection from "@/components/featured-properties-section"
import FeaturedProjectsSection from "@/components/featured-projects-section"
import TestimonialsSection from "@/components/testimonials-section"
import ExclusiveServices from "@/components/exclusive-services"
import LuxuryLifestyle from "@/components/luxury-lifestyle"
import FAQSection from "@/components/faq-section"
import { Metadata } from "next"

// Enhanced SEO metadata for the homepage
export const metadata: Metadata = {
  title: 'GGW Capital | Exclusive Luxury Real Estate in UAE',
  description: 'Discover exclusive luxury properties in the UAE with GGW Capital. Our handpicked selection of premium villas, apartments, and penthouses in Dubai, Abu Dhabi, and beyond offers unmatched quality and investment value.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'GGW Capital | Premium Luxury Real Estate in UAE',
    description: 'Browse our exclusive collection of luxury properties in the UAE. Find your dream home in the most prestigious locations of Dubai, Abu Dhabi and beyond.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GGW Capital Luxury Properties',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GGW Capital | Luxury Real Estate',
    description: 'Explore premium luxury properties across the UAE with GGW Capital, your trusted real estate partner.',
    images: ['/og-image.jpg'],
  },
}
export let revalidate = 60 * 5;
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <div className="space-y-16 md:space-y-24">
        <FeaturedPropertiesSection />
        <FeaturedProjectsSection />
        <ExploreNeighborhoods />
        <LuxuryLifestyle />
        <ExclusiveServices />
        <WhyChooseUs />
        <TestimonialsSection />
        <FAQSection withTitle showMoreLink={true} maxFaqs={6} />
      </div>
    </main>
  )
}
