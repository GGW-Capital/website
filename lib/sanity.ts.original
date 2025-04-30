import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// Create a Sanity client with the project ID, dataset, and API version from environment variables
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-03-25", // Format YYYY-MM-DD
  useCdn: process.env.NODE_ENV === "production", // Use CDN for better performance in production
});

// Create an image URL builder for the Sanity client
const builder = imageUrlBuilder(client);

// Helper function to get an image URL from a Sanity image reference
export function urlFor(source: any) {
  // Create a placeholder builder that works with the width/height chain
  const placeholderBuilder = {
    url: () => "/placeholder.svg",
    width: () => ({
      height: () => ({
        url: () => "/placeholder.svg",
      }),
    }),
  };

  // If source doesn't exist, return placeholder
  if (!source) {
    return placeholderBuilder;
  }

  try {
    // Handle direct strings (simple URLs)
    if (typeof source === "string") {
      return {
        url: () => source,
        width: () => ({
          height: () => ({
            url: () => source,
          }),
        }),
      };
    }

    // Handle uploads with the _upload property (handles pending uploads)
    if (source._upload) {
      // If there's a previewImage available, use it
      if (source._upload.previewImage) {
        const previewUrl = source._upload.previewImage;
        return {
          url: () => previewUrl,
          width: () => ({
            height: () => ({
              url: () => previewUrl,
            }),
          }),
        };
      }

      // For uploads without preview, use a placeholder
      return placeholderBuilder;
    }

    // Handle cases where the image might not be fully processed yet
    if (source._type === "image" && !source.asset) {
      console.warn("Image without asset reference:", source);
      return placeholderBuilder;
    }

    // For regular asset references, use the builder
    return builder.image(source);
  } catch (error) {
    console.error("Error generating image URL:", error);
    return placeholderBuilder;
  }
}

// Get site statistics
export async function getSiteStatistics() {
  try {
    const query = `{
      "propertyCount": count(*[_type == "property"]),
      "projectCount": count(*[_type == "project"]),
      "developerCount": count(*[_type == "developer"]),
      "teamMemberCount": count(*[_type == "teamMember"]),
      "yearsInBusiness": 15
    }`;

    const statistics = await client.fetch(query);
    return statistics;
  } catch (error) {
    console.error("Error fetching site statistics:", error);
    return {
      propertyCount: 0,
      projectCount: 0,
      developerCount: 0,
      teamMemberCount: 0,
      yearsInBusiness: 15,
    };
  }
}

// Get featured properties from Sanity
export async function getFeaturedProperties() {
  try {
    const properties = await client.fetch(`
      *[_type == "property" && isFeatured == true][0...6] {
        _id,
        title,
        type,
        location,
        price,
        bedrooms,
        bathrooms,
        area,
        mainImage,
        images,
        status,
        marketType,
        category,
        "lifestyle": lifestyle->value.current,
        "lifestyleTitle": lifestyle->title,
        description,
        features,
        slug,
        completionDate,
        coordinates,
        "developer": developer->name,
        "developerId": developer->_id,
        "developerLogo": developer->logo,
        "projectId": project->_id,
        "projectName": project->name,
        "projectSlug": project->slug,
        furnishingStatus,
        amenities,
        views
      }
    `);
    return properties;
  } catch (error) {
    console.error("Error fetching featured properties:", error);
    return [];
  }
}

// Get properties by market type from Sanity
export async function getPropertiesByMarketType(marketType: string) {
  try {
    const properties = await client.fetch(
      `
      *[_type == "property" && marketType == $marketType] {
        _id,
        title,
        type,
        location,
        price,
        bedrooms,
        bathrooms,
        area,
        mainImage,
        images,
        status,
        marketType,
        category,
        "lifestyle": lifestyle->value.current,
        "lifestyleTitle": lifestyle->title,
        description,
        features,
        slug,
        completionDate,
        coordinates,
        "developer": developer->name,
        "developerId": developer->_id,
        "developerLogo": developer->logo,
        "projectId": project->_id,
        "projectName": project->name,
        "projectSlug": project->slug,
        furnishingStatus,
        amenities,
        views
      }
    `,
      { marketType }
    );
    return properties;
  } catch (error) {
    console.error(`Error fetching ${marketType} properties:`, error);
    return [];
  }
}

