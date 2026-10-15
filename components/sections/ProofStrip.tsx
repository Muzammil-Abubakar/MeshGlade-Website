import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { clientNames, proofMetrics } from "@/content/site";

const marqueeClients = [...clientNames, ...clientNames];

export function ProofStrip() {
  return (
    <section aria-label="Clients and results" className="border-b border-charcoal/10 bg-ivory">
      <div className="container-x grid gap-10 py-12 sm:py-14 lg:grid-cols-12 lg:items-center">
        <Reveal className="min-w-0 overflow-hidden lg:col-span-5">
          <p className="label text-charcoal-70">Trusted by teams in 9 countries</p>
          <div className="relative mt-5 overflow-hidden [-webkit-mask-image:linear-gradient(to_right,transparent,black_20px,black_calc(100%-20px),transparent)] [mask-image:linear-gradient(to_right,transparent,black_20px,black_calc(100%-20px),transparent)]">
            <div className="flex w-max animate-marquee items-center hover:[animation-play-state:paused] motion-reduce:animate-none">
              {/* Track 1 */}
              <ul className="flex shrink-0 items-center gap-10 pr-10">
                {marqueeClients.map((n, i) => (
                  <li
                    key={`track1-${i}`}
                    className="shrink-0 font-display text-xl tracking-tight text-charcoal/45 sm:text-2xl"
                  >
                    {n}
                  </li>
                ))}
              </ul>
              {/* Track 2 for seamless infinite loop */}
              <ul aria-hidden className="flex shrink-0 items-center gap-10 pr-10">
                {marqueeClients.map((n, i) => (
                  <li
                    key={`track2-${i}`}
                    className="shrink-0 font-display text-xl tracking-tight text-charcoal/45 sm:text-2xl"
                  >
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal
          delay={0.1}
          className="grid grid-cols-[1fr_1.35fr_0.9fr] divide-x divide-charcoal/10 lg:col-span-7"
        >
          {proofMetrics.map((m) => (
            <Link
              key={m.label}
              href={m.href}
              className="group min-w-0 px-3 first:pl-0 last:pr-0 sm:px-5 lg:px-4 xl:px-6"
            >
              <span className="block font-display text-2xl tracking-tight tabular-nums whitespace-nowrap transition-colors group-hover:text-ember sm:text-3xl lg:text-[1.85rem] xl:text-4xl 2xl:text-5xl">
                {m.value}
              </span>
              <span className="mt-1 block text-[11px] leading-snug text-charcoal-80 sm:text-sm">
                {m.label}
              </span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
