"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { leadSchema, type Lead, type LeadState } from "@/lib/schema";
import { sendMail, smtpConfigured } from "@/lib/mailer";
import { clientAutoReply, leadNotification } from "@/lib/emails";
import { rateLimit } from "@/lib/rate-limit";
import { site } from "@/content/site";

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const values: Record<string, string> = {};
  for (const [k, v] of formData.entries()) {
    if (typeof v === "string" && k !== "website" && k !== "services" && !k.startsWith("$")) values[k] = v;
  }
  const fail = (message: string, fieldErrors?: Partial<Record<keyof Lead, string>>): LeadState => ({
    status: "error",
    message,
    fieldErrors,
    values,
  });

  const parsed = leadSchema.safeParse({ ...values, website: formData.get("website") ?? "", services: formData.getAll("services").map(String) });

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof Lead, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof Lead;
      if (key === "website") return fail("Something went wrong. Please try again.");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return fail("Please check the highlighted fields.", fieldErrors);
  }

  const lead = parsed.data;

  // Bot protection: honeypot is validated by the schema; reject impossibly fast submissions.
  if (lead.startedAt && Date.now() - lead.startedAt < 2500) {
    return fail("That was quick! Please wait a moment and try again.");
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (!rateLimit(`lead:${ip}`)) {
    return fail("Too many submissions. Please try again in a few minutes or email us directly.");
  }

  const thankYou = `/contact/thank-you?name=${encodeURIComponent(lead.name.split(" ")[0])}`;

  if (!smtpConfigured()) {
    if (process.env.NODE_ENV === "development") {
      console.warn("\n[contact] SMTP not configured — lead logged instead of emailed:\n", lead, "\n");
      redirect(thankYou);
    }
    console.error("[contact] SMTP_USER / SMTP_PASS are missing. Lead could not be emailed.");
    return fail(`Our form is temporarily unavailable. Please email us at ${site.email} — we reply within ${site.responseTime}.`);
  }

  try {
    await sendMail({
      to: process.env.MAIL_TO || site.email,
      replyTo: `${lead.name} <${lead.email}>`,
      ...leadNotification(lead),
    });
  } catch (err) {
    console.error("[contact] Failed to send lead notification:", err);
    return fail(`We couldn't send your message. Please email us at ${site.email} or message us on WhatsApp.`);
  }

  // Auto-reply is best-effort — the lead is already delivered.
  try {
    await sendMail({ to: lead.email, ...clientAutoReply(lead) });
  } catch (err) {
    console.error("[contact] Auto-reply failed:", err);
  }

  redirect(thankYou);
}
