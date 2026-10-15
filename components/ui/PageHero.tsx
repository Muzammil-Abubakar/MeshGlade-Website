import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { RevealLines } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/** Inner-page hero in the brand-book "Spread" layout. Above the fold → CSS-only reveal. */
export function PageHero({
  label,
  title,
  intro,
  crumbs,
  aside,
  children,
  dark,
  className,
}: {
  label: string;
  title: ReactNode[];
  intro?: ReactNode;
  crumbs?: { name: string; href: string }[];
  aside?: ReactNode;
  children?: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <section
      data-nav-theme={dark ? "dark" : undefined}
      className={cn("relative overflow-hidden pt-32 pb-14 sm:pt-44 sm:pb-20", dark ? "bg-charcoal text-ivory" : "bg-ivory", className)}
    >
      <div className="container-x relative">
        <div className={cn("fade-now flex flex-wrap items-center gap-3", dark ? "text-ivory/60" : "text-charcoal-70")}>
          {crumbs && (
            <nav aria-label="Breadcrumb" className="label flex items-center gap-2">
              {crumbs.map((c) => (
                <span key={c.href} className="flex items-center gap-2">
                  <Link href={c.href} className="hover:text-ember">
                    {c.name}
                  </Link>
                  <span aria-hidden>/</span>
                </span>
              ))}
            </nav>
          )}
          <p className="label">
            <span className="text-ember">[</span> {label} <span className="text-ember">]</span>
          </p>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
          <RevealLines as="h1" immediate className="display-xl lg:col-span-8" lines={title} />
          {(intro || aside) && (
            <div className="fade-now lg:col-span-4 lg:pb-3" style={{ "--d": "0.45s" } as CSSProperties}>
              {intro && <div className={cn("text-lg leading-relaxed", dark ? "text-ivory/75" : "text-charcoal-80")}>{intro}</div>}
              {aside}
            </div>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
