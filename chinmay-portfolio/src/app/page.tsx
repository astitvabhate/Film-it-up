// app/page.tsx
"use client";
import HeroMedia from "../../components/HeroMedia";
import VideoPlayer from "../../components/VideoPlayer";
import StickyVideoGallery from "../../components/StickyVideoGallery";
import VideoGridGallery from "../../components/VideoGridGallery";


const VIDEOS = [
  { id: "v1", src: "/videos/river.mp4", poster: "/images/cover_river.jpg", title: "Wander" },
  { id: "v2", src: "/videos/udaipur.mp4", poster: "/images/cover_udaipur.jpg", title: "Udaipur" },
  { id: "v3", src: "/videos/IMG_3086.mp4", poster: "/images/cover_river.jpg", title: "Haven" },
  { id: "v4", src: "/videos/IMG_3087.mp4", poster: "/images/cover_udaipur.jpg", title: "Nature walk" },
  

];


export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <HeroMedia />
    <div className="py-10 bg-black text-white min-h-screen">
      <h1 className=" px-4 text-3xl font-bold mb-6">
        Moving Frames :)
      </h1>
      <VideoGridGallery items={VIDEOS}/>
    </div>
    </main>
  );
}
