"use client";

import { useEffect, useRef } from "react";

/**
 * Muted looping screen recording for case-study covers.
 * Plays only while on screen, pauses off-screen, and never autoplays for
 * visitors who prefer reduced motion (the poster frame is shown instead).
 */
export function CoverVideo({ src, poster, label }: { src: string; poster?: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      className="absolute inset-0 size-full object-cover"
    />
  );
}
