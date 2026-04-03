"use client";

import React, { useEffect, useRef, useState } from "react";

export default function BrandWorkVideoCard({
  src,
  poster,
  title,
}: {
  src: string;
  poster?: string;
  title: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const [previewMuted, setPreviewMuted] = useState(true);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalMuted, setIsModalMuted] = useState(true);
  const [isModalPlaying, setIsModalPlaying] = useState(true);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPreviewVisible(entry.isIntersecting && entry.intersectionRatio > 0.35);
      },
      {
        threshold: [0, 0.2, 0.35, 0.5, 0.75],
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const preview = previewVideoRef.current;
    if (!preview) return;

    if (!isPreviewVisible || isModalOpen) {
      preview.pause();
      preview.currentTime = 0;
      preview.load();
      return;
    }

    preview.muted = previewMuted;
    preview.play().catch(() => {
      /* ignore autoplay failures */
    });
  }, [isModalOpen, isPreviewVisible, previewMuted]);

  useEffect(() => {
    if (!isModalOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isModalOpen]);

  useEffect(() => {
    const modalVideo = modalVideoRef.current;
    if (!modalVideo || !isModalOpen) return;

    modalVideo.muted = isModalMuted;
    if (isModalPlaying) {
      modalVideo.play().catch(() => {
        setIsModalPlaying(false);
      });
    } else {
      modalVideo.pause();
    }
  }, [isModalMuted, isModalOpen, isModalPlaying]);

  const openModal = () => {
    previewVideoRef.current?.pause();
    setIsModalMuted(false);
    setIsModalPlaying(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalPlaying(false);
  };

  const togglePreviewMute = (event: React.MouseEvent) => {
    event.stopPropagation();
    const preview = previewVideoRef.current;
    if (!preview) return;
    const nextMuted = !previewMuted;
    preview.muted = nextMuted;
    setPreviewMuted(nextMuted);
  };

  const toggleModalMute = () => {
    const modalVideo = modalVideoRef.current;
    if (!modalVideo) return;
    const nextMuted = !isModalMuted;
    modalVideo.muted = nextMuted;
    setIsModalMuted(nextMuted);
  };

  const toggleModalPlayback = () => {
    const modalVideo = modalVideoRef.current;
    if (!modalVideo) return;

    if (modalVideo.paused) {
      modalVideo.play().then(() => setIsModalPlaying(true)).catch(() => {
        setIsModalPlaying(false);
      });
      return;
    }

    modalVideo.pause();
    setIsModalPlaying(false);
  };

  return (
    <>
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-sm border-2 border-white/40 bg-neutral-950 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
      >
        <button
          type="button"
          onClick={openModal}
          aria-label={`Open ${title} video`}
          className="absolute inset-0 z-10 cursor-pointer"
        />

        <video
          ref={previewVideoRef}
          src={isPreviewVisible ? src : undefined}
          poster={poster}
          muted={previewMuted}
          loop
          playsInline
          preload="metadata"
          className="aspect-[9/16] w-full object-cover"
        />

        <button
          type="button"
          onClick={togglePreviewMute}
          aria-label={previewMuted ? "Unmute preview" : "Mute preview"}
          className="absolute bottom-3 right-3 z-20 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
        >
          {previewMuted ? (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M5 9v6h4l5 4V5L9 9H5z" />
            </svg>
          ) : (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.5 12c0-1.77-.77-3.36-2-4.47v8.94A6.98 6.98 0 0016.5 12z" />
              <path d="M5 9v6h4l5 4V5L9 9H5z" />
            </svg>
          )}
        </button>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 px-4 py-6 backdrop-blur-sm"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} video popup`}
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <video
              ref={modalVideoRef}
              src={src}
              poster={poster}
              muted={isModalMuted}
              loop
              autoPlay
              playsInline
              className="max-h-[85vh] w-full bg-black object-contain"
              onPlay={() => setIsModalPlaying(true)}
              onPause={() => setIsModalPlaying(false)}
            />

            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 to-transparent" />

            <button
              type="button"
              onClick={closeModal}
              aria-label="Close popup"
              className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-black/80"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/85 via-black/55 to-transparent px-4 pb-4 pt-10">
              <p className="min-w-0 truncate text-sm font-medium text-white/90">{title}</p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleModalPlayback}
                  aria-label={isModalPlaying ? "Pause video" : "Play video"}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
                >
                  {isModalPlaying ? (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 5h3v14H7zm7 0h3v14h-3z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                <button
                  type="button"
                  onClick={toggleModalMute}
                  aria-label={isModalMuted ? "Unmute video" : "Mute video"}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
                >
                  {isModalMuted ? (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M5 9v6h4l5 4V5L9 9H5z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16.5 12c0-1.77-.77-3.36-2-4.47v8.94A6.98 6.98 0 0016.5 12z" />
                      <path d="M5 9v6h4l5 4V5L9 9H5z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
