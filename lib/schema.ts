import { z } from "zod";

export const serviceOptions = [
  { id: "ai-automation", label: "AI Automation" },
  { id: "software-development", label: "Software Development" },
  { id: "data-ai", label: "Data & AI" },
  { id: "growth", label: "Growth" },
  { id: "not-sure", label: "Not sure yet" },
] as const;

export const budgetOptions = ["Under $3k", "$3k – $10k", "$10k – $25k", "$25k – $50k", "$50k+", "Not sure yet"] as const;
export const timelineOptions = ["ASAP", "Within 1 month", "1 – 3 months", "Just exploring"] as const;

const text = (max: number) => z.string().trim().max(max).optional().default("");

export const leadSchema = z.object({
  formType: z.enum(["quick", "audit", "brief"]),
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.email("Please enter a valid email").max(200),
  company: text(200),
  phone: text(40),
  country: text(80),
  services: z.array(z.string().max(40)).max(6).default([]),
  budget: text(40),
  timeline: text(40),
  message: text(5000),
  tools: text(500),
  heardFrom: text(120),
  intent: text(40),
  plan: text(40),
  context: text(1500),
  attribution: text(2000),
  page: text(300),
  // anti-spam
  website: z.string().max(0).optional().default(""), // honeypot — must stay empty
  startedAt: z.coerce.number().optional().default(0),
});

export type Lead = z.infer<typeof leadSchema>;

export type LeadState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<keyof Lead, string>>;
      /** submitted values, so the form can be refilled (React resets forms after actions) */
      values?: Record<string, string>;
    };
