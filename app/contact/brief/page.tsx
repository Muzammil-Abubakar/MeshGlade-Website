import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { RevealLines } from "@/components/motion/Reveal";
import { WhatsAppIcon, socialIcons } from "@/components/ui/Icons";
import { site } from "@/content/site";
import { whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Project Brief — Get a Fixed Quote",
  description: `Tell us about your project in four quick steps and get a fixed-price proposal. Reply within ${site.responseTime}.`,
  alternates: { canonical: "/contact/brief" },
};

export default function BriefPage() {
  return (
    <section className="pt-32 pb-20 sm:pt-44 sm:pb-28">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Left — sticky info */}
        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="label fade-now text-charcoal-70">
              <span className="text-ember">[</span> Project brief <span className="text-ember">]</span>
            </p>
            <RevealLines as="h1" immediate className="display-l mt-6" lines={["Tell us about", <span key="s" className="text-ember">your project.</span>]} />

            <div className="fade-now mt-10 rounded-card bg-charcoal p-6 text-ivory sm:p-8" style={{ "--d": "0.4s" } as React.CSSProperties}>
              <p className="label text-ember-60">What happens next</p>
              <p className="mt-4 text-ivory/85">A senior team member reads your brief and replies with questions or a fixed-price proposal.</p>
              <ol className="mt-6 space-y-4 border-t border-ivory/10 pt-6">
                {[
                  ["We reply within 24h", "A senior team member reads every brief."],
                  ["30-minute call", "We dig into the problem and the numbers."],
                  ["Proposal in 3 days", "Fixed price, scope and timeline."],
                ].map(([t, d], i) => (
                  <li key={t} className="flex gap-4">
                    <span className="label pt-1 text-ember-60">0{i + 1}</span>
                    <span>
                      <span className="block font-semibold">{t}</span>
                      <span className="text-sm text-ivory/60">{d}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <ul className="fade-now mt-8 space-y-4 text-[0.95rem]" style={{ "--d": "0.55s" } as React.CSSProperties}>
              <li>
                <a href={whatsappLink(site.whatsapp, "Hi Meshglade, I'd like to discuss a project.")} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4">
                  <span className="grid size-11 place-items-center rounded-full bg-ember text-ivory">
                    <WhatsAppIcon className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs text-charcoal-70">WhatsApp — fastest</span>
                    <span className="font-semibold group-hover:text-ember">{site.whatsappDisplay}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="group flex items-center gap-4">
                  <span className="grid size-11 place-items-center rounded-full border border-charcoal/15">
                    <Mail className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs text-charcoal-70">Email</span>
                    <span className="font-semibold group-hover:text-ember">{site.email}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`tel:${site.phoneHref}`} className="group flex items-center gap-4">
                  <span className="grid size-11 place-items-center rounded-full border border-charcoal/15">
                    <Phone className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs text-charcoal-70">Phone</span>
                    <span className="font-semibold group-hover:text-ember">{site.phone}</span>
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-4 text-charcoal-80">
                <span className="grid size-11 place-items-center rounded-full border border-charcoal/15">
                  <Clock className="size-5" />
                </span>
                {site.hours}
              </li>
              <li className="flex items-center gap-4 text-charcoal-80">
                <span className="grid size-11 place-items-center rounded-full border border-charcoal/15">
                  <MapPin className="size-5" />
                </span>
                {site.location}
              </li>
            </ul>
            <div className="mt-8 flex gap-2">
              {site.socials.map((s) => {
                const Icon = socialIcons[s.name];
                return (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="grid size-10 place-items-center rounded-full border border-charcoal/15 hover:bg-charcoal hover:text-ivory">
                    {Icon && <Icon className="size-4" />}
                  </a>
                );
              })}
            </div>
            <p className="mt-8 text-sm text-charcoal-80">
              Just want to talk first?{" "}
              <Link href="/contact" className="font-semibold underline underline-offset-4">
                Book a free 30-minute audit instead
              </Link>
            </p>
            {site.bookingUrl && (
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block font-semibold underline underline-offset-4">
                Prefer to pick a time? Book a call directly →
              </a>
            )}
          </div>
        </aside>

        {/* Right — form */}
        <div className="fade-now lg:col-span-7" style={{ "--d": "0.3s" } as React.CSSProperties}>
          <div className="rounded-card border border-charcoal/10 bg-ivory-80 p-5 sm:p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
