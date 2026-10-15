import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DetailSkeleton } from "@/components/ui/DetailSkeleton";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { SectionSpread } from "@/components/ui/SectionSpread";
import { Reveal, RevealRule } from "@/components/motion/Reveal";
import { BeforeAfter } from "@/components/interactive/BeforeAfter";
import { CTABand } from "@/components/sections/CTABand";
import { InlineCTA } from "@/components/sections/InlineCTA";
import { getProject, projects } from "@/content/projects";
import { getService } from "@/content/services";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { site } from "@/content/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title} — ${p.headlineMetric.value} ${p.headlineMetric.label}`,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
  };
}

// The page itself renders instantly (App Shell); URL-specific content resolves inside Suspense.
export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <ProjectDetail params={params} />
    </Suspense>
  );
}

async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: p.title,
            headline: p.tagline,
            description: p.summary,
            creator: { "@type": "Organization", name: site.legalName },
            dateCreated: String(p.year),
          },
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: p.title, path: `/projects/${p.slug}` },
          ]),
        ]}
      />

      <PageHero
        label={p.industry}
        crumbs={[{ name: "Projects", href: "/projects" }]}
        title={[p.title]}
        intro={p.tagline}
      >
        <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-charcoal pt-6 sm:grid-cols-4">
          {[
            ["Client", p.client],
            ["Services", p.services.map((s) => getService(s)?.name).join(", ")],
            ["Timeline", p.duration],
            ["Year", String(p.year)],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="label text-charcoal-70">{k}</dt>
              <dd className="mt-2 font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      <section className="pb-20">
        <div className="container-x">
          <div className="relative">
            <ProjectCover project={p} priority className="aspect-[4/3] rounded-card sm:aspect-[16/8]" sizes="100vw" />
            <div className="absolute bottom-4 left-4 z-10 rounded-2xl bg-ivory px-5 py-4 shadow-lg sm:bottom-8 sm:left-8 sm:px-7 sm:py-5">
              <p className="font-display text-5xl leading-none tracking-tight text-ember sm:text-7xl">{p.headlineMetric.value}</p>
              <p className="mt-1 text-sm text-charcoal-80">{p.headlineMetric.label}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge / Approach / Result */}
      <section className="pb-24 sm:pb-32">
        <div className="container-x">
          <Reveal as="p" className="display-s max-w-4xl">
            {p.summary}
          </Reveal>
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {[
              ["01", "The challenge", p.challenge],
              ["02", "Our approach", p.approach],
              ["03", "The result", p.result],
            ].map(([n, t, d], i) => (
              <Reveal key={t} delay={i * 0.1} className="border-t border-charcoal pt-6">
                <p className="label text-ember">{n}</p>
                <h2 className="mt-4 font-display text-3xl tracking-tight">{t}</h2>
                <p className="mt-4 leading-relaxed text-charcoal-80">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section data-nav-theme="dark" className="bg-charcoal py-16 text-ivory sm:py-20">
        <div className="container-x grid grid-cols-2 gap-8 lg:grid-cols-4">
          {p.metrics.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08}>
              <p className="font-display text-5xl tracking-tight text-peach sm:text-6xl">{m.value}</p>
              <p className="mt-2 text-sm text-ivory/60">{m.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Mid-page CTA — at peak interest, right after the results */}
      <section className="pt-16 sm:pt-20">
        <div className="container-x">
          <InlineCTA
            title="Have a similar problem?"
            text={`We did this for ${p.client.split(" ")[0]}${/^\d/.test(p.duration) ? ` in ${p.duration}` : ""}. In a free 30-minute audit we'll show you what the same approach could do for your business.`}
            href={`/contact?service=${p.services[0]}&intent=audit`}
            whatsappMessage={`Hi Meshglade, I read the ${p.title} case study and have a similar problem.`}
          />
        </div>
      </section>

      {/* Before / after */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionSpread
            index="—"
            label="Before & after"
            title={["From mesh", "to glade."]}
            intro="Drag the diagonal to compare how things worked before and after we shipped."
          />
          <Reveal className="mt-12 sm:mt-16">
            <BeforeAfter before={p.before} after={p.after} />
          </Reveal>
        </div>
      </section>

      {/* Features + stack */}
      <section className="pb-24 sm:pb-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="label text-charcoal-70">What we built</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {p.features.map((f) => (
                <Reveal key={f.title} className="rounded-card bg-ivory-deep p-6">
                  <h3 className="font-display text-xl tracking-tight">{f.title}</h3>
                  <p className="mt-2 text-sm text-charcoal-80">{f.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <p className="label text-charcoal-70">Tech stack</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="rounded-full border border-charcoal/20 px-4 py-2 text-sm font-medium">
                  {s}
                </span>
              ))}
            </div>
            {p.testimonial && (
              <Reveal as="figure" className="mt-10 rounded-card bg-charcoal p-8 text-ivory">
                <blockquote className="font-display text-2xl leading-snug tracking-tight">
                  <span className="text-ember">[ </span>
                  {p.testimonial.quote}
                  <span className="text-ember"> ]</span>
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-semibold">{p.testimonial.name}</span>
                  <span className="block text-ivory/60">{p.testimonial.role}</span>
                </figcaption>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <CTABand
        title={["Want results", "like this?"]}
        href={`/contact?service=${p.services[0]}&intent=audit`}
        text={`Tell us where you are today. We'll show you how we'd approach it — free, in 30 minutes.`}
      />

      {/* Next project */}
      <section className="pb-8">
        <div className="container-x">
          <RevealRule />
          <Link href={`/projects/${next.slug}`} className="group grid items-center gap-6 py-10 sm:py-14 lg:grid-cols-12">
            <span className="label text-charcoal-70 lg:col-span-2">Next project</span>
            <span className="display-l transition-colors duration-500 group-hover:text-ember lg:col-span-7">{next.title}</span>
            <span className="flex items-center gap-4 lg:col-span-3 lg:justify-end">
              <span className="hidden w-40 overflow-hidden rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:block">
                <ProjectCover project={next} clear={false} className="aspect-[4/3]" sizes="160px" />
              </span>
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-charcoal text-ivory transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="size-6" />
              </span>
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
