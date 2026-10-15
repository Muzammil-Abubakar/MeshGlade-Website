"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { addOns, estimate, sizes, timelines, type Size, type Timeline } from "@/content/estimator";
import { services, type ServiceSlug } from "@/content/services";
import { ServiceGlyph } from "@/components/ui/ServiceGlyph";
import { SubmitButton } from "@/components/ui/Button";
import { saveBriefContext } from "@/lib/attribution";
import { cn, formatMoney } from "@/lib/utils";

export function Estimator() {
  const [picked, setPicked] = useState<ServiceSlug[]>(["ai-automation"]);
  const [size, setSize] = useState<Size>("standard");
  const [extras, setExtras] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<Timeline>("standard");
  const router = useRouter();
  const result = estimate({ services: picked, size, addOns: extras, timeline });

  const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

  const send = () => {
    if (!result) return;
    const names = picked.map((p) => services.find((s) => s.slug === p)!.name).join(" + ");
    const extraNames = addOns.filter((a) => extras.includes(a.id)).map((a) => a.name);
    saveBriefContext({
      source: "estimator",
      services: picked,
      summary: `Estimator: ${names} · ${size} · ${timeline} timeline${extraNames.length ? ` · add-ons: ${extraNames.join(", ")}` : ""} → ${formatMoney(result.min)}–${formatMoney(result.max)}, ${result.weeksMin}–${result.weeksMax} weeks.`,
    });
    router.push(`/contact/brief?intent=estimate&service=${picked[0]}`);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
      <div className="space-y-12 lg:col-span-7">
        <Step n="01" title="What do you need?" hint="Pick one or combine — bundles get 10% off.">
          <div className="grid grid-cols-2 gap-3">
            {services.map((s) => {
              const on = picked.includes(s.slug);
              return (
                <button
                  key={s.slug}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setPicked(toggle(picked, s.slug))}
                  className={cn(
                    "relative flex flex-col items-start rounded-card border p-4 text-left transition-colors duration-300 sm:p-6",
                    on ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/15 hover:border-charcoal/50",
                  )}
                >
                  <span className={cn("w-16 transition-colors sm:w-20", on ? "text-ivory" : "text-charcoal")}>
                    <ServiceGlyph slug={s.slug} />
                  </span>
                  <span className="mt-4 font-display text-lg leading-tight tracking-tight sm:text-2xl">{s.name}</span>
                  <span className={cn("mt-1 hidden text-xs sm:block", on ? "text-ivory/60" : "text-charcoal-70")}>{s.chips.join(" · ")}</span>
                  <span
                    className={cn(
                      "absolute top-4 right-4 grid size-6 place-items-center rounded-full border transition-colors",
                      on ? "border-ember bg-ember text-ivory" : "border-charcoal/25",
                    )}
                  >
                    {on && <Check className="size-3.5" />}
                  </span>
                </button>
              );
            })}
          </div>
        </Step>

        <Step n="02" title="How big is it?">
          <div className="grid gap-3 sm:grid-cols-3">
            {sizes.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={size === s.id}
                onClick={() => setSize(s.id)}
                className={cn(
                  "rounded-card border p-5 text-left transition-colors duration-300",
                  size === s.id ? "border-charcoal bg-peach" : "border-charcoal/15 hover:border-charcoal/50",
                )}
              >
                <span className="block font-display text-2xl tracking-tight">{s.name}</span>
                <span className="mt-2 block text-sm text-charcoal-80">{s.description}</span>
              </button>
            ))}
          </div>
        </Step>

        <Step n="03" title="Any extras?" hint="Optional">
          <div className="flex flex-wrap gap-2">
            {addOns.map((a) => {
              const on = extras.includes(a.id);
              return (
                <button
                  key={a.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setExtras(toggle(extras, a.id))}
                  className={cn(
                    "rounded-full border px-4 py-2.5 text-sm font-medium transition-colors",
                    on ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/20 hover:border-charcoal/60",
                  )}
                >
                  {on ? "✓ " : "+ "}
                  {a.name}
                </button>
              );
            })}
          </div>
        </Step>

        <Step n="04" title="How soon?">
          <div className="grid gap-3 sm:grid-cols-3">
            {timelines.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={timeline === t.id}
                onClick={() => setTimeline(t.id)}
                className={cn(
                  "rounded-card border p-5 text-left transition-colors duration-300",
                  timeline === t.id ? "border-charcoal bg-peach" : "border-charcoal/15 hover:border-charcoal/50",
                )}
              >
                <span className="block font-display text-2xl tracking-tight">{t.name}</span>
                <span className="mt-1 block text-sm text-charcoal-80">{t.description}</span>
              </button>
            ))}
          </div>
        </Step>
      </div>

      {/* Result — sticky on desktop, pinned to the bottom of the section on mobile */}
      <div className="sticky bottom-[5.25rem] z-10 lg:top-28 lg:bottom-auto lg:col-span-5 lg:self-start">
        <div className="grain overflow-hidden rounded-card bg-charcoal p-5 text-ivory shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] sm:p-8">
          <p className="label text-ivory/60">Your estimate</p>
          <div aria-live="polite">
            {result ? (
              <>
                <p className="mt-3 font-display text-[clamp(2rem,4vw,3.5rem)] leading-none tracking-tight">
                  {formatMoney(result.min)} <span className="text-ivory/55">–</span> {formatMoney(result.max)}
                </p>
                <p className="mt-2 text-ivory/70">
                  {result.weeksMin}–{result.weeksMax} weeks · {picked.length} service{picked.length > 1 ? "s" : ""}
                </p>
              </>
            ) : (
              <p className="mt-3 font-display text-3xl tracking-tight text-ivory/50">Pick a service to start</p>
            )}
          </div>
          <div className="mt-5 hidden space-y-2 border-t border-ivory/10 pt-5 text-sm text-ivory/70 lg:block">
            <p>✓ Fixed quote after a 30-min call — no surprises</p>
            <p>✓ 30 days free support included</p>
            <p>✓ You own 100% of the code</p>
          </div>
          <SubmitButton type="button" variant="light" onClick={send} disabled={!result} className="mt-5 w-full justify-between sm:mt-8" size="lg">
            Send estimate & book a call
          </SubmitButton>
          <p className="mt-3 hidden text-xs text-ivory/55 sm:block">Indicative range based on typical projects. Final price is fixed in your proposal.</p>
        </div>
      </div>
    </div>
  );
}

function Step({ n, title, hint, children }: { n: string; title: string; hint?: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-5 flex w-full items-baseline gap-4 border-b border-charcoal pb-4">
        <span className="label text-ember">{n}</span>
        <span className="font-display text-2xl tracking-tight sm:text-3xl">{title}</span>
        {hint && <span className="ml-auto text-sm text-charcoal-70">{hint}</span>}
      </legend>
      {children}
    </fieldset>
  );
}
