"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export type Reel = {
  id: string;
  src: string;
  poster?: string;
  brand?: string;
  caption?: string;
};

interface VideoReelItemProps {
  reel: Reel;
  onClick: (reel: Reel) => void;
}

export default function VideoReelItem({ reel, onClick }: VideoReelItemProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Handle Play/Pause on Hover
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Helper to safely play
    const safePlay = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        // Auto-play was prevented
        console.warn("Autoplay prevented:", error);
        setIsPlaying(false);
      }
    };

    if (isHovered) {
      safePlay();
    } else {
      video.pause();
      // Optional: reset to start if you want it to restart every hover
      // video.currentTime = 0; 
      setIsPlaying(false);
    }
  }, [isHovered]);

  return (
    <motion.div
      className="group relative w-full aspect-[9/16] rounded-xl overflow-hidden cursor-pointer bg-zinc-900 border border-white/5 shadow-lg will-change-transform"
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(reel)}
    >
      {/* Video / Poster Layer */}
      <video
        ref={videoRef}
        src={reel.src}
        poster={reel.poster}
        muted
        playsInline
        loop
        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Overlay: Gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

      {/* Brand Badge (Top Left) */}
      {reel.brand && (
        <div className="absolute top-3 left-3 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full">
          <span className="text-xs font-medium text-white/90 tracking-wide uppercase">
            {reel.brand}
          </span>
        </div>
      )}

      {/* Play Icon (Center - hidden when playing) */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
          {/* Simple Play Icon SVG */}
          <svg
            className="w-5 h-5 text-white fill-current translate-x-0.5"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Caption Content (Bottom) */}
      <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white font-medium text-sm leading-snug line-clamp-2 drop-shadow-md">
          {reel.caption || "Brand Collaboration"}
        </h3>
        <div className="h-0.5 w-0 group-hover:w-full bg-orange-500 mt-3 transition-all duration-500 delay-100" />
      </div>
    </motion.div>
  );
}
