import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { SectionSpread } from "@/components/ui/SectionSpread";
import { Reveal } from "@/components/motion/Reveal";
import { CTABand } from "@/components/sections/CTABand";
import { proofMetrics, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About — The Team Behind Meshglade",
  description:
    "Meshglade is a remote-first software & AI agency. We bring creative and technical skills together to turn complex needs into simple solutions.",
  alternates: { canonical: "/about" },
};

const values = [
  { t: "Clarity", d: "Plain language, honest estimates, no jargon walls." },
  { t: "Craft", d: "Details matter — in code, in design and in every message." },
  { t: "Ownership", d: "We act like it's our business on the line, because your success is ours." },
  { t: "Momentum", d: "Small, frequent wins beat big, slow launches." },
];

// Strands: tangled on the left, parallel flutes on the right
const strands = Array.from({ length: 10 }, (_, i) => {
  let d = "";
  for (let k = 0; k <= 60; k++) {
    const t = k / 60;
    const x = t * 600;
    const amp = Math.pow(Math.max(0, 1 - t / 0.6), 2) * 70;
    const y = 20 + i * 16 + amp * Math.sin(t * 14 + i * 1.7) + amp * 0.4 * Math.sin(t * 31 + i);
    d += `${k ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About"
        title={["We untangle", <span key="b" className="text-ember">businesses.</span>]}
        intro={`${site.name} is a remote-first software & AI agency, founded in ${site.founded}. We help ambitious teams replace manual chaos with systems that just work.`}
      />

      {/* The name */}
      <section className="pb-24 sm:pb-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6">
            <div className="rounded-card bg-charcoal p-6 sm:p-10">
              <svg viewBox="0 0 600 200" className="h-auto w-full" aria-hidden>
                {strands.map((d, i) => (
                  <path key={i} d={d} fill="none" stroke={i === 4 ? "#DF462B" : "#FFF9EA"} strokeOpacity={i === 4 ? 1 : 0.5} strokeWidth="1.5" />
                ))}
              </svg>
              <div className="mt-6 flex justify-between font-mono text-xs tracking-widest text-ivory/60 uppercase">
                <span>Mesh</span>
                <span>→</span>
                <span>Glade</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6">
            <p className="label text-charcoal-70">The name</p>
            <h2 className="display-m mt-6">Mesh + glade.</h2>
            <p className="mt-6 text-lg leading-relaxed text-charcoal-80">
              A <strong className="text-charcoal">mesh</strong> is what most businesses live in: tools that don&apos;t talk, data in ten places,
              people doing robot work. A <strong className="text-charcoal">glade</strong> is a clearing — open space where things are
              simple and you can see where you&apos;re going.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-charcoal-80">Our job is to get you from one to the other.</p>
          </Reveal>
        </div>
      </section>

      {/* The mark */}
      <section data-nav-theme="dark" className="bg-charcoal py-24 text-ivory sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionSpread
              dark
              size="m"
              index="01"
              label="The mark"
              title={["Two strokes,", "one direction."]}
              intro="Our logomark joins two forms along a 45° line. That connection reflects how we work: bringing creative and technical skills together to produce clear, purposeful work."
            />
          </div>
          <div className="grid grid-cols-2 gap-3 lg:col-span-7">
            {["tile-3d-12.png", "tile-3d-19.png"].map((f, i) => (
              <Reveal key={f} delay={i * 0.1} className="overflow-hidden rounded-card">
                <Image src={`/brand/${f}`} alt="Meshglade logomark" width={1340} height={1340} sizes="(max-width: 1024px) 50vw, 30vw" className="h-auto w-full" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionSpread size="c" index="02" label="Values" title={["What we stand for."]} />
          <div className="mt-12 grid gap-8 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 0.08} className="border-t border-charcoal pt-6">
                <span className="label text-ember">0{i + 1}</span>
                <h3 className="mt-4 font-display text-3xl tracking-tight">{v.t}</h3>
                <p className="mt-3 text-charcoal-80">{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Remote */}
      <section className="bg-ivory-deep py-24 sm:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionSpread
              size="m"
              index="03"
              label="How we work"
              title={["Remote-first.", "Always reachable."]}
              intro="We work with clients across 9 countries. Here's how that stays simple for you:"
            />
          </div>
          <ul className="space-y-3 lg:col-span-6">
            {[
              ["3+ hours overlap", "with your working day, guaranteed."],
              ["One shared channel", "Slack, WhatsApp or Teams — whatever you already use."],
              ["Weekly written updates", "progress, blockers and next steps in two minutes of reading."],
              ["Live demo every 2 weeks", "see the real thing, give feedback early."],
            ].map(([t, d]) => (
              <Reveal as="li" key={t} className="flex gap-4 rounded-card border border-charcoal/12 p-5 sm:p-6">
                <span className="mt-2 size-2 shrink-0 rotate-45 bg-ember" />
                <span>
                  <span className="font-display text-xl tracking-tight">{t}</span>{" "}
                  <span className="text-charcoal-80">— {d}</span>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
        <div className="container-x mt-16 grid grid-cols-3 gap-6 border-t border-charcoal pt-10">
          {proofMetrics.map((m) => (
            <Reveal key={m.label}>
              <p className="font-display text-4xl tracking-tight sm:text-6xl">{m.value}</p>
              <p className="mt-2 text-sm text-charcoal-80">{m.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand title={["Let's build", "something simple."]} />
    </>
  );
}
