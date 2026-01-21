// app/page.tsx
"use client";
import HeroMedia from "../../components/HeroMedia";
import VideoGridGallery from "../../components/VideoGridGallery";


const VIDEOS = [
  { id: "v1", src: "/videos/river.mp4", poster: "/images/cover_river.jpg", title: "Wander" },
  { id: "v2", src: "/videos/udaipur.mp4", poster: "/images/cover_udaipur.jpg", title: "Udaipur" },
  { id: "v3", src: "/videos/IMG_3086.mp4", poster: "/images/cover_river.jpg", title: "Haven" },
  { id: "v4", src: "/videos/IMG_3087.mp4", poster: "/images/cover_udaipur.jpg", title: "Nature walk" },
];


export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-orange-500/30">
      <HeroMedia />

      {/* Video Gallery Section */}
      <div className="relative py-20 bg-black text-white min-h-screen">
        {/* Background Ambience */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="film-grain absolute inset-0 opacity-[0.05]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl py-2 md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50 mb-4 tracking-tight">
              Moving Frames
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
              Capturing life's moments through the lens. A collection of visual stories.
            </p>
          </div>

          {/* Video Grid */}
          <VideoGridGallery items={VIDEOS} />
        </div>
      </div>
    </main>
  );
}
