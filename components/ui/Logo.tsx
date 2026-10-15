import Image from "next/image";
import { cn } from "@/lib/utils";

type Tone = "charcoal" | "ivory" | "ember" | "white";

// Official assets extracted unmodified from the brand files (see /public/brand).
// Lockup: 1885×233 · Mark: 536×272
export function Logo({
  tone = "charcoal",
  className,
  priority,
}: {
  tone?: Tone;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={`/brand/logo-${tone}.png`}
      alt="Meshglade"
      width={1885}
      height={233}
      priority={priority}
      sizes="(max-width: 640px) 160px, 200px"
      className={cn("h-auto w-[148px] select-none sm:w-[172px]", className)}
    />
  );
}

export function LogoMark({ tone = "charcoal", className }: { tone?: Tone; className?: string }) {
  return (
    <Image
      src={`/brand/mark-${tone}.png`}
      alt=""
      aria-hidden
      width={536}
      height={272}
      sizes="80px"
      className={cn("h-auto w-10 select-none", className)}
    />
  );
}
