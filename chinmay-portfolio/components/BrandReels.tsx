"use client";
import React, { useState, useEffect } from "react";
import VideoReelItem, { Reel } from "./VideoReelItem";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoVolumeHigh, IoVolumeMute } from "react-icons/io5"; // Assuming react-icons is available, else I'll use SVGs.

/* 
  Since I saw react-icons in package.json (v5.5.0), I'll use it.
  If import fails, I will fallback to SVG.
*/

export default function BrandReels({ reels }: { reels: Reel[] }) {
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedReel(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Grid Layout */}
      <div className="w-full max-w-[1400px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {reels.map((reel) => (
            <VideoReelItem
              key={reel.id}
              reel={reel}
              onClick={(r) => setSelectedReel(r)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
            onClick={() => setSelectedReel(null)}
          >
            {/* Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedReel(null);
              }}
              className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
            >
              <IoClose size={24} />
            </button>

            {/* Video Container */}
            <motion.div
              layoutId={`reel-${selectedReel.id}`}
              className="relative w-full max-w-sm md:max-w-md h-[85vh] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
            >
              <video
                src={selectedReel.src}
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
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
                <span className="inline-block px-2 py-0.5 mb-2 bg-orange-500/80 text-white text-[10px] font-bold uppercase tracking-wider rounded">
                  {selectedReel.brand || "Brand"}
                </span>
                <h2 className="text-xl font-bold text-white mb-1">
                  {selectedReel.caption}
                </h2>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
