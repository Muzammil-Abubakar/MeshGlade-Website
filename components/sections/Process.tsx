"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { processSteps } from "@/content/landing";
import { cn } from "@/lib/utils";

const STRANDS = 7;

/** Strands that start tangled and end as parallel flutes (along the main axis). */
function strandPath(i: number, length: number, band: number, vertical: boolean) {
  const base = ((i + 0.5) / STRANDS) * band;
  const phase = i * 1.7;
  const pts: string[] = [];
  const steps = 90;
  for (let k = 0; k <= steps; k++) {
    const s = (k / steps) * length;
    const t = s / length;
    const amp = Math.pow(1 - Math.min(1, t / 0.85), 2.2) * band * 0.55;
    const off = base + amp * (Math.sin(t * 13 + phase) * 0.7 + Math.sin(t * 29 + phase * 2.3) * 0.3);
    const a = s.toFixed(1);
    const b = Math.max(2, Math.min(band - 2, off)).toFixed(1);
    pts.push(`${k === 0 ? "M" : "L"}${vertical ? `${b} ${a}` : `${a} ${b}`}`);
  }
  return pts.join(" ");
}

const H_PATHS = Array.from({ length: STRANDS }, (_, i) => strandPath(i, 1200, 120, false));
const V_PATHS = Array.from({ length: STRANDS }, (_, i) => strandPath(i, 1000, 44, true));

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.65"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  const [active, setActive] = useState(-1);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(Math.min(processSteps.length - 1, Math.floor(p * processSteps.length * 1.05) - (p < 0.05 ? 1 : 0)));
  });

  return (
    <div ref={ref} className="relative">
      {/* Desktop strands */}
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden className="hidden h-32 w-full lg:block">
        {H_PATHS.map((d, i) => (
          <g key={i}>
            <path d={d} stroke="currentColor" strokeOpacity="0.08" strokeWidth="1.5" fill="none" vectorEffect="non-scaling-stroke" />
            <motion.path
              d={d}
              stroke={i === 3 ? "#DF462B" : "currentColor"}
              strokeWidth={i === 3 ? 2.5 : 1.5}
              fill="none"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: progress }}
            />
          </g>
        ))}
      </svg>

      <div className="relative grid lg:mt-10 lg:grid-cols-4 lg:gap-6">
        {/* Mobile strands */}
        <svg
          viewBox="0 0 44 1000"
          preserveAspectRatio="none"
          aria-hidden
          className="absolute top-0 left-0 h-full w-11 lg:hidden"
        >
          {V_PATHS.map((d, i) => (
            <g key={i}>
              <path d={d} stroke="currentColor" strokeOpacity="0.08" strokeWidth="1.2" fill="none" vectorEffect="non-scaling-stroke" />
              <motion.path
                d={d}
                stroke={i === 3 ? "#DF462B" : "currentColor"}
                strokeWidth={i === 3 ? 2 : 1.2}
                fill="none"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: progress }}
              />
            </g>
          ))}
        </svg>

        {processSteps.map((s, i) => {
          const on = i <= active;
          return (
            <div
              key={s.name}
              className={cn(
                "relative ml-16 border-t py-8 transition-colors duration-700 ease-brand lg:ml-0 lg:py-0 lg:pt-8",
                on ? "border-charcoal" : "border-charcoal/15",
              )}
            >
              <div className="flex items-center justify-between">
                <span className={cn("label transition-colors duration-500", on ? "text-ember" : "text-charcoal-70")}>
                  {s.index}
                </span>
                <span className="label text-charcoal-70">{s.duration}</span>
              </div>
              <h3
                className={cn(
                  "mt-6 font-display text-4xl tracking-tight transition-[color,transform] duration-700 ease-brand xl:text-5xl",
                  on ? "translate-x-0 text-charcoal" : "translate-x-0 text-charcoal/30",
                )}
              >
                {s.name}
              </h3>
              <p className={cn("mt-4 text-charcoal-80 transition-opacity duration-700", on ? "opacity-100" : "opacity-50")}>
                {s.description}
              </p>
              <ul className="mt-6 space-y-2">
                {s.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2.5 text-sm">
                    <span
                      className={cn(
                        "size-1.5 rotate-45 transition-colors duration-500",
                        on ? "bg-ember" : "bg-charcoal/25",
                      )}
                    />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
