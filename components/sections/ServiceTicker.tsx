"use client";

import { useEffect, useState } from "react";
import { services } from "@/content/services";

const words = services.flatMap((s) => s.chips);

/** Cycles through capabilities inside animated [ brackets ]. */
export function ServiceTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % words.length), 2200);
    return () => window.clearInterval(id);
  }, []);
  return (
    <p className="label hidden items-center gap-2 rounded-full border border-ivory/15 bg-charcoal/55 px-3.5 py-2 text-ivory/90 backdrop-blur-md sm:flex" aria-label="Capabilities">
      <span className="text-ember-60">[</span>
      <span className="relative inline-grid h-[1.2em] w-[19ch] overflow-hidden text-center">
        <span key={i} className="animate-[tick_2.25s_var(--ease-brand)]">
          {words[i]}
        </span>
      </span>
      <span className="text-ember-60">]</span>
    </p>
  );
}
