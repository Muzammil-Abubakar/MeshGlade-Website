import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionSpread } from "@/components/ui/SectionSpread";
import { ServiceGlyph } from "@/components/ui/ServiceGlyph";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { CTABand } from "@/components/sections/CTABand";
import { services } from "@/content/services";
import { projectsByService } from "@/content/projects";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services — AI Automation, Software, Data & AI, Growth",
  description:
    "AI agents, chatbots and WhatsApp automation; websites, web apps and SaaS; analytics, RAG and computer vision; social media, AI content and lead generation.",
  alternates: { canonical: "/services" },
};

const loop = [
  { slug: "growth", verb: "brings the leads" },
  { slug: "ai-automation", verb: "answers & qualifies them" },
  { slug: "software-development", verb: "runs the business" },
  { slug: "data-ai", verb: "shows what to improve" },
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title={["Four ways", <span key="s">to <span className="text-ember">simple.</span></span>]}
        intro="One senior team across automation, software, data and growth. Pick one — or let them work together as a system."
      />

      <section className="pb-12">
        <div className="container-x space-y-4 sm:space-y-6">
          {services.map((s, i) => {
            const proof = projectsByService(s.slug)[0];
            return (
              <Reveal
                key={s.slug}
                as="article"
                id={s.slug}
                className="grid scroll-mt-28 overflow-hidden rounded-card border border-charcoal/10 bg-ivory-80 lg:grid-cols-12"
              >
                <div className={cn("flex flex-col p-6 sm:p-10 lg:col-span-7", i % 2 === 1 && "lg:order-2")}>
                  <div className="flex items-center justify-between">
                    <span className="label text-ember">{s.index}</span>
                    <span className="label text-charcoal-70">{s.tagline}</span>
                  </div>
                  <h2 className="display-m mt-8">{s.name}</h2>
                  <p className="mt-4 max-w-xl text-lg text-charcoal-80">{s.description}</p>
                  <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                    {s.subServices.map((sub) => (
                      <li key={sub.name} className="border-t border-charcoal/12 pt-4">
                        <span className="font-display text-xl tracking-tight">{sub.name}</span>
                        <span className="mt-1 line-clamp-2 block text-sm text-charcoal-80">{sub.description}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap items-center gap-4 pt-10">
                    <Button href={`/services/${s.slug}`}>Explore {s.shortName}</Button>
                    <Link href={`/contact/brief?service=${s.slug}`} className="text-sm font-semibold underline underline-offset-4">
                      Get a quote
                    </Link>
                  </div>
                </div>
                <div className={cn("flex flex-col bg-charcoal p-6 text-ivory sm:p-10 lg:col-span-5", i % 2 === 1 && "lg:order-1")}>
                  <div className="mx-auto w-full max-w-xs py-6 text-ivory">
                    <ServiceGlyph slug={s.slug} />
                  </div>
                  <dl className="mt-auto grid grid-cols-3 gap-4 border-t border-ivory/15 pt-6">
                    {s.outcomes.map((o) => (
                      <div key={o.label}>
                        <dt className="font-display text-2xl tracking-tight text-peach sm:text-3xl">{o.value}</dt>
                        <dd className="mt-1 text-xs text-ivory/60">{o.label}</dd>
                      </div>
                    ))}
                  </dl>
                  {proof && (
                    <Link
                      href={`/projects/${proof.slug}`}
                      className="group mt-6 flex items-center justify-between rounded-2xl bg-ivory/5 p-4 transition-colors hover:bg-ivory/10"
                    >
                      <span>
                        <span className="label text-ivory/50">Case study</span>
                        <span className="mt-1 block font-semibold">
                          {proof.title} — {proof.headlineMetric.value} {proof.headlineMetric.label}
                        </span>
                      </span>
                      <ArrowUpRight className="size-5 transition-transform group-hover:rotate-45" />
                    </Link>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* How they connect */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionSpread
            size="c"
            index="+"
            label="Better together"
            title={["One system, not four vendors."]}
            intro="Most growth problems cross departments. Because one team owns the whole loop, nothing gets lost between agencies."
          />
          <ol className="mt-12 grid gap-3 sm:mt-16 lg:grid-cols-4 lg:gap-0">
            {loop.map((step, i) => {
              const s = services.find((x) => x.slug === step.slug)!;
              return (
                <Reveal as="li" key={step.slug} delay={i * 0.1} className="relative">
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex h-full items-center gap-5 rounded-card border border-charcoal/12 p-6 transition-colors hover:bg-charcoal hover:text-ivory lg:mr-6 lg:flex-col lg:items-start lg:p-8"
                  >
                    <span className="w-16 shrink-0 text-charcoal transition-colors group-hover:text-ivory lg:w-24">
                      <ServiceGlyph slug={s.slug} />
                    </span>
                    <span>
                      <span className="block font-display text-2xl tracking-tight">{s.name}</span>
                      <span className="text-charcoal-80 transition-colors group-hover:text-ivory/70">{step.verb}</span>
                    </span>
                  </Link>
                  {i < loop.length - 1 && (
                    <span aria-hidden className="absolute top-1/2 -right-0.5 hidden h-px w-6 bg-ember lg:block">
                      <span className="absolute -top-[3px] right-0 size-[7px] rotate-45 border-t border-r border-ember" />
                    </span>
                  )}
                </Reveal>
              );
            })}
          </ol>
          <Reveal className="mt-6 flex items-center gap-3 text-sm text-charcoal-80">
            <span className="size-2 rotate-45 bg-ember" />
            …and the data loops back into growth. That&apos;s the mesh — made simple.
          </Reveal>
        </div>
      </section>

      <CTABand title={["Not sure which", "one you need?"]} text="Tell us the problem — we'll recommend the simplest fix, even if that's not us." />
    </>
  );
}
