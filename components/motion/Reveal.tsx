import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
  Scroll reveals are driven by ONE global IntersectionObserver (RevealObserver)
  that adds `.in` to any [data-reveal] element. These components are therefore
  server components and ship zero JS. Styles live in reveal.css.
*/

export function RevealLines({
  as: Tag = "h2",
  lines,
  className,
  lineClassName,
  delay = 0,
  immediate = false,
}: {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** animate on load (used above the fold) instead of on scroll */
  immediate?: boolean;
}) {
  return (
    <Tag data-reveal={immediate ? undefined : "lines"} className={cn(immediate && "reveal-now", className)}>
      {lines.map((line, i) => (
        <span key={i} className={cn("rl", lineClassName)}>
          <span style={{ "--i": i, "--d": `${delay}s` } as CSSProperties}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

export function Reveal({
  as: Tag = "div",
  children,
  className,
  delay = 0,
  style,
  ...rest
}: {
  as?: ElementType;
  children?: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
} & Record<string, unknown>) {
  return (
    <Tag data-reveal="fade" className={className} style={{ "--d": `${delay}s`, ...style } as CSSProperties} {...rest}>
      {children}
    </Tag>
  );
}

export function RevealRule({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <div
      data-reveal="rule"
      aria-hidden
      className={cn("h-px w-full", dark ? "bg-ivory/15" : "bg-charcoal", className)}
    />
  );
}
