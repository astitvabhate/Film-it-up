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
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const [ratio, setRatio] = useState(0); // intersection ratio 0..1
  const [muted, setMuted] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalMuted, setIsModalMuted] = useState(true);
  const [isModalPlaying, setIsModalPlaying] = useState(true);

  // IntersectionObserver: update ratio and play/pause depending on visibility
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const r = Math.max(0, Math.min(1, entry.intersectionRatio));
          setRatio(r);

          const v = previewVideoRef.current;
          if (!v) return;

          if (isModalOpen) {
            v.pause();
            return;
          }

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
  }, [isModalOpen, muted, playThreshold]);

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
    const preview = previewVideoRef.current;
    if (!preview) return;

    if (isModalOpen) {
      preview.pause();
      return;
    }

    if (ratio >= playThreshold) {
      preview.muted = muted;
      preview.play().catch(() => {
        /* ignore autoplay failures */
      });
    }
  }, [isModalOpen, muted, playThreshold, ratio]);

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
  }, [isModalOpen, isModalMuted, isModalPlaying]);

  // compute scale from ratio: when fully visible -> 1, when just visible -> 0.92 (you can tweak)
  const minScale = 0.92;
  const scale = minScale + (1 - minScale) * Math.pow(ratio, 1.1); // smooth curve

  const toggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const v = previewVideoRef.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
  };

  const openModal = () => {
    setIsModalMuted(muted);
    setIsModalPlaying(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalPlaying(false);
  };

  const toggleModalMute = () => {
    const v = modalVideoRef.current;
    if (!v) return;
    const nextMuted = !isModalMuted;
    v.muted = nextMuted;
    setIsModalMuted(nextMuted);
  };

  const toggleModalPlayback = () => {
    const v = modalVideoRef.current;
    if (!v) return;

    if (v.paused) {
      v.play().then(() => setIsModalPlaying(true)).catch(() => {
        setIsModalPlaying(false);
      });
      return;
    }

    v.pause();
    setIsModalPlaying(false);
  };

  return (
    <>
      <div
        ref={containerRef}
        className={`relative rounded-lg overflow-hidden bg-black ${className}`}
        style={{
          transform: `scale(${scale})`,
          transition: "transform 200ms linear",
          willChange: "transform, opacity",
        }}
      >
        <button
          type="button"
          onClick={openModal}
          className="absolute inset-0 z-10 cursor-pointer"
          aria-label={title ? `Open ${title} video` : "Open video"}
        />

        {title && (
          <div className="absolute left-3 top-3 z-20 bg-black/40 text-white text-xs px-2 py-1 rounded">
            {title}
          </div>
        )}

        <video
          ref={previewVideoRef}
          src={src}
          poster={poster}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          className="w-full h-48 sm:h-56 md:h-72 object-cover"
        />

        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute preview" : "Mute preview"}
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

      {isModalOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/85 px-4 py-6 backdrop-blur-sm"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={title ? `${title} video popup` : "Video popup"}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <video
              ref={modalVideoRef}
              src={src}
              poster={poster}
              muted={isModalMuted}
              loop
              playsInline
              autoPlay
              className="max-h-[80vh] w-full bg-black object-contain"
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
              <div className="min-w-0">
                {title && <p className="truncate text-sm font-medium text-white/90">{title}</p>}
              </div>

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
