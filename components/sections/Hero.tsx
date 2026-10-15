import type { CSSProperties } from "react";
import { Star } from "lucide-react";
import { UntangleField } from "@/components/gl/UntangleField";
import { RevealLines } from "@/components/motion/Reveal";
import { Button, TextLink } from "@/components/ui/Button";
import { ServiceTicker } from "./ServiceTicker";
import { site } from "@/content/site";

export function Hero() {
  const valueFirst = site.heroVariant === "value";
  return (
    <section
      data-nav-theme="dark"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-charcoal text-ivory"
    >
      <UntangleField />
      {/* legibility: bottom fade + a soft scrim behind the headline */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-charcoal/85 via-charcoal/35 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_45%_at_32%_68%,rgb(39_39_39/0.55),transparent_75%)]" />

      <div className="container-x relative flex flex-1 flex-col pt-28 sm:pt-36">
        <div className="fade-now flex items-center justify-between gap-4" style={{ "--d": "0.2s" } as CSSProperties}>
          <div className="flex flex-wrap items-center gap-3">
            <p className="label text-ivory/70">
              {valueFirst ? (
                <>
                  <span className="text-ember-60">[</span> {site.tagline.replace(/\.$/, "")} <span className="text-ember-60">]</span>
                </>
              ) : (
                "Software & AI Agency"
              )}
            </p>
            {site.availability && (
              <p className="inline-flex items-center gap-2 rounded-full border border-ivory/15 bg-charcoal/55 px-3 py-1.5 text-xs text-ivory/85 backdrop-blur-md">
                <span className="relative flex size-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-ember" />
                  <span className="relative size-1.5 rounded-full bg-ember" />
                </span>
                {site.availability}
              </p>
            )}
          </div>
          <ServiceTicker />
        </div>

        <div className="mt-auto pt-16 pb-10 sm:pb-14">
          {valueFirst ? (
            // Says what we sell in 5 seconds; dim → bright mirrors "complex → simple"
            <RevealLines
              as="h1"
              immediate
              delay={0.15}
              className="display-hero"
              lines={[
                <span key="a" className="text-ivory/50">
                  AI agents &amp; software
                </span>,
                <span key="b">that win customers.</span>,
              ]}
            />
          ) : (
            <RevealLines
              as="h1"
              immediate
              delay={0.15}
              className="display-xl max-w-[14ch]"
              lines={[
                <span key="a" className="text-ivory/45">
                  Complex needs.
                </span>,
                <span key="b">Simple solutions.</span>,
              ]}
            />
          )}

          <div className="mt-8 grid gap-8 sm:mt-10 lg:grid-cols-12 lg:items-end">
            <p
              className="fade-now max-w-xl text-lg leading-relaxed text-ivory/80 sm:text-xl lg:col-span-6"
              style={{ "--d": "0.55s" } as CSSProperties}
            >
              We build AI agents, automations and software that save your team hours every week — and bring in more
              customers while you sleep.
            </p>
            <div
              className="fade-now flex flex-col gap-4 sm:flex-row sm:items-center lg:col-span-6 lg:justify-end"
              style={{ "--d": "0.7s" } as CSSProperties}
            >
              <Button href="/contact?intent=audit" variant="light" size="lg" className="justify-between sm:justify-center">
                Book a free audit
              </Button>
              <TextLink href="/pricing#estimator" className="self-start text-ivory sm:self-center">
                Get an estimate in 60s
              </TextLink>
            </div>
          </div>
        </div>
      </div>

      {/* Brand-book strip */}
      <div className="relative border-t border-ivory/15">
        <div
          className="fade-now container-x grid grid-cols-2 gap-y-3 py-5 text-sm text-ivory/70 md:grid-cols-4"
          style={{ "--d": "0.9s" } as CSSProperties}
        >
          <span className="flex items-center gap-2">
            <Star className="size-4 fill-ember text-ember" /> {site.rating} client rating
          </span>
          <span>Replies within {site.responseTime}</span>
          <span>NDA on request</span>
          <span className="hidden items-center justify-end gap-3 md:flex">
            <span className="label">Scroll</span>
            <span aria-hidden className="relative h-8 w-px overflow-hidden bg-ivory/20">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.8s_var(--ease-brand)_infinite] bg-ember" />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
