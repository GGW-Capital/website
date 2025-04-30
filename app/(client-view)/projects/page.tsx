import { Suspense } from "react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import ProjectCardNew from "@/components/project-card-new";
import ProjectFilters from "@/components/project-filters";
import Pagination from "@/components/pagination";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import {
  getProjects,
  getNeighborhoods,
  urlFor,
  getDevelopers,
  getLifestyles,
} from "@/lib/sanity";
import GradientTitle from "@/components/ui/gradient-title";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects | Luxury Real Estate",
  description:
    "Explore our collection of luxury development projects in the UAE.",
  openGraph: {
    title: "Projects | Luxury Real Estate",
    description:
      "Explore our collection of luxury development projects in the UAE.",
    type: "website",
  },
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage({
  searchParams = {},
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Create a safe copy of searchParams to avoid direct property access
  const params = { ...searchParams };

  // Prepare filter parameters from search params
  const filterParams: Record<string, any> = {};

  // Get current page from URL or default to 1
  const page = params.page;
  const currentPage = page ? parseInt(page as string) : 1;
  const itemsPerPage = 9; // Number of projects per page

  // Add neighborhood filter if provided
  const neighborhoodParam = params.neighborhoods;
  if (neighborhoodParam) {
    const neighborhoodIds =
      typeof neighborhoodParam === "string"
        ? neighborhoodParam.split(",")
        : neighborhoodParam;

    if (
      neighborhoodIds &&
      Array.isArray(neighborhoodIds) &&
      neighborhoodIds.length > 0
    ) {
      filterParams.neighborhood = neighborhoodIds[0]; // Use the first neighborhood for server filtering
    }
  }

  // Add developer filter if provided
  const developer = params.developer;
  if (developer && developer !== "all") {
    filterParams.developer = developer;
  }

  // Add lifestyle filter if provided
  const lifestyle = params.lifestyle;
  if (lifestyle && lifestyle !== "all") {
    filterParams.lifestyle = lifestyle;
  }

  // Add market type filter if provided
  const marketType = params.marketType;
  if (marketType && marketType !== "all") {
    filterParams.marketType = marketType;
  }

  // Add completion year filter if provided
  const completionYear = params.completionYear;
  if (completionYear && completionYear !== "any") {
    filterParams.completionYear = completionYear;
  }

  // Add price range filters if provided
  const minPrice = params.minPrice;
  if (minPrice) {
    try {
      filterParams.minPrice = parseInt(minPrice as string);
    } catch (e) {
      console.error("Error parsing minPrice:", e);
    }
  }

  const maxPrice = params.maxPrice;
  if (maxPrice) {
    try {
      filterParams.maxPrice = parseInt(maxPrice as string);
    } catch (e) {
      console.error("Error parsing maxPrice:", e);
    }
  }

  // Server-side data fetching
  const neighborhoodsData = await getNeighborhoods();
  const availableNeighborhoods = neighborhoodsData.map((n: any) => ({
    id: n._id,
    name: n.name,
  }));

  const developers = await getDevelopers();
  const developersData = developers.map((dev: any) => dev.name);

  // Server-side initial projects fetch
  console.log(
    "Fetching projects with filters:",
    JSON.stringify(filterParams, null, 2)
  );
  const projectsData = await getProjects(filterParams);

  console.log(
    "Projects data received:",
    projectsData ? `${projectsData.length} projects found` : "No projects found"
  );

  // Process projects to ensure image URLs are proper - do this on the server
  const processedProjects =
    projectsData && projectsData.length > 0
      ? projectsData.map((project: any) => ({
          ...project,
          images: project.images
            ? project.images.map((img: any) => urlFor(img).url())
            : [],
          mainImageUrl: project.mainImage
            ? urlFor(project.mainImage).url()
            : "/placeholder.svg",
          developerLogo: project.developerLogo
            ? urlFor(project.developerLogo).url()
            : null,
        }))
      : [];

  console.log("Processed projects count:", processedProjects.length);

  // Extract unique locations and completion years for filtering
  const locations = Array.from(
    new Set(processedProjects.map((p: any) => p.location).filter(Boolean))
  );
  const completionYears = Array.from(
    new Set(
      processedProjects
        .map((p: any) => {
          if (!p.completionDate) return null;
          try {
            // Try to extract just the year from completion date
            return new Date(p.completionDate).getFullYear().toString();
          } catch (e) {
            // If we can't parse the date, return the raw value or null
            return typeof p.completionDate === "string"
              ? p.completionDate
              : null;
          }
        })
        .filter(Boolean)
    )
  );

  // Client-side filtering based on search parameters
  let filteredProjects = [...processedProjects];

  searchParams = await searchParams;
  // Filter by locations
  if (searchParams.locations) {
    const locationList =
      typeof searchParams.locations === "string"
        ? searchParams.locations.split(",")
        : searchParams.locations;

    if (locationList.length > 0) {
      filteredProjects = filteredProjects.filter((project) =>
        locationList.some((loc) => project.location?.includes(loc))
      );
    }
  }

  // Filter by keyword
  if (searchParams.keyword) {
    const keyword = (searchParams.keyword as string).toLowerCase();

    filteredProjects = filteredProjects.filter((project) => {
      return (
        (project.title && project.title.toLowerCase().includes(keyword)) ||
        (project.location &&
          project.location.toLowerCase().includes(keyword)) ||
        (project.description &&
          project.description.toLowerCase().includes(keyword)) ||
        (project.developer &&
          typeof project.developer === "object" &&
          project.developer.name &&
          project.developer.name.toLowerCase().includes(keyword))
      );
    });
  }

  // Calculate pagination
  const totalItems = filteredProjects.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  // Create pagination URL helper
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();

    // Preserve all current search parameters
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== "page" && value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.set(key, value);
        }
      }
    });

    // Set the requested page number
    params.set("page", pageNumber.toString());

    return `/projects?${params.toString()}`;
  };

  // Create a URL helper for the market type filter
  const createMarketTypeUrl = (marketType: string) => {
    const params = new URLSearchParams();

    // Preserve all current search parameters except market type and page
    Object.entries(searchParams).forEach(([key, value]) => {
      if (key !== "marketType" && key !== "page" && value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.set(key, value);
        }
      }
    });

    // Set the market type (if not "all")
    if (marketType !== "all") {
      params.set("marketType", marketType);
    }

    return `/projects?${params.toString()}`;
  };

  // Get the current market type from URL params or default to 'all'
  const currentMarketType = searchParams.marketType || "all";

  // Define market type options
  const marketTypeOptions = [
    { id: "all", label: "All Projects" },
    { id: "off-plan", label: "Off-Plan" },
    { id: "secondary-market", label: "Secondary Market" },
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-48 pb-16 bg-gradient-to-b from-[#050505] to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl font-serif md:text-5xl font-bold mb-6 text-white">
              Explore Our <GradientTitle element="span">Projects</GradientTitle>
            </h1>
            <div className="w-24 h-1 bg-[#D4AF37]/60 mx-auto mb-6"></div>
            <p className="text-lg text-white/80">
              Discover our exclusive collection of luxury projects across Dubai
            </p>
          </div>

          {/* Market Type Selector */}
          <div className="flex justify-center mb-10">
            <div className="bg-[#111111] border border-[#D4AF37]/20 rounded-lg p-1 flex">
              {marketTypeOptions.map((option) => (
                <a
                  key={option.id}
                  href={createMarketTypeUrl(option.id)}
                  className={`px-6 py-3 rounded font-medium transition-all duration-200 ${
                    currentMarketType === option.id
                      ? "bg-ggw-gradient text-black"
                      : "text-white hover:bg-ggw-gold/10"
                  }`}
                >
                  {option.label}
                </a>
              ))}
            </div>
          </div>

          <div className="max-w-7xl mx-auto mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {filteredProjects.length} Projects Available
              </h2>
            </div>

            <ProjectFilters
              availableLocations={locations as string[]}
              availableDevelopers={developersData}
              availableCompletionYears={completionYears as string[]}
              availableNeighborhoods={availableNeighborhoods}
              initialMarketType={currentMarketType as string}
            />
          </div>

          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#0a0a0a]/50 border border-[#D4AF37]/10 rounded-lg h-96 animate-pulse"
                  ></div>
                ))}
              </div>
            }
          >
            {filteredProjects.length === 0 ? (
              <div className="text-center py-20 bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">
                  No Projects Found
                </h3>
                <p className="text-white/70 mb-8">
                  We couldn't find any projects matching your criteria. Try
                  adjusting your filters.
                </p>
                <Button asChild>
                  <Link href="/projects">Reset All Filters</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {paginatedProjects.map((project) => (
                  <div
                    key={project._id}
                    className="transition-opacity duration-300"
                  >
                    <ProjectCardNew project={project} />
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredProjects.length > itemsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                createPageUrl={createPageUrl}
              />
            )}
          </Suspense>
        </div>
      </section>

    </main>
  );
}
