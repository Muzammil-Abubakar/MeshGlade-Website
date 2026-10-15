"use client";

import { useActionState, useMemo, useRef, useState } from "react";
import { ArrowLeft, X } from "lucide-react";
import { submitLead } from "@/app/actions/contact";
import { budgetOptions, serviceOptions, timelineOptions, type LeadState } from "@/lib/schema";
import { BRIEF_KEY, clearBriefContext, parseBriefContext } from "@/lib/attribution";
import { SubmitButton } from "@/components/ui/Button";
import { ChipGroup, FormError, LeadMeta, TextArea, TextField } from "./Fields";
import { useLocationSearch, useSessionItem } from "@/lib/hooks";
import { cn } from "@/lib/utils";

const steps = ["Service", "Project", "Budget", "You"] as const;
const toolOptions = ["WhatsApp", "HubSpot", "Salesforce", "Shopify", "Google Sheets", "Excel", "Slack", "Notion", "None yet"];
const heardOptions = ["Google search", "LinkedIn", "Instagram", "Referral", "Clutch / directory", "Other"];

const initial: LeadState = { status: "idle" };

export function ContactForm() {
  const [state, action, pending] = useActionState(submitLead, initial);
  const [step, setStep] = useState(0);
  const [services, setServices] = useState<string[]>([]);
  const [tools, setTools] = useState<string[]>([]);
  const [budget, setBudget] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string[]>([]);
  const [localError, setLocalError] = useState("");
  const topRef = useRef<HTMLDivElement>(null);

  // Pre-fill from URL (?service=&intent=&plan=) and from estimator / ROI tools.
  // The URL is only known on the client, so we adjust state once it arrives.
  const search = useLocationSearch();
  const q = new URLSearchParams(search);
  const intent = q.get("intent") ?? "";
  const plan = q.get("plan") ?? "";
  const [appliedSearch, setAppliedSearch] = useState<string | null>(null);
  if (search && search !== appliedSearch) {
    setAppliedSearch(search);
    const s = q.get("service");
    if (s && serviceOptions.some((o) => o.id === s)) setServices((prev) => (prev.includes(s) ? prev : [...prev, s]));
  }
  const briefRaw = useSessionItem(BRIEF_KEY);
  const brief = useMemo(() => parseBriefContext(briefRaw), [briefRaw]);
  const [appliedBrief, setAppliedBrief] = useState("");
  if (briefRaw && briefRaw !== appliedBrief) {
    setAppliedBrief(briefRaw);
    if (brief?.services?.length) setServices((prev) => Array.from(new Set([...prev, ...brief.services!])));
  }

  // Jump to the step containing a server-side error
  const [seenState, setSeenState] = useState(state);
  if (state !== seenState) {
    setSeenState(state);
    if (state.status === "error" && (state.fieldErrors?.name || state.fieldErrors?.email)) setStep(3);
  }

  const fe = state.status === "error" ? state.fieldErrors : undefined;
  const v = state.status === "error" ? state.values : undefined;

  const go = (n: number) => {
    setLocalError("");
    setStep(n);
    requestAnimationFrame(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };
  const next = () => {
    if (step === 0 && services.length === 0) {
      setLocalError("Pick at least one option — or choose “Not sure yet”.");
      return;
    }
    go(Math.min(steps.length - 1, step + 1));
  };

  return (
    <div ref={topRef} className="scroll-mt-28">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((s, i) => (
            <button
              key={s}
              type="button"
              onClick={() => i < step && go(i)}
              disabled={i > step}
              className={cn("label transition-colors", i === step ? "text-charcoal" : i < step ? "text-charcoal-70 hover:text-ember" : "text-charcoal/30")}
            >
              <span className={i === step ? "text-ember" : ""}>0{i + 1}</span> <span className="hidden sm:inline">{s}</span>
            </button>
          ))}
        </div>
        <div className="mt-3 h-px w-full bg-charcoal/15">
          <div className="h-full bg-ember transition-[width] duration-700 ease-brand" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
      </div>

      {brief && (
        <div className="mb-8 flex items-start gap-3 rounded-2xl bg-peach-40 p-4 text-sm">
          <span className="flex-1">
            <strong className="block font-semibold">Attached to your brief</strong>
            {brief.summary}
          </span>
          <button
            type="button"
            aria-label="Remove attached summary"
            onClick={clearBriefContext}
            className="grid size-8 shrink-0 place-items-center rounded-full hover:bg-peach"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      <form
        action={action}
        noValidate
        className="relative"
        onKeyDown={(e) => {
          if (e.key === "Enter" && step < steps.length - 1 && !(e.target instanceof HTMLTextAreaElement)) {
            e.preventDefault();
            next();
          }
        }}
      >
        <LeadMeta formType="brief" context={brief?.summary ?? ""} />
        <input type="hidden" name="intent" value={intent} />
        <input type="hidden" name="plan" value={plan} />
        <input type="hidden" name="tools" value={tools.join(", ")} />

        {/* Step 1 */}
        <div className={cn(step !== 0 && "hidden")}>
          <h2 className="display-s">What can we help you with?</h2>
          <p className="mt-2 mb-6 text-charcoal-80">Choose as many as you like.</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {serviceOptions.map((o) => {
              const on = services.includes(o.id);
              return (
                <label
                  key={o.id}
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-[20px] border px-5 py-5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ember",
                    on ? "border-charcoal bg-charcoal text-ivory" : "border-charcoal/15 hover:border-charcoal/50",
                  )}
                >
                  <span className="font-display text-xl tracking-tight">{o.label}</span>
                  <input
                    type="checkbox"
                    name="services"
                    value={o.id}
                    checked={on}
                    onChange={() => setServices(on ? services.filter((x) => x !== o.id) : [...services, o.id])}
                    className="sr-only"
                  />
                  <span className={cn("grid size-6 place-items-center rounded-full border text-xs", on ? "border-ember bg-ember" : "border-charcoal/25")}>
                    {on && "✓"}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Step 2 */}
        <div className={cn("space-y-6", step !== 1 && "hidden")}>
          <div>
            <h2 className="display-s">Tell us about the project.</h2>
            <p className="mt-2 text-charcoal-80">What&apos;s the problem, and what would success look like?</p>
          </div>
          <TextArea
            label="Goals & context"
            name="message"
            rows={5}
            optional
            defaultValue={v?.message}
            placeholder="e.g. We get 200 WhatsApp enquiries a week and can't reply fast enough…"
          />
          <ChipGroup name="_tools" label="Tools you use today" options={toolOptions} value={tools} onChange={setTools} />
        </div>

        {/* Step 3 */}
        <div className={cn("space-y-8", step !== 2 && "hidden")}>
          <h2 className="display-s">Budget & timing.</h2>
          <ChipGroup name="budget" label="Approximate budget" options={budgetOptions} value={budget} onChange={setBudget} multiple={false} />
          <ChipGroup name="timeline" label="When would you like to start?" options={timelineOptions} value={timeline} onChange={setTimeline} multiple={false} />
          <p className="text-sm text-charcoal-70">Not sure? That&apos;s fine — we&apos;ll help you find the smallest version that pays back fastest.</p>
        </div>

        {/* Step 4 */}
        <div className={cn("space-y-4", step !== 3 && "hidden")}>
          <h2 className="display-s mb-6">Last step — how do we reach you?</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Full name" name="name" autoComplete="name" required error={fe?.name} defaultValue={v?.name} />
            <TextField label="Work email" name="email" type="email" inputMode="email" autoComplete="email" required error={fe?.email} defaultValue={v?.email} />
            <TextField label="Company" name="company" autoComplete="organization" optional defaultValue={v?.company} />
            <TextField label="Phone / WhatsApp" name="phone" type="tel" inputMode="tel" autoComplete="tel" optional defaultValue={v?.phone} />
            <TextField label="Country" name="country" autoComplete="country-name" optional defaultValue={v?.country} />
            <div className="relative">
              <select
                name="heardFrom"
                defaultValue={v?.heardFrom ?? ""}
                aria-label="How did you hear about us?"
                className="h-full min-h-[62px] w-full appearance-none rounded-[20px] border border-charcoal/15 bg-transparent px-5 pt-5 text-base focus:border-charcoal"
              >
                <option value="">—</option>
                {heardOptions.map((h) => (
                  <option key={h}>{h}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute top-2.5 left-5 text-xs font-medium text-charcoal-70">How did you hear about us? · optional</span>
              <span aria-hidden className="pointer-events-none absolute top-1/2 right-5 text-xs">▾</span>
            </div>
          </div>
          <p className="pt-2 text-xs text-charcoal-70">
            No sales pitch — if we&apos;re not the right fit, we&apos;ll tell you (and point you to someone who is). By sending, you agree to our <a href="/privacy-policy" className="underline">Privacy Policy</a>. We never share your details.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <FormError message={localError || (state.status === "error" ? state.message : undefined)} />
          <div className="flex items-center justify-between gap-4">
            {step > 0 ? (
              <button type="button" onClick={() => go(step - 1)} className="inline-flex h-12 items-center gap-2 rounded-full px-4 font-semibold hover:bg-charcoal/5">
                <ArrowLeft className="size-4" /> Back
              </button>
            ) : (
              <span />
            )}
            {step < steps.length - 1 ? (
              <SubmitButton key="next" type="button" onClick={next} size="lg">
                Continue
              </SubmitButton>
            ) : (
              <SubmitButton key="submit" type="submit" size="lg" disabled={pending}>
                {pending ? "Sending…" : "Send my brief"}
              </SubmitButton>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
