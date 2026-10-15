"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyEmail({ email, className }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          window.location.href = `mailto:${email}`;
        }
      }}
      className={cn(
        "group inline-flex h-14 items-center gap-3 rounded-full border border-current/25 px-6 font-semibold transition-colors hover:border-current sm:h-16",
        className,
      )}
    >
      {copied ? <Check className="size-4 text-ember-60" /> : <Copy className="size-4 opacity-60" />}
      <span aria-live="polite">{copied ? "Copied to clipboard" : email}</span>
    </button>
  );
}
