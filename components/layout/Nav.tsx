"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { mainNav } from "@/content/site";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const detectTheme = () => {
      const header = headerRef.current;
      const els = document.elementsFromPoint(window.innerWidth / 2, 40);
      const target = els.find((el) => !header?.contains(el));
      setDark(!!target?.closest('[data-nav-theme="dark"]'));
    };
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > lastY + 4 && y > 420) setHidden(true);
      else if (y < lastY - 4 || y < 420) setHidden(false);
      lastY = y;
      detectTheme();
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    const t = window.setTimeout(detectTheme, 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  // Close menus when the route changes (state adjusted during render, per React docs)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setMegaOpen(false);
  }

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMegaOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaOpen]);

  const openMega = () => {
    window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const closeMega = () => {
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 140);
  };

  const onDark = dark && !scrolled && !megaOpen;

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-brand",
          hidden && !megaOpen && !menuOpen ? "-translate-y-[130%]" : "translate-y-0",
        )}
      >
        <div className="container-x pt-3 sm:pt-4">
          <nav
            aria-label="Main"
            className={cn(
              "relative flex items-center justify-between rounded-full border transition-[background-color,border-color,padding,box-shadow] duration-500 ease-brand",
              scrolled || megaOpen
                ? "border-charcoal/10 bg-ivory/85 py-2 pr-2 pl-4 shadow-[0_10px_40px_-20px_rgba(39,39,39,0.35)] backdrop-blur-xl sm:pl-6"
                : "border-transparent py-3 pr-0 pl-0",
            )}
          >
            <Link href="/" aria-label="Meshglade — home" className="relative z-10 shrink-0">
              <Logo tone={onDark ? "ivory" : "charcoal"} priority />
            </Link>

            <ul className={cn("hidden items-center gap-1 lg:flex", onDark ? "text-ivory" : "text-charcoal")}>
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                const isServices = item.href === "/services";
                return (
                  <li
                    key={item.href}
                    onMouseEnter={isServices ? openMega : undefined}
                    onMouseLeave={isServices ? closeMega : undefined}
                    className="relative"
                  >
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        className="group/nl relative flex items-center px-3 py-2 text-[0.95rem] font-medium"
                        aria-current={active ? "page" : undefined}
                      >
                        <Bracket side="l" show={active} />
                        <span>{item.label}</span>
                        <Bracket side="r" show={active} />
                      </Link>
                      {isServices && (
                        <button
                          type="button"
                          aria-label="Open services menu"
                          aria-expanded={megaOpen}
                          aria-controls="mega-services"
                          onClick={() => setMegaOpen((v) => !v)}
                          onFocus={openMega}
                          className="-ml-2 grid size-7 place-items-center rounded-full"
                        >
                          <ChevronDown
                            className={cn("size-4 transition-transform duration-300", megaOpen && "rotate-180")}
                          />
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <Button
                href="/contact?intent=audit"
                variant={onDark ? "light" : "primary"}
                className="hidden sm:inline-flex"
              >
                Book a free audit
              </Button>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className={cn(
                  "grid size-12 place-items-center rounded-full lg:hidden",
                  onDark ? "bg-ivory text-charcoal" : "bg-charcoal text-ivory",
                )}
              >
                <span className="flex w-5 flex-col gap-[5px]" aria-hidden>
                  <span className="h-[2px] w-full rounded bg-current" />
                  <span className="h-[2px] w-3/5 self-end rounded bg-current" />
                </span>
              </button>
            </div>
          </nav>

          {/* Services mega menu */}
          <div
            id="mega-services"
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
            className={cn(
              "absolute inset-x-0 hidden pt-3 lg:block",
              megaOpen ? "pointer-events-auto" : "pointer-events-none",
            )}
          >
            <div className="container-x">
              <div
                className={cn(
                  "origin-top rounded-[28px] border border-charcoal/10 bg-ivory p-3 shadow-[0_30px_80px_-30px_rgba(39,39,39,0.45)] transition-[opacity,transform] duration-400 ease-brand",
                  megaOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
                )}
                inert={!megaOpen}
              >
                <div className="grid grid-cols-4 gap-2">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="group/mm relative overflow-hidden rounded-[20px] p-5 transition-colors duration-300 hover:bg-charcoal hover:text-ivory"
                    >
                      <span className="label text-charcoal-70 group-hover/mm:text-ember-60">{s.index}</span>
                      <span className="mt-6 block font-display text-2xl tracking-tight">{s.name}</span>
                      <span className="mt-2 block text-sm text-charcoal-80 group-hover/mm:text-ivory/70">
                        {s.outcome}
                      </span>
                      <span className="mt-5 flex flex-wrap gap-1.5">
                        {s.chips.map((c) => (
                          <span
                            key={c}
                            className="rounded-full border border-charcoal/15 px-2.5 py-1 text-xs group-hover/mm:border-ivory/20"
                          >
                            {c}
                          </span>
                        ))}
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="mt-2 flex items-center justify-between rounded-[20px] bg-peach-40 px-5 py-4 text-sm">
                  <span>
                    <strong className="font-semibold">Not sure what you need?</strong> Take the free 30-minute audit —
                    we&apos;ll tell you honestly.
                  </span>
                  <Link href="/services" className="font-semibold underline underline-offset-4">
                    All services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </>
  );
}

function Bracket({ side, show }: { side: "l" | "r"; show: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block font-light text-ember transition-[opacity,transform] duration-300 ease-brand",
        show
          ? "translate-x-0 opacity-100"
          : cn("opacity-0 group-hover/nl:translate-x-0 group-hover/nl:opacity-100", side === "l" ? "translate-x-1" : "-translate-x-1"),
        side === "l" ? "mr-1" : "ml-1",
      )}
    >
      {side === "l" ? "[" : "]"}
    </span>
  );
}
