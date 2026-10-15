"use client";

import { useEffect, useRef, type ComponentProps } from "react";
import { usePathname } from "next/navigation";
import { readAttribution } from "@/lib/attribution";
import { cn } from "@/lib/utils";

/** Hidden anti-spam + attribution fields shared by every lead form. */
export function LeadMeta({ formType, context }: { formType: "quick" | "audit" | "brief"; context?: string }) {
  const pathname = usePathname();
  const startedRef = useRef<HTMLInputElement>(null);
  const attrRef = useRef<HTMLInputElement>(null);
  const firstSeen = useRef(0);
  // Browser-only values are written straight to the DOM (re-applied after React's form reset)
  useEffect(() => {
    if (!firstSeen.current) firstSeen.current = Date.now();
    if (startedRef.current) startedRef.current.value = String(firstSeen.current);
    if (attrRef.current) attrRef.current.value = readAttribution();
  });
  return (
    <>
      <input type="hidden" name="formType" value={formType} />
      <input ref={startedRef} type="hidden" name="startedAt" defaultValue="" />
      <input ref={attrRef} type="hidden" name="attribution" defaultValue="" />
      <input type="hidden" name="page" value={pathname} />
      {context !== undefined && <input type="hidden" name="context" value={context} />}
      {/* Honeypot: invisible to people, tempting to bots */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
    </>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  dark?: boolean;
  optional?: boolean;
};

const inputCls = (dark?: boolean, error?: string) =>
  cn(
    "peer w-full rounded-[20px] border bg-transparent px-5 pt-7 pb-3 text-base outline-none transition-[border-color,background-color] duration-300 placeholder:text-transparent",
    dark
      ? "border-ivory/20 text-ivory focus:border-ivory focus:bg-ivory/5"
      : "border-charcoal/15 text-charcoal focus:border-charcoal focus:bg-white/60",
    error && "border-ember",
  );

function FloatingLabel({ label, optional, dark, htmlFor }: { label: string; optional?: boolean; dark?: boolean; htmlFor: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "pointer-events-none absolute top-2.5 left-5 text-xs font-medium transition-colors",
        dark ? "text-ivory/60 peer-focus:text-ivory" : "text-charcoal-70 peer-focus:text-charcoal",
      )}
    >
      {label}
      {optional && <span className="opacity-60"> · optional</span>}
    </label>
  );
}

/** Field focus is wrapped in [ brackets ] — a brand detail. */
function FocusBrackets() {
  return (
    <>
      <span aria-hidden className="pointer-events-none absolute top-1/2 -left-3 -translate-y-1/2 font-light text-ember opacity-0 transition-[opacity,transform] duration-300 peer-focus:-translate-x-0.5 peer-focus:opacity-100">
        [
      </span>
      <span aria-hidden className="pointer-events-none absolute top-1/2 -right-3 -translate-y-1/2 font-light text-ember opacity-0 transition-[opacity,transform] duration-300 peer-focus:translate-x-0.5 peer-focus:opacity-100">
        ]
      </span>
    </>
  );
}

export function TextField({ label, error, dark, optional, id, name, ...rest }: FieldProps & ComponentProps<"input">) {
  const fid = id ?? `f-${name}`;
  return (
    <div>
      <div className="relative">
        <input id={fid} name={name} placeholder={label} aria-invalid={!!error} aria-describedby={error ? `${fid}-err` : undefined} className={inputCls(dark, error)} {...rest} />
        <FloatingLabel label={label} optional={optional} dark={dark} htmlFor={fid} />
        <FocusBrackets />
      </div>
      {error && (
        <p id={`${fid}-err`} className="mt-1.5 pl-5 text-sm text-ember">
          {error}
        </p>
      )}
    </div>
  );
}

export function TextArea({ label, error, dark, optional, id, name, ...rest }: FieldProps & ComponentProps<"textarea">) {
  const fid = id ?? `f-${name}`;
  return (
    <div>
      <div className="relative">
        <textarea id={fid} name={name} placeholder={label} aria-invalid={!!error} rows={4} className={cn(inputCls(dark, error), "resize-none")} {...rest} />
        <FloatingLabel label={label} optional={optional} dark={dark} htmlFor={fid} />
        <FocusBrackets />
      </div>
      {error && <p className="mt-1.5 pl-5 text-sm text-ember">{error}</p>}
    </div>
  );
}

export function ChipGroup({
  name,
  options,
  value,
  onChange,
  multiple = true,
  dark,
  label,
}: {
  name: string;
  options: readonly { id: string; label: string }[] | readonly string[];
  value: string[];
  onChange: (v: string[]) => void;
  multiple?: boolean;
  dark?: boolean;
  label: string;
}) {
  const opts = options.map((o) => (typeof o === "string" ? { id: o, label: o } : o));
  return (
    <fieldset>
      <legend className={cn("mb-3 text-sm font-medium", dark ? "text-ivory/70" : "text-charcoal-80")}>{label}</legend>
      <div className="flex flex-wrap gap-2">
        {opts.map((o) => {
          const on = value.includes(o.id);
          return (
            <label
              key={o.id}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-300 select-none has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ember",
                on
                  ? dark
                    ? "border-ivory bg-ivory text-charcoal"
                    : "border-charcoal bg-charcoal text-ivory"
                  : dark
                    ? "border-ivory/25 text-ivory hover:border-ivory/60"
                    : "border-charcoal/20 hover:border-charcoal/60",
              )}
            >
              <input
                type={multiple ? "checkbox" : "radio"}
                name={name}
                value={o.id}
                checked={on}
                onChange={() => {
                  if (multiple) onChange(on ? value.filter((v) => v !== o.id) : [...value, o.id]);
                  else onChange([o.id]);
                }}
                className="sr-only"
              />
              {o.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-2xl border border-ember/40 bg-ember/10 px-4 py-3 text-sm">
      {message}
    </p>
  );
}
