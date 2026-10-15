"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

/** "Typical agency ◯━━ Meshglade" — flipping the switch rewrites every row along the diagonal. */
export function ComparisonToggle({ rows }: { rows: { typical: string; meshglade: string }[] }) {
  const [on, setOn] = useState(false);
  const [touched, setTouched] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Flip once automatically when first seen, to signal it's interactive
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let t: number | undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          t = window.setTimeout(() => setOn((v) => (touched ? v : true)), 1400);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [touched]);

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-clip rounded-card transition-colors duration-700 ease-brand",
        on ? "bg-ivory text-charcoal" : "bg-charcoal-40/25 text-charcoal",
      )}
    >
      <div className="sticky top-20 z-10 flex flex-col gap-4 border-b border-charcoal/10 bg-inherit p-5 sm:flex-row sm:items-center sm:justify-between sm:p-8 lg:static">
        <p className="label text-charcoal-70">Flip the switch</p>
        <button
          type="button"
          role="switch"
          aria-checked={on}
          onClick={() => {
            setTouched(true);
            setOn((v) => !v);
          }}
          className="group flex items-center gap-4 self-start sm:self-auto"
        >
          <span className={cn("font-display text-lg tracking-tight transition-opacity sm:text-xl", on ? "opacity-40" : "opacity-100")}>
            Typical agency
          </span>
          <span
            className={cn(
              "relative h-9 w-16 rounded-full transition-colors duration-500 ease-brand",
              on ? "bg-ember" : "bg-charcoal/30",
            )}
          >
            <span
              className={cn(
                "absolute top-1 left-1 size-7 rounded-full bg-ivory shadow transition-transform duration-500 ease-brand",
                on && "translate-x-7",
              )}
            />
          </span>
          <span className={cn("font-display text-lg tracking-tight transition-opacity sm:text-xl", on ? "opacity-100" : "opacity-40")}>
            Meshglade
          </span>
        </button>
      </div>
      <ul>
        {rows.map((r, i) => (
          <li key={r.typical} className="grid grid-cols-[auto_1fr] items-center gap-4 border-b border-charcoal/10 px-5 py-5 last:border-0 sm:gap-6 sm:px-8 sm:py-6">
            <span
              className={cn(
                "grid size-9 place-items-center rounded-full transition-colors duration-500",
                on ? "bg-ember text-ivory" : "bg-charcoal/10 text-charcoal-70",
              )}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {on ? <Check className="size-4" /> : <X className="size-4" />}
            </span>
            <span className="relative grid overflow-hidden">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.span
                  key={on ? "m" : "t"}
                  initial={{ clipPath: "polygon(0 0, 0 0, -30% 100%, -30% 100%)" }}
                  animate={{ clipPath: "polygon(0 0, 130% 0, 100% 100%, -30% 100%)" }}
                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.65, 0, 0.35, 1] }}
                  className={cn(
                    "font-display text-xl tracking-tight [grid-area:1/1] sm:text-3xl",
                    !on && "text-charcoal/50 line-through decoration-1",
                  )}
                >
                  {on ? r.meshglade : r.typical}
                </motion.span>
              </AnimatePresence>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
