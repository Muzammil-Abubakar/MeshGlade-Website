import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionSpread } from "@/components/ui/SectionSpread";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollWords } from "@/components/interactive/ScrollWords";
import { Process } from "@/components/sections/Process";
import { ComparisonToggle } from "@/components/sections/ComparisonToggle";
import { Testimonials } from "@/components/sections/Testimonials";
import { CTABand } from "@/components/sections/CTABand";
import { comparisonExtended, guarantees, principles } from "@/content/landing";
import { faqs } from "@/content/faqs";
import { proofMetrics } from "@/content/site";

export const metadata: Metadata = {
  title: "Why Meshglade — Fixed Quotes, Senior Team, You Own Everything",
  description:
    "Why businesses switch to Meshglade: fixed quotes, demos every two weeks, senior engineers only, 100% code ownership and 30 days of free support.",
  alternates: { canonical: "/why-us" },
};

export default function WhyUsPage() {
  return (
    <>
      <PageHero
        label="Why Meshglade"
        title={["Simple is", <span key="h" className="text-ember">hard work.</span>]}
        intro="We do the hard work of making things simple — so your team doesn't have to think about the systems running the business."
      />

      {/* Manifesto */}
      <section className="pb-24 sm:pb-32">
        <div className="container-x">
          <ScrollWords
            className="max-w-6xl font-display text-[clamp(1.8rem,4.2vw,4rem)] leading-[1.08] tracking-[-0.03em]"
            highlight={["simple", "numbers", "yours."]}
            text="Most agencies sell complexity: more meetings, more features, more invoices. We believe the best solution is the simplest one that moves your numbers. We say no to work that won't pay you back, we show progress every two weeks, and everything we build is yours."
          />
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-ivory-deep py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionSpread
              index="01"
              size="m"
              label="The difference"
              title={["Typical agency", "vs Meshglade."]}
              intro="We built Meshglade around the things clients told us they hated about agencies. Flip the switch."
            />
          </div>
          <div className="lg:col-span-7">
            <ComparisonToggle rows={comparisonExtended} />
          </div>
        </div>
      </section>

      {/* Process — moved here from the home page */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionSpread
            index="02"
            label="How we work"
            title={["From mesh", "to glade."]}
            intro="Every project starts tangled. Four steps later it's simple — with a live demo every two weeks so you're never guessing."
          />
          <div className="mt-12 sm:mt-16">
            <Process />
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionSpread size="c" index="03" label="Principles" title={["How we make decisions."]} />
          <div className="mt-12 grid gap-px overflow-hidden rounded-card bg-charcoal/12 sm:mt-16 md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} className="group bg-ivory p-8 transition-colors duration-500 hover:bg-charcoal hover:text-ivory sm:p-12">
                <span className="label text-ember">0{i + 1}</span>
                <h3 className="mt-6 display-s">{p.title}</h3>
                <p className="mt-4 max-w-md text-charcoal-80 transition-colors group-hover:text-ivory/70">{p.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section data-nav-theme="dark" className="bg-charcoal py-24 text-ivory sm:py-32">
        <div className="container-x">
          <SectionSpread dark index="04" label="Guarantees" title={["Promises we", "put in writing."]} />
          <ul className="mt-12 grid gap-3 sm:mt-16 sm:grid-cols-2 lg:grid-cols-5">
            {guarantees.map((g, i) => (
              <Reveal as="li" key={g.title} delay={i * 0.06} className="rounded-card border border-ivory/12 p-6">
                <span className="grid size-10 place-items-center rounded-full bg-ember font-display text-ivory">{i + 1}</span>
                <h3 className="mt-8 font-display text-2xl tracking-tight">{g.title}</h3>
                <p className="mt-2 text-sm text-ivory/60">{g.description}</p>
              </Reveal>
            ))}
          </ul>
          <div className="mt-16 grid grid-cols-3 gap-6 border-t border-ivory/15 pt-10">
            {proofMetrics.map((m) => (
              <div key={m.label}>
                <p className="font-display text-4xl tracking-tight text-peach sm:text-6xl">{m.value}</p>
                <p className="mt-2 text-sm text-ivory/60">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionSpread size="c" index="05" label="Client words" title={["Heard from the people we serve."]} />
          <div className="mt-12 sm:mt-16">
            <Testimonials />
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 pb-12">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionSpread size="m" index="06" label="FAQ" title={["Good", "questions."]} />
          </div>
          <div className="lg:col-span-7">
            <Accordion items={faqs} />
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
