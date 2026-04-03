// app/page.tsx
"use client";
import Link from "next/link";
import HeroMedia from "../../components/HeroMedia";
import VideoGridGallery from "../../components/VideoGridGallery";


const VIDEOS = [
  { id: "v1", src: "/videos/IMG_3107.mp4", poster: "/images/31107.jpg" },
  { id: "v2", src: "/videos/udaipur.mp4", poster: "/images/cover_udaipur.jpg"},
  { id: "v3", src: "/videos/IMG_3086.mp4", poster: "/images/3086.jpg" },
  { id: "v4", src: "/videos/IMG_3087.mp4", poster: "/images/3087.jpg" },
  

];


export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <HeroMedia />

      <div className="min-h-screen bg-black py-10 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:max-w-xl">
            <p className="text-xs uppercase tracking-[0.35em] text-white/55">Work With Me</p>
            <h2 className="text-2xl font-semibold sm:text-3xl">Let&apos;s build your next visual story.</h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/brandCollab"
              className="rounded-full border border-white/15 bg-white px-6 py-3 text-center text-sm font-semibold text-black transition hover:bg-white/90"
            >
              My Work
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <h1 className="mb-6 px-4 text-3xl font-bold">
            Moving Frames
          </h1>
          <VideoGridGallery items={VIDEOS} />
        </div>
      </div>
    </main>
  );
}
