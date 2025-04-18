import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { GradientButton } from "@/components/ui/gradient-button"
import { EXCLUSIVE_SERVICES } from "@/lib/services-data"
import GradientTitle from "./ui/gradient-title"
import ClientCarouselControls from "./client-carousel-controls"

export default function ExclusiveServices() {
  // Function to render a service card
  const renderServiceCard = (service: any, index: number) => {
    return (
      <div
        key={service.id}
        className="carousel-item px-2"
        data-index={index}
        style={{ display: index < 3 ? "block" : "none" }}
      >
        <div
          className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-500 group h-full"
          data-taos-offset="100"
          data-taos="fade-up"
        >
          <div className="relative h-48">
            <Image
              src={service.image || "/placeholder.jpg"}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute transition-transform duration-700 inset-0 bg-gradient-to-t group-hover:scale-105 from-black/80 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                <span className="text-[#D4AF37]">{service.title.split(" ")[0]}</span>{" "}
                {service.title.split(" ").slice(1).join(" ")}
              </h3>
              <p className="text-white/70 text-sm italic">"{service.tagline}"</p>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-4">
              <h4 className="text-white font-semibold mb-2">Key Benefits</h4>
              <ul className="space-y-2">
                {service.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-start gap-2 text-white/70 text-sm">
                    <span className="text-[#D4AF37] mt-0.5">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-24 bg-gradient-to-b from-[#050505] to-black">
      <div className="container mx-auto px-4">
        <div
          className="max-w-4xl mx-auto text-center mb-16"
          data-taos="fade-up"
        >
          <h2 className="text-3xl md:text-5xl font-bold heading-2 mb-6 text-white">
            Our <GradientTitle element="span">Services</GradientTitle>
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37]/60 mx-auto mb-6"></div>
          <p className="text-lg text-white/80">
            Premium real estate services tailored to meet the needs of our discerning clients
          </p>
        </div>

        <div id="exclusive-services-carousel" className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {EXCLUSIVE_SERVICES.map((service, index) => renderServiceCard(service, index))}
          </div>
          
          {/* Client-side carousel controls */}
          <ClientCarouselControls
            totalItems={EXCLUSIVE_SERVICES.length}
            itemsPerView={3}
            carouselId="exclusive-services-carousel"
            autoPlay={true}
            interval={5000}
          />
        </div>
        
        <div className="flex justify-center mt-12" data-taos="fade-up" data-taos-offset="50">
          <Link href="/services">
            <GradientButton 
              variant="outline" 
              size="xl" 
              className="group"
            >
              Explore All Services
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </GradientButton>
          </Link>
        </div>
      </div>
    </section>
  );
}