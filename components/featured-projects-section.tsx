import Image from "next/image";
import Link from "next/link";
import { MapPin, Building, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects, urlFor } from "@/lib/sanity";
import GradientTitle from "./ui/gradient-title";
import { Badge } from "./ui/badge";
import ClientCarouselControls from "./client-carousel-controls";
interface Project {
  _id: string;
  name: string;
  slug?: {
    current: string;
  };
  title?: string;
  description?: string;
  mainImage?: any;
  images?: any[];
  developer?: string;
  location?: string;
  neighborhood?: {
    _ref: string;
    _type: string;
  };
  marketType?: string;
  category?: string;
  price?: number | string;
  completionDate?: string;
  completionYear?: string;
  features?: string[];
  amenities?: string[];
  lifestyles?: string[];
  floorplans?: any[];
  isComplete?: boolean;
  isFeatured?: boolean;
  nearbyPlaces?: string[];
  nearbyLandmarks?: string[];
  content?: any;
}

// This is a server component that fetches and renders the featured projects
export default async function FeaturedProjectsSection() {
  // Fetch projects from Sanity CMS server-side
  let projects: Project[] = [];
  try {
    projects = await getFeaturedProjects();
    // Limit to 5 projects
    projects = projects.slice(0, 5);
  } catch (error) {
    console.error("Error loading featured projects:", error);
  }

  // Function to render a project card
  const renderProjectCard = (project: Project, index: number) => {
    return (
      <Link
        key={project._id}
        href={`/projects/${project.slug?.current || project._id}`}
        className="group px-2 carousel-item"
        data-index={index}
        style={{ display: index < 3 ? "block" : "none" }}
      >
        <div
          className="bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-500 h-full"

        >
          <div className="relative h-[250px]">
            {project.mainImage ? (
              <Image
                src={urlFor(project.mainImage).width(800).height(533).url()}
                alt={project.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
            <div className="absolute top-4 left-4">
              <Badge className="bg-[#D4AF37] text-black px-3 py-1 text-sm font-medium">
                {project.marketType === "off-plan"
                  ? "Off-Plan"
                  : project.marketType === "secondary-market"
                    ? "Secondary Market"
                    : "Project"}
              </Badge>
            </div>
            {project.category && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-black/70 text-white px-3 py-1 text-sm font-medium border border-[#D4AF37]/30">
                  {project.category.charAt(0).toUpperCase() +
                    project.category.slice(1)}
                </Badge>
              </div>
            )}
          </div>

          <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
              {project.name}
            </h3>

            <div className="flex items-center text-[#D4AF37] mb-3">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{project.location}</span>
            </div>

            {project.developer && (
              <div className="flex items-center text-white/80 mb-3 text-sm">
                <Building className="h-4 w-4 mr-1 text-[#D4AF37]" />
                <span>By {project.developer}</span>
              </div>
            )}

            {project.completionDate && (
              <div className="flex items-center text-white/80 mb-4 text-sm">
                <Calendar className="h-4 w-4 mr-1 text-[#D4AF37]" />
                <span>Completion: {project.completionDate}</span>
              </div>
            )}

            <div className="flex justify-between items-center mt-3">
              <span className="font-semibold text-[#D4AF37]">
                {typeof project.price === "number"
                  ? `AED ${project.price.toLocaleString()}`
                  : project.price || "Price on Request"}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
              >
                View Details
              </Button>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section
      id="featured-projects"
      className="py-20 bg-gradient-to-b from-[#050505] to-black"
    >
      <div className="container mx-auto px-4">
        {/* Title and description */}
        <div
          className="max-w-7xl mx-auto text-center mb-16"
          data-taos="fade-up"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white font-serif">
            Featured <GradientTitle element="span">Projects</GradientTitle>
          </h2>
          <div className="w-24 h-1 bg-[#D4AF37]/60 mx-auto mb-6"></div>
          <p className="text-lg text-white/80">
            Discover our exclusive collection of luxury development projects
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="max-w-7xl mx-auto">
            {/* Server-side rendered carousel */}
            <div id="featured-projects-carousel" className="relative px-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {projects.map((project, index) =>
                  renderProjectCard(project, index)
                )}
              </div>

              {/* Client-side carousel controls */}
              <ClientCarouselControls
                totalItems={projects.length}
                itemsPerView={3}
                carouselId="featured-projects-carousel"
              />
            </div>
          </div>
        ) : (
          <div
            className="text-center py-20 bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl max-w-4xl mx-auto"
            data-taos="fade-up"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              No Featured Projects
            </h3>
            <p className="text-white/70 mb-8">
              Currently, no featured projects are available.
            </p>
          </div>
        )}

        <div
          className="flex justify-center mt-12"
          data-taos="fade-up"
          data-taos-offset="50"
        >
          <Link href="/projects">
            <Button className="bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 px-8 py-6 text-lg font-medium group">
              Explore All Projects
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
