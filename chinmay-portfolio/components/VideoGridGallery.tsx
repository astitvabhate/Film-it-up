// components/VideoGridGallery.tsx
"use client";
import React from "react";
import ScrollScaleVideo from "./ScrollScaleVideo";

export type Item = { id: string; src: string; poster?: string; title?: string };

export default function VideoGridGallery({ items }: { items: Item[] }) {
  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Mobile = 1 column, Desktop = 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((it) => (
          <ScrollScaleVideo
            key={it.id}
            src={it.src}
            poster={it.poster}
            title={it.title}
          />
        ))}
      </div>
    </div>
  );
}
