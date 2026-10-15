"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";

let lenis: Lenis | null = null;

/** Lenis smooth scrolling — desktop with a fine pointer only. Mobile keeps native scroll. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    let cancelled = false;
    import("lenis").then(({ default: L }) => {
      if (cancelled) return;
      lenis = new L({ autoRaf: true, lerp: 0.11, anchors: true });
    });
    return () => {
      cancelled = true;
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}

export function getLenis() {
  return lenis;
}
