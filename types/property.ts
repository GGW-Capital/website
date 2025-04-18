// Define a proper TypeScript interface for property
export interface Property {
    _id: string;
    title: string;
    slug?: {
      current: string;
    };
    location?: string;
    // Price is always a number
    price?: number;
    bedrooms?: number;
    bathrooms?: number;
    // Area is always a number 
    area?: number;
    type?: string;
    status?: string;
    images?: any[];
    mainImage?: any;
    mainImageUrl?: string;
    marketType?: string;
    category?: string;
    furnishingStatus?: string;
    completionDate?: string;
    views?: string[];
    googleMapsUrl?: string;
    // Additional properties
    projectId?: string;
    projectSlug?: {
      current: string;
    };
    projectName?: string;
    developer?: string | {
      name: string;
      _ref?: string;
    };
    developerId?: string;
    developerLogo?: any;
    neighborhood?: { 
      _ref?: string;
      name?: string; 
    };
    neighborhoodName?: string;
    neighborhoodSlug?: any;
    lifestyle?: string | {
      name?: string;
      _ref?: string;
    };
    lifestyleTitle?: string;
    amenities?: any[];
    description?: string;
    features?: string[];
  }