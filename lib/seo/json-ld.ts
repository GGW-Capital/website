import { urlFor } from "../sanity";

/**
 * Generate JSON-LD schema for a property listing
 */
export function generatePropertyJsonLd(property: any) {
  if (!property) return null;

  // Format price
  const price = property.price
    ? {
        price: property.price,
        priceCurrency: "AED",
      }
    : {};

  // Main image URL
  const mainImageUrl = property.mainImage
    ? urlFor(property.mainImage).width(1200).height(800).url()
    : null;

  // All image URLs
  const imageUrls = [];
  if (mainImageUrl) {
    imageUrls.push(mainImageUrl);
  }

  if (property.images && property.images.length > 0) {
    property.images.forEach((img: any) => {
      if (img) {
        const imgUrl = urlFor(img).width(1200).height(800).url();
        if (imgUrl) imageUrls.push(imgUrl);
      }
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.description,
    ...price,
    image: imageUrls.length > 0 ? imageUrls : undefined,
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://ggwcapitalre.com"}/properties/${property.slug?.current || ""}`,
    datePosted: property._createdAt || new Date().toISOString(),
    validUntil: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    ).toISOString(),
    propertyType: property.type || property.category,
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    floorSize: property.area
      ? {
          "@type": "QuantitativeValue",
          value: property.area,
          unitCode: "FTK", // Square Feet
        }
      : undefined,
    offers: {
      "@type": "Offer",
      ...price,
      availability: "https://schema.org/InStock",
      validFrom: property._createdAt || new Date().toISOString(),
    },
    geo: property.coordinates
      ? {
          "@type": "GeoCoordinates",
          latitude: property.coordinates.lat,
          longitude: property.coordinates.lng,
        }
      : undefined,
    address: {
      "@type": "PostalAddress",
      addressRegion: "Dubai",
      addressCountry: "AE",
      addressLocality:
        property.location ||
        property.neighborhood?.name ||
        property.neighborhoodName ||
        undefined,
    },
    // Include project information if available
    containedInPlace: property.project
      ? {
          "@type": "Residence",
          name: property.projectName || property.project.title || undefined,
        }
      : undefined,
  };
}

/**
 * Generate JSON-LD schema for a real estate project
 */
export function generateProjectJsonLd(project: any) {
  if (!project) return null;

  // Main image URL
  const mainImageUrl = project.mainImage
    ? urlFor(project.mainImage).width(1200).height(800).url()
    : null;

  // All image URLs
  const imageUrls = [];
  if (mainImageUrl) {
    imageUrls.push(mainImageUrl);
  }

  if (project.images && project.images.length > 0) {
    project.images.forEach((img: any) => {
      if (img) {
        const imgUrl = urlFor(img).width(1200).height(800).url();
        if (imgUrl) imageUrls.push(imgUrl);
      }
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: project.title,
    description: project.description,
    image: imageUrls.length > 0 ? imageUrls : undefined,
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://ggwcapitalre.com"}/projects/${project.slug?.current || ""}`,
    address: {
      "@type": "PostalAddress",
      addressRegion: "Dubai",
      addressCountry: "AE",
      addressLocality:
        project.location ||
        project.neighborhood?.name ||
        project.neighborhoodName ||
        undefined,
    },
    geo: project.coordinates
      ? {
          "@type": "GeoCoordinates",
          latitude: project.coordinates.lat,
          longitude: project.coordinates.lng,
        }
      : undefined,
    publicAccess: true,
    amenityFeature: project.amenities
      ? project.amenities.map((amenity: string) => ({
          "@type": "LocationFeatureSpecification",
          name: amenity,
        }))
      : undefined,
    // Include developer information if available
    provider: project.developer
      ? {
          "@type": "Organization",
          name: project.developer.name || project.developer,
        }
      : undefined,
  };
}

/**
 * Generate JSON-LD schema for organization
 */
export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "GGW Capital",
    description:
      "Premier luxury real estate consultancy in the UAE, specializing in exclusive property investment opportunities.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://ggwcapitalre.com",
    logo: `https://ggwcapitalre.com/images/ggw-capital-logo.webp`,
    sameAs: [
      "https://www.facebook.com/profile.php?id=61565948621617",
      "https://www.instagram.com/ggwcapital",
      "https://www.linkedin.com/company/ggw-capital-real-estate-brokerage",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Downtown Dubai",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      postalCode: "00000",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.204849,
      longitude: 55.270783,
    },
    telephone: "+971 4 000 0000",
    email: "info@ggwcapitalre.com",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "10:00",
        closes: "16:00",
      },
    ],
    areaServed: [
      {
        "@type": "City",
        name: "Dubai",
      },
      {
        "@type": "City",
        name: "Abu Dhabi",
      },
    ],
    makesOffer: {
      "@type": "Offer",
      itemOffered: [
        {
          "@type": "Service",
          name: "Property Sales",
          description: "Luxury property sales services in the UAE",
        },
        {
          "@type": "Service",
          name: "Property Rentals",
          description: "Premium property rental services in the UAE",
        },
        {
          "@type": "Service",
          name: "Off-Plan Investments",
          description: "Expert guidance for off-plan property investments",
        },
        {
          "@type": "Service",
          name: "Real Estate Consulting",
          description:
            "Professional real estate investment consulting services",
        },
      ],
    },
  };
}

/**
 * Generate JSON-LD schema for blog articles
 */
export function generateBlogJsonLd(blog: any) {
  if (!blog) return null;

  // Main image URL
  const mainImageUrl = blog.mainImage
    ? urlFor(blog.mainImage).width(1200).height(800).url()
    : null;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt || blog.description,
    image: mainImageUrl,
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://ggwcapitalre.com"}/blogs/${blog.slug?.current || ""}`,
    datePublished: blog.publishedAt || blog._createdAt,
    dateModified: blog._updatedAt,
    author: {
      "@type": "Person",
      name: blog.author || "GGW Capital",
    },
    publisher: {
      "@type": "Organization",
      name: "GGW Capital",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://ggwcapitalre.com"}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_BASE_URL || "https://ggwcapitalre.com"}/blogs/${blog.slug?.current || ""}`,
    },
  };
}

/**
 * Generate JSON-LD schema for FAQs
 */
export function generateFAQJsonLd(
  faqs: Array<{ question: string; answer: string }>
) {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text:
          typeof faq.answer === "string"
            ? faq.answer
            : "See our website for detailed answer.",
      },
    })),
  };
}

/**
 * Generate FAQ schema from Sanity data
 */
export function generateFAQSchema(faqs: any[]) {
  if (!faqs || faqs.length === 0) return null;

  // Convert block content to text for schema
  const processedFaqs = faqs.map((faq) => {
    // Handle case where answer is a block content array
    let answerText = "";
    if (typeof faq.answer === "string") {
      answerText = faq.answer;
    } else if (Array.isArray(faq.answer)) {
      // Simple extraction of text from block content
      answerText = faq.answer
        .filter((block: any) => block._type === "block")
        .map((block: any) =>
          block.children
            .filter((child: any) => child._type === "span")
            .map((span: any) => span.text)
            .join("")
        )
        .join(" ");
    }

    return {
      question: faq.question,
      answer: answerText || "See our website for detailed answer.",
    };
  });

  return generateFAQJsonLd(processedFaqs);
}