// Get all properties (with optional filters)
export async function getAllProperties(filters?: Record<string, any>) {
  try {
    let query = `*[_type == "property"`;

    // Apply filters if provided
    if (filters) {
      const filterConditions = [];

      if (filters.status) {
        filterConditions.push(`status == "${filters.status}"`);
      }

      if (filters.marketType) {
        filterConditions.push(`marketType == "${filters.marketType}"`);
      }

      if (filters.category && filters.category !== "all") {
        filterConditions.push(`category == "${filters.category}"`);
      }

      if (filters.lifestyle && filters.lifestyle !== "all") {
        filterConditions.push(
          `lifestyle->value.current == "${filters.lifestyle}"`
        );
      }

      if (filters.location) {
        filterConditions.push(`location match "*${filters.location}*"`);
      }

      if (filters.neighborhood) {
        filterConditions.push(`neighborhood._ref == "${filters.neighborhood}"`);
      }

      if (filters.minPrice) {
        filterConditions.push(`price >= ${filters.minPrice}`);
      }

      if (filters.maxPrice) {
        filterConditions.push(`price <= ${filters.maxPrice}`);
      }

      if (filters.bedrooms && filters.bedrooms !== "any") {
        if (filters.bedrooms === "studio") {
          filterConditions.push(`bedrooms == 0`);
        } else if (filters.bedrooms === "4") {
          filterConditions.push(`bedrooms >= 4`);
        } else {
          filterConditions.push(`bedrooms == ${filters.bedrooms}`);
        }
      }

      if (filters.developer && filters.developer !== "all") {
        filterConditions.push(`developer->_id == "${filters.developer}"`);
      }
      if (filters.neighborhood && filters.neighborhood !== "all") {
        filterConditions.push(`neighborhood->_id == "${filters.neighborhood}"`);
      }

      // Add all filter conditions to query
      if (filterConditions.length > 0) {
        query += ` && ${filterConditions.join(" && ")}`;
      }
    }

    // Add ordering and limit if specified
    query += `]`;

    if (filters?.sort) {
      if (filters.sort === "price-asc") {
        query += ` | order(price asc)`;
      } else if (filters.sort === "price-desc") {
        query += ` | order(price desc)`;
      } else if (filters.sort === "newest") {
        query += ` | order(_createdAt desc)`;
      }
    } else {
      // Default sorting
      query += ` | order(price desc)`;
    }

    // Apply limit if specified
    if (filters?.limit) {
      query += `[0...${filters.limit}]`;
    }

    // Select fields
    query += ` {
      _id,
      title,
      type,
      location,
      price,
      bedrooms,
      bathrooms,
      area,
      mainImage,
      images,
      status,
      marketType,
      category,
      "lifestyle": lifestyle->value.current,
      "lifestyleTitle": lifestyle->title,
      description,
      features,
      slug,
      completionDate,
      coordinates,
      "developer": developer->name,
      "developerId": developer->_id,
      "developerLogo": developer->logo,
      "projectId": project->_id,
      "projectName": project->name,
      "projectSlug": project->slug,
      "neighborhoodId": neighborhood->_id,
      "neighborhoodName": neighborhood->name,
      "neighborhoodSlug": neighborhood->slug,
      furnishingStatus,
      amenities,
      views
    }`;

    const properties = await client.fetch(query);
    return properties;
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

// Get projects from Sanity
export async function getProjects(filters?: Record<string, any>) {
  try {
    let query = `*[_type == "project"`;

    // Apply filters if provided
    if (filters) {
      const filterConditions = [];

      if (filters.category && filters.category !== "all") {
        filterConditions.push(`category == "${filters.category}"`);
      }

      if (filters.lifestyle && filters.lifestyle !== "all") {
        filterConditions.push(
          `lifestyle->value.current == "${filters.lifestyle}"`
        );
      }

      if (filters.location) {
        filterConditions.push(`location match "*${filters.location}*"`);
      }

      if (filters.neighborhood) {
        filterConditions.push(`neighborhood._ref == "${filters.neighborhood}"`);
      }

      if (filters.minPrice) {
        filterConditions.push(`price >= ${filters.minPrice}`);
      }

      if (filters.maxPrice) {
        filterConditions.push(`price <= ${filters.maxPrice}`);
      }

      if (filters.bedrooms && filters.bedrooms !== "any") {
        if (filters.bedrooms === "studio") {
          filterConditions.push(`bedrooms == 0`);
        } else if (filters.bedrooms === "4") {
          filterConditions.push(`bedrooms >= 4`);
        } else {
          filterConditions.push(`bedrooms == ${filters.bedrooms}`);
        }
      }

      if (filters.developer && filters.developer !== "all") {
        filterConditions.push(`developer->_id == "${filters.developer}"`);
      }
      if (filters.neighborhood && filters.neighborhood !== "all") {
        filterConditions.push(`neighborhood->_id == "${filters.neighborhood}"`);
      }
      if (filters.marketType && filters.marketType !== "all") {
        filterConditions.push(`marketType == "${filters.marketType}"`);
      }

      // Add all filter conditions to query
      if (filterConditions.length > 0) {
        query += ` && ${filterConditions.join(" && ")}`;
      }
    }

    // Close the query
    query += `] {
      _id,
      name,
      location,
      price,
      description,
      completionDate,
      coordinates,
      mainImage,
      images,
      features,
      bedrooms,
      bathrooms,
      area,
      category,
      marketType,
      "lifestyle": lifestyle->value.current,
      "lifestyleTitle": lifestyle->title,
      "developer": developer->name,
      "developerId": developer->_id,
      "developerLogo": developer->logo,
      "neighborhoodId": neighborhood->_id,
      "neighborhoodName": neighborhood->name,
      "neighborhoodSlug": neighborhood->slug,
      slug,
      "propertyCount": count(*[_type == "property" && references(^._id)]),
      "properties": *[_type == "property" && references(^._id)][0...4] {
        _id,
        title,
        type,
        location,
        price,
        bedrooms,
        bathrooms,
        area,
        mainImage,
        status,
        marketType,
        category,
        slug
      }
    }`;
    const projects = await client.fetch(query);
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

// Get featured projects from Sanity
export async function getFeaturedProjects() {
  try {
    const projects = await client.fetch(`
      *[_type == "project" && isFeatured == true][0...4] {
        _id,
        name,
        location,
        price,
        description,
        completionDate,
        coordinates,
        mainImage,
        images,
        features,
        bedrooms,
        bathrooms,
        area,
        category,
        marketType,
        "lifestyle": lifestyle->value.current,
        "lifestyleTitle": lifestyle->title,
        "developer": developer->name,
        "developerId": developer->_id,
        "developerLogo": developer->logo,
        slug,
        "propertyCount": count(*[_type == "property" && references(^._id)]),
        "properties": *[_type == "property" && references(^._id)][0...4] {
        "neighborhoodId": neighborhood->_id,
        "neighborhoodName": neighborhood->name,
        "neighborhoodSlug": neighborhood->slug,
          _id,
          title,
          type,
          location,
          price,
          bedrooms,
          bathrooms,
          area,
          mainImage,
          status,
          marketType,
          category,
          slug
        }
      }
    `);
    return projects;
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}

// Get testimonials from Sanity
export async function getTestimonials() {
  try {
    const testimonials = await client.fetch(`
      *[_type == "testimonial"] {
        _id,
        quote,
        name,
        title,
        image
      }
    `);
    return testimonials;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}

// Get neighborhoods from Sanity
export async function getNeighborhoods() {
  try {
    const neighborhoods = await client.fetch(`
      *[_type == "neighborhood"] {
        _id,
        name,
        description,
        image,
        slug,
        propertyTypes,
        priceRange,
        "lifestyle": lifestyle->value.current,
        "lifestyleTitle": lifestyle->title,
        googleMapsUrl,
        features,
        locationDetails
      }
    `);
    return neighborhoods;
  } catch (error) {
    console.error("Error fetching neighborhoods:", error);
    return [];
  }
}

// Get team members from Sanity
export async function getTeamMembers() {
  try {
    const teamMembers = await client.fetch(`
      *[_type == "teamMember"] {
        _id,
        name,
        position,
        bio,
        image,
        email,
        phone,
        socialMedia
      }
    `);
    return teamMembers;
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

// Get a single property by slug
export async function getPropertyBySlug(slug: string) {
  try {
    const property = await client.fetch(`
      *[_type == "property" && (slug.current == $slug || _id == $slug)][0] {
        _id,
        title,
        type,
        location,
        price,
        bedrooms,
        bathrooms,
        area,
        mainImage,
        images,
        status,
        marketType,
        category,
        "lifestyle": lifestyle->value.current,
        "lifestyleTitle": lifestyle->title,
        description,
        features,
        slug,
        completionDate,
        googleMapsUrl,
        "developer": coalesce(developer->name, project->developer->name),
        "developerId": coalesce(developer->_id, project->developer->_id),
        "developerLogo": coalesce(developer->logo, project->developer->logo),
        "projectId": project->_id,
        "projectName": project->name,
        "projectSlug": project->slug,
        furnishingStatus,
        amenities,
        "neighborhoodId": coalesce(neighborhood->_id, project->neighborhood->_id),
        "neighborhoodName": coalesce(neighborhood->name, project->neighborhood->name),
        "neighborhoodSlug": coalesce(neighborhood->slug, project->neighborhood->slug),
        views
      }
    `, { slug });
    return property;
  } catch (error) {
    console.error('Error fetching property by slug:', error);
    return null;
  }
}

// Get a single project by slug
export async function getProjectBySlug(slug: string) {
  try {
    const project = await client.fetch(
      `
      *[_type == "project" && (slug.current == $slug || _id == $slug)][0] {
        _id,
        name,
        location,
        price,
        description,
        completionDate,
        coordinates,
        mainImage,
        images,
        features,
        bedrooms,
        bathrooms,
        area,
        "neighborhoodId": neighborhood->_id,
        "neighborhoodName": neighborhood->name,
        "neighborhoodSlug": neighborhood->slug,
        category,
        marketType,
        "lifestyle": lifestyle->value.current,
        "lifestyleTitle": lifestyle->title,
        "developer": developer->name,
        "developerId": developer->_id,
        "developerLogo": developer->logo,
        slug,
        "properties": *[_type == "property" && references(^._id)] {
          _id,
          title,
          type,
          location,
          price,
          bedrooms,
          bathrooms,
          area,
          mainImage,
          status,
          marketType,
          category,
          slug
        }
      }
    `,
      { slug }
    );
    return project;
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }
}

// Get blogs from Sanity
export async function getBlogs() {
  try {
    const blogs = await client.fetch(`
      *[_type == "blog"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        mainImage,
        category,
        isFeatured
      }
    `);
    return blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

// Get featured blogs from Sanity
export async function getFeaturedBlogs() {
  try {
    const blogs = await client.fetch(`
      *[_type == "blog" && isFeatured == true] | order(publishedAt desc)[0...3] {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        mainImage,
        category
      }
    `);
    return blogs;
  } catch (error) {
    console.error("Error fetching featured blogs:", error);
    return [];
  }
}

// Get a single blog by slug
export async function getBlogBySlug(slug: string) {
  try {
    const blog = await client.fetch(
      `
      *[_type == "blog" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        mainImage,
        body,
        category
      }
    `,
      { slug }
    );
    return blog;
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return null;
  }
}

// Get a single neighborhood by slug
export async function getNeighborhoodBySlug(slug: string) {
  try {
    const neighborhood = await client.fetch(
      `
      *[_type == "neighborhood" && slug.current == $slug][0] {
        _id,
        name,
        description,
        image,
        slug,
        propertyTypes,
        priceRange,
        "lifestyle": lifestyle->value.current,
        "lifestyleTitle": lifestyle->title,
        coordinates,
        features,
        locationDetails,
        "properties": *[_type == "property" && neighborhood._ref == ^._id] {
          _id,
          title,
          type,
          location,
          price,
          bedrooms,
          bathrooms,
          area,
          mainImage,
          status,
          marketType,
          category,
          slug
        },
        "projects": *[_type == "project" && neighborhood._ref == ^._id] {
          _id,
          name,
          location,
          price,
          mainImage,
          completionDate,
          category,
          marketType,
          "lifestyle": lifestyle->value.current,
          slug
        }
      }
    `,
      { slug }
    );
    return neighborhood;
  } catch (error) {
    console.error("Error fetching neighborhood by slug:", error);
    return null;
  }
}

// Get all developers from Sanity
export async function getDevelopers() {
  try {
    const developers = await client.fetch(`
      *[_type == "developer"] {
        _id,
        name,
        logo,
        description,
        isFeatured,
        website,
        "projectCount": count(*[_type == "project" && references(^._id)]),
        "projects": *[_type == "project" && references(^._id)] {
          _id,
          name,
          location,
          mainImage,
          slug
        }
      }
    `);
    return developers;
  } catch (error) {
    console.error("Error fetching developers:", error);
    return [];
  }
}

// Get all lifestyle options from Sanity
export async function getLifestyles(includeAllOption = true) {
  try {
    const lifestyles = await client.fetch(`
      *[_type == "lifestyle"] {
        _id,
        title,
        "value": value.current
      }
    `);

    // Format for use with FilterToggle component
    const formattedLifestyles = lifestyles.map((lifestyle: any) => ({
      id: lifestyle.value || lifestyle._id,
      label: lifestyle.title,
    }));

    // Add "All" option if requested
    if (includeAllOption) {
      return [{ id: "all", label: "All Lifestyles" }, ...formattedLifestyles];
    }

    return formattedLifestyles;
  } catch (error) {
    console.error("Error fetching lifestyles:", error);

    // Return default lifestyle options if there's an error
    const defaultOptions = includeAllOption
      ? [
          { id: "luxury", label: "Luxury" },
          { id: "beachfront", label: "Beachfront" },
          { id: "family", label: "Family" },
          { id: "urban", label: "Urban" },
          { id: "investment", label: "Investment" },
        ]
      : [
          { id: "luxury", label: "Luxury" },
          { id: "beachfront", label: "Beachfront" },
          { id: "family", label: "Family" },
          { id: "urban", label: "Urban" },
          { id: "investment", label: "Investment" },
        ];

    return defaultOptions;
  }
}

// Get all FAQs
export async function getFAQs(limit?: number) {
  try {
    let query = `*[_type == "faq"]`;
    
    if (limit) {
      query += `[0...${limit}]`;
    }
    
    query += ` {
      _id,
      question,
      answer
    }`;
    
    const faqs = await client.fetch(query);
    return faqs;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
}