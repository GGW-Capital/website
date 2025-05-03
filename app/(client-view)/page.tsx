import Hero from "@/components/hero";
import ExploreNeighborhoods from "@/components/explore-neighborhoods";
import WhyChooseUs from "@/components/why-choose-us";
import FeaturedPropertiesSection from "@/components/featured-properties-section";
import FeaturedProjectsSection from "@/components/featured-projects-section";
import TestimonialsSection from "@/components/testimonials-section";
import ExclusiveServices from "@/components/exclusive-services";
import LuxuryLifestyle from "@/components/luxury-lifestyle";
import FAQSection from "@/components/faq-section";
import { Metadata } from "next";
import ClientVisitDetector from "@/components/client-visit-detector";
import SchemaJsonLd from "@/components/schema-json-ld";
import { generateOrganizationJsonLd } from "@/lib/seo/json-ld";

// Enhanced SEO metadata for the homepage
export const metadata: Metadata = {
  title: "GGW Capital | Exclusive Luxury Real Estate in UAE",
  description:
    "Explore luxury villas, apartments, and penthouses in the UAE with GGW Capital—handpicked for quality, prestige, and investment value.",
  alternates: {
    canonical: "https://ggwpcapitalre.com",
  },
  openGraph: {
    title: "GGW Capital | Premium Luxury Real Estate in UAE",
    description:
      "Browse our exclusive collection of luxury properties in the UAE. Find your dream home in the most prestigious locations of Dubai, Abu Dhabi and beyond.",
    images: [
      {
        url: "/images/ggw-capital-logo.webp",
        width: 1200,
        height: 630,
        alt: "GGW Capital Luxury Properties",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GGW Capital | Luxury Real Estate",
    description:
      "Explore premium luxury properties across the UAE with GGW Capital, your trusted real estate partner.",
    images: ["/images/ggw-capital-logo.webp"],
  },
  
};
export const revalidate = 60;
export default function Home() {
  return (
    <>
          <SchemaJsonLd data={generateOrganizationJsonLd()} />
      <div className="loading-screen-placeholder z-[100099] bg-black fixed inset-0 w-screen h-[200vh]"></div>
      {/* Loading screen overlay - independent of content */}
      <ClientVisitDetector />
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
    </>
  );
}
