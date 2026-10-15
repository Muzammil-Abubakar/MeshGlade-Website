import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DetailSkeleton } from "@/components/ui/DetailSkeleton";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionSpread } from "@/components/ui/SectionSpread";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceHeroVisual } from "@/components/interactive/ServiceHeroVisual";
import { CTABand } from "@/components/sections/CTABand";
import { RoiCalculator } from "@/components/sections/RoiCalculator";
import { getService, services } from "@/content/services";
import { projectsByService } from "@/content/projects";
import { processSteps } from "@/content/landing";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";
import { site } from "@/content/site";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: `${s.name} — ${s.chips.join(", ")}`,
    description: `${s.outcome} ${s.description}`.slice(0, 160),
    alternates: { canonical: `/services/${s.slug}` },
  };
}

// The page itself renders instantly (App Shell); URL-specific content resolves inside Suspense.
export default function ServicePage({ params }: PageProps<"/services/[slug]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <ServiceDetail params={params} />
    </Suspense>
  );
}

async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const related = projectsByService(s.slug);
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.name,
            description: s.description,
            serviceType: s.chips.join(", "),
            provider: { "@type": "Organization", name: site.legalName, url: site.url },
            areaServed: "Worldwide",
          },
          faqJsonLd(s.faqs),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: s.name, path: `/services/${s.slug}` },
          ]),
        ]}
      />

      <PageHero
        label={`${s.index} · ${s.name}`}
        crumbs={[{ name: "Services", href: "/services" }]}
        title={s.tagline.split(" ").length > 4 ? splitTitle(s.tagline) : [s.tagline]}
        intro={s.outcome}
        aside={
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`/contact?service=${s.slug}&intent=audit`} size="lg">
              Get a free audit
            </Button>
          </div>
        }
      />

      {/* Interactive visual + description */}
      <section className="pb-24 sm:pb-32">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="lg:col-span-7">
            <ServiceHeroVisual slug={s.slug} />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="font-display text-xl leading-snug tracking-tight sm:text-2xl lg:text-[1.75rem]">{s.description}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {s.chips.map((c) => (
                <span key={c} className="rounded-full border border-charcoal/20 px-3.5 py-1.5 text-sm font-medium">
                  {c}
                </span>
              ))}
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-charcoal pt-6">
              {s.outcomes.map((o) => (
                <div key={o.label}>
                  <dt className="font-display text-3xl tracking-tight text-ember sm:text-4xl">{o.value}</dt>
                  <dd className="mt-1 text-xs text-charcoal-80 sm:text-sm">{o.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {s.slug === "ai-automation" && (
        <section className="pb-24 sm:pb-32">
          <div className="container-x">
            <SectionSpread
              size="c"
              index="ROI"
              label="Calculator"
              title={["What would automation save you?"]}
              intro="Move the sliders. Most teams are surprised how much time goes into work a system could do."
            />
            <div className="mt-10 sm:mt-12">
              <RoiCalculator />
            </div>
          </div>
        </section>
      )}

      {/* What's included */}
      <section className="bg-ivory-deep py-24 sm:py-32">
        <div className="container-x">
          <SectionSpread size="c" index="01" label="What's included" title={["Everything you need. Nothing extra."]} />
          <div className="mt-12 grid gap-3 sm:mt-16 md:grid-cols-2">
            {s.subServices.map((sub, i) => (
              <Reveal key={sub.name} delay={(i % 2) * 0.08} className="group flex flex-col rounded-card bg-ivory p-6 transition-colors duration-500 hover:bg-charcoal hover:text-ivory sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-3xl tracking-tight">{sub.name}</h3>
                  <span className="label text-ember">0{i + 1}</span>
                </div>
                <p className="mt-3 text-charcoal-80 transition-colors group-hover:text-ivory/70">{sub.description}</p>
                <ul className="mt-6 grid gap-2 border-t border-charcoal/12 pt-5 transition-colors group-hover:border-ivory/15 sm:grid-cols-2">
                  {sub.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-ember" /> {d}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionSpread
            size="c"
            index="02"
            label="Use cases"
            title={["What it looks like in your industry."]}
            intro="A few examples of what we build. Your version will be shaped around your workflow."
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-card border border-charcoal/12 bg-charcoal/12 sm:mt-16 md:grid-cols-2">
            {s.useCases.map((u) => (
              <Reveal key={u.title} className="bg-ivory p-6 sm:p-10">
                <p className="label text-charcoal-70">{u.industry}</p>
                <h3 className="mt-4 font-display text-2xl tracking-tight sm:text-3xl">{u.title}</h3>
                <p className="mt-3 text-charcoal-80">{u.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stack + process */}
      <section data-nav-theme="dark" className="bg-charcoal py-24 text-ivory sm:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionSpread dark size="m" index="03" label="Tech stack" title={["The right tools,", "not the trendy ones."]} />
            <div className="mt-10 space-y-6">
              {s.stack.map((g) => (
                <Reveal key={g.group} className="grid grid-cols-[110px_1fr] items-start gap-4 border-b border-ivory/10 pb-6">
                  <span className="label pt-2 text-ivory/50">{g.group}</span>
                  <span className="flex flex-wrap gap-2">
                    {g.items.map((it) => (
                      <span key={it} className="rounded-full border border-ivory/20 px-3 py-1.5 text-sm">
                        {it}
                      </span>
                    ))}
                  </span>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="lg:col-span-6">
            <SectionSpread dark size="m" index="04" label="How it runs" title={["Four steps.", "Zero guesswork."]} />
            <ol className="mt-10">
              {processSteps.map((p) => (
                <Reveal as="li" key={p.name} className="grid grid-cols-[48px_1fr_auto] gap-4 border-b border-ivory/10 py-5">
                  <span className="label pt-1.5 text-ember-60">{p.index}</span>
                  <span>
                    <span className="block font-display text-2xl tracking-tight">{p.name}</span>
                    <span className="text-sm text-ivory/60">{p.description}</span>
                  </span>
                  <span className="label pt-1.5 text-ivory/55">{p.duration}</span>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Related projects */}
      {related.length > 0 && (
        <section className="py-24 sm:py-32">
          <div className="container-x">
            <SectionSpread index="05" label="Proof" title={["Results we've", "delivered."]} />
            <div className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-2">
              {related.map((p) => (
                <Reveal key={p.slug}>
                  <Link href={`/projects/${p.slug}`} className="group block">
                    <ProjectCover project={p} className="aspect-[16/10] rounded-card" sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-2xl tracking-tight">{p.title}</h3>
                        <p className="mt-1 text-charcoal-80">{p.tagline}</p>
                      </div>
                      <span className="text-right">
                        <span className="block font-display text-3xl tracking-tight text-ember">{p.headlineMetric.value}</span>
                        <span className="text-xs text-charcoal-80">{p.headlineMetric.label}</span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="pb-12">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionSpread size="m" index="06" label="FAQ" title={["Questions about", s.shortName + "."]} />
          </div>
          <div className="lg:col-span-7">
            <Accordion items={s.faqs} />
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="py-16">
        <div className="container-x">
          <p className="label mb-6 text-charcoal-70">Other services</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/services/${o.slug}`}
                className="group flex items-center justify-between rounded-full border border-charcoal/15 px-6 py-4 transition-colors hover:bg-charcoal hover:text-ivory"
              >
                <span className="font-display text-xl tracking-tight">{o.name}</span>
                <ArrowUpRight className="size-5 transition-transform group-hover:rotate-45" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title={[`Let's talk`, <span key="s" className="text-peach">{s.shortName}.</span>]}
        href={`/contact?service=${s.slug}&intent=audit`}
      />
    </>
  );
}

function splitTitle(t: string) {
  const words = t.split(" ");
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}
