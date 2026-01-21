// app/page.tsx
"use client";
import HeroMedia from "../../components/HeroMedia";
import VideoGridGallery from "../../components/VideoGridGallery";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const VIDEOS = [
  { id: "v1", src: "/videos/river.mp4", poster: "/images/cover_river.jpg", title: "Wander" },
  { id: "v2", src: "/videos/udaipur.mp4", poster: "/images/cover_udaipur.jpg", title: "Udaipur" },
  { id: "v3", src: "/videos/IMG_3086.mp4", poster: "/images/cover_river.jpg", title: "Haven" },
  { id: "v4", src: "/videos/IMG_3087.mp4", poster: "/images/cover_udaipur.jpg", title: "Nature walk" },
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effect for the background grain
  const grainY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const grainOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.05, 0.08, 0.06, 0.03]);

  // Scale effect for the header
  const headerScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.7]);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-orange-500/30">
      <HeroMedia />

      {/* Video Gallery Section */}
      <div ref={containerRef} className="relative py-20 bg-black text-white min-h-screen">
        {/* Animated Background Ambience */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-0"
          style={{ opacity: grainOpacity }}
        >
          <motion.div
            className="film-grain absolute inset-0"
            style={{ y: grainY }}
          />
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          {/* Animated Section Header */}
          <motion.div
            className="mb-16 text-center"
            style={{
              scale: headerScale,
              opacity: headerOpacity
            }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl py-2 md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50 mb-4 tracking-tight"
            >
              Moving Frames
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-lg text-white/60 max-w-2xl mx-auto font-light"
            >
              Capturing life's moments through the lens. A collection of visual stories.
            </motion.p>

            {/* Decorative animated line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mx-auto mt-6 h-0.5 w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
            />
          </motion.div>

          {/* Floating accent elements */}
          <motion.div
            className="absolute top-20 right-10 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl pointer-events-none"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-40 left-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"
            animate={{
              y: [0, 20, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />

          {/* Video Grid with entrance animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <VideoGridGallery items={VIDEOS} />
          </motion.div>
        </div>
      </div>
    </main>
  );
}
