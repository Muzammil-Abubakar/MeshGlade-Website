"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

/** Words fill from faint to solid as you read (scroll-linked). */
export function ScrollWords({ text, className, highlight = [] }: { text: string; className?: string; highlight?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");
  const [lit, setLit] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setLit(Math.round(v * words.length)));

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => {
          const hl = highlight.some((h) => w.toLowerCase().startsWith(h));
          return (
            <span
              key={i}
              className={cn(
                "transition-colors duration-300",
                i < lit ? (hl ? "text-ember" : "text-charcoal") : "text-charcoal/15",
              )}
            >
              {w}{" "}
            </span>
          );
        })}
      </span>
    </p>
  );
}
