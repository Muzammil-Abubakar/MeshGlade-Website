"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/** Accessible native range input with brand styling (large touch target). */
export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format = (v) => String(v),
  dark,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
  dark?: boolean;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-4">
        <span className={cn("text-sm", dark ? "text-ivory/70" : "text-charcoal-80")}>{label}</span>
        <span className="font-display text-2xl tracking-tight tabular-nums">{format(value)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn("mg-range mt-3 w-full", dark && "mg-range-dark")}
        style={{ "--p": `${pct}%` } as CSSProperties}
      />
    </label>
  );
}
