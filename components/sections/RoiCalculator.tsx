"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { useRouter } from "next/navigation";
import { Slider } from "@/components/ui/Slider";
import { SubmitButton } from "@/components/ui/Button";
import { saveBriefContext } from "@/lib/attribution";
import { cn, formatMoney } from "@/lib/utils";

const RATE = 0.6; // share of repetitive work we typically automate
const WEEKS = 4.33;
const currencies = ["USD", "EUR", "GBP", "AED"] as const;

function AnimatedNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(0);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(prev.current, value, {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (node.textContent = format(v)),
    });
    prev.current = value;
    return () => controls.stop();
  }, [value, inView, format]);
  return (
    <span ref={ref} className="tabular-nums">
      {format(0)}
    </span>
  );
}

export function RoiCalculator() {
  const [people, setPeople] = useState(5);
  const [hours, setHours] = useState(10);
  const [cost, setCost] = useState(25);
  const [currency, setCurrency] = useState<(typeof currencies)[number]>("USD");
  const router = useRouter();

  const hoursMonth = Math.round(people * hours * WEEKS * RATE);
  const yearly = Math.round(hoursMonth * cost * 12);
  const fte = hoursMonth / 160;
  const money = (n: number) => formatMoney(Math.round(n), currency);

  const toAudit = () => {
    saveBriefContext({
      source: "roi",
      services: ["ai-automation"],
      summary: `ROI calculator: ${people} people × ${hours} h/week repetitive work at ${money(cost)}/h → ~${hoursMonth} h/month and ~${money(yearly)}/year potential savings (60% automation).`,
    });
    router.push("/contact?intent=audit&service=ai-automation");
  };

  return (
    <div className="grid overflow-hidden rounded-card border border-charcoal/10 lg:grid-cols-2">
      <div className="space-y-8 bg-ivory-80 p-6 sm:p-10">
        <Slider label="People doing repetitive work" value={people} min={1} max={50} onChange={setPeople} />
        <Slider label="Hours per person, per week" value={hours} min={1} max={40} onChange={setHours} format={(v) => `${v} h`} />
        <Slider
          label="Average hourly cost"
          value={cost}
          min={5}
          max={150}
          onChange={setCost}
          format={(v) => money(v)}
        />
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm text-charcoal-80">Currency</span>
          <div className="flex rounded-full border border-charcoal/15 p-1">
            {currencies.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCurrency(c)}
                aria-pressed={c === currency}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                  c === currency ? "bg-charcoal text-ivory" : "text-charcoal-80 hover:text-charcoal",
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grain flex flex-col bg-charcoal p-6 text-ivory sm:p-10">
        <div className="flutes-fine pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-ember/50 to-transparent opacity-60" aria-hidden />
        <p className="label relative text-ivory/60">Estimated savings with automation</p>
        <div className="relative mt-6 grid grid-cols-2 gap-6 lg:grid-cols-1 lg:gap-8">
          <div>
            <p className="font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-none tracking-tight">
              <AnimatedNumber value={hoursMonth} format={(n) => Math.round(n).toLocaleString("en-US")} />
              <span className="text-ivory/55"> h</span>
            </p>
            <p className="mt-2 text-sm text-ivory/60">saved every month</p>
          </div>
          <div>
            <p className="font-display text-[clamp(2.6rem,6vw,5.5rem)] leading-none tracking-tight text-peach">
              <AnimatedNumber value={yearly} format={money} />
            </p>
            <p className="mt-2 text-sm text-ivory/60">back in your budget, every year</p>
          </div>
        </div>
        <p className="relative mt-6 text-sm text-ivory/60">
          That&apos;s like adding <strong className="text-ivory">{fte.toFixed(1)} full-time people</strong> — without hiring.
        </p>
        <div className="relative mt-auto pt-8">
          <SubmitButton type="button" variant="light" size="lg" onClick={toAudit} className="w-full justify-between sm:w-auto">
            Confirm these numbers — free audit
          </SubmitButton>
          <p className="mt-4 text-xs text-ivory/55">
            Formula: people × hours × 4.33 weeks × 60% automatable × hourly cost. Your results will vary — the audit makes
            it precise.
          </p>
        </div>
      </div>
    </div>
  );
}
