"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { site } from "@/content/site";
import { cn, whatsappLink } from "@/lib/utils";

/** Mobile/tablet conversion bar. Hidden on /contact and while typing. */
export function StickyCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    const isField = (t: EventTarget | null) =>
      t instanceof HTMLElement && t.matches("input, textarea, select, [contenteditable]");
    const onIn = (e: FocusEvent) => isField(e.target) && setTyping(true);
    const onOut = (e: FocusEvent) => isField(e.target) && setTyping(false);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);

  if (pathname.startsWith("/contact")) return null;
  const show = visible && !typing;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-500 ease-brand lg:hidden",
        show ? "translate-y-0" : "translate-y-[120%]",
      )}
      inert={!show}
    >
      <div className="mx-auto flex max-w-md items-center gap-2 rounded-full border border-ivory/10 bg-charcoal/95 p-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] backdrop-blur-md">
        <Link
          href="/contact?intent=audit"
          className="flex h-12 flex-1 items-center justify-center rounded-full bg-ivory text-[0.95rem] font-semibold text-charcoal"
        >
          Book a free audit
        </Link>
        <a
          href={whatsappLink(site.whatsapp, "Hi Meshglade, I'd like to discuss a project.")}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="grid size-12 place-items-center rounded-full bg-ember text-ivory"
        >
          <WhatsAppIcon className="size-5" />
        </a>
      </div>
    </div>
  );
}
