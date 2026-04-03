"use client";
import React, { useEffect, useRef, useState } from "react";
import VideoReelItem, { Reel } from "./VideoReelItem";

export default function BrandReels({ reels }: { reels: Reel[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const height = window.innerHeight;
      if (["ArrowDown", "PageDown"].includes(e.key)) {
        window.scrollBy({ top: height, left: 0, behavior: "smooth" });
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        window.scrollBy({ top: -height, left: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const els = Array.from(sectionRefs.current.values());
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // pick the entry with the largest intersectionRatio (center wins)
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
        }
        if (best) {
          const id = best.target.getAttribute("data-id");
          // require a decent overlap to be considered active (avoid rapid flicker)
          if (id && best.intersectionRatio > 0.45) {
            setActiveId(id);
          }
        }
      },
      {
        threshold: Array.from({ length: 21 }, (_, i) => i / 20), // fine-grained
        root: containerRef.current ?? null,
      }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reels]);

  return (
    // container: take full viewport height, prevent horizontal overflow
    <div
      ref={containerRef}
      className="w-full h-screen snap-y snap-mandatory overflow-y-scroll overflow-x-hidden scroll-smooth bg-black"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {reels.map((r) => (
        <section
          key={r.id}
          data-id={r.id}
          ref={(el) => {
            if (!el) {
              sectionRefs.current.delete(r.id);
            } else {
              sectionRefs.current.set(r.id, el);
            }
          }}
          className="snap-start h-screen w-full"
        >
          {/* pass active boolean so only the active one plays/loads */}
          <VideoReelItem reel={r} active={activeId === r.id} />
        </section>
      ))}
    </div>
  );
}
