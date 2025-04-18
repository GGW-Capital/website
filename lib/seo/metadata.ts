import type { Metadata } from 'next'
import { urlFor } from '../sanity'

/**
 * Base metadata that will be used across all pages
 */
export const baseMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://ggwcapital.com'),
  title: {
    template: '%s | GGW Capital Luxury Real Estate',
    default: 'GGW Capital | Exclusive Luxury Real Estate in UAE',
  },
  description: 'Discover exclusive luxury properties in the UAE with GGW Capital. Find premium villas, apartments, and penthouses for sale, rent, and off-plan investments in Dubai, Abu Dhabi, and beyond.',
  keywords: [
    'luxury real estate', 
    'properties UAE', 
    'premium villas', 
    'luxury apartments', 
    'Dubai properties', 
    'Abu Dhabi real estate', 
    'investment properties', 
    'waterfront homes',
    'exclusive penthouses',
    'off-plan investments',
    'Dubai luxury market',
    'UAE property consultants'
  ],
  authors: [{ name: 'GGW Capital' }],
  creator: 'GGW Capital',
  publisher: 'GGW Capital',
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'GGW Capital Luxury Real Estate',
    title: 'GGW Capital | Exclusive Luxury Real Estate in UAE',
    description: 'Discover exclusive luxury properties in the UAE with GGW Capital. Find premium villas, apartments, and penthouses for sale, rent, and off-plan investments.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'GGW Capital Luxury Real Estate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GGW Capital | Exclusive Luxury Real Estate',
    description: 'Discover exclusive luxury properties in the UAE with GGW Capital. Premium villas, apartments, and penthouses.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'google-site-verification-code', // Replace with actual verification code when available
  },
  category: 'real estate',
}

/**
 * Generate dynamic metadata for property pages
 */
