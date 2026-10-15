import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "light" | "outline" | "outline-light" | "ghost";
type Size = "md" | "lg";

const base =
  "group/btn relative isolate inline-flex select-none items-center justify-center gap-3 overflow-hidden rounded-full font-semibold whitespace-nowrap transition-[color,border-color,transform] duration-300 ease-brand active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 " +
  // The Diagonal: a 45° fill sweeps in on hover (logomark angle)
  "before:absolute before:inset-y-0 before:-left-1/4 before:-z-10 before:w-[150%] before:origin-left before:-translate-x-[105%] before:skew-x-[-45deg] before:transition-transform before:duration-500 before:ease-brand hover:before:translate-x-0";

const variants: Record<Variant, string> = {
  primary: "bg-charcoal text-ivory before:bg-peach hover:text-charcoal",
  light: "bg-ivory text-charcoal before:bg-peach",
  outline: "border border-charcoal/80 text-charcoal before:bg-charcoal hover:text-ivory",
  "outline-light": "border border-ivory/40 text-ivory before:bg-ivory hover:text-charcoal",
  ghost: "text-current before:hidden",
};

const sizes: Record<Size, string> = {
  md: "h-12 pl-5 pr-1.5 text-[0.95rem]",
  lg: "h-14 pl-6 pr-2 text-base sm:h-16 sm:pl-7 sm:text-[1.05rem]",
};

function Arrow({ size, variant }: { size: Size; variant: Variant }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-ember text-ivory transition-transform duration-500 ease-brand group-hover/btn:rotate-45",
        size === "lg" ? "size-10 sm:size-12" : "size-9",
        variant === "ghost" && "size-8",
      )}
    >
      <ArrowUpRight className={size === "lg" ? "size-5" : "size-4"} strokeWidth={2} />
    </span>
  );
}

type Common = { variant?: Variant; size?: Size; arrow?: boolean; children: ReactNode; className?: string };

export function Button({
  href,
  variant = "primary",
  size = "md",
  arrow = true,
  className,
  children,
  ...rest
}: Common & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const cls = cn(base, variants[variant], sizes[size], !arrow && "px-6", className);
  const inner = (
    <>
      <span className="relative">{children}</span>
      {arrow && <Arrow size={size} variant={variant} />}
    </>
  );
  if (external) {
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}

export function SubmitButton({
  variant = "primary",
  size = "md",
  arrow = true,
  className,
  children,
  ...rest
}: Common & ComponentProps<"button">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], !arrow && "px-6", className)} {...rest}>
      <span className="relative">{children}</span>
      {arrow && <Arrow size={size} variant={variant} />}
    </button>
  );
}

/** Text link with an underline that draws along the diagonal */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/tl inline-flex items-center gap-1.5 font-semibold underline decoration-current/30 decoration-1 underline-offset-[6px] transition-[text-decoration-color] duration-300 hover:decoration-current",
        className,
      )}
    >
      {children}
      <ArrowUpRight
        aria-hidden
        className="size-4 transition-transform duration-300 ease-brand group-hover/tl:translate-x-0.5 group-hover/tl:-translate-y-0.5"
      />
    </Link>
  );
}
