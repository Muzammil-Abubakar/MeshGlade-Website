import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { RevealLines, Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { whatsappLink } from "@/lib/utils";

/** Compact closing call-to-action used across inner pages. */
export function CTABand({
  title = ["Ready when", "you are."],
  text = "Book a free 30-minute audit. You'll leave with three things you can automate or improve this month — whether you hire us or not.",
  href = "/contact?intent=audit",
  cta = "Book a free audit",
}: {
  title?: React.ReactNode[];
  text?: string;
  href?: string;
  cta?: string;
}) {
  return (
    <section className="py-16 sm:py-24">
      <div className="container-x">
        <div
          data-nav-theme="dark"
          className="grain relative isolate overflow-hidden rounded-card bg-charcoal px-6 py-14 text-ivory sm:px-12 sm:py-20"
        >
          <div aria-hidden className="absolute inset-y-0 right-0 -z-10 w-2/3 bg-gradient-to-l from-ember via-ember/40 to-transparent opacity-80">
            <div className="flutes absolute inset-0" />
          </div>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <RevealLines as="h2" className="display-l lg:col-span-7" lines={title} />
            <Reveal delay={0.1} className="lg:col-span-5">
              <p className="text-lg text-ivory/80">{text}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href={href} variant="light" size="lg" className="justify-between">
                  {cta}
                </Button>
                <a
                  href={whatsappLink(site.whatsapp, "Hi Meshglade, I'd like to discuss a project.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-ivory/30 px-6 font-semibold transition-colors hover:bg-ivory hover:text-charcoal sm:h-16"
                >
                  <WhatsAppIcon className="size-4" /> WhatsApp
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
