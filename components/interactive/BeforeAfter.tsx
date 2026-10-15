"use client";

import { useState } from "react";
import { Check, MoveHorizontal, X } from "lucide-react";

// Tangled strands (the "mesh") — deterministic paths
const tangled = Array.from({ length: 9 }, (_, i) => {
  let d = "";
  for (let k = 0; k <= 40; k++) {
    const t = k / 40;
    const x = t * 100;
    const y = 10 + i * 10 + Math.sin(t * 11 + i * 1.9) * 22 + Math.sin(t * 23 + i) * 9;
    d += `${k ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
});

/** Drag along the logomark's 45° diagonal: before (tangled mesh) → after (ordered glade). */
export function BeforeAfter({ before, after }: { before: string[]; after: string[] }) {
  const [p, setP] = useState(55);
  const top = p + 10;
  const bottom = p - 10;

  return (
    <div className="relative aspect-[4/5] touch-pan-y overflow-hidden rounded-card select-none sm:aspect-[16/9]">
      {/* AFTER */}
      <div className="grain absolute inset-0 bg-peach">
        <div aria-hidden className="flutes absolute inset-0 opacity-50" />
        <div className="relative flex h-full flex-col justify-end p-6 sm:items-end sm:p-10">
          <span className="label mb-4 self-end rounded-full bg-charcoal px-3 py-1.5 text-ivory">After</span>
          <ul className="space-y-2 self-end sm:w-[46%]">
            {after.map((a) => (
              <li key={a} className="flex items-center gap-3 rounded-full bg-ivory px-4 py-2.5 text-sm font-semibold shadow-sm sm:text-base">
                <Check className="size-4 shrink-0 text-ember" /> {a}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* BEFORE (clipped along the diagonal) */}
      <div
        className="absolute inset-0 bg-charcoal-40"
        style={{ clipPath: `polygon(0 0, ${top}% 0, ${bottom}% 100%, 0 100%)` }}
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className="absolute inset-0 size-full">
          {tangled.map((d, i) => (
            <path key={i} d={d} fill="none" stroke={i === 4 ? "#DF462B" : "#272727"} strokeOpacity={i === 4 ? 0.8 : 0.35} strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        <div className="relative flex h-full flex-col p-6 sm:p-10">
          <span className="label mb-4 self-start rounded-full bg-ivory px-3 py-1.5 text-charcoal">Before</span>
          <ul className="space-y-2 sm:w-[46%]">
            {before.map((b, i) => (
              <li
                key={b}
                className="flex items-center gap-3 rounded-full bg-charcoal px-4 py-2.5 text-sm font-semibold text-ivory/90 sm:text-base"
                style={{ transform: `rotate(${(i % 2 ? 1 : -1) * (0.6 + i * 0.25)}deg)` }}
              >
                <X className="size-4 shrink-0 text-ember-60" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider + handle */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden className="pointer-events-none absolute inset-0 size-full">
        <line x1={top} y1="0" x2={bottom} y2="100" stroke="#FFF9EA" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      </svg>
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ivory text-charcoal shadow-lg"
        style={{ left: `${p}%` }}
      >
        <MoveHorizontal className="size-5" />
      </span>

      {/* Accessible control covering the whole area (drag, touch, keyboard) */}
      <input
        type="range"
        min={8}
        max={92}
        value={p}
        onChange={(e) => setP(Number(e.target.value))}
        aria-label="Compare before and after"
        className="absolute inset-0 size-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
