"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroMedia() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Get scroll progress for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Scroll progress specifically for the heading (rises up as you scroll)
  const { scrollYProgress: headingScrollProgress } = useScroll({
    target: headingRef,
    offset: ["start end", "end start"]
  });

  // Image transformations - reduced on mobile
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "15%" : "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1.05 : 1.15]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, isMobile ? 0.7 : 0.4]);

  // Text overlay transformations - simplified on mobile
  const overlayY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "25%" : "50%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 0.8, 0]);
  const overlayScale = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 0.95 : 0.9]);

  // Big heading animations - Different behavior for mobile vs desktop
  // Mobile: Text zooms in (gets bigger) and fades out like coming toward camera
  // Desktop: Text rises up smoothly
  const headingY = useTransform(
    headingScrollProgress,
    [0, 0.3, 0.7, 1],
    isMobile
      ? ["50px", "0px", "-30px", "-60px"]  // Less Y movement on mobile
      : ["150px", "0px", "-80px", "-200px"]
  );
  const headingOpacity = useTransform(
    headingScrollProgress,
    [0, 0.2, 0.6, 0.85, 1],
    isMobile
      ? [0, 1, 1, 0.3, 0]  // Faster fade out on mobile
      : [0, 1, 1, 1, 0]
  );
  const headingScale = useTransform(
    headingScrollProgress,
    [0, 0.3, 0.6, 0.85, 1],
    isMobile
      ? [0.8, 1, 1.3, 2, 2.5]  // Dramatic zoom on mobile (gets much bigger)
      : [0.9, 1, 1.05, 1.1, 1.1]
  );

  // Content section transformations
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "-10%" : "-20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.5]);

  return (
    <div ref={containerRef} className="relative w-full max-w-7xl mx-auto mb-3 z-20">
      <div className="relative w-full overflow-hidden rounded-2xl aspect-video">
        {/* Parallax hero image with zoom */}
        <motion.img
          src="/images/chinmay.jpg"
          alt="Chinmay Kunhare"
          className="w-full h-full object-cover absolute inset-0 scale-x-[-1]"
          style={{
            y: imageY,
            scale: imageScale,
            opacity: imageOpacity,
            willChange: "transform, opacity"
          }}
        />

        {/* Animated overlay text */}
        <motion.div
          className="absolute inset-0 z-10 flex flex-col justify-end px-4 pb-10 text-gray-900"
          style={{
            y: overlayY,
            opacity: overlayOpacity,
            scale: overlayScale,
            willChange: "transform, opacity"
          }}
        >
          <motion.p
            className="absolute text-[8px] sm:text-xs tracking-widest text-amber-50 top-2 left-4 opacity-90 font-semibold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.9, x: 0 }}
            transition={{ duration: isMobile ? 0.5 : 0.8, delay: 0.3 }}
          >
            *MAKING EVERY STORY UNFORGETTABLE
          </motion.p>

          {/* Name and title with stagger */}
          <motion.div
            className="origin-bottom-left scale-[0.75] sm:scale-90 md:scale-100"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0.5 : 0.8, delay: 0.5 }}
          >
            <h1 className="text-3xl sm:text-6xl md:text-6xl lg:text-6xl font-extrabold">
              Chinmay Kunhare
            </h1>
            <p className="opacity-100 text-2xl font-bold">Cinematographer</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Big animated heading - RISES UP while scrolling */}
      <div ref={headingRef} className="relative min-h-[300px] sm:min-h-[400px] overflow-visible">
        <motion.h1
          className="relative z-30 font-black py-8 text-white uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] tracking-tighter text-center"
          style={{
            y: headingY,
            opacity: headingOpacity,
            scale: headingScale,
            willChange: "transform, opacity"
          }}
        >
          <span className="inline-block">Enter a world</span>
          <span className="block bg-gradient-to-r from-orange-200 via-orange-400 to-orange-500 bg-clip-text text-transparent">
            Of Cinematic
          </span>
          <span className="block">Storytelling</span>
          <span className="block">through my lens</span>
        </motion.h1>
      </div>

      {/* Content section with scroll effects */}
      <motion.div
        className="relative w-full"
        style={{
          y: contentY,
          opacity: contentOpacity,
          willChange: "transform, opacity"
        }}
      >
        <div className="relative w-full">
          <div className="w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent backdrop-blur-md border-y border-white/10 py-10 px-4 sm:px-8 md:px-12">
            <div className="max-w-6xl mx-auto">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-4">
                Crafting Stories Through Motion
              </h3>

              <p className="text-base sm:text-lg md:text-xl leading-relaxed text-neutral-200">
                I'm <span className="font-extrabold text-white">Chinmay Kunhare</span>,
                a videographer and cinematographer who believes in capturing moments that speak
                beyond the frame. With a love for storytelling and a strong visual instinct, I create
                films and visuals that feel immersive, expressive, and full of life. My work blends
                creativity, emotion, and cinematic composition to deliver stories that stay with
                the audience.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}