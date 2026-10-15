import type { Metadata } from "next";
import { UntangleField } from "@/components/gl/UntangleField";
import { RevealLines } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { ThankYouName } from "./ThankYouName";
import { featuredProjects } from "@/content/projects";
import { site } from "@/content/site";
import { whatsappLink } from "@/lib/utils";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section data-nav-theme="dark" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-charcoal text-ivory">
      {/* Complex → simple, one more time: the field untangles as you arrive */}
      <UntangleField />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
      <div className="container-x relative flex flex-1 flex-col justify-end pt-36 pb-16">
        <p className="label fade-now text-ivory/70">
          <span className="text-ember">[</span> Brief received <span className="text-ember">]</span>
        </p>
        <RevealLines
          as="h1"
          immediate
          className="display-xl mt-6"
          lines={[<ThankYouName key="n" />, <span key="b" className="block text-[0.55em] leading-[1] text-peach">Consider it untangled.</span>]}
        />
        <p className="fade-now mt-8 max-w-xl text-lg text-ivory/80" style={{ "--d": "0.5s" } as React.CSSProperties}>
          A senior member of our team will reply within {site.responseTime}. A confirmation is on its way to your inbox.
        </p>
        <div className="fade-now mt-10 flex flex-wrap gap-3" style={{ "--d": "0.65s" } as React.CSSProperties}>
          {site.bookingUrl ? (
            <Button href={site.bookingUrl} variant="light" size="lg">
              Pick a call time now
            </Button>
          ) : (
            <Button href="/projects" variant="light" size="lg">
              See our work meanwhile
            </Button>
          )}
          <a
            href={whatsappLink(site.whatsapp, "Hi Meshglade, I just sent a brief.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center gap-2 rounded-full border border-ivory/30 px-6 font-semibold hover:bg-ivory hover:text-charcoal sm:h-16"
          >
            <WhatsAppIcon className="size-4" /> In a hurry? WhatsApp
          </a>
        </div>
        <div className="fade-now mt-16 grid gap-3 border-t border-ivory/15 pt-8 sm:grid-cols-3" style={{ "--d": "0.8s" } as React.CSSProperties}>
          {featuredProjects.slice(0, 3).map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="group rounded-2xl bg-ivory/5 p-5 transition-colors hover:bg-ivory/10">
              <span className="font-display text-3xl tracking-tight text-peach">{p.headlineMetric.value}</span>
              <span className="mt-1 block text-sm text-ivory/70">
                {p.title} · {p.headlineMetric.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
