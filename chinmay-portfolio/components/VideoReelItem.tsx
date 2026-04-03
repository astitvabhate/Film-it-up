"use client";
import React, { useEffect, useRef, useState } from "react";

export type Reel = {
  id: string;
  src: string;
  poster?: string;
  brand?: string;
  caption?: string;
};

export default function VideoReelItem({
  reel,
  active,
}: {
  reel: Reel;
  active: boolean;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [muted, setMuted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(() => Math.floor(Math.random() * 600 + 40));
  const [progress, setProgress] = useState(0);
  const lastTap = useRef(0);
  const heartRef = useRef<HTMLDivElement | null>(null);

  const [calculatedHeight, setCalculatedHeight] = useState<number | null>(null);

  // Manage loading / unloading src + play/pause strictly from `active`
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (active) {
      // load & play when active
      if (!v.src) {
        v.src = reel.src;
      }
      v.muted = muted;
      v
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    } else {
      // pause and unload when not active (keeps poster visible)
      v.pause();
      setPlaying(false);
      try {
        v.removeAttribute("src");
        v.load();
      } catch {
        // ignore
      }
    }
    // We intentionally exclude 'muted' from deps so play/pause is controlled only by active
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reel.src]);

  // timeupdate & canplay: progress + auto-size based on actual video metadata + container width
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onCanPlay = () => {
      setLoading(false);

// compute aspect ratio from actual video metadata
const vw = v.videoWidth || 9;
const vh = v.videoHeight || 16;
const aspect = vw / vh;

// measure actual card width (prefer cardRef, fallback to containerRef or a default)
const containerEl = cardRef.current ?? containerRef.current;
const measuredWidth = containerEl ? containerEl.clientWidth : 380;

// ideal height based on measured width
let idealHeight = measuredWidth / aspect;

// Allow the card to match the video's natural ideal height and only cap to viewport height.
// (removing the minimum clamping prevents extra vertical black bands)
const maxH = Math.floor(window.innerHeight * 0.98); // allow up to 98vh on tall videos
idealHeight = Math.min(idealHeight, maxH);

setCalculatedHeight(idealHeight);

    };

    const onTime = () => {
      if (!v.duration || Number.isNaN(v.duration)) return setProgress(0);
      setProgress(Math.min(1, v.currentTime / v.duration));
    };

    v.addEventListener("canplay", onCanPlay);
    v.addEventListener("timeupdate", onTime);
    // Also handle loadedmetadata in case canplay fires differently on some browsers
    v.addEventListener("loadedmetadata", onCanPlay);

    return () => {
      v.removeEventListener("canplay", onCanPlay);
      v.removeEventListener("loadedmetadata", onCanPlay);
      v.removeEventListener("timeupdate", onTime);
    };
  }, []);

  const toggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
  };

  const handleTap = () => {
    const now = Date.now();
    const delta = now - lastTap.current;
    lastTap.current = now;

    // double-tap -> like
    if (delta > 0 && delta < 300) {
      setLiked((s) => {
        const next = !s;
        setLikeCount((c) => (next ? c + 1 : Math.max(0, c - 1)));
        return next;
      });
      if (heartRef.current) {
        heartRef.current.animate(
          [
            { transform: "scale(0)", opacity: 0 },
            { transform: "scale(1.2)", opacity: 1 },
            { transform: "scale(1)", opacity: 1 },
            { transform: "scale(0)", opacity: 0 },
          ],
          { duration: 700, easing: "cubic-bezier(.2,.9,.2,1)" }
        );
      }
      return;
    }

    // single-tap toggles play/pause only when active
    if (!active) return;
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  // visual transforms (gentler transform)
  const [visibleRatio] = useState(1); // subtle transform only
  const scale = 0.985 + 0.03 * Math.pow(visibleRatio, 1.1);
  const translateY = (1 - visibleRatio) * 14;

  return (
    <div
      ref={containerRef}
      className="h-screen w-full snap-start bg-transparent flex items-center justify-center box-border"
      onClick={handleTap}
      role="region"
      aria-label={reel.caption ?? reel.brand ?? "Reel"}
    >
      {/* centered card that constrains size */}
      <div
        ref={cardRef}
        className="relative w-full max-w-[380px] sm:max-w-[420px] rounded-2xl overflow-hidden shadow-2xl bg-transparent"
        style={{
          height: calculatedHeight ? `${calculatedHeight}px` : "75vh",
          transition: "height 0.25s ease",
        }}
      >
        {/* video area; src is managed by effect above */}
        <video
          ref={videoRef}
          poster={reel.poster}
          playsInline
          loop
          className="w-full h-full object-cover transition-transform duration-300"
          style={{ transform: `translateY(${translateY}px) scale(${scale})` }}
        />

        {/* top-left brand */}
        {reel.brand && (
          <div className="absolute left-3 top-3 bg-black/45 px-3 py-1 rounded-full text-sm text-white/90 backdrop-blur-sm">
            {reel.brand}
          </div>
        )}

        {/* bottom-left caption */}
        {reel.caption && (
          <div className="absolute left-4 bottom-20 max-w-[66%] text-white text-sm leading-snug drop-shadow-lg">
            <div className="font-semibold text-base">{reel.caption}</div>
          </div>
        )}

        {/* center paused icon - only when active and paused */}
        {!playing && !loading && active && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-14 h-14 rounded-full bg-black/40 flex items-center justify-center">
              <svg className="w-7 h-7 text-white/90" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M5 3v18l15-9L5 3z" />
              </svg>
            </div>
          </div>
        )}

        {/* loading spinner (only when active) */}
        {loading && active && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        )}

        {/* right controls column (compact) */}
        <div className="absolute right-3 bottom-6 flex flex-col items-center gap-3 z-30">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMute(e);
            }}
            className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white hover:scale-105 transition"
            aria-label={muted ? "Unmute" : "Mute"}
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

          <div className="flex flex-col items-center select-none">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLiked((s) => {
                  const n = !s;
                  setLikeCount((c) => (n ? c + 1 : Math.max(0, c - 1)));
                  return n;
                });
                if (heartRef.current) {
                  heartRef.current.animate([{ transform: "scale(1.4)", opacity: 1 }, { transform: "scale(1)", opacity: 1 }], { duration: 260 });
                }
              }}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${liked ? "bg-white/10" : "bg-black/40"} text-white transition`}
              aria-label="Like"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21s-7-4.35-9-7.33C-1.06 8.2 5 4 7.5 6 9 7.5 12 10 12 10s3-2.5 4.5-4c2.5-2 8.56 2.2 4.5 7.67C19 16.65 12 21 12 21z" />
              </svg>
            </button>
            <div className="text-xs mt-1 text-white/80">{likeCount}</div>
          </div>
        </div>

        {/* heart animation layer */}
        <div ref={heartRef} className="pointer-events-none absolute inset-0 flex items-center justify-center z-40" />

        {/* right vertical progress */}
        <div className="absolute right-1 top-3 bottom-3 flex items-center">
          <div className="w-1 rounded-full bg-white/10 h-full overflow-hidden">
            <div className="w-full bg-white" style={{ height: `${progress * 100}%`, transition: "height 180ms linear" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
