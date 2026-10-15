import { PageHero } from "./PageHero";
import { LegalToc } from "./LegalToc";

export type LegalSection = { id: string; title: string; body: React.ReactNode };

export function LegalLayout({
  label,
  title,
  updated,
  intro,
  sections,
}: {
  label: string;
  title: React.ReactNode[];
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero label={label} title={title} intro={<><span className="label block text-charcoal-70">Last updated · {updated}</span><span className="mt-3 block">{intro}</span></>} />
      <section className="pb-24 sm:pb-32">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <LegalToc items={sections.map(({ id, title }) => ({ id, title }))} />
          </aside>
          <article className="max-w-[68ch] lg:col-span-8">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28 border-t border-charcoal/15 py-10 first:border-charcoal">
                <h2 className="flex items-baseline gap-4 font-display text-2xl tracking-tight sm:text-3xl">
                  <span className="label text-ember">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                <div className="legal-body mt-5 space-y-4 leading-relaxed text-charcoal-80">{s.body}</div>
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
