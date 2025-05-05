import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, Phone, MapPin } from "lucide-react";
import GradientTitle from "@/components/ui/gradient-title";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col font-sans">
      {/* Header */}
      <div className="hidden md:block py-5 transition-all border-b border-[#D4AF37]/10 duration-300 bg-transparent">
        <div className="container relative mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-6 text-sm text-white/70 font-medium">
            <a
              href="tel:+971526925562"
              className="flex items-center hover:text-[#D4AF37] transition-colors"
            >
              <Phone className="h-4 w-4 mr-2" />
              +971 52 692 5562
            </a>
            <a
              href="mailto:info@ggwcapitalre.com"
              className="flex items-center hover:text-[#D4AF37] transition-colors"
            >
              <Mail className="h-4 w-4 mr-2" />
              info@ggwcapitalre.com
            </a>
          </div>
          
          <div className="flex items-center">
            <a
              href="https://maps.app.goo.gl/URZeDftHMxVpZTCL7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white/70 hover:text-[#D4AF37] transition-colors text-sm font-medium"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Clover Bay Tower - Office 1912 - 19th floor - Business Bay - Dubai
              - UAE
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
        <Image
            src="/images/ggw-capital-logo.svg"
            alt="GGW Capital"
            width={150}
            height={50}
            className="object-contain mx-auto w-max block mb-20 mt-10"
          />
          <div className="mb-6">
            <div className="h-1 w-32 bg-ggw-gradient mx-auto"></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif mb-4 tracking-tight">
            <GradientTitle element="span">COMING</GradientTitle>
            <span className="text-white"> SOON</span>
          </h1>

          <h2 className="text-xl md:text-2xl text-white font-serif mb-8">
            <GradientTitle element="span">LUXURY</GradientTitle> REAL ESTATE
            EXPERIENCE
          </h2>

          <div className="h-1 w-48 bg-ggw-gradient mx-auto mb-10"></div>

          <p className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            We're enhancing our digital experience to better serve your luxury
            real estate needs. Our website is currently under development to
            bring you an exceptional browsing experience.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-5">
            <div className="flex items-center justify-center w-full md:w-auto">
              <div className="bg-black border-2 border-ggw-darkGold rounded-lg p-6 w-full md:w-auto">
                <div className="flex items-center justify-center gap-4">
                  <Clock className="h-8 w-8 text-ggw-darkGold" />
                  <div className="text-left">
                    <p className="text-white/80 text-sm leading-none">Estimated Launch</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto py-6 px-4 md:px-6 border-t border-ggw-gold/30">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col justify-between w-full md:flex-row items-center gap-2 md:gap-6 mb-4 md:mb-0">
            <p className="text-white text-sm">
              © {new Date().getFullYear()} GGW Capital. All rights reserved.
            </p>
            <p className="text-white text-sm">
              Website by{" "}
              <Link
                href="https://dynamicord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-transparent bg-clip-text bg-ggw-gradient decoration-ggw-darkGold font-semibold hover:underline transition-colors"
              >
                Dynamicord
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
