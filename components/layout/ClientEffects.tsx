"use client";

import { useEffect, useRef } from "react";
import { captureAttribution } from "@/lib/attribution";

export function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}

/** Current year, written on the client (Cache Components forbids `new Date()` during prerender). */
export function Year({ fallback }: { fallback: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.textContent = String(new Date().getFullYear());
  }, []);
  return <span ref={ref}>{fallback}</span>;
}
