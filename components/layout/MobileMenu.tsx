"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Mail, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { mainNav, site } from "@/content/site";
import { services } from "@/content/services";
import { cn, whatsappLink } from "@/lib/utils";

export function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const links = [{ label: "Home", href: "/" }, ...mainNav, { label: "Contact", href: "/contact" }];

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      inert={!open}
      className={cn(
        "fixed inset-0 z-[60] flex flex-col bg-charcoal text-ivory transition-[clip-path] duration-700 ease-brand lg:hidden",
        open
          ? "[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
          : "[clip-path:polygon(100%_0,100%_0,100%_0,100%_0)]",
      )}
    >
      {/* fluted edge */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-b from-charcoal via-ember to-peach opacity-90">
        <div className="flutes-fine absolute inset-0" />
      </div>

      <div className="relative flex items-center justify-between px-4 pt-5 pr-18 sm:px-8">
        <Logo tone="ivory" />
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="absolute top-4 right-1 grid size-12 place-items-center rounded-full bg-ivory text-charcoal"
        >
          <X className="size-5" />
        </button>
      </div>

      <nav className="relative mt-8 flex-1 overflow-y-auto px-4 pr-18 sm:px-8" aria-label="Mobile">
        <ul>
          {links.map((l, i) => {
            const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <li
                key={l.href}
                className="border-b border-ivory/10"
                style={{ transitionDelay: open ? `${120 + i * 45}ms` : "0ms" }}
              >
                <Link
                  href={l.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-baseline justify-between py-3.5 font-display text-[2.1rem] leading-none tracking-tight transition-[opacity,transform] duration-700 ease-out-soft xs:text-[2.5rem]",
                    open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                  )}
                  style={{ transitionDelay: open ? `${100 + i * 45}ms` : "0ms" }}
                >
                  <span className={cn(active && "text-ember-60")}>
                    {active && <span className="mr-1 font-light text-ember">[</span>}
                    {l.label}
                    {active && <span className="ml-1 font-light text-ember">]</span>}
                  </span>
                  <span className="label text-ivory/55">0{i + 1}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              onClick={onClose}
              className="rounded-full border border-ivory/20 px-3.5 py-2 text-sm"
            >
              {s.name}
            </Link>
          ))}
        </div>
      </nav>

      <div className="relative grid gap-3 px-4 pt-4 pr-18 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-8">
        <Button href="/contact?intent=audit" variant="light" size="lg" className="w-full justify-between">
          Book a free audit
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <a
            href={whatsappLink(site.whatsapp, "Hi Meshglade, I'd like to discuss a project.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-full border border-ivory/25 text-sm font-semibold"
          >
            <WhatsAppIcon className="size-4" /> WhatsApp
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex h-12 items-center justify-center gap-2 rounded-full border border-ivory/25 text-sm font-semibold"
          >
            <Mail className="size-4" /> Email
          </a>
        </div>
      </div>
    </div>
  );
}
