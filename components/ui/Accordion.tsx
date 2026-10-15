"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export function Accordion({
  items,
  dark,
  defaultOpen = 0,
}: {
  items: { q: string; a: string }[];
  dark?: boolean;
  defaultOpen?: number | null;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const id = useId();
  return (
    <div className={cn("border-t", dark ? "border-ivory/15" : "border-charcoal/15")}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className={cn("border-b", dark ? "border-ivory/15" : "border-charcoal/15")}>
            <h3 className="font-sans">
              <button
                type="button"
                id={`${id}-h-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-p-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
              >
                <span className="font-display text-lg leading-snug tracking-tight sm:text-xl">{item.q}</span>
                <span
                  aria-hidden
                  className={cn(
                    "relative grid size-10 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color] duration-500 ease-brand",
                    isOpen
                      ? "rotate-45 border-ember bg-ember text-ivory"
                      : dark
                        ? "border-ivory/25 group-hover:border-ivory"
                        : "border-charcoal/20 group-hover:border-charcoal",
                  )}
                >
                  <span className="absolute h-[1.5px] w-3.5 bg-current" />
                  <span className="absolute h-3.5 w-[1.5px] bg-current" />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-p-${i}`}
              role="region"
              aria-labelledby={`${id}-h-${i}`}
              className={cn(
                "grid transition-[grid-template-rows] duration-500 ease-brand",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <p className={cn("max-w-2xl pr-14 pb-6 leading-relaxed", dark ? "text-ivory/70" : "text-charcoal-80")}>
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
