"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PortableText } from "@portabletext/react";
import { getFAQs } from "@/lib/sanity";
import GradientTitle from "./ui/gradient-title";
import { GradientButton } from "./ui/gradient-button";
import { Button } from "./ui/button";

interface FAQSectionProps {
  showMoreLink?: boolean;
  className?: string;
  maxFaqs?: number;
}

export default function FAQSection({
  showMoreLink = true,
  className,
  maxFaqs = 6,
}: FAQSectionProps) {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFAQs() {
      setLoading(true);
      try {
        // Ensure maxFaqs is a number
        const limit = typeof maxFaqs === "number" ? maxFaqs : 6;
        const fetchedFaqs = await getFAQs(limit);
        setFaqs(fetchedFaqs || []);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    }

    loadFAQs();
  }, [maxFaqs]);

  return (
    <div className={cn("w-full bg-black", className)}>
      <div className="container mx-auto max-w-4xl px-4 py-16">
          <h2 className="text-4xl md:text-5xl heading-2 font-semibold text-white text-center mb-12">
            Frequently Asked{" "}
            <GradientTitle element="span">Questions</GradientTitle>
          </h2>
        

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gradient-to-r from-neutral-900 to-black rounded-lg shadow-lg overflow-hidden border border-[#D4AF37]/20 animate-pulse"
              >
                <div className="px-6 py-5">
                  <div className="h-5 bg-gray-800 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : faqs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full space-y-5">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq._id}
                value={faq._id}
                className="bg-gradient-to-r from-neutral-900 to-black rounded-lg shadow-lg overflow-hidden border border-[#D4AF37]/30 transition-all duration-300 hover:border-[#D4AF37]/50"
              >
                <AccordionTrigger className="px-6 py-5 text-left font-medium hover:no-underline text-white group">
                  <span className="group-hover:text-[#D4AF37] transition-colors duration-200">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6 text-gray-300">
                  <div className="border-l-2 border-[#D4AF37]/40 pl-5 mt-2">
                    {typeof faq.answer === "string" ? (
                      <div
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                        className="leading-relaxed"
                      />
                    ) : (
                      <PortableText value={faq.answer} />
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-400">No FAQs available.</p>
          </div>
        )}

        {showMoreLink && faqs.length > 0 && (
          <div className="mt-12 text-center">
            <Link href="/faqs">
              <Button className="bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 px-8 py-6 text-lg font-medium group">
                View All FAQs
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
