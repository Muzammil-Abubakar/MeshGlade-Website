import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, Mail } from "lucide-react";
import { AuditPanel } from "@/components/forms/AuditPanel";
import { RevealLines } from "@/components/motion/Reveal";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { auditOffer, site } from "@/content/site";
import { whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Book a Free Audit",
  description: `Book a free 30-minute automation & growth audit. Three fields, reply within ${site.responseTime}. Leave with 3 things you can automate this month.`,
  alternates: { canonical: "/contact" },
};

/**
 * The fast path for "Book a free audit" — 3 fields (or the calendar when a booking
 * link is set). Detailed project enquiries go to /contact/brief.
 */
export default function ContactPage() {
  return (
    <section className="pt-32 pb-20 sm:pt-44 sm:pb-28">
      {/* Mobile order: promise → form → details. Desktop: copy left, form right. */}
      <div className="container-x grid gap-10 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-0">
        <div className="lg:col-span-6">
          <p className="label fade-now text-charcoal-70">
            <span className="text-ember">[</span> Free audit <span className="text-ember">]</span>
          </p>
          <RevealLines
            as="h1"
            immediate
            className="display-l mt-6"
            lines={["30 minutes.", <span key="b" className="text-ember">3 clear wins.</span>]}
          />
          <p className="fade-now mt-6 max-w-lg text-lg text-charcoal-80" style={{ "--d": "0.35s" } as React.CSSProperties}>
            {auditOffer.promise}
          </p>
        </div>

        <div className="fade-now lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1" style={{ "--d": "0.25s" } as React.CSSProperties}>
          <div className="lg:sticky lg:top-28">
            <div className="rounded-card border border-charcoal/10 bg-ivory-80 p-5 shadow-[0_30px_80px_-50px_rgba(39,39,39,0.5)] sm:p-10">
              <p className="font-display text-3xl tracking-tight">Claim your free audit</p>
              <p className="mt-2 mb-8 text-charcoal-80">Three fields. We&apos;ll come prepared.</p>
              <AuditPanel />
            </div>
            <Link
              href="/contact/brief"
              className="group mt-4 flex items-center justify-between gap-4 rounded-card border border-charcoal/12 px-6 py-5 transition-colors hover:border-charcoal/40"
            >
              <span>
                <span className="block font-semibold">Planning a bigger project?</span>
                <span className="text-sm text-charcoal-80">Send a detailed brief and get a fixed-price proposal in 3 days.</span>
              </span>
              <ArrowUpRight className="size-5 shrink-0 transition-transform group-hover:rotate-45" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6 lg:pt-8">
          <ul className="fade-now space-y-3" style={{ "--d": "0.45s" } as React.CSSProperties}>
            {auditOffer.bullets.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-charcoal text-ivory">
                  <Check className="size-3.5" />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <ol
            className="fade-now mt-10 grid grid-cols-3 gap-4 border-t border-charcoal/15 pt-8"
            style={{ "--d": "0.55s" } as React.CSSProperties}
          >
            {[
              ["Request", "Takes 30 seconds"],
              ["We reply", `Within ${site.responseTime}`],
              ["30-min call", "Video or phone"],
            ].map(([t, d], i) => (
              <li key={t}>
                <span className="label text-ember">0{i + 1}</span>
                <span className="mt-2 block font-semibold">{t}</span>
                <span className="text-sm text-charcoal-80">{d}</span>
              </li>
            ))}
          </ol>

          <div className="fade-now mt-10 flex flex-wrap gap-3" style={{ "--d": "0.65s" } as React.CSSProperties}>
            <a
              href={whatsappLink(site.whatsapp, "Hi Meshglade, I'd like a free audit.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-ember px-5 font-semibold text-ivory transition-transform hover:-translate-y-0.5"
            >
              <WhatsAppIcon className="size-4" /> WhatsApp us
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-12 items-center gap-2 rounded-full border border-charcoal/20 px-5 font-semibold transition-colors hover:bg-charcoal hover:text-ivory"
            >
              <Mail className="size-4" /> {site.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
