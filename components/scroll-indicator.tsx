"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { scrollToElement } from "@/lib/utils";

interface ScrollIndicatorProps {
  className?: string;
  elementId: string;
}

export function ScrollIndicator({
  className = "",
  elementId,
}: ScrollIndicatorProps) {
  const controls = useAnimation();
  async function onClick() {
    scrollToElement(elementId);
  }
  // Color schemes inspired by luxury brands
  const colorSchemes = {
    primary: "rgba(212, 175, 55, 0.9)",
    accent: "rgba(212, 175, 55, 0.3)",
    text: "rgba(212, 175, 55, 0.9)",
  };

  const colors = colorSchemes;

  // Animation sequence
  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        y: [0, 15, 0],
        opacity: [0.5, 1, 0.5],
        transition: {
          duration: 2.5,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 0.2,
        },
      });
    };

    sequence();
  }, [controls]);

  return (
    <div
      className={`flex flex-col cursor-pointer items-center ${className}`}
      onClick={() => onClick()}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        onClick={() => onClick()}
        className="flex flex-col items-center"
      >
        <div
          onClick={() => onClick()}
          className="relative h-16 md:h-20 flex flex-col items-center"
        >
          <div
            className="absolute top-0 w-px h-full"
            onClick={() => onClick()}
            style={{
              background: `linear-gradient(to bottom, transparent, ${colors.primary}, transparent)`,
            }}
          ></div>
          <motion.div
            animate={controls}
            className="absolute flex flex-col items-center"
            onClick={() => onClick()}
          >
            <div
              className="w-px h-10"
              onClick={() => onClick()}
              style={{
                background: `linear-gradient(to bottom, transparent, ${colors.primary})`,
                boxShadow: `0 0 8px ${colors.accent}`,
              }}
            />
            <div
              className="h-6 w-6 rotate-45 border-b border-r cursor-pointer"
              onClick={() => onClick()}
              style={{
                borderColor: colors.primary,
                boxShadow: `0 0 8px ${colors.accent}`,
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
