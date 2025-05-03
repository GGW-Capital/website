import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import FAQSection from "@/components/faq-section";
import { Metadata } from "next";
import { getFAQs } from "@/lib/sanity";
import SchemaJsonLd from "@/components/schema-json-ld";
import { generateFAQSchema } from "@/lib/seo/faq-schema";
import GradientTitle from "@/components/ui/gradient-title";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | GGW Capital",
  description:
    "Find answers to common questions about our luxury real estate services, property buying process, investments, and more.",
  alternates: {
    canonical: "https://ggwcapitalre.com/faq",
  },
};
export const revalidate = 60; // Revalidate every 60 seconds

export default async function FAQPage() {
  // Fetch all FAQs from Sanity
  const allFaqs = await getFAQs();

  return (
    <>
      <SchemaJsonLd data={generateFAQSchema(allFaqs)} />

      <main className="min-h-screen bg-black text-white">
        <Navbar />

        {/* Hero section */}
        <div className="relative pt-48 pb-16 md:pb-24 bg-gradient-to-b from-[#171717] to-black overflow-hidden">
          <div className="relative container mx-auto px-4">
            <h1 className="text-4xl text-white md:text-5xl lg:text-6xl font-semibold heading-1 text-center mb-6">
              Frequently Asked{" "}
              <GradientTitle element="span">Questions</GradientTitle>
            </h1>
            <p className="text-gray-300 text-center max-w-3xl mx-auto text-lg">
              Get answers to the most common questions about our luxury real
              estate services, properties, and investment opportunities in the
              UAE market.
            </p>
          </div>
        </div>

        <div className="container mx-auto pb-16 px-4">
          {/* Single FAQ section with all FAQs */}
          <FAQSection
            showMoreLink={false}
            maxFaqs={100} // Show all FAQs
          />
        </div>

      </main>
    </>
  );
}
