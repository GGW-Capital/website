import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface StaticMapProps {
  googleMapsUrl?: string;
  locationName: string;
}

export default function StaticMap({
  googleMapsUrl,
  locationName,
}: StaticMapProps) {
  // Default image based on location name
  const getNeighborhoodImage = (name: string) => {
    const lowerName = name.toLowerCase();

    if (lowerName.includes("marina") || lowerName.includes("jbr")) {
      return "/images/dubai-map.svg";
    } else if (lowerName.includes("downtown")) {
      return "/images/dubai-map.svg";
    } else if (lowerName.includes("palm") || lowerName.includes("jumeirah")) {
      return "/images/dubai-map.svg";
    } else {
      // Default map image
      return "/images/dubai-map.svg";
    }
  };

  // Get map image based on name
  const mapImage = getNeighborhoodImage(locationName);

  // Use provided Google Maps URL or create a generic search URL
  const mapsUrl =
    googleMapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationName)}`;

  return (
    <div className="w-full h-full rounded-lg overflow-hidden relative bg-[#121212] flex flex-col items-center justify-center text-center">
      <div className="absolute inset-0 opacity-30">
        <Image
          src={mapImage}
          alt={`Map of ${locationName}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center p-8 bg-black/60 backdrop-blur-sm rounded-lg">
        <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mb-4">
          <MapPin className="h-8 w-8 text-[#D4AF37]" />
        </div>

        <h3 className="text-2xl font-bold text-white mb-2">{locationName}</h3>
        <p className="text-white/70 mb-6">Prestigious Dubai Neighborhood</p>

        <Link
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#D4AF37] text-black px-6 py-3 rounded-md font-medium hover:bg-[#D4AF37]/90 transition-colors"
        >
          View on Google Maps
        </Link>
      </div>
    </div>
  );
}
