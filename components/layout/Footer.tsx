import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { LogoMark } from "@/components/ui/Logo";
import { socialIcons, WhatsAppIcon } from "@/components/ui/Icons";
import { CopyEmail } from "./CopyEmail";
import { BackToTop, FooterReveal } from "./FooterReveal";
import { Year } from "./ClientEffects";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { whatsappLink } from "@/lib/utils";

const company = [
  { label: "Projects", href: "/projects" },
  { label: "Why Us", href: "/why-us" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * Sticky "reveal" footer: it sits pinned behind the page and is uncovered as the
 * content scrolls away (see `.footer-reveal` in globals.css). FooterReveal only
 * enables it when the footer fits in the viewport, so nothing is ever unreachable.
 */
export function Footer() {
  return (
    <footer id="site-footer" data-nav-theme="dark" className="relative overflow-hidden bg-charcoal-deep text-ivory">
      <FooterReveal />
      <div className="container-x pt-16 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand */}
          <div className="lg:col-span-5">
            <p className="display-s max-w-sm">
              Complex needs.
              <br />
              <span className="text-ivory/45">Simple solutions.</span>
            </p>
            {site.availability && (
              <p className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-ivory/15 px-3.5 py-1.5 text-sm text-ivory/80">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-ember/70" />
                  <span className="relative size-2 rounded-full bg-ember" />
                </span>
                {site.availability}
              </p>
            )}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="/contact?intent=audit" variant="light">
                Book a free audit
              </Button>
              <CopyEmail email={site.email} className="h-12 sm:h-12" />
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-7">
            <FooterCol title="Services">
              {services.map((s) => (
                <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                  {s.name}
                </FooterLink>
              ))}
            </FooterCol>
            <FooterCol title="Company">
              {company.map((l) => (
                <FooterLink key={l.href} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </FooterCol>
            <FooterCol title="Contact">
              <li>
                <a
                  href={whatsappLink(site.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 transition-colors hover:text-peach"
                >
                  <WhatsAppIcon className="size-4" /> {site.whatsappDisplay}
                </a>
              </li>
              <li className="text-ivory/60">{site.hours}</li>
              <li className="text-ivory/60">{site.location}</li>
              <li className="flex gap-2 pt-1">
                {site.socials.map((s) => {
                  const Icon = socialIcons[s.name];
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="grid size-10 place-items-center rounded-full border border-ivory/15 transition-colors hover:border-peach hover:bg-peach hover:text-charcoal"
                    >
                      {Icon && <Icon className="size-4" />}
                    </a>
                  );
                })}
              </li>
            </FooterCol>
          </div>
        </div>
      </div>

      {/* Giant wordmark — official lockup, cropped by the strip below */}
      {/* Giant wordmark — the full official lockup, with balanced space above and below */}
      <div aria-hidden className="container-x pointer-events-none relative mt-14 mb-10 select-none sm:mt-20 sm:mb-14">
        <Image
          src="/brand/logo-ivory.png"
          alt=""
          width={1885}
          height={233}
          sizes="100vw"
          className="h-auto w-full opacity-[0.08]"
        />
      </div>

      {/* Brand-book strip — true three-column grid so the legal links sit exactly centred */}
      <div className="relative border-t border-ivory/10 bg-charcoal-deep pb-24 lg:pb-0">
        <div className="container-x grid gap-4 py-6 text-sm text-ivory/60 sm:grid-cols-3 sm:items-center">
          <div className="flex items-center gap-4">
            <LogoMark tone="ivory" className="w-8" />
            <span>
              © <Year fallback={site.founded} /> {site.legalName}
            </span>
          </div>
          <nav aria-label="Legal" className="flex gap-6 sm:justify-center">
            <Link href="/privacy-policy" className="transition-colors hover:text-ivory">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ivory">
              Terms
            </Link>
          </nav>
          <div className="sm:justify-self-end">
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="label font-sans text-ivory/55">{title}</h3>
      <ul className="mt-5 space-y-3 text-[0.95rem]">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="group/fl inline-flex items-center transition-colors hover:text-peach">
        <span aria-hidden className="h-px w-0 bg-peach transition-[width,margin] duration-300 ease-brand group-hover/fl:mr-2 group-hover/fl:w-3" />
        {children}
      </Link>
    </li>
  );
}
