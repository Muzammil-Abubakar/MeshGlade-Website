import { Check } from "lucide-react";
import { engagementModels } from "@/content/pricing";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export function PricingCards({ detailed = false }: { detailed?: boolean }) {
  return (
    <div className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible lg:px-0">
      {engagementModels.map((m, i) => (
        <Reveal
          key={m.id}
          delay={i * 0.08}
          className={cn(
            "relative flex w-[86%] shrink-0 snap-center flex-col rounded-card border p-6 sm:w-[60%] sm:p-8 lg:w-auto",
            m.featured ? "border-peach bg-peach" : "border-charcoal/12 bg-ivory-80",
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="label text-charcoal-70">{m.kind}</p>
              <h3 className="mt-3 font-display text-4xl tracking-tight">{m.name}</h3>
            </div>
            {m.featured && (
              <span className="rounded-full bg-charcoal px-3 py-1 text-xs font-semibold text-ivory">Most chosen</span>
            )}
          </div>
          <p className="mt-4 text-charcoal-80">{m.description}</p>
          <div className="mt-8 border-t border-charcoal/15 pt-6">
            <p className="mb-1.5 text-sm text-charcoal-80">{m.priceNote}</p>
            <p className="font-display text-5xl tracking-tight">{m.price}</p>
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-charcoal-70">Timeline</dt>
              <dd className="font-semibold">{m.timeline}</dd>
            </div>
            <div>
              <dt className="text-charcoal-70">Best for</dt>
              <dd className="font-semibold">{m.bestFor}</dd>
            </div>
          </dl>
          {detailed && (
            <ul className="mt-6 space-y-2.5 border-t border-charcoal/15 pt-6">
              {m.includes.map((inc) => (
                <li key={inc} className="flex gap-2.5 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-ember" />
                  {inc}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-auto pt-8">
            <Button
              href={`/contact/brief?plan=${m.id}`}
              variant={m.featured ? "primary" : "outline"}
              className="w-full justify-between"
            >
              Start with {m.name}
            </Button>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
