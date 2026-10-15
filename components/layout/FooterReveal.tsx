"use client";

import { useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { getLenis } from "@/components/motion/SmoothScroll";

/**
 * Enables the sticky "reveal" footer (`html.footer-reveal`, styled in globals.css)
 * only while the footer fits inside the viewport — on short screens or phones it
 * falls back to normal flow so no footer content can ever be unreachable.
 */
export function FooterReveal() {
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const root = document.documentElement;
    const update = () => {
      const fits = footer.offsetHeight <= window.innerHeight - 24;
      root.classList.toggle("footer-reveal", fits && window.innerWidth >= 768);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(footer);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
      root.classList.remove("footer-reveal");
    };
  }, []);
  return null;
}

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(0, { duration: 1.4 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="group inline-flex items-center gap-2 self-start transition-colors hover:text-ivory sm:self-auto"
    >
      Back to top
      <span className="grid size-8 place-items-center rounded-full border border-ivory/20 transition-[transform,background-color,color] duration-300 group-hover:-translate-y-0.5 group-hover:bg-ivory group-hover:text-charcoal">
        <ArrowUp className="size-4" />
      </span>
    </button>
  );
}
