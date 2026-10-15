import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import { featuredProjects } from "@/content/projects";
import { getService } from "@/content/services";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { Button } from "@/components/ui/Button";

/**
 * Case files stack on scroll (desktop): each card pins slightly lower than the
 * previous, leaving an indexed edge like a folder tab. Mobile: plain vertical cards.
 */
export function CaseFiles() {
  return (
    <div className="relative">
      <ol className="space-y-6 lg:space-y-0">
        {featuredProjects.map((p, i) => (
          <li
            key={p.slug}
            className="lg:sticky lg:top-[calc(6.5rem+var(--i)*1.5rem)] lg:pb-10"
            style={{ "--i": i } as CSSProperties}
          >
            <Link
              href={`/projects/${p.slug}`}
              className="group grid overflow-hidden rounded-card border border-ivory/10 bg-ivory text-charcoal shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.6)] lg:min-h-[min(72vh,620px)] lg:grid-cols-12"
            >
              <div className="flex flex-col p-6 sm:p-10 lg:col-span-5">
                <div className="flex items-center justify-between">
                  <span className="label text-charcoal-70">
                    Case file <span className="text-ember">0{i + 1}</span> / 0{featuredProjects.length}
                  </span>
                  <span className="label text-charcoal-70">{p.year}</span>
                </div>
                <p className="mt-8 font-display text-[clamp(4rem,9vw,8.5rem)] leading-[0.85] tracking-[-0.05em] text-ember">
                  {p.headlineMetric.value}
                </p>
                <p className="mt-2 text-lg text-charcoal-80">{p.headlineMetric.label}</p>
                <div className="mt-auto pt-10">
                  <h3 className="display-s">{p.title}</h3>
                  <p className="mt-2 max-w-md text-charcoal-80">{p.tagline}</p>
                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-charcoal px-3 py-1 text-xs font-semibold text-ivory">{p.industry}</span>
                    {p.services.map((s) => (
                      <span key={s} className="rounded-full border border-charcoal/20 px-3 py-1 text-xs font-medium">
                        {getService(s)?.name}
                      </span>
                    ))}
                    <span className="ml-auto grid size-11 place-items-center rounded-full border border-charcoal/25 transition-[transform,background-color,color] duration-500 ease-brand group-hover:rotate-45 group-hover:bg-charcoal group-hover:text-ivory">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative p-3 pt-0 lg:col-span-7 lg:p-3">
                <ProjectCover project={p} className="aspect-[4/3] h-full w-full rounded-[22px] lg:aspect-auto" />
                <span className="pointer-events-none absolute right-7 bottom-7 z-10 hidden rounded-full bg-charcoal px-4 py-2 text-sm font-semibold text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block">
                  View case study
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
      <div className="mt-10 flex justify-center lg:mt-4">
        <Button href="/projects" variant="outline-light" size="lg">
          See all projects
        </Button>
      </div>
    </div>
  );
}
