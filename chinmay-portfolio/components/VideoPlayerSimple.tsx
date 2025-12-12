// components/VideoPlayerSimple.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";

export default function VideoPlayerSimple({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = muted;
    v.play().catch(() => {
      /* autoplay may be blocked on some browsers */
    });
  }, [src, muted]);

  const toggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const v = ref.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay
        loop
        playsInline
        muted={muted}
        className="w-full h-full object-cover"
      />

      {/* mute button */}
      <button
        onClick={toggleMute}
        aria-label={muted ? "Unmute" : "Mute"}
        className="absolute bottom-3 right-3 z-30 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition"
      >
        {muted ? (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 9v6h4l5 4V5L9 9H5z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5 12c0-1.77-.77-3.36-2-4.47v8.94A6.98 6.98 0 0016.5 12z" />
            <path d="M5 9v6h4l5 4V5L9 9H5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
