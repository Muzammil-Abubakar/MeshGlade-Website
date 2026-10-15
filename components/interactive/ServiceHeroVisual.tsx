"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "motion/react";
import { Bot, Calendar, Database, MessageCircle, Play, RotateCcw, Users } from "lucide-react";
import type { ServiceSlug } from "@/content/services";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import { rand, r2 } from "@/lib/random";

export function ServiceHeroVisual({ slug }: { slug: ServiceSlug }) {
  switch (slug) {
    case "ai-automation":
      return <AutomationFlow />;
    case "software-development":
      return <BuildStages />;
    case "data-ai":
      return <ClusterPlot />;
    case "growth":
      return <ContentCalendar />;
  }
}

function Frame({ children, label, className }: { children: React.ReactNode; label: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-card bg-charcoal p-5 text-ivory sm:p-8", className)}>
      <div aria-hidden className="flutes-fine pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-ember/30 to-transparent opacity-60" />
      <p className="label relative mb-6 flex items-center gap-2 text-ivory/60">
        <span className="size-1.5 animate-pulse rounded-full bg-ember" /> {label}
      </p>
      <div className="relative">{children}</div>
    </div>
  );
}

/* ───────── AI Automation: run a workflow ───────── */
const flow = [
  { icon: WhatsAppIcon, name: "WhatsApp", log: "New message: “Is the Elm St. flat still available?”" },
  { icon: Bot, name: "AI agent", log: "Answered from live listings · qualified: budget $450k, buying in 2 months" },
  { icon: Database, name: "CRM", log: "Contact created in HubSpot · lead score 92/100" },
  { icon: Calendar, name: "Calendar", log: "Viewing booked Sat 11:00 with James · reminder scheduled" },
  { icon: Users, name: "Team", log: "Hot lead alert sent to #sales on Slack" },
];

function AutomationFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [step, setStep] = useState(-1);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timers = flow.map((_, i) => window.setTimeout(() => setStep(i), 500 + i * 900));
    return () => timers.forEach(clearTimeout);
  }, [inView, runId]);

  const done = step >= flow.length - 1;
  return (
    <Frame label="Live workflow · simulated">
      <div ref={ref} className="grid grid-cols-5 gap-2 sm:gap-3">
        {flow.map((n, i) => {
          const Icon = n.icon;
          const on = i <= step;
          return (
            <div key={n.name} className="relative flex flex-col items-center gap-2 text-center">
              {i > 0 && (
                <span aria-hidden className="absolute top-6 right-1/2 -z-0 h-px w-full bg-ivory/15 sm:top-7">
                  <span className={cn("absolute inset-y-0 left-0 bg-ember transition-[width] duration-700 ease-brand", on ? "w-full" : "w-0")} />
                </span>
              )}
              <span
                className={cn(
                  "relative z-10 grid size-12 place-items-center rounded-2xl border transition-all duration-500 ease-brand sm:size-14",
                  on ? "scale-105 border-ember bg-ember text-ivory" : "border-ivory/15 bg-charcoal text-ivory/50",
                )}
              >
                <Icon className="size-5" />
              </span>
              <span className={cn("text-[11px] font-semibold transition-colors sm:text-xs", on ? "text-ivory" : "text-ivory/55")}>{n.name}</span>
            </div>
          );
        })}
      </div>
      <ol className="mt-8 min-h-[196px] space-y-2 font-mono text-[12px] leading-relaxed sm:text-[13px]" aria-live="polite">
        {flow.map((n, i) =>
          i <= step ? (
            <li key={n.name} className="animate-[fade-up_0.5s_var(--ease-out-soft)_both] rounded-xl bg-ivory/5 px-3 py-2">
              <span className="text-ember-60">{String(i + 1).padStart(2, "0")} ›</span> {n.log}
            </li>
          ) : null,
        )}
      </ol>
      <div className="mt-6 flex items-center justify-between border-t border-ivory/10 pt-5">
        <span className="text-sm text-ivory/60">{done ? "Done in 4.1 seconds · 0 human minutes" : "Running…"}</span>
        <button
          type="button"
          onClick={() => {
            setStep(-1);
            setRunId((v) => v + 1);
          }}
          className="inline-flex items-center gap-2 rounded-full bg-ivory px-4 py-2 text-sm font-semibold text-charcoal"
        >
          {done ? <RotateCcw className="size-4" /> : <Play className="size-4" />} Run again
        </button>
      </div>
    </Frame>
  );
}

/* ───────── Software: wireframe → design → live ───────── */
const stages = ["Wireframe", "Design", "Live"] as const;

