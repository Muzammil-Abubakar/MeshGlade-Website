"use client";

import { useState } from "react";
import { CalendarDays, Send } from "lucide-react";
import { AuditForm } from "./AuditForm";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/** Inline scheduling URL for Cal.com / Calendly links (other providers are embedded as-is). */
function embedUrl(url: string) {
  const sep = url.includes("?") ? "&" : "?";
  if (url.includes("cal.com")) return `${url}${sep}embed=true&layout=month_view&theme=light`;
  if (url.includes("calendly.com")) return `${url}${sep}embed_type=Inline&hide_gdpr_banner=1`;
  return url;
}

/**
 * Audit booking panel. With `site.bookingUrl` set, visitors can pick a time directly
 * (the fastest path) or send their details instead. Without it, just the 3-field form.
 */
export function AuditPanel() {
  const hasCalendar = Boolean(site.bookingUrl);
  const [tab, setTab] = useState<"calendar" | "form">(hasCalendar ? "calendar" : "form");

  return (
    <div>
      {hasCalendar && (
        <div role="tablist" aria-label="How would you like to book?" className="mb-6 grid grid-cols-2 rounded-full border border-charcoal/12 p-1">
          {(
            [
              ["calendar", "Pick a time", CalendarDays],
              ["form", "Send my details", Send],
            ] as const
          ).map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={cn(
                "flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-colors",
                tab === id ? "bg-charcoal text-ivory" : "text-charcoal-80 hover:text-charcoal",
              )}
            >
              <Icon className="size-4" /> {label}
            </button>
          ))}
        </div>
      )}

      {hasCalendar && tab === "calendar" ? (
        <div className="overflow-hidden rounded-2xl border border-charcoal/10 bg-white">
          <iframe
            src={embedUrl(site.bookingUrl)}
            title="Book your free audit"
            loading="lazy"
            className="h-[680px] w-full"
          />
        </div>
      ) : (
        <AuditForm />
      )}
    </div>
  );
}
