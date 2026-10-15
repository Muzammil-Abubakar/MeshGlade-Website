"use client";

import { useActionState, useMemo } from "react";
import { X } from "lucide-react";
import { submitLead } from "@/app/actions/contact";
import { serviceOptions, type LeadState } from "@/lib/schema";
import { BRIEF_KEY, clearBriefContext, parseBriefContext } from "@/lib/attribution";
import { useLocationSearch, useSessionItem } from "@/lib/hooks";
import { SubmitButton } from "@/components/ui/Button";
import { FormError, LeadMeta, TextField } from "./Fields";
import { site } from "@/content/site";

const initial: LeadState = { status: "idle" };

/** The fast path: three fields, one click. Service context comes from the link that led here. */
export function AuditForm() {
  const [state, action, pending] = useActionState(submitLead, initial);
  const fe = state.status === "error" ? state.fieldErrors : undefined;
  const v = state.status === "error" ? state.values : undefined;

  // Context carried from the page the visitor came from (?service=…, ROI calculator, estimator)
  const q = new URLSearchParams(useLocationSearch());
  const serviceFromUrl = q.get("service");
  const briefRaw = useSessionItem(BRIEF_KEY);
  const brief = useMemo(() => parseBriefContext(briefRaw), [briefRaw]);
  const services = Array.from(
    new Set([
      ...(serviceFromUrl && serviceOptions.some((o) => o.id === serviceFromUrl) ? [serviceFromUrl] : []),
      ...(brief?.services ?? []),
    ]),
  );
  const serviceNames = services.map((s) => serviceOptions.find((o) => o.id === s)?.label).filter(Boolean);

  return (
    <form action={action} noValidate className="relative space-y-4">
      <LeadMeta formType="audit" context={brief?.summary ?? ""} />
      <input type="hidden" name="intent" value="audit" />
      {services.map((s) => (
        <input key={s} type="hidden" name="services" value={s} />
      ))}

      {(serviceNames.length > 0 || brief) && (
        <div className="flex items-start gap-3 rounded-2xl bg-peach-40 p-4 text-sm">
          <span className="flex-1">
            {serviceNames.length > 0 && (
              <span className="block">
                <strong className="font-semibold">Interested in:</strong> {serviceNames.join(", ")}
              </span>
            )}
            {brief && <span className="mt-1 block text-charcoal-80">{brief.summary}</span>}
          </span>
          {brief && (
            <button
              type="button"
              aria-label="Remove attached summary"
              onClick={clearBriefContext}
              className="grid size-8 shrink-0 place-items-center rounded-full hover:bg-peach"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      )}

      <TextField label="Your name" name="name" autoComplete="name" required error={fe?.name} defaultValue={v?.name} />
      <TextField
        label="Work email"
        name="email"
        type="email"
        inputMode="email"
        autoComplete="email"
        required
        error={fe?.email}
        defaultValue={v?.email}
      />
      <TextField label="Company or website" name="company" autoComplete="organization" optional defaultValue={v?.company} />

      <FormError message={state.status === "error" ? state.message : undefined} />

      <SubmitButton type="submit" size="lg" disabled={pending} className="w-full justify-between">
        {pending ? "Sending…" : "Request my free audit"}
      </SubmitButton>
      <p className="text-center text-sm text-charcoal-80">
        We reply within {site.responseTime} to schedule your call. No sales pitch — if we&apos;re not the right fit,
        we&apos;ll say so.
      </p>
    </form>
  );
}
