"use client";

import { useEffect, useRef } from "react";

const FADE_OUT = 2; // seconds

// Full-screen player for a user-supplied scene clip (see public/scenes).
// Calls onFlash once, `flashAt` seconds in (default: 1.5s before the end) so
// the page can re-form underneath, then onDone when the clip ends. Any
// playback problem calls onFail so the caller can fall back to the canvas scene.
export function SceneVideo({
  src,
  flashAt,
  onFlash,
  onDone,
  onFail,
}: {
  src: string;
  flashAt?: number;
  onFlash: () => void;
  onDone: () => void;
  onFail: () => void;
}) {
  const video = useRef<HTMLVideoElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const flashed = useRef(false);
  const ended = useRef(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    // The click that started the prune lets us try sound first; fall back to muted.
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(onFail);
    });

    // Soft ending: over the last FADE_OUT seconds the picture and sound fade
    // away together, dissolving into the re-formed page instead of stopping dead.
    // A timer (not rAF) drives it so the sound fade still runs when frames are
    // throttled; a short CSS transition keeps the picture fade smooth.
    const tick = () => {
      const d = v.duration;
      if (Number.isFinite(d) && d > FADE_OUT) {
        const k = Math.min(1, Math.max(0, (d - v.currentTime) / FADE_OUT));
        if (wrap.current) wrap.current.style.opacity = String(k);
        v.volume = k;
      }
    };
    const id = setInterval(tick, 50);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finish = () => {
    if (ended.current) return;
    ended.current = true;
    if (!flashed.current) {
      flashed.current = true;
      onFlash();
    }
    onDone();
  };

  return (
    <div ref={wrap} className="fixed inset-0 z-[260] bg-black transition-opacity duration-100 ease-linear" role="status" aria-label="Scene: the timeline is restored">
      <video
        ref={video}
        src={src}
        playsInline
        preload="auto"
        className="h-full w-full object-contain"
        onError={onFail}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          const at = flashAt ?? Math.max(0, v.duration - 1.5);
          if (!flashed.current && v.currentTime >= at) {
            flashed.current = true;
            onFlash();
          }
        }}
        onEnded={finish}
      />
      <button
        onClick={finish}
        className="absolute bottom-4 right-4 border border-border bg-background/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted backdrop-blur hover:text-accent-primary"
      >
        Skip scene ›
      </button>
    </div>
  );
}
