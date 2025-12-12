// components/VideoPlayer.tsx
"use client";

import { useRef, useState, useEffect } from "react";

type Props = {
  src: string;
  poster: string; // cover image
};

export default function VideoPlayer({ src, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [muted, setMuted] = useState(true);
  const [loaded, setLoaded] = useState(false); // fade-out cover image

  // Auto-play when loaded
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = true; // required for autoplay
    const playVideo = async () => {
      try {
        await v.play();
      } catch {}
    };

    v.addEventListener("loadeddata", () => {
      setLoaded(true);
      playVideo();
    });

    playVideo();
  }, []);

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      {/* Cover Image */}
      <img
        src={poster}
        alt="Cover"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Video */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted={muted}
        playsInline
        className="w-full h-full object-cover"
      />

      {/* Mute/Unmute Button */}
      <button
        onClick={toggleMute}
        className="absolute bottom-3 right-3 z-30 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition"
      >
        {muted ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 9v6h4l5 4V5L9 9H5z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16.5 12c0-1.77-.77-3.36-2-4.47v8.94A6.98 6.98 0 0016.5 12z" />
            <path d="M5 9v6h4l5 4V5L9 9H5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
