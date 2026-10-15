"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function LegalToc({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items]);

  const list = (
    <ol className="space-y-1">
      {items.map((it, i) => (
        <li key={it.id}>
          <a
            href={`#${it.id}`}
            onClick={() => setOpen(false)}
            className={cn(
              "flex gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
              active === it.id ? "bg-charcoal text-ivory" : "text-charcoal-80 hover:bg-charcoal/5",
            )}
          >
            <span className={cn("font-mono text-xs", active === it.id ? "text-ember-60" : "text-charcoal-70")}>{String(i + 1).padStart(2, "0")}</span>
            {it.title}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <div className="lg:hidden">
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-full border border-charcoal/15 px-5 py-3 font-semibold"
        >
          Contents
          <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
        </button>
        {open && <div className="mt-3 rounded-2xl border border-charcoal/10 p-2">{list}</div>}
      </div>
      <nav aria-label="Contents" className="sticky top-28 hidden lg:block">
        <p className="label mb-4 px-3 text-charcoal-70">Contents</p>
        {list}
      </nav>
    </>
  );
}
