"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { problems } from "@/content/landing";
import { getService } from "@/content/services";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const EASING = [0.16, 1, 0.3, 1] as const;

export function ProblemSelector() {
  const [active, setActive] = useState(problems[0].id);
  const [containerHeight, setContainerHeight] = useState<number | "auto">("auto");
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const p = problems.find((x) => x.id === active)!;
  const service = getService(p.service)!;

  const select = (id: string) => {
    if (id === active) return;
    setActive(id);
    if (window.matchMedia("(max-width: 1023px)").matches) {
      requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
    }
  };

  useEffect(() => {
    if (!contentRef.current) return;
    const update = () => {
      if (contentRef.current) {
        const h = Math.round(contentRef.current.offsetHeight);
        if (h > 0) setContainerHeight(h);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, [active]);

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
      <div
        role="radiogroup"
        aria-label="Choose the problem closest to yours"
        className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:col-span-6 lg:grid-cols-1 lg:gap-3"
      >
        {problems.map((item, i) => {
          const on = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => select(item.id)}
              className={cn(
                "group relative flex items-center gap-4 rounded-full border px-5 py-4 text-left transition-colors duration-500 sm:px-6",
                on ? "border-charcoal text-ivory" : "border-charcoal/15 text-charcoal hover:border-charcoal/40"
              )}
            >
              {on && (
                <motion.span
                  layoutId="activeProblemPill"
                  className="absolute inset-0 rounded-full bg-charcoal"
                  transition={{ type: "spring", stiffness: 220, damping: 28, mass: 1 }}
                />
              )}
              <span className={cn("label relative z-10 shrink-0 transition-colors duration-400", on ? "text-ember-60" : "text-charcoal-70")}>
                0{i + 1}
              </span>
              <span className="relative z-10 flex-1 text-[0.98rem] font-medium leading-snug sm:text-base">
                {on && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="mr-1 inline-block font-light text-ember"
                  >
                    [
                  </motion.span>
                )}
                {item.pain}
                {on && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="ml-1 inline-block font-light text-ember"
                  >
                    ]
                  </motion.span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <div ref={panelRef} className="scroll-mt-28 lg:col-span-6">
        <motion.div
          animate={{ height: containerHeight }}
          transition={{ duration: 0.75, ease: EASING }}
          className="relative overflow-hidden rounded-card bg-peach lg:sticky lg:top-28 lg:min-h-[480px]"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={p.id}
              ref={contentRef}
              initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{
                opacity: 0,
                y: -18,
                filter: "blur(4px)",
                position: "absolute",
                top: 0,
                left: 0,
                transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              }}
              transition={{ duration: 0.75, ease: EASING, delay: 0.05 }}
              className="flex w-full flex-col p-6 sm:p-10 lg:min-h-[480px]"
              aria-live="polite"
            >
              <p className="label text-charcoal/70">The fix · {service.name}</p>
              <p className="display-s mt-5 max-w-lg">{p.fix}</p>
              <div className="mt-auto pt-8">
                <Link
                  href={`/projects/${p.projectSlug}`}
                  className="group flex items-end justify-between gap-6 border-t border-charcoal/20 pt-6"
                >
                  <span>
                    <span className="block font-display text-6xl leading-none tracking-tight text-ember sm:text-7xl">
                      {p.metric.value}
                    </span>
                    <span className="mt-2 block text-sm text-charcoal-80">{p.metric.label}</span>
                  </span>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-charcoal/30 transition-colors group-hover:bg-charcoal group-hover:text-ivory">
                    <ArrowUpRight className="size-5" />
                  </span>
                </Link>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button href={`/contact?service=${p.service}&intent=audit`}>Fix this for me</Button>
                  <Link href={`/services/${service.slug}`} className="px-2 text-sm font-semibold underline underline-offset-4">
                    How {service.name} works
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
