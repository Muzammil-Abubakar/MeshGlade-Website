// MOCK ESTIMATOR RULES — tune these numbers to match your real pricing.
import type { ServiceSlug } from "./services";

export type Size = "starter" | "standard" | "advanced";
export type Timeline = "flexible" | "standard" | "rush";

export const sizes: { id: Size; name: string; description: string }[] = [
  { id: "starter", name: "Starter", description: "One focused workflow, page set or feature. Proves value fast." },
  { id: "standard", name: "Standard", description: "A complete solution with integrations and polish. Most common." },
  { id: "advanced", name: "Advanced", description: "Multi-system, high-scale or highly custom. Built to grow." },
];

/** Price ranges in USD per service and size: [min, max] */
export const basePrices: Record<ServiceSlug, Record<Size, [number, number]>> = {
  "ai-automation": { starter: [2500, 4000], standard: [5000, 9000], advanced: [12000, 25000] },
  "software-development": { starter: [4900, 8000], standard: [12000, 22000], advanced: [30000, 60000] },
  "data-ai": { starter: [4000, 7000], standard: [10000, 18000], advanced: [25000, 50000] },
  growth: { starter: [1500, 2500], standard: [3000, 5000], advanced: [6000, 10000] },
};

/** Weeks per size */
export const baseWeeks: Record<Size, [number, number]> = {
  starter: [2, 4],
  standard: [5, 8],
  advanced: [10, 16],
};

export const addOns: { id: string; name: string; price: number }[] = [
  { id: "integrations", name: "Extra integrations (CRM, ERP, payments)", price: 1500 },
  { id: "admin", name: "Admin panel / dashboard", price: 2500 },
  { id: "multilingual", name: "Multilingual (per extra language)", price: 900 },
  { id: "design", name: "Brand & UI design system", price: 2000 },
  { id: "care", name: "6-month care plan", price: 3000 },
];

export const timelines: { id: Timeline; name: string; description: string; price: number; weeks: number }[] = [
  { id: "flexible", name: "Flexible", description: "We fit you in — 8% lower cost", price: 0.92, weeks: 1.3 },
  { id: "standard", name: "Standard", description: "Normal schedule", price: 1, weeks: 1 },
  { id: "rush", name: "Rush", description: "Priority team — +25% cost", price: 1.25, weeks: 0.7 },
];

export function estimate(input: {
  services: ServiceSlug[];
  size: Size;
  addOns: string[];
  timeline: Timeline;
}) {
  if (input.services.length === 0) return null;
  const t = timelines.find((x) => x.id === input.timeline)!;
  let min = 0;
  let max = 0;
  for (const s of input.services) {
    const [a, b] = basePrices[s][input.size];
    min += a;
    max += b;
  }
  // Bundling discount when combining services
  const bundle = input.services.length > 1 ? 0.9 : 1;
  const extras = addOns.filter((a) => input.addOns.includes(a.id)).reduce((sum, a) => sum + a.price, 0);
  min = Math.round(((min * bundle + extras) * t.price) / 100) * 100;
  max = Math.round(((max * bundle + extras) * t.price) / 100) * 100;
  const [wa, wb] = baseWeeks[input.size];
  const extraWeeks = (input.services.length - 1) * 2;
  const weeksMin = Math.max(1, Math.round((wa + extraWeeks) * t.weeks));
  const weeksMax = Math.max(weeksMin + 1, Math.round((wb + extraWeeks) * t.weeks));
  return { min, max, weeksMin, weeksMax };
}
