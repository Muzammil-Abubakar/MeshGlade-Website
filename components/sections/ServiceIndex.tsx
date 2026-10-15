"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { services } from "@/content/services";
import { ServiceGlyph } from "@/components/ui/ServiceGlyph";
import { cn } from "@/lib/utils";

/**
 * "The Index" — brand-book table rows. Desktop: hover sweeps an ember fill along
 * the 45° diagonal and reveals sub-services + a live glyph. Mobile: accordion.
 */
export function ServiceIndex() {
  const [open, setOpen] = useState<string | null>(services[0].slug);

  return (
    <ul className="border-t border-charcoal">
      {services.map((s) => {
        const isOpen = open === s.slug;
        return (
          <li key={s.slug} className="border-b border-charcoal">
            {/* Desktop row */}
            <Link
              href={`/services/${s.slug}`}
              className="group/row relative isolate hidden w-full overflow-hidden lg:block"
            >
              <span
                aria-hidden
                className="absolute inset-y-0 -left-1/4 -z-10 w-[150%] -translate-x-[105%] skew-x-[-45deg] bg-ember transition-transform duration-700 ease-brand group-hover/row:translate-x-0"
              />
              <div className="container-x">
                <div className="grid grid-cols-12 items-center gap-6 py-9 transition-colors duration-500 group-hover/row:text-ivory xl:py-11">
                  <span className="label col-span-1 text-charcoal-70 transition-colors group-hover/row:text-ivory/70">
                    {s.index}
                  </span>
                  <span className="col-span-5 font-display text-[clamp(2.4rem,4.6vw,4.75rem)] leading-none tracking-[-0.04em]">
                    {s.name}
                  </span>
                  <span className="col-span-4">
                    <span className="block text-[0.95rem] text-charcoal-80 transition-colors duration-500 group-hover/row:text-ivory/90">
                      {s.outcome}
                    </span>
                    <span className="mt-4 flex flex-wrap gap-1.5">
                      {s.chips.map((c, i) => (
                        <span
                          key={c}
                          style={{ transitionDelay: `${i * 50}ms` }}
                          className="rounded-full border border-charcoal/20 px-3 py-1 text-xs font-medium transition-[border-color,transform] duration-500 ease-brand group-hover/row:-translate-y-0.5 group-hover/row:border-ivory/40"
                        >
                          {c}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="col-span-2 flex items-center justify-end gap-4">
                    <span className="w-24 translate-x-4 opacity-0 transition-[opacity,transform] duration-500 ease-brand group-hover/row:translate-x-0 group-hover/row:opacity-100">
                      <ServiceGlyph slug={s.slug} className="text-ivory" />
                    </span>
                    <span className="grid size-12 shrink-0 place-items-center rounded-full border border-charcoal/30 transition-[transform,background-color,border-color,color] duration-500 ease-brand group-hover/row:rotate-45 group-hover/row:border-ivory group-hover/row:bg-ivory group-hover/row:text-charcoal">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </span>
                </div>
              </div>
            </Link>

            {/* Mobile / tablet accordion */}
            <div className="container-x lg:hidden">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : s.slug)}
                className={cn(
                  "flex w-full items-center gap-4 px-1 py-6 text-left transition-colors duration-500",
                  isOpen && "text-ember",
                )}
              >
                <span className="label w-6 text-charcoal-70">{s.index}</span>
                <span className="flex-1 font-display text-[2rem] leading-none tracking-tight sm:text-5xl">{s.name}</span>
                <span
                  className={cn(
                    "grid size-10 place-items-center rounded-full border transition-transform duration-500 ease-brand",
                    isOpen ? "rotate-45 border-ember bg-ember text-ivory" : "border-charcoal/25 text-charcoal",
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
              <div className={cn("grid transition-[grid-template-rows] duration-500 ease-brand", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                <div className="overflow-hidden">
                  <div className="grid gap-5 pb-8 sm:grid-cols-[1fr_180px] sm:items-center">
                    <div>
                      <p className="text-charcoal-80">{s.outcome}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {s.chips.map((c) => (
                          <span key={c} className="rounded-full border border-charcoal/20 px-3 py-1 text-xs font-medium">
                            {c}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={`/services/${s.slug}`}
                        className="mt-5 inline-flex items-center gap-1.5 font-semibold underline underline-offset-4"
                      >
                        Explore {s.name} <ArrowUpRight className="size-4" />
                      </Link>
                    </div>
                    <div className="rounded-2xl bg-charcoal p-5 text-ivory">
                      <ServiceGlyph slug={s.slug} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
