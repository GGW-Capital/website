import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/sanity";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { GradientButton } from "@/components/ui/gradient-button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Calendar,
  Check,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import StaticMap from "@/components/client-google-map";
import { formatCurrency } from "@/lib/utils";
import ClientProjectDetails from "./client-project-details";
import { urlFor } from "@/lib/sanity";
// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.id);

  if (!project) {
    return {
      title: "Project Not Found | Luxury Real Estate",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.name} | ${project.location} | Luxury Real Estate`,
    description: project.description
      ? project.description.substring(0, 160)
      : `Discover ${project.name}, a luxury development in ${project.location}`,
    openGraph: {
      images: project.mainImage ? [urlFor(project.mainImage).width(1600).height(1066).url()] : [],
      title: `${project.title} | GGW Capital`,
      description: project.description
        ? project.description.substring(0, 160)
        : `Discover ${project.name}, a luxury development in ${project.location}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description:
        project.description?.substring(0, 200) ||
        `Exclusive luxury development in ${project.location || "Dubai"}`,
      images: [
        project.mainImage
          ? urlFor(project.mainImage).width(1600).height(1066).url()
          : "/placeholder.svg",
      ],
    },
  };
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const project = await getProjectBySlug(params.id);

  if (!project) {
    notFound();
  }

  // Format data for display
  const formattedPrice = project.price
    ? formatCurrency(project.price)
    : "Price on Request";
  const formattedArea = project.area
    ? `${project.area.toLocaleString()} sq.ft`
    : "Area not specified";

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-32 pb-16 bg-gradient-to-b from-[#050505] to-black">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center text-sm text-white/60">
              <Link href="/" className="hover:text-ggw-gold transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link
                href="/projects"
                className="hover:text-ggw-gold transition-colors"
              >
                Projects
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white/90">{project.name}</span>
            </div>
          </div>

          {/* Back Button */}
          <div className="mb-6">
            <Link href="/projects">
              <Button
                variant="outline"
                size="sm"
                className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
              >
                Back to Projects
              </Button>
            </Link>
          </div>

          {/* Project Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2 text-white">
                {project.name}
              </h1>
              <div className="flex items-center text-[#D4AF37] mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-lg">{project.location}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-[#D4AF37] text-black font-medium">
                  Off-Plan
                </Badge>

                {project.lifestyle && (
                  <Badge className="bg-black border border-[#D4AF37]/30 text-white">
                    {project.lifestyleTitle} Lifestyle
                  </Badge>
                )}
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-3xl font-bold text-[#D4AF37] mb-2">
                {formattedPrice}
              </div>
              <div className="text-sm text-white/60">
                Completion: {project.completionDate || "Contact for details"}
              </div>
            </div>
          </div>

          {/* Client-side interactive components */}
          <ClientProjectDetails project={project} />

          {/* Project Overview */}
          <div className="mt-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#D4AF37]/10">
                <div className="flex items-center mb-2">
                  <Maximize2 className="h-5 w-5 mr-2 text-[#D4AF37]" />
                  <span className="text-sm text-white/60">Area</span>
                </div>
                <div className="text-lg font-semibold">{formattedArea}</div>
              </div>

              {project.completionDate && (
                <div className="bg-[#0a0a0a] p-4 rounded-xl border border-[#D4AF37]/10">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-5 w-5 mr-2 text-[#D4AF37]" />
                    <span className="text-sm text-white/60">Completion</span>
                  </div>
                  <div className="text-lg font-semibold">
                    {project.completionDate}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold font-serif mb-6">
              About This Project
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-white/80 whitespace-pre-line">
                {project.description}
              </p>
            </div>
          </div>

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold font-serif mb-6">
                Features & Amenities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mt-0.5">
                      <Check className="h-4 w-4 text-[#D4AF37]" />
                    </div>
                    <span className="ml-3 text-white/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Developer Information */}
          {project.developer && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold font-serif mb-6">Developer</h2>
              <div className="bg-[#0a0a0a] p-6 rounded-xl border border-[#D4AF37]/10 flex items-center">
                {project.developerLogo && (
                  <div className="mr-6">
                    <div className="h-20 w-20 bg-transparent border-[1px] border-solid border-ggw-gold rounded-md p-2 flex items-center justify-center">
                      <Image
                        src={urlFor(project.developerLogo).url()}
                        alt={project.developer}
                        width={70}
                        height={70}
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    {project.developer}
                  </h3>
                </div>
              </div>
            </div>
          )}

          {/* Location */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold font-serif mb-6">Location</h2>
            <div className="h-[450px] rounded-xl overflow-hidden bg-[#0a0a0a] border border-[#D4AF37]/20">
              {project.googleMapsUrl ? (
                <StaticMap
                  googleMapsUrl={project.googleMapsUrl}
                  locationName={project.location}
                />
              ) : project.coordinates ? (
                <StaticMap
                  googleMapsUrl={`https://www.google.com/maps/search/?api=1&query=${project.coordinates.lat},${project.coordinates.lng}`}
                  locationName={project.location}
                />
              ) : (
                <StaticMap locationName={project.location} />
              )}
            </div>
          </div>

          {/* Related Properties */}
          {project.properties && project.properties.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold font-serif mb-6">
                Properties in This Project
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.properties.map((property: any) => (
                  <Link
                    href={`/properties/${property.slug.current}`}
                    key={property._id}
                  >
                    <div className="bg-[#0a0a0a] rounded-xl overflow-hidden border border-[#D4AF37]/10 hover:border-[#D4AF37]/40 transition-all hover:shadow-gold">
                      <div className="relative h-48">
                        {property.mainImage ? (
                          <Image
                            src={urlFor(property.mainImage).url()}
                            alt={property.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center">
                            <span className="text-white/30">No Image</span>
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-[#D4AF37] text-black font-medium">
                            {property.marketType === "off-plan"
                              ? "Off-Plan"
                              : property.marketType === "buy"
                                ? "For Sale"
                                : "For Rent"}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold mb-1 line-clamp-1">
                          {property.title}
                        </h3>
                        <div className="flex items-center text-[#D4AF37]/80 text-sm mb-2">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          <span className="line-clamp-1">
                            {property.location}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="text-xl font-bold text-[#D4AF37]">
                            {formatCurrency(property.price)}
                          </div>
                          <div className="flex items-center space-x-3 text-sm text-white/70">
                            {property.bedrooms !== undefined && (
                              <div className="flex items-center">
                                <BedDouble className="h-4 w-4 mr-1" />
                                <span>{property.bedrooms}</span>
                              </div>
                            )}
                            {property.bathrooms !== undefined && (
                              <div className="flex items-center">
                                <Bath className="h-4 w-4 mr-1" />
                                <span>{property.bathrooms}</span>
                              </div>
                            )}
                            {property.area !== undefined && (
                              <div className="flex items-center">
                                <Maximize2 className="h-4 w-4 mr-1" />
                                <span>{property.area.toLocaleString()}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Inquiry CTA */}
          <div className="mt-16 py-10 px-8 bg-gradient-to-r from-[#0a0a0a] to-[#121212] rounded-xl border border-[#D4AF37]/20 text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-serif mb-4">
              Interested in {project.name}?
            </h2>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Contact our team of luxury real estate experts to learn more about
              this exclusive project and explore available units.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <GradientButton>Request Information</GradientButton>
              </Link>
              <Link
                href={`https://wa.me/+971526925562?text=I'm interested in ${project.name} project`}
                target="_blank"
              >
                <Button
                  variant="outline"
                  className="border-[#D4AF37] text-[#D4AF37]"
                >
                  Contact via WhatsApp
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
