// components/VideoGridGallery.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoVolumeHigh, IoVolumeMute } from "react-icons/io5";

export type Item = {
  id: string;
  src: string;
  poster?: string;
  title?: string;
};

interface VideoCardProps {
  item: Item;
  onClick: (item: Item) => void;
}

function VideoCard({ item, onClick }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Handle Play/Pause on Hover
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const safePlay = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (error) {
        console.warn("Autoplay prevented:", error);
        setIsPlaying(false);
      }
    };

    if (isHovered) {
      safePlay();
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isHovered]);

  return (
    <motion.div
      className="group relative w-full aspect-video rounded-xl overflow-hidden cursor-pointer bg-zinc-900 border border-white/5 shadow-lg will-change-transform"
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(item)}
    >
      {/* Video / Poster Layer */}
      <video
        ref={videoRef}
        src={item.src}
        poster={item.poster}
        muted
        playsInline
        loop
        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Overlay: Gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

      {/* Play Icon (Center - hidden when playing) */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform duration-300">
          <svg
            className="w-6 h-6 text-white fill-current translate-x-0.5"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Title Content (Bottom) */}
      {item.title && (
        <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-medium text-base leading-snug drop-shadow-md">
            {item.title}
          </h3>
          <div className="h-0.5 w-0 group-hover:w-full bg-orange-500 mt-3 transition-all duration-500 delay-100" />
        </div>
      )}
    </motion.div>
  );
}

export default function VideoGridGallery({ items }: { items: Item[] }) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedItem(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Grid Layout */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((item) => (
            <VideoCard
              key={item.id}
              item={item}
              onClick={(it) => setSelectedItem(it)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
            onClick={() => setSelectedItem(null)}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedItem(null);
              }}
              className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
            >
              <IoClose size={24} />
            </button>

            {/* Video Container */}
            <motion.div
              layoutId={`video-${selectedItem.id}`}
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={selectedItem.src}
                className="w-full h-full object-cover"
                autoPlay
                loop
                playsInline
                muted={isMuted}
              />

              {/* Mute Toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                }}
                className="absolute bottom-6 right-6 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition backdrop-blur-md"
              >
                {isMuted ? <IoVolumeMute size={20} /> : <IoVolumeHigh size={20} />}
              </button>

              {/* Info Overlay */}
              {selectedItem.title && (
                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
                  <h2 className="text-xl md:text-2xl font-bold text-white">
                    {selectedItem.title}
                  </h2>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
