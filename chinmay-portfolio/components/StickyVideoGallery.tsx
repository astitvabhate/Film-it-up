// components/StickyVideoGallery.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import VideoPlayerSimple from "./VideoPlayerSimple";

export type VideoItem = { id: string; src: string; poster?: string; title?: string };

export default function StickyVideoGallery({
  videos,
  initialIndex = 0,
  minScale = 0.45, // smallest scale when scrolled
  shrinkDistance = 240, // scroll distance over which shrink happens
}: {
  videos: VideoItem[];
  initialIndex?: number;
  minScale?: number;
  shrinkDistance?: number;
}) {
  const [current, setCurrent] = useState(initialIndex);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [topOffset, setTopOffset] = useState(0);

  // compute scale based on scroll
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const t = Math.min(Math.max(y / shrinkDistance, 0), 1); // 0..1
      const newScale = 1 - t * (1 - minScale);
      setScale(newScale);

      // compute vertical translate so it appears to move up slightly while shrinking
      const translate = - (1 - newScale) * (stickyRef.current?.offsetHeight || 0) * 0.35;
      setTopOffset(translate);
    };

    // initial call
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [minScale, shrinkDistance]);

  return (
    <div className="w-full">
      {/* Sticky wrapper */}
      <div
        ref={stickyRef}
        className="sticky top-0 z-40 flex items-start justify-center"
        style={{
          // keep pointer events for children
          pointerEvents: "auto",
          // ensure sticky element height doesn't collapse:
          // we will apply transform to its inner, keeping layout stable
        }}
      >
        <div
          className="w-full max-w-5xl transition-transform duration-150 ease-out"
          style={{
            transform: `translateY(${topOffset}px) scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <VideoPlayerSimple src={videos[current].src} poster={videos[current].poster} />
          </div>
        </div>
      </div>

      {/* Page content (list of video cards) */}
      <div className="max-w-5xl mx-auto mt-6 space-y-6 px-4">
        {videos.map((v, i) => (
          <article
            key={v.id}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
          >
            <div
              className="md:col-span-1 cursor-pointer rounded-lg overflow-hidden"
              onClick={() => {
                setCurrent(i);
                // optionally scroll to top so user sees the sticky change
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <img src={v.poster ?? v.src} alt={v.title ?? `video-${i}`} className="w-full h-28 object-cover" />
            </div>

            <div className="md:col-span-3">
              <h3 className="text-lg font-semibold">{v.title ?? `Clip ${i + 1}`}</h3>
              <p className="text-sm text-neutral-400 mt-1">
                Lorem ipsum dolor sit amet — use this area for description, duration, camera, etc.
              </p>
            </div>
          </article>
        ))}

        {/* filler content so page scrolls nicely for demo */}
        <div className="h-40" />
      </div>
    </div>
  );
}
