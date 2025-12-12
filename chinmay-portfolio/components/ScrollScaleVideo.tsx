// components/ScrollScaleVideo.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  title?: string;
  className?: string;
  playThreshold?: number; // intersection ratio to start playing (0..1)
};

export default function ScrollScaleVideo({
  src,
  poster,
  title,
  className = "",
  playThreshold = 0.45,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [ratio, setRatio] = useState(0); // intersection ratio 0..1
  const [muted, setMuted] = useState(true);

  // IntersectionObserver: update ratio and play/pause depending on visibility
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const r = Math.max(0, Math.min(1, entry.intersectionRatio));
          setRatio(r);

          const v = videoRef.current;
          if (!v) return;

          // autoplay when sufficiently visible, pause when not
          if (r >= playThreshold) {
            // try to play (muted makes autoplay allowed)
            v.muted = muted;
            v.play().catch(() => {
              /* ignore autoplay failures */
            });
          } else {
            v.pause();
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: Array.from({ length: 21 }, (_, i) => i / 20), // 0,0.05,...1
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [playThreshold, muted]);

  // compute scale from ratio: when fully visible -> 1, when just visible -> 0.92 (you can tweak)
  const minScale = 0.92;
  const scale = minScale + (1 - minScale) * Math.pow(ratio, 1.1); // smooth curve

  const toggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-lg overflow-hidden bg-black ${className}`}
      style={{
        transform: `scale(${scale})`,
        transition: "transform 200ms linear",
        willChange: "transform, opacity",
      }}
    >
      {/* optional title overlay (small) */}
      {title && (
        <div className="absolute left-3 top-3 z-20 bg-black/40 text-white text-xs px-2 py-1 rounded">
          {title}
        </div>
      )}

      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        className="w-full h-48 sm:h-56 md:h-72 object-cover"
      />

      {/* mute button */}
      <button
        onClick={toggleMute}
        aria-label={muted ? "Unmute" : "Mute"}
        className="absolute right-3 bottom-3 z-30 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition"
      >
        {muted ? (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 9v6h4l5 4V5L9 9H5z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 12c0-1.77-.77-3.36-2-4.47v8.94A6.98 6.98 0 0016.5 12z" />
            <path d="M5 9v6h4l5 4V5L9 9H5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
