"use client";

import { useEffect } from "react";

/*
  One observer for every [data-reveal] element on the site.

  Reveals are played with the Web Animations API (element.animate) instead of
  toggling classes: it never touches DOM attributes, so it can safely run while
  React is still hydrating streamed parts of the page (no hydration mismatches).
  The hidden start states live in globals.css under `.js [data-reveal…]`.
*/

const EASE_SOFT = "cubic-bezier(0.22, 1, 0.36, 1)";
const EASE_BRAND = "cubic-bezier(0.65, 0, 0.35, 1)";

const revealed = new WeakSet<Element>();

function delayOf(el: Element) {
  const d = (el as HTMLElement).style?.getPropertyValue("--d");
  return d ? parseFloat(d) * 1000 : 0;
}

function reveal(el: Element) {
  if (revealed.has(el)) return;
  revealed.add(el);
  const type = el.getAttribute("data-reveal");
  const delay = delayOf(el);
  const opts = (duration: number, extraDelay = 0, easing = EASE_SOFT): KeyframeAnimationOptions => ({
    duration,
    delay: delay + extraDelay,
    easing,
    fill: "both",
  });

  if (type === "fade") {
    el.animate([{ opacity: 0, transform: "translate3d(0,28px,0)" }, { opacity: 1, transform: "none" }], opts(900));
  } else if (type === "lines") {
    el.querySelectorAll(".rl > span").forEach((line, i) =>
      line.animate([{ transform: "translate3d(0,108%,0)" }, { transform: "none" }], opts(1050, i * 90)),
    );
  } else if (type === "rule") {
    el.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], opts(1400, 0, EASE_BRAND));
  } else if (type === "clear") {
    // Mockups keep a whisper of the glass; real screenshots/videos clear completely
    const to = el.hasAttribute("data-media") ? 0 : 0.18;
    el.querySelector(".clear-glass")?.animate([{ opacity: 1 }, { opacity: to }], opts(1600, 200, EASE_BRAND));
  }
}

export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // CSS shows everything

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            reveal(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    const scan = (root: ParentNode) => {
      root.querySelectorAll("[data-reveal]").forEach((el) => !revealed.has(el) && io.observe(el));
    };
    scan(document);

    // Safety sweep: when scrolling settles, reveal anything already in or above the
    // viewport (covers jumps via End key, anchors or scrollbar drags that skip elements).
    let idle: number | undefined;
    const sweep = () => {
      const limit = window.innerHeight * 0.92;
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        if (!revealed.has(el) && el.getBoundingClientRect().top < limit) {
          reveal(el);
          io.unobserve(el);
        }
      });
    };
    const onScroll = () => {
      window.clearTimeout(idle);
      idle = window.setTimeout(sweep, 160);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) {
            if (n.matches("[data-reveal]") && !revealed.has(n)) io.observe(n);
            scan(n);
          }
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(idle);
    };
  }, []);

  return null;
}
