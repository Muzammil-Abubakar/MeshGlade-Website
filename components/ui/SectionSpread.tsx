import type { ReactNode } from "react";
import { Reveal, RevealLines, RevealRule } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/**
 * The Spread — the brand-book page header: big title left, short paragraph right,
 * a full-width rule beneath, and an index label (e.g. "03 / Services").
 */
export function SectionSpread({
  index,
  label,
  title,
  intro,
  dark,
  action,
  className,
  size = "l",
  as = "h2",
}: {
  index?: string;
  label: string;
  title: ReactNode[];
  intro?: ReactNode;
  dark?: boolean;
  action?: ReactNode;
  className?: string;
  /** l = giant key-moment headline · c = compact (title beside intro) · m = stacked, for narrow columns */
  size?: "l" | "m" | "c";
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("relative", className)}>
      <Reveal className={cn("label mb-6 flex items-center gap-3 sm:mb-8", dark ? "text-ivory/60" : "text-charcoal-70")}>
        {index && <span className={dark ? "text-ember-60" : "text-ember"}>{index}</span>}
        {index && <span aria-hidden className={cn("h-px w-8", dark ? "bg-ivory/30" : "bg-charcoal/30")} />}
        <span>{label}</span>
      </Reveal>
      <div
        className={cn(
          "grid gap-6",
          size === "c" ? "pb-6 sm:pb-8" : "pb-8 sm:pb-10",
          size !== "m" && "lg:grid-cols-12 lg:items-end lg:gap-10",
        )}
      >
        <RevealLines
          as={as}
          lines={title}
          className={cn(size === "l" && "display-l lg:col-span-7", size === "m" && "display-m", size === "c" && "display-m lg:col-span-7")}
        />
        {(intro || action) && (
          <Reveal delay={0.15} className={cn(size !== "m" && "lg:col-span-5 lg:pb-2")}>
            {intro && (
              <div className={cn("max-w-xl text-base leading-relaxed sm:text-lg", dark ? "text-ivory/70" : "text-charcoal-80")}>
                {intro}
              </div>
            )}
            {action && <div className="mt-6">{action}</div>}
          </Reveal>
        )}
      </div>
      <RevealRule dark={dark} className={cn(size === "c" && (dark ? "bg-ivory/10" : "bg-charcoal/15"))} />
    </div>
  );
}
