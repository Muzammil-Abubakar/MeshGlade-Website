import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { whatsappLink } from "@/lib/utils";

/** Mid-content call to action — catches readers at peak interest instead of only at the end. */
export function InlineCTA({
  title,
  text,
  href,
  whatsappMessage,
}: {
  title: string;
  text: string;
  href: string;
  whatsappMessage: string;
}) {
  return (
    <Reveal className="grid items-center gap-6 rounded-card bg-peach p-6 sm:p-10 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <p className="display-s">{title}</p>
        <p className="mt-3 max-w-xl text-charcoal-80">{text}</p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:col-span-5 lg:justify-end">
        <Button href={href} size="lg" className="justify-between">
          Book a free audit
        </Button>
        <a
          href={whatsappLink(site.whatsapp, whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-charcoal/25 px-6 font-semibold transition-colors hover:bg-charcoal hover:text-ivory sm:h-16"
        >
          <WhatsAppIcon className="size-4" /> WhatsApp
        </a>
      </div>
    </Reveal>
  );
}
