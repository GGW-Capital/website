import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientButton } from "./ui/gradient-button";
import { urlFor, getLifestyles, client } from "@/lib/sanity";
import GradientTitle from "./ui/gradient-title";

// Define the lifestyle category type
interface LifestyleCategory {
  id: string;
  title: string;
  description: string;
  searchParams: string;
  buttonText: string;
  lifestyle: string;
  image?: string;
}

// Default lifestyle categories
const defaultLifestyleCategories: LifestyleCategory[] = [
  {
    id: "beachfront",
    title: "Waterfront Living",
    description:
      "Experience breathtaking views and direct beach access with our exclusive collection of waterfront properties in Palm Jumeirah and Dubai Marina.",
    searchParams: "location=Palm%20Jumeirah&lifestyle=beachfront",
    buttonText: "Explore Waterfront Properties",
    lifestyle: "beachfront",
  },
  {
    id: "urban",
    title: "Urban Sophistication",
    description:
      "Discover luxury high-rise living in Downtown Dubai and Business Bay with stunning views of the Burj Khalifa and access to world-class shopping and dining.",
    searchParams: "location=Downtown&lifestyle=urban",
    buttonText: "Explore Urban Properties",
    lifestyle: "urban",
  },
  {
    id: "luxury",
    title: "Private Estates",
    description:
      "Indulge in the ultimate privacy with our exclusive villas and mansions in Emirates Hills and Al Barari, featuring expansive gardens and bespoke amenities.",
    searchParams: "category=villa&lifestyle=luxury",
    buttonText: "Explore Private Estates",
    lifestyle: "luxury",
  },
];

export default async function LuxuryLifestyle() {
  let lifestyleCategories = defaultLifestyleCategories;

  try {
    const lifestyleOptions = await getLifestyles(false);
    if (lifestyleOptions?.length > 0) {
      const query = `*[_type == "lifestyle"] {
        _id,
        title,
        "value": value.current,
        description,
        "image": image.asset->url
      }`;

      const lifestylesData = await client.fetch(query);

      if (lifestylesData?.length > 0) {
        lifestyleCategories = lifestylesData.slice(0, 3).map((lifestyle: any) => ({
          id: lifestyle.value || lifestyle._id,
          title: lifestyle.title || "",
          description: lifestyle.description,
          searchParams: `lifestyle=${lifestyle.value || lifestyle._id}`,
          buttonText: `Explore ${lifestyle.title} Properties`,
          lifestyle: lifestyle.value,
          image: lifestyle.image,
        }));
      }
    }
  } catch (error) {
    console.error("Error fetching lifestyle data:", error);
  }

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold heading-2 mb-6 text-white">
            Experience <GradientTitle element="span">Luxury</GradientTitle> Lifestyle
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37]/60 mx-auto mb-6"></div>
          <p className="text-lg text-white/80">
            Discover the epitome of luxury living in Dubai's most prestigious communities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {lifestyleCategories.map((category) => (
            <div key={category.id} className="group">
              <div className="relative h-[500px] overflow-hidden rounded-xl">
                {category.image && (
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-white/80 mb-6">{category.description}</p>
                  <Link href={`/buy?${category.searchParams}`}>
                    <Button
                      variant="outline"
                      className="border-[#D4AF37] text-[#D4AF37] hover:text-primary hover:bg-[#D4AF37]/10"
                    >
                      {category.buttonText}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/buy">
            <GradientButton className="md:py-7 md:px-7 md:text-lg">
              Explore All Properties <ArrowRight className="h-5 w-5" />
            </GradientButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
