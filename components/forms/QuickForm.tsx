"use client";

import { useActionState, useState } from "react";
import { submitLead } from "@/app/actions/contact";
import type { LeadState } from "@/lib/schema";
import { serviceOptions } from "@/lib/schema";
import { SubmitButton } from "@/components/ui/Button";
import { ChipGroup, FormError, LeadMeta, TextArea, TextField } from "./Fields";
import { site } from "@/content/site";

const initial: LeadState = { status: "idle" };

export function QuickForm() {
  const [state, action, pending] = useActionState(submitLead, initial);
  const [services, setServices] = useState<string[]>([]);
  const fe = state.status === "error" ? state.fieldErrors : undefined;
  const v = state.status === "error" ? state.values : undefined;

  return (
    <form action={action} className="relative space-y-4" noValidate>
      <LeadMeta formType="quick" />
      <input type="hidden" name="intent" value="audit" />
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField label="Your name" name="name" autoComplete="name" required error={fe?.name} defaultValue={v?.name} />
        <TextField label="Work email" name="email" type="email" autoComplete="email" inputMode="email" required error={fe?.email} defaultValue={v?.email} />
      </div>
      <ChipGroup
        name="services"
        label="What can we help with?"
        options={serviceOptions.filter((s) => s.id !== "not-sure")}
        value={services}
        onChange={setServices}
      />
      <TextArea label="A sentence about your project" name="message" optional rows={3} defaultValue={v?.message} />
      <FormError message={state.status === "error" ? state.message : undefined} />
      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton type="submit" size="lg" disabled={pending} className="justify-between">
          {pending ? "Sending…" : "Get my free audit"}
        </SubmitButton>
        <p className="text-sm text-charcoal-80">Reply within {site.responseTime}. No sales pitch —<br className="hidden sm:block" /> if we&apos;re not the right fit, we&apos;ll say so.</p>
      </div>
    </form>
  );
}
