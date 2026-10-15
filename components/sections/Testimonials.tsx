"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { testimonials } from "@/content/testimonials";
import { cn } from "@/lib/utils";

const DURATION = 3000;
const EASING = [0.16, 1, 0.3, 1] as const;

function initials(name: string) {
  return name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

/** "The Pill" — one quote at a time in a large charcoal pill, framed by brackets. */
export function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const [containerHeight, setContainerHeight] = useState<number | "auto">("auto");
  const contentRef = useRef<HTMLQuoteElement>(null);
  const startX = useRef<number | null>(null);
  const t = testimonials[i];

  const go = useCallback((d: number) => {
    setDir(d);
    setI((v) => (v + d + testimonials.length) % testimonials.length);
  }, []);

  // Smoothly measure quote height on change or resize
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
  }, [i]);

  // Auto-advance every 3 seconds, reset whenever slide changes (manually or automatically)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer: ReturnType<typeof setTimeout>;

    const startTimer = () => {
      clearTimeout(timer);
      if (document.hidden) return;
      timer = setTimeout(() => {
        go(1);
      }, DURATION);
    };

    startTimer();

    const onVisibilityChange = () => {
      if (document.hidden) {
        clearTimeout(timer);
      } else {
        startTimer();
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [i, go]);

  return (
    <>
      {/* Desktop / tablet: the pill */}
      <div
        className="hidden md:block outline-none"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        onPointerDown={(e) => (startX.current = e.clientX)}
        onPointerUp={(e) => {
          if (startX.current === null) return;
          const dx = e.clientX - startX.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          startX.current = null;
        }}
        role="region"
        aria-roledescription="carousel"
        aria-label="Client testimonials"
      >
        <div className="relative overflow-hidden rounded-[clamp(3rem,12vw,14rem)] bg-charcoal px-[8%] py-20 text-ivory lg:py-24 select-none">
          <div className="relative mx-auto max-w-5xl">
            <div className="flex items-stretch gap-4 lg:gap-8">
              <span
                aria-hidden
                className="w-5 shrink-0 border-y-2 border-l-2 border-ember lg:w-7"
              />
              <motion.div
                animate={{ height: containerHeight }}
                transition={{ duration: 0.65, ease: EASING }}
                className="relative min-h-[220px] flex-1 overflow-hidden"
                aria-live="polite"
              >
                <AnimatePresence mode="popLayout" initial={false} custom={dir}>
                  <motion.blockquote
                    key={i}
                    ref={contentRef}
                    custom={dir}
                    initial={{ opacity: 0, y: 18 * dir, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{
                      opacity: 0,
                      y: -18 * dir,
                      filter: "blur(3px)",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                    }}
                    transition={{ duration: 0.55, ease: EASING }}
                    className="flex w-full flex-col justify-center py-4"
                  >
                    <p className="font-display text-[clamp(1.6rem,3.1vw,3rem)] leading-[1.14] tracking-[-0.025em]">
                      {t.quote}
                    </p>
                    <footer className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                      <span className="flex items-center gap-3">
                        <span className="grid size-12 place-items-center rounded-full bg-peach font-display text-charcoal">
                          {initials(t.name)}
                        </span>
                        <span>
                          <cite className="block font-semibold not-italic">{t.name}</cite>
                          <span className="text-sm text-ivory/60">
                            {t.role}, {t.company}
                          </span>
                        </span>
                      </span>
                      <span className="flex items-baseline gap-2 border-l border-ivory/15 pl-8">
                        <span className="font-display text-3xl text-peach">{t.metric.value}</span>
                        <span className="text-sm text-ivory/60">{t.metric.label}</span>
                      </span>
                      {t.projectSlug && (
                        <Link
                          href={`/projects/${t.projectSlug}`}
                          className="inline-flex items-center gap-1 text-sm font-semibold underline underline-offset-4 hover:text-peach transition-colors"
                        >
                          Read the case <ArrowUpRight className="size-4" />
                        </Link>
                      )}
                    </footer>
                  </motion.blockquote>
                </AnimatePresence>
              </motion.div>
              <span
                aria-hidden
                className="w-5 shrink-0 border-y-2 border-r-2 border-ember lg:w-7"
              />
            </div>

            <div className="mt-10 flex items-center gap-6">
              <div className="flex flex-1 gap-2">
                {testimonials.map((_, k) => (
                  <button
                    key={k}
                    type="button"
                    aria-label={`Show testimonial ${k + 1}`}
                    aria-current={k === i}
                    onClick={() => {
                      if (k === i) return;
                      setDir(k > i ? 1 : -1);
                      setI(k);
                    }}
                    className="group relative h-6 flex-1 cursor-pointer"
                  >
                    <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-ivory/20">
                      <span
                        key={`${k}-${i}`}
                        className={cn(
                          "absolute inset-y-0 left-0 bg-ember rounded-full",
                          k < i && "w-full",
                          k > i && "w-0",
                        )}
                        style={
                          k === i
                            ? {
                                animation: `grow ${DURATION}ms linear forwards`,
                              }
                            : undefined
                        }
                      />
                    </span>
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() => go(-1)}
                  className="grid size-12 place-items-center rounded-full border border-ivory/25 transition-colors hover:bg-ivory hover:text-charcoal cursor-pointer"
                >
                  <ArrowLeft className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => go(1)}
                  className="grid size-12 place-items-center rounded-full border border-ivory/25 transition-colors hover:bg-ivory hover:text-charcoal cursor-pointer"
                >
                  <ArrowRight className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: static wall — nothing hidden behind swipes */}
      <ul className="space-y-3 md:hidden">
        {testimonials.slice(0, 4).map((x) => (
          <li key={x.name} className="rounded-card bg-charcoal p-6 text-ivory">
            <p className="font-display text-xl leading-snug tracking-tight">
              <span className="text-ember">[ </span>
              {x.quote}
              <span className="text-ember"> ]</span>
            </p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <span>
                <span className="block text-sm font-semibold">{x.name}</span>
                <span className="text-xs text-ivory/60">
                  {x.role}, {x.company}
                </span>
              </span>
              <span className="text-right">
                <span className="block font-display text-2xl text-peach">{x.metric.value}</span>
                <span className="text-xs text-ivory/60">{x.metric.label}</span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
