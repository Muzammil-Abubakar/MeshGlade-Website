import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Ordered flutes with one strand out of place
const strands = Array.from({ length: 14 }, (_, i) => i);

export default function NotFound() {
  return (
    <section data-nav-theme="dark" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-charcoal pt-32 pb-16 text-ivory">
      <svg aria-hidden viewBox="0 0 700 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full opacity-60">
        {strands.map((i) => {
          const x = 30 + i * 50;
          const d = i === 9 ? `M${x} 0 C ${x + 120} 120, ${x - 160} 220, ${x + 60} 400` : `M${x} 0 V400`;
          return <path key={i} d={d} stroke={i === 9 ? "#DF462B" : "#FFF9EA"} strokeOpacity={i === 9 ? 1 : 0.15} strokeWidth={i === 9 ? 3 : 18} fill="none" />;
        })}
      </svg>
      <div className="container-x relative">
        <p className="label text-ivory/60">
          <span className="text-ember">[</span> Error 404 <span className="text-ember">]</span>
        </p>
        <h1 className="display-xl mt-6">
          This page got
          <br />
          <span className="text-peach">tangled.</span>
        </h1>
        <p className="mt-6 max-w-md text-lg text-ivory/70">The link may be broken or the page moved. Here&apos;s where people usually want to go:</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/" variant="light" size="lg">
            Back home
          </Button>
          {[
            ["Projects", "/projects"],
            ["Services", "/services"],
            ["Contact", "/contact"],
          ].map(([l, h]) => (
            <Link key={h} href={h} className="inline-flex h-14 items-center gap-2 rounded-full border border-ivory/25 px-6 font-semibold hover:bg-ivory hover:text-charcoal sm:h-16">
              {l} <ArrowUpRight className="size-4" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