function BuildStages() {
  const [stage, setStage] = useState<(typeof stages)[number]>("Wireframe");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (!inView || touched) return;
    const a = window.setTimeout(() => setStage("Design"), 1400);
    const b = window.setTimeout(() => setStage("Live"), 3000);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [inView, touched]);

  const wire = stage === "Wireframe";
  const live = stage === "Live";
  const box = (filled: string) => (wire ? "border border-dashed border-ivory/30 bg-transparent" : filled);

  return (
    <Frame label="From sketch to shipped">
      <div ref={ref} role="tablist" aria-label="Build stage" className="mb-5 inline-flex rounded-full border border-ivory/15 p-1">
        {stages.map((s) => (
          <button
            key={s}
            role="tab"
            aria-selected={s === stage}
            onClick={() => {
              setTouched(true);
              setStage(s);
            }}
            className={cn("rounded-full px-4 py-2 text-xs font-semibold transition-colors sm:text-sm", s === stage ? "bg-ivory text-charcoal" : "text-ivory/60")}
          >
            {s}
          </button>
        ))}
      </div>
      <div className={cn("overflow-hidden rounded-2xl transition-colors duration-700", wire ? "bg-transparent ring-1 ring-ivory/20" : "bg-ivory")}>
        <div className={cn("flex items-center gap-1.5 px-4 py-3 transition-colors duration-700", wire ? "border-b border-dashed border-ivory/20" : "bg-ivory-deep")}>
          {[0, 1, 2].map((i) => (
            <span key={i} className={cn("size-2.5 rounded-full", wire ? "border border-ivory/40" : i === 0 ? "bg-ember" : "bg-charcoal/20")} />
          ))}
          <span className={cn("ml-3 h-4 flex-1 rounded-full", wire ? "border border-dashed border-ivory/20" : "bg-white")} />
        </div>
        <div className="space-y-3 p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className={cn("h-3 w-20 rounded transition-all duration-700", box("bg-charcoal"))} />
            <span className={cn("h-7 w-24 rounded-full transition-all duration-700", box("bg-charcoal"), live && "animate-pulse")} />
          </div>
          <div className={cn("grid gap-3 rounded-xl p-4 transition-all duration-700 sm:grid-cols-[1.4fr_1fr]", box("bg-charcoal"))}>
            <div className="space-y-2">
              <span className={cn("block h-4 w-4/5 rounded transition-colors duration-700", wire ? "bg-ivory/15" : "bg-ivory")} />
              <span className={cn("block h-4 w-3/5 rounded transition-colors duration-700", wire ? "bg-ivory/15" : "bg-ivory")} />
              <span className={cn("mt-3 block h-6 w-24 rounded-full transition-colors duration-700", wire ? "bg-ivory/10" : "bg-ember")} />
            </div>
            <div className="flex h-20 items-end gap-1.5">
              {[35, 55, 42, 70, 60, 90].map((h, i) => (
                <span
                  key={i}
                  className={cn("flex-1 rounded-t transition-all duration-700 ease-out-soft", wire ? "bg-ivory/10" : i === 5 ? "bg-ember" : "bg-ivory/70")}
                  style={{ height: live ? `${h}%` : wire ? "30%" : `${h * 0.7}%`, transitionDelay: `${i * 60}ms` }}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {["1,204", "98.9%", "0.8s"].map((v, i) => (
              <div key={v} className={cn("rounded-xl p-3 transition-all duration-700", box(i === 0 ? "bg-peach" : "bg-ivory-deep"))}>
                <span className={cn("block h-1.5 w-1/2 rounded", wire ? "bg-ivory/15" : "bg-charcoal/30")} />
                <span className={cn("mt-2 block font-display text-base tracking-tight transition-opacity duration-500 sm:text-lg", live ? "text-charcoal opacity-100" : "opacity-0")}>
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-5 text-sm text-ivory/60">
        {wire && "Week 1–2: we agree flows and structure before a single pixel is polished."}
        {stage === "Design" && "Week 2–3: your brand, real content, clickable prototype."}
        {live && "Sprints: real data, real users — fast, tested and yours to own."}
      </p>
    </Frame>
  );
}

/* ───────── Data & AI: train a clustering model ───────── */
const centers = [
  { x: 25, y: 30, label: "High-value repeat buyers", share: "18%", color: "#DF462B", shift: "-12%" },
  { x: 72, y: 38, label: "Bargain hunters", share: "47%", color: "#FCC8B5", shift: "-88%" },
  { x: 48, y: 76, label: "At-risk, churning", share: "35%", color: "#FFF9EA", shift: "-50%" },
];

function ClusterPlot() {
  const points = useMemo(
    () =>
      Array.from({ length: 84 }, (_, i) => {
        const c = i % 3;
        const ang = rand(i, 3) * Math.PI * 2;
        const rad = Math.sqrt(rand(i, 4)) * 13;
        return { x0: r2(5 + rand(i, 1) * 90), y0: r2(5 + rand(i, 2) * 90), x1: r2(centers[c].x + Math.cos(ang) * rad), y1: r2(centers[c].y + Math.sin(ang) * rad * 0.8), c };
      }),
    [],
  );
  const [k, setK] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!inView || touched) return;
    let v = 0;
    const id = window.setInterval(() => {
      v = Math.min(100, v + 2);
      setK(v);
      if (v >= 100) window.clearInterval(id);
    }, 40);
    return () => window.clearInterval(id);
  }, [inView, touched]);

  const t = k / 100;
  const e = t * t * (3 - 2 * t);
  return (
    <Frame label="Customer segmentation · demo data">
      <div ref={ref} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-ivory/5">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden>
          {[20, 40, 60, 80].map((g) => (
            <path key={g} d={`M${g} 0V100M0 ${g}H100`} stroke="#FFF9EA" strokeOpacity="0.05" strokeWidth="0.3" />
          ))}
        </svg>
        {points.map((p, i) => (
          <span
            key={i}
            className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full sm:size-2.5"
            style={{
              left: `${p.x0 + (p.x1 - p.x0) * e}%`,
              top: `${p.y0 + (p.y1 - p.y0) * e}%`,
              background: t > 0.55 ? centers[p.c].color : "#7D7D7D",
              opacity: 0.55 + 0.45 * t,
              transition: "background-color .6s",
            }}
          />
        ))}
        {centers.map((c) => (
          <span
            key={c.label}
            className="absolute rounded-full bg-charcoal/85 px-2.5 py-1 text-[10px] font-semibold whitespace-nowrap backdrop-blur transition-[opacity,transform] duration-500 sm:text-xs"
            style={{ left: `${c.x}%`, top: `${c.y - 22}%`, opacity: t >= 1 ? 1 : 0, transform: `translate(${c.shift}, ${t >= 1 ? 0 : 6}px)` }}
          >
            <span className="mr-1.5 inline-block size-2 rounded-full" style={{ background: c.color }} />
            {c.label} · {c.share}
          </span>
        ))}
      </div>
      <label className="mt-6 block">
        <span className="flex justify-between text-sm text-ivory/70">
          <span>Train the model</span>
          <span className="font-mono">{k}%</span>
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={k}
          onChange={(ev) => {
            setTouched(true);
            setK(Number(ev.target.value));
          }}
          className="mg-range mg-range-dark mt-2 w-full"
          style={{ "--p": `${k}%` } as React.CSSProperties}
        />
      </label>
      <p className="mt-2 text-sm text-ivory/60">
        {t >= 1 ? "Insight: 18% of customers drive 61% of revenue — target them first." : "Raw data has no shape… drag to find the segments."}
      </p>
    </Frame>
  );
}

/* ───────── Growth: AI content calendar ───────── */
const types = [
  { name: "Reel", cls: "bg-ember text-ivory" },
  { name: "Post", cls: "bg-ivory text-charcoal" },
  { name: "Story", cls: "bg-peach text-charcoal" },
  { name: "Blog", cls: "bg-charcoal-80 text-ivory" },
];

function ContentCalendar() {
  const cells = 28;
  const plan = useMemo(() => Array.from({ length: cells }, (_, i) => (rand(i, 9) > 0.18 ? Math.floor(rand(i, 5) * 4) : -1)), []);
  const [filled, setFilled] = useState(0);
  const [runId, setRunId] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  useEffect(() => {
    if (!inView) return;
    let v = 0;
    const id = window.setInterval(() => {
      v += 1;
      setFilled(v);
      if (v >= cells) window.clearInterval(id);
    }, 90);
    return () => window.clearInterval(id);
  }, [inView, runId]);

  const posts = plan.slice(0, filled).filter((x) => x >= 0).length;
  const reach = Math.round(posts * 4.3 * 10) / 10;
  const pts = Array.from({ length: 8 }, (_, i) => {
    const x = (i / 7) * 100;
    const grow = Math.min(1, filled / cells);
    const y = 90 - Math.pow(i / 7, 1.6) * 75 * grow;
    return `${x},${y}`;
  }).join(" ");

  return (
    <Frame label="AI content engine · one month">
      <div ref={ref} className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={i} className="pb-1 text-center text-[10px] font-semibold text-ivory/55">
            {d}
          </span>
        ))}
        {plan.map((tp, i) => (
          <span
            key={i}
            className={cn(
              "grid aspect-square place-items-center rounded-lg text-[9px] font-semibold transition-all duration-300 ease-out-soft sm:text-[11px]",
              i < filled && tp >= 0 ? cn(types[tp].cls, "scale-100") : "scale-90 bg-ivory/5 text-transparent",
            )}
          >
            {tp >= 0 ? types[tp].name : ""}
          </span>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-[auto_1fr] items-end gap-5 border-t border-ivory/10 pt-5">
        <div>
          <p className="font-display text-4xl tracking-tight text-peach">{reach}k</p>
          <p className="text-xs text-ivory/60">projected reach · {posts} posts</p>
        </div>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-16 w-full" aria-hidden>
          <polyline points={pts} fill="none" stroke="#DF462B" strokeWidth="3" vectorEffect="non-scaling-stroke" style={{ transition: "all .3s" }} />
        </svg>
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {types.map((t) => (
            <span key={t.name} className="flex items-center gap-1.5 text-xs text-ivory/60">
              <span className={cn("size-2.5 rounded-sm", t.cls)} /> {t.name}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            setFilled(0);
            setRunId((v) => v + 1);
          }}
          className="inline-flex items-center gap-2 rounded-full bg-ivory px-4 py-2 text-sm font-semibold text-charcoal"
        >
          <MessageCircle className="size-4" /> Generate
        </button>
      </div>
    </Frame>
  );
}