export function generatePropertyMetadata(property: any): Metadata {
  if (!property) return baseMetadata;

  // Format price for SEO description
  const formattedPrice = property.price 
    ? `AED ${new Intl.NumberFormat('en-US').format(property.price)}` 
    : "Price on Request";

  // Create property-specific description
  const bedroomText = property.bedrooms ? `${property.bedrooms} bedroom` : "";
  const bathroomText = property.bathrooms ? `${property.bathrooms} bathroom` : "";
  const locationText = property.location ? `in ${property.location}` : "";
  const areaText = property.area ? `${property.area} sq.ft.` : "";
  
  // Create a rich, keyword-optimized description
  const propertyTypeDesc = property.type || property.category || "luxury property";
  const description = `Exclusive ${propertyTypeDesc} ${bedroomText} ${bathroomText} ${locationText}. ${areaText} of luxury living space priced at ${formattedPrice}. Contact GGW Capital for this premier real estate opportunity in the UAE.`;

  // Generate dynamic image URL
  const imageUrl = property.mainImage ? urlFor(property.mainImage).width(1200).height(630).url() : '/og-image.jpg';
  
  // Get canonical URL for this property
  const canonicalUrl = `/properties/${property.slug?.current || ''}`;

  // Build keywords based on property data
  const keywords = [
    `${property.type || property.category || 'luxury property'} in UAE`,
    `${property.location} real estate`,
    `${property.bedrooms ? property.bedrooms + ' bedroom ' : ''}${propertyTypeDesc}`,
    `luxury ${propertyTypeDesc} in ${property.location || 'UAE'}`,
    `${property.status || 'luxury'} property`,
    property.developer?.name || property.developer || 'luxury developer',
    property.neighborhood?.name || property.neighborhoodName || 'exclusive neighborhood',
    property.marketType === 'off-plan' ? 'off-plan investment' : 'ready property',
    property.lifestyle?.name || property.lifestyleTitle || 'luxury lifestyle',
  ].filter(Boolean);

  return {
    ...baseMetadata,
    title: `${property.title} | ${formattedPrice}`,
    description: description.trim(),
    keywords: [...baseMetadata.keywords as string[], ...keywords],
    openGraph: {
      ...baseMetadata.openGraph,
      title: property.title,
      description: description.trim(),
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
    twitter: {
      ...baseMetadata.twitter,
      title: property.title,
      description: description.substring(0, 200),
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

/**
 * Generate dynamic metadata for project pages
 */
export function generateProjectMetadata(project: any): Metadata {
  if (!project) return baseMetadata;

  // Create project-specific description
  const locationText = project.location ? `in ${project.location}` : "in the UAE";
  const developerText = project.developer?.name || project.developer ? `by ${project.developer?.name || project.developer}` : "";
  const completionText = project.completionDate ? `with completion in ${project.completionDate}` : "";
  
  // Create a rich, keyword-optimized description
  const description = `Discover ${project.title}, an exclusive real estate project ${locationText} ${developerText} ${completionText}. Featuring premium properties with luxury amenities and exceptional design. Contact GGW Capital for investment opportunities.`;

  // Generate dynamic image URL
  const imageUrl = project.mainImage ? urlFor(project.mainImage).width(1200).height(630).url() : '/og-image.jpg';
  
  // Get canonical URL for this project
  const canonicalUrl = `/projects/${project.slug?.current || ''}`;

  // Build keywords based on project data
  const keywords = [
    `${project.title} project`,
    `${project.location} development`,
    `${project.developer?.name || project.developer || 'luxury'} project`,
    `real estate project in ${project.location || 'UAE'}`,
    project.marketType === 'off-plan' ? 'off-plan project' : 'ready project',
    `${project.neighborhood?.name || project.neighborhoodName || 'luxury'} development`,
    project.lifestyle?.name || project.lifestyleTitle || 'luxury lifestyle project',
  ].filter(Boolean);

  return {
    ...baseMetadata,
    title: `${project.title} | Exclusive Project ${project.location ? `in ${project.location}` : ''}`,
    description: description.trim(),
    keywords: [...baseMetadata.keywords as string[], ...keywords],
    openGraph: {
      ...baseMetadata.openGraph,
      title: project.title,
      description: description.trim(),
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      ...baseMetadata.twitter,
      title: project.title,
      description: description.substring(0, 200),
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

/**
 * Generate dynamic metadata for blog pages
 */
export function generateBlogMetadata(blog: any): Metadata {
  if (!blog) return baseMetadata;

  // Create blog-specific description
  const description = blog.excerpt || blog.description || `Read our exclusive article on ${blog.title}. Get insights into the UAE luxury real estate market, investment tips, and property trends with GGW Capital, your premier real estate consultant.`;

  // Generate dynamic image URL
  const imageUrl = blog.mainImage ? urlFor(blog.mainImage).width(1200).height(630).url() : '/og-image.jpg';
  
  // Get canonical URL for this blog
  const canonicalUrl = `/blogs/${blog.slug?.current || ''}`;

  return {
    ...baseMetadata,
    title: blog.title,
    description: description.trim(),
    keywords: [...baseMetadata.keywords as string[], 'real estate blog', 'UAE property insights', 'luxury market trends', 'investment advice'],
    openGraph: {
      ...baseMetadata.openGraph,
      type: 'article',
      title: blog.title,
      description: description.trim(),
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      publishedTime: blog.publishedAt || blog._createdAt,
      modifiedTime: blog._updatedAt,
      authors: blog.author ? [`${blog.author}`] : ['GGW Capital'],
    },
    twitter: {
      ...baseMetadata.twitter,
      title: blog.title,
      description: description.substring(0, 200),
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

/**
 * Generate metadata for neighborhood pages
 */
export function generateNeighborhoodMetadata(neighborhood: any): Metadata {
  if (!neighborhood) return baseMetadata;

  // Create neighborhood-specific description
  const description = neighborhood.description 
    ? neighborhood.description.substring(0, 240) 
    : `Explore exclusive properties in ${neighborhood.name}, one of UAE's premier locations. Discover luxury real estate opportunities, lifestyle amenities, and investment potential with GGW Capital.`;

  // Generate dynamic image URL
  const imageUrl = neighborhood.mainImage ? urlFor(neighborhood.mainImage).width(1200).height(630).url() : '/og-image.jpg';
  
  // Get canonical URL for this neighborhood
  const canonicalUrl = `/neighborhoods/${neighborhood.slug?.current || ''}`;

  return {
    ...baseMetadata,
    title: `${neighborhood.name} | Exclusive Neighborhood Guide`,
    description: description.trim(),
    keywords: [...baseMetadata.keywords as string[], `${neighborhood.name} properties`, `${neighborhood.name} real estate`, 'luxury neighborhood', 'UAE premium location'],
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${neighborhood.name} | Luxury Real Estate Location`,
      description: description.trim(),
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: neighborhood.name,
        },
      ],
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${neighborhood.name} | Luxury Real Estate Location`,
      description: description.substring(0, 200),
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}