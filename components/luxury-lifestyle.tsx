"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { GradientButton } from "./ui/gradient-button";
import { urlFor, getAllProperties, getLifestyles, client } from "@/lib/sanity";
import GradientTitle from "./ui/gradient-title";

// Default image paths for lifestyle categories
const defaultImagePaths = {
  beachfront: "/images/waterfront-living.avif",
  urban: "/images/urban-sophistication.avif",
  luxury: "/images/private-estates.avif",
  family: "/images/waterfront-living.avif", // Placeholder
  investment: "/images/urban-sophistication.avif" // Placeholder
};

// Define the lifestyle category type
interface LifestyleCategory {
  id: string;
  title: string;
  description: string;
  searchParams: string;
  buttonText: string;
  lifestyle: string;
  image?: any; // Optional Sanity image reference
}

// Default lifestyle categories until we load from Sanity
const defaultLifestyleCategories: LifestyleCategory[] = [
  {
    id: "beachfront",
    title: "Waterfront Living",
    description: "Experience breathtaking views and direct beach access with our exclusive collection of waterfront properties in Palm Jumeirah and Dubai Marina.",
    searchParams: "location=Palm%20Jumeirah&lifestyle=beachfront",
    buttonText: "Explore Waterfront Properties",
    lifestyle: "beachfront",
  },
  {
    id: "urban",
    title: "Urban Sophistication",
    description: "Discover luxury high-rise living in Downtown Dubai and Business Bay with stunning views of the Burj Khalifa and access to world-class shopping and dining.",
    searchParams: "location=Downtown&lifestyle=urban",
    buttonText: "Explore Urban Properties",
    lifestyle: "urban",
  },
  {
    id: "luxury",
    title: "Private Estates",
    description: "Indulge in the ultimate privacy with our exclusive villas and mansions in Emirates Hills and Al Barari, featuring expansive gardens and bespoke amenities.",
    searchParams: "category=villa&lifestyle=luxury",
    buttonText: "Explore Private Estates",
    lifestyle: "luxury",
  }
];

export default function LuxuryLifestyle() {
  const [lifestyleImages, setLifestyleImages] = useState<{[key: string]: string}>({});
  const [lifestyleCategories, setLifestyleCategories] = useState<LifestyleCategory[]>(defaultLifestyleCategories);

  useEffect(() => {
    // Fetch lifestyle data from Sanity
    async function fetchLifestyleData() {
      try {
        // Get lifestyle options from Sanity (exclude "All" option)
        const lifestyleOptions = await getLifestyles(false);
        
        if (lifestyleOptions && lifestyleOptions.length > 0) {
          // Fetch additional data for each lifestyle
          const query = `*[_type == "lifestyle"] {
            _id,
            title,
            "value": value.current,
            description,
            image
          }`;
          
          const lifestylesData = await client.fetch(query);
          
          if (lifestylesData && lifestylesData.length > 0) {
            // Limit to max 3 featured lifestyles (for grid layout)
            const featuredLifestyles = lifestylesData.slice(0, 3);
            
            // Create formatted lifestyle categories
            const formattedCategories = featuredLifestyles.map((lifestyle: any) => {
              // Use default descriptions if not available in Sanity
              const defaultCategory = defaultLifestyleCategories.find(
                cat => cat.lifestyle === lifestyle.value
              );
              
              return {
                id: lifestyle.value || lifestyle._id,
                title: lifestyle.title || "",
                description: lifestyle.description || (defaultCategory ? defaultCategory.description : ""),
                searchParams: `lifestyle=${lifestyle.value || lifestyle._id}`,
                buttonText: `Explore ${lifestyle.title} Properties`,
                lifestyle: lifestyle.value,
                image: lifestyle.image // Will be used if available
              };
            });
            
            // If we have at least one lifestyle, update the state
            if (formattedCategories.length > 0) {
              setLifestyleCategories(formattedCategories);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching lifestyle data:', error);
        // Keep the default lifestyle categories
      }
    }
    
    // Fetch images for the lifestyle categories
    async function fetchLifestyleImages() {
      try {
        const images: {[key: string]: string} = {};
        
        // For each lifestyle category, fetch a property with that lifestyle for its image
        for (const category of lifestyleCategories) {
          // Check if the category has a Sanity image already
          if (category.image) {
            images[category.id] = urlFor(category.image).url();
            continue;
          }
          
          // Otherwise get an image from a property with this lifestyle
          const properties = await getAllProperties({ lifestyle: category.lifestyle, limit: 1 });
          
          if (properties && properties.length > 0 && properties[0].mainImage) {
            images[category.id] = urlFor(properties[0].mainImage).url();
          } else {
            // Fallback to default image
            images[category.id] = defaultImagePaths[category.lifestyle as keyof typeof defaultImagePaths] || 
                                  defaultImagePaths.luxury;
          }
        }
        
        setLifestyleImages(images);
      } catch (error) {
        console.error('Error fetching lifestyle images:', error);
        
        // Set default images if there's an error
        const defaultImages: {[key: string]: string} = {};
        lifestyleCategories.forEach(category => {
          defaultImages[category.id] = defaultImagePaths[category.lifestyle as keyof typeof defaultImagePaths] || 
                                       defaultImagePaths.luxury;
        });
        
        setLifestyleImages(defaultImages);
      }
    }
    
    // First fetch lifestyle data, then fetch corresponding images
    fetchLifestyleData().then(() => {
      fetchLifestyleImages();
    });
  }, []); // Run only once on component mount

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold heading-2 mb-6 text-white">
            Experience <GradientTitle element="span">Luxury</GradientTitle> Lifestyle
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37]/60 mx-auto mb-6"></div>
          <p className="text-lg text-white/80">
            Discover the epitome of luxury living in Dubai's most prestigious
            communities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {lifestyleCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 * (index + 1) }}
              className="group"
            >
              <div className="relative h-[500px] overflow-hidden rounded-xl">
                <Image
                  src={lifestyleImages[category.id] || defaultImagePaths[category.lifestyle as keyof typeof defaultImagePaths] || defaultImagePaths.luxury}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-white/80 mb-6">
                    {category.description}
                  </p>
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
            </motion.div>
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
