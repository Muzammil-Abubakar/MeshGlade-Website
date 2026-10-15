"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowUpRight, LayoutGrid, List } from "lucide-react";
import type { Project } from "@/content/projects";
import { services, type ServiceSlug } from "@/content/services";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { useLocationSearch } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type Filter = "all" | ServiceSlug;

export function ProjectsExplorer({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [industry, setIndustry] = useState("all");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [hover, setHover] = useState<Project | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Read filter state from the URL once it's known on the client (shareable links)
  const search = useLocationSearch();
  const [appliedSearch, setAppliedSearch] = useState<string | null>(null);
  if (search && appliedSearch === null) {
    setAppliedSearch(search);
    const q = new URLSearchParams(search);
    const s = q.get("service") as Filter | null;
    if (s && services.some((x) => x.slug === s)) setFilter(s);
    const ind = q.get("industry");
    if (ind) setIndustry(ind);
  }
  // …and write it back as filters change (not before the incoming URL has been read)
  useEffect(() => {
    if (appliedSearch === null && window.location.search) return;
    const q = new URLSearchParams();
    if (filter !== "all") q.set("service", filter);
    if (industry !== "all") q.set("industry", industry);
    const qs = q.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [filter, industry, appliedSearch]);

  const industries = Array.from(new Set(projects.map((p) => p.industry)));
  const shown = projects.filter(
    (p) => (filter === "all" || p.services.includes(filter)) && (industry === "all" || p.industry === industry),
  );

  const onMove = (e: React.MouseEvent) => {
    const el = previewRef.current;
    if (el) el.style.transform = `translate3d(${e.clientX + 24}px, ${e.clientY - 120}px, 0)`;
  };

  return (
    <div>
      {/* Controls */}
      <div className="sticky top-20 z-20 -mx-4 mb-10 flex flex-col gap-3 bg-ivory/90 px-4 py-3 backdrop-blur-md sm:top-24 md:flex-row md:items-center md:justify-between lg:static lg:mx-0 lg:bg-transparent lg:px-0 lg:backdrop-blur-none">
        <div className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0" role="tablist" aria-label="Filter by service">
          {(["all", ...services.map((s) => s.slug)] as Filter[]).map((f) => {
            const on = f === filter;
            const label = f === "all" ? "All work" : services.find((s) => s.slug === f)!.name;
            const count = f === "all" ? projects.length : projects.filter((p) => p.services.includes(f as ServiceSlug)).length;
            return (
              <button
                key={f}
                role="tab"
                aria-selected={on}
                onClick={() => setFilter(f)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors duration-300",
                  on ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/15 hover:border-charcoal/50",
                )}
              >
                {on && <span className="mr-1 text-ember">[</span>}
                {label} <sup className="ml-0.5 font-mono text-[10px] opacity-60">{count}</sup>
                {on && <span className="ml-1 text-ember">]</span>}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <label className="relative">
            <span className="sr-only">Filter by industry</span>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="h-11 appearance-none rounded-full border border-charcoal/15 bg-transparent pr-9 pl-4 text-sm font-semibold"
            >
              <option value="all">All industries</option>
              {industries.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            <span aria-hidden className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-xs">▾</span>
          </label>
          <div className="hidden rounded-full border border-charcoal/15 p-1 lg:flex">
            {(["grid", "list"] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-label={`${v} view`}
                aria-pressed={view === v}
                onClick={() => setView(v)}
                className={cn("grid size-9 place-items-center rounded-full transition-colors", view === v ? "bg-charcoal text-ivory" : "")}
              >
                {v === "grid" ? <LayoutGrid className="size-4" /> : <List className="size-4" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {shown.length === 0 && (
        <p className="rounded-card border border-dashed border-charcoal/20 p-10 text-center text-charcoal-80">
          No projects match yet — but we&apos;d love to make yours the first.
        </p>
      )}

      {/* Grid */}
      {(view === "grid" || shown.length === 0) && (
        <LayoutGroup>
          <motion.ul layout className="grid gap-x-5 gap-y-12 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {shown.map((p, i) => (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(i % 2 === 1 && "md:mt-24")}
                >
                  <Link href={`/projects/${p.slug}`} className="group block">
                    <div className="relative overflow-hidden rounded-card">
                      <ProjectCover project={p} className="aspect-[4/3] transition-transform duration-700 ease-brand group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 50vw" />
                      <span className="absolute top-4 left-4 z-10 rounded-full bg-ivory/90 px-3 py-1 text-xs font-semibold backdrop-blur">
                        {p.industry}
                      </span>
                    </div>
                    <div className="mt-5 grid grid-cols-[1fr_auto] items-start gap-4">
                      <div>
                        <h2 className="font-display text-3xl tracking-tight">{p.title}</h2>
                        <p className="mt-1 text-charcoal-80">{p.tagline}</p>
                        <p className="mt-3 flex flex-wrap gap-1.5">
                          {p.services.map((s) => (
                            <span key={s} className="rounded-full border border-charcoal/15 px-2.5 py-0.5 text-xs">
                              {services.find((x) => x.slug === s)?.name}
                            </span>
                          ))}
                        </p>
                      </div>
                      <span className="text-right">
                        <span className="block font-display text-4xl leading-none tracking-tight text-ember">{p.headlineMetric.value}</span>
                        <span className="mt-1 block text-xs text-charcoal-80">{p.headlineMetric.label}</span>
                      </span>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>
      )}

      {/* List (desktop) */}
      {view === "list" && shown.length > 0 && (
        <div onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
          <ul className="border-t border-charcoal">
            {shown.map((p, i) => (
              <li key={p.slug} className="border-b border-charcoal">
                <Link
                  href={`/projects/${p.slug}`}
                  onMouseEnter={() => setHover(p)}
                  className="group grid grid-cols-12 items-center gap-4 py-6 transition-colors hover:text-ember"
                >
                  <span className="label col-span-1 text-charcoal-70">{String(i + 1).padStart(2, "0")}</span>
                  <span className="col-span-4 font-display text-4xl tracking-tight">{p.title}</span>
                  <span className="col-span-2 text-sm text-charcoal-80">{p.industry}</span>
                  <span className="col-span-2 text-sm text-charcoal-80">
                    {p.services.map((s) => services.find((x) => x.slug === s)?.shortName).join(" · ")}
                  </span>
                  <span className="col-span-2 font-display text-3xl tracking-tight">{p.headlineMetric.value}</span>
                  <span className="col-span-1 flex justify-end">
                    <ArrowUpRight className="size-6 transition-transform group-hover:rotate-45" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div
            ref={previewRef}
            aria-hidden
            className={cn(
              "pointer-events-none fixed top-0 left-0 z-40 w-80 overflow-hidden rounded-2xl shadow-2xl transition-opacity duration-300",
              hover ? "opacity-100" : "opacity-0",
            )}
          >
            {hover && <ProjectCover project={hover} clear={false} className="aspect-[4/3]" sizes="320px" />}
          </div>
        </div>
      )}
    </div>
  );
}
