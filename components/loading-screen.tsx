"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);

  // Luxury-focused messages
  const loadingMessages = [
    "Curating exclusive properties...",
    "Preparing bespoke experiences...",
    "Accessing premium listings...",
    "Tailoring your luxury portfolio...",
  ];

  // Gold color for luxury accents
  const goldColor = "#ba992d";

  // Control the progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      
    document.querySelector('.loading-screen-placeholder').style.display = 'none';
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Trigger completion after progress reaches 100% and a delay
  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        // First start the exit animation
        setAnimationComplete(true);

        // Wait for exit animation to complete before notifying parent
        setTimeout(() => {
          // Ensure the loading class is removed
          document.body.classList.remove("loading-active");
          // Notify parent component to remove loading screen
          onComplete();
        }, 1000);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  // Rotate through loading messages
  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % loadingMessages.length);
    }, 1500);

    return () => clearInterval(messageInterval);
  }, [loadingMessages.length]);

  // Use client-side only rendering to avoid hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Return null on server-side render
  }

  return (
    <AnimatePresence>
      {!animationComplete && (
        <motion.div
          data-loading-screen="true"
          className="fixed inset-0 z-[9999] bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "all",
          }}
        >
          
          <div className="relative min-h-screen overflow-hidden bg-black flex flex-col items-center justify-center">
            {/* Subtle luxury pattern background */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23${goldColor.substring(1)}' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: "60px 60px",
                }}
              />
            </div>

            {/* Main content */}
            <div className="relative z-10 flex flex-col items-center justify-center gap-12 px-4">
              {/* Luxury house animation */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative w-64 h-64 flex items-center justify-center">
                  {/* Architectural house drawing */}
                  <motion.div
                    className="absolute w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      {/* Main structure - modern luxury house */}
                      <motion.path
                        d="M10 70 L10 40 L50 15 L90 40 L90 70"
                        fill="none"
                        stroke={goldColor}
                        strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      />

                      {/* Base/foundation */}
                      <motion.path
                        d="M5 70 L95 70"
                        fill="none"
                        stroke={goldColor}
                        strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 1,
                          ease: "easeInOut",
                          delay: 1.8,
                        }}
                      />

                      {/* Left wing */}
                      <motion.path
                        d="M10 70 L10 40 L30 40 L30 70"
                        fill="none"
                        stroke={goldColor}
                        strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 1.5,
                          ease: "easeInOut",
                          delay: 2,
                        }}
                      />

                      {/* Right wing */}
                      <motion.path
                        d="M70 70 L70 40 L90 40 L90 70"
                        fill="none"
                        stroke={goldColor}
                        strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 1.5,
                          ease: "easeInOut",
                          delay: 2,
                        }}
                      />

                      {/* Center structure */}
                      <motion.path
                        d="M30 70 L30 50 L70 50 L70 70"
                        fill="none"
                        stroke={goldColor}
                        strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 1.5,
                          ease: "easeInOut",
                          delay: 2.5,
                        }}
                      />

                      {/* Door */}
                      <motion.path
                        d="M45 70 L45 55 L55 55 L55 70"
                        fill="none"
                        stroke={goldColor}
                        strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 0.8,
                          ease: "easeInOut",
                          delay: 3.2,
                        }}
                      />

                      {/* Windows */}
                      <motion.path
                        d="M15 50 L25 50 L25 60 L15 60 Z"
                        fill="none"
                        stroke={goldColor}
                        strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 0.8,
                          ease: "easeInOut",
                          delay: 3.5,
                        }}
                      />

                      <motion.path
                        d="M75 50 L85 50 L85 60 L75 60 Z"
                        fill="none"
                        stroke={goldColor}
                        strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 0.8,
                          ease: "easeInOut",
                          delay: 3.5,
                        }}
                      />

                      {/* Pool */}
                      <motion.path
                        d="M35 80 L65 80 L65 90 L35 90 Z"
                        fill="none"
                        stroke={goldColor}
                        strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 0.8,
                          ease: "easeInOut",
                          delay: 3.8,
                        }}
                      />

                      {/* Driveway */}
                      <motion.path
                        d="M45 70 L45 80 M55 70 L55 80"
                        fill="none"
                        stroke={goldColor}
                        strokeWidth="0.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{
                          duration: 0.5,
                          ease: "easeInOut",
                          delay: 4,
                        }}
                      />
                    </svg>
                  </motion.div>

                  {/* Subtle gold particles */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full"
                      style={{ backgroundColor: goldColor }}
                      initial={{
                        x: (Math.random() - 0.5) * 100,
                        y: (Math.random() - 0.5) * 100,
                        opacity: 0,
                      }}
                      animate={{
                        x: (Math.random() - 0.5) * 150,
                        y: (Math.random() - 0.5) * 150,
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        delay: Math.random() * 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    />
                  ))}

                  {/* Rotating gold accent */}
                  <motion.div
                    className="absolute w-40 h-40 rounded-full border border-white/10"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  >
                    <motion.div
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: goldColor,
                        top: "0%",
                        left: "50%",
                        marginLeft: "-1px",
                        marginTop: "-1px",
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Loading text */}
              <motion.div
                className="text-center max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.h2
                  className="text-xl font-light text-white mb-2"
                  key={currentMessage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{ letterSpacing: "0.2em" }}
                >
                  {loadingMessages[currentMessage].toUpperCase()}
                </motion.h2>

                <p
                  className="text-white/50 mb-8 font-light"
                  style={{ letterSpacing: "0.1em" }}
                >
                  GGW CAPITAL
                </p>

                {/* Elegant progress bar */}
                <div className="w-full h-px bg-white/20 overflow-hidden">
                  <motion.div
                    style={{ height: "100%", width: `${progress}%` }}
                    className="bg-ggw-gradient"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>

                <motion.div
                  className="mt-4 text-xs text-white/40 flex justify-between font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  style={{ letterSpacing: "0.1em" }}
                >
                  <span>PREPARING YOUR EXPERIENCE</span>
                  <span>{progress}%</span>
                </motion.div>
              </motion.div>
            </div>

            {/* Luxury corner accents */}
            <div className="absolute top-8 left-8">
              <motion.div
                className="w-16 h-16 opacity-50"
                animate={{
                  rotate: [0, 5, 0],
                  x: [0, 3, 0],
                  y: [0, 3, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <motion.path
                    d="M20 20 L80 20 L80 80 L20 80 Z"
                    fill="none"
                    stroke="white"
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 6,
                    }}
                  />
                </svg>
              </motion.div>
            </div>

            <div className="absolute bottom-8 right-8">
              <motion.div
                className="w-16 h-16 opacity-50"
                animate={{
                  rotate: [0, -5, 0],
                  x: [0, -3, 0],
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke={goldColor}
                    strokeWidth="0.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 6,
                    }}
                  />
                </svg>
              </motion.div>
            </div>

            {/* Luxury brand mark */}
            <div className="absolute top-8 right-8 flex items-center">
              <motion.div
                className="text-white/70 text-xs font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                style={{ letterSpacing: "0.2em" }}
              >
                <Image
                  src="/images/ggw-capital-logo.svg"
                  alt="GGW Capital"
                  width={120}
                  height={40}
                  priority
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
