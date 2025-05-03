import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { MAIN_SERVICES } from "@/lib/services-data";
import { GradientButton } from "@/components/ui/gradient-button";
import GradientTitle from "@/components/ui/gradient-title";
import { NextSeo } from "next-seo";
import Head from "next/head";
import Script from "next/script";

export const metadata = {
  title: "Services | GGW Capital",
  description:
    "Explore our comprehensive range of services tailored to meet your real estate and business needs in the UAE.",
  openGraph: {
    title: "Services | GGW Capital",
    description:
      "Explore our comprehensive range of services tailored to meet your real estate and business needs in the UAE.",
    url: "https://ggwcapitalre.com/services",
  },
};
export default function ServicesPage() {
  return (
    <>
        <Script
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: `{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "GGW Capital Services",
  "url": "https://ggwcapitalre.com/services",
  "description": "Comprehensive real estate services from GGW Capital, including off-plan investments, ready homes, rentals, consulting, and management in the UAE.",
  "mainEntity": [
    {
      "@type": "Service",
      "name": "Off-Plan Projects",
      "description": "Secure your investment in Dubai's future with our exclusive off-plan projects offering high ROI potential and customization options.",
      "url": "https://ggwcapitalre.com/off-plan",
      "provider": {
        "@type": "RealEstateAgent",
        "name": "GGW Capital"
      }
    },
    {
      "@type": "Service",
      "name": "Ready-to-Move-In Properties",
      "description": "Find your perfect home that's ready for immediate occupancy in Dubai's most sought-after neighborhoods with no waiting periods.",
      "url": "https://ggwcapitalre.com/buy",
      "provider": {
        "@type": "RealEstateAgent",
        "name": "GGW Capital"
      }
    },
    {
      "@type": "Service",
      "name": "Rental Solutions",
      "description": "Discover our premium rental properties with flexible terms, full furnishing options, and comprehensive management services.",
      "url": "https://ggwcapitalre.com/rent",
      "provider": {
        "@type": "RealEstateAgent",
        "name": "GGW Capital"
      }
    },
    {
      "@type": "Service",
      "name": "Investment Consulting",
      "description": "Our expert advisors provide tailored investment strategies based on in-depth market analysis to maximize your returns.",
      "url": "https://ggwcapitalre.com/services/investment",
      "provider": {
        "@type": "RealEstateAgent",
        "name": "GGW Capital"
      }
    },
    {
      "@type": "Service",
      "name": "Property Management",
      "description": "Let us handle every aspect of your property management, from tenant acquisition to maintenance and financial reporting.",
      "url": "https://ggwcapitalre.com/services/real-estate",
      "provider": {
        "@type": "RealEstateAgent",
        "name": "GGW Capital"
      }
    }
  ]
}
`,
          }}
        />
      <main className="min-h-screen pt-48 bg-black text-white">
        <Navbar />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl heading-1 md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Our <GradientTitle element="span">Services</GradientTitle>
            </h1>
            <p className="text-lg text-white/80">
              Comprehensive solutions for all your real estate and business
              needs in the UAE.
            </p>
          </div>

          <div className="space-y-24">
            {MAIN_SERVICES.map((service, index) => (
              <div
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:grid-flow-dense" : ""}`}
              >
                <div className={`${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                  <div className="bg-[#D4AF37]/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mb-6">
                    {service.icon}
                  </div>

                  <h2 className="text-3xl font-bold heading-2 text-white mb-4">
                    {service.title}
                  </h2>
                  <p className="text-white/80 mb-6">{service.description}</p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="rounded-full bg-[#D4AF37]/20 p-1 mt-1">
                          <div className="w-2 h-2 rounded-full bg-[#D4AF37]"></div>
                        </div>
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={`relative h-[400px] rounded-xl overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.15)] ${index % 2 === 1 ? "lg:col-start-1" : ""}`}
                >
                  <Image
                    src={service.image || "/placeholder.jpg"}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="my-24 bg-black border border-[#D4AF37]/20 rounded-xl p-8 md:p-12 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Need a Custom Solution?
                </h2>
                <p className="text-white/80 mb-6">
                  Our team of experts is ready to create a tailored package to
                  meet your specific requirements. Contact us today for a
                  personalized consultation.
                </p>
                <Link href="/contact">
                  <GradientButton>Get in Touch</GradientButton>
                </Link>
              </div>

              <div className="relative h-[300px] rounded-xl overflow-hidden">
                <Image
                  src="/images/custom-solutions.png"
                  alt="Custom Solutions"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Personalized Service
                    </h3>
                    <p className="text-white/80">
                      Tailored to your unique requirements
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
