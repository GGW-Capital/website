import HeroSearch from "@/components/hero-search";
import GradientTitle from "./ui/gradient-title";
import { ScrollIndicator } from "./scroll-indicator";

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-24 md:pt-32">
      <div className="absolute inset-0 z-0">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="/videos/ggw-capital-website-background.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/90"></div>
      </div>

      <div className="container mx-auto px-4 z-10 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="relative">
            <h1 className="heading-1 mb-6 text-white leading-tight">
              <GradientTitle element="span">Luxury</GradientTitle> Living in the{" "}
              <GradientTitle element="span">UAE</GradientTitle>
            </h1>

            {/* Elegant line decoration */}
            <div className="h-[3px] bg-ggw-gradient w-[120px] mx-auto" />
          </div>

          <p className="text-xl md:text-2xl text-white/90 my-8 font-medium">
            Discover exclusive properties in the most prestigious locations
          </p>

          {/* Client component for interactive search */}
          <HeroSearch />

          <div className="mt-12 text-center">
            <p className="text-white/80 text-sm font-medium">
              <span className="text-ggw-gold font-semibold">Trending:</span>{" "}
              <a
                href="/buy?location=Palm%20Jumeirah&lifestyle=luxury"
                className="hover:text-ggw-gold transition-colors"
              >
                Luxury Villas in Palm Jumeirah
              </a>{" "}
              |{" "}
              <a
                href="/buy?category=penthouse&location=Dubai%20Marina"
                className="hover:text-ggw-gold transition-colors"
              >
                Penthouses in Dubai Marina
              </a>{" "}
              |{" "}
              <a
                href="/off-plan?location=Downtown"
                className="hover:text-ggw-gold transition-colors"
              >
                New Developments in Downtown
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Server component for scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <ScrollIndicator elementId="featured-properties" />
      </div>
    </section>
  );
}
