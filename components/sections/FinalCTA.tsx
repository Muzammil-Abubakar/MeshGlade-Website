import { Check, Mail } from "lucide-react";
import { RevealLines, Reveal } from "@/components/motion/Reveal";
import { QuickForm } from "@/components/forms/QuickForm";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { auditOffer, site } from "@/content/site";
import { whatsappLink } from "@/lib/utils";

export function FinalCTA() {
  return (
    <section
      id="get-started"
      data-nav-theme="dark"
      className="grain relative isolate overflow-hidden bg-charcoal py-24 text-ivory sm:py-32"
    >
      {/* Mesh gradient (Brand screen 7), slowly breathing */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -bottom-1/3 -left-1/4 h-[90%] w-[80%] animate-blob rounded-full bg-ember blur-[120px]" />
        <div className="absolute -right-1/4 -bottom-1/2 h-[80%] w-[70%] animate-blob rounded-full bg-peach opacity-80 blur-[140px] [animation-delay:-6s]" />
        <div className="absolute top-1/4 right-0 h-1/2 w-1/3 animate-blob rounded-full bg-ember opacity-70 blur-[120px] [animation-delay:-12s]" />
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-charcoal to-transparent" />
      </div>

      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <p className="label text-ivory/70">{auditOffer.title}</p>
          <RevealLines
            as="h2"
            className="display-l mt-6"
            lines={["Let's clear", <span key="m" className="text-peach">the mesh.</span>]}
          />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-lg text-ivory/85">{auditOffer.promise}</p>
            <ul className="mt-8 space-y-3">
              {auditOffer.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-ivory text-charcoal">
                    <Check className="size-3.5" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={whatsappLink(site.whatsapp, "Hi Meshglade, I'd like a free audit.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-ivory/30 px-5 font-semibold transition-colors hover:bg-ivory hover:text-charcoal"
              >
                <WhatsAppIcon className="size-4" /> WhatsApp us
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-ivory/30 px-5 font-semibold transition-colors hover:bg-ivory hover:text-charcoal"
              >
                <Mail className="size-4" /> {site.email}
              </a>
              {site.bookingUrl && (
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center rounded-full border border-ivory/30 px-5 font-semibold transition-colors hover:bg-ivory hover:text-charcoal"
                >
                  Book a call
                </a>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-6">
          <div className="rounded-card bg-ivory p-6 text-charcoal shadow-[0_40px_120px_-40px_rgba(0,0,0,0.6)] sm:p-10">
            <p className="font-display text-3xl tracking-tight">Claim your free audit</p>
            <p className="mt-2 mb-8 text-charcoal-80">Takes 30 seconds. We&apos;ll come prepared.</p>
            <QuickForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
