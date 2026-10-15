import type { ServiceSlug } from "./services";

// "Sound familiar?" — pain → fix → proof
export const problems: {
  id: string;
  pain: string;
  fix: string;
  service: ServiceSlug;
  metric: { value: string; label: string };
  projectSlug: string;
}[] = [
  {
    id: "whatsapp",
    pain: "We miss leads on WhatsApp after hours",
    fix: "An AI agent replies in seconds, 24/7 — qualifies the lead, answers questions and books the meeting before your competitor even sees the message.",
    service: "ai-automation",
    metric: { value: "3×", label: "qualified leads for Nestwise Realty" },
    projectSlug: "nestwise-realty",
  },
  {
    id: "copy-paste",
    pain: "My team copies data between tools all day",
    fix: "We connect your apps and automate the hand-offs — invoices, CRM updates, reports — so people do the work only people can do.",
    service: "ai-automation",
    metric: { value: "−45%", label: "dispatch time for Atlas Freight" },
    projectSlug: "atlas-freight",
  },
  {
    id: "product",
    pain: "We need an app or SaaS but don't know where to start",
    fix: "A one-week discovery turns your idea into a clear scope and fixed quote. Then two-week sprints, a live demo every sprint, launch on schedule.",
    service: "software-development",
    metric: { value: "10 wk", label: "idea to launch for Ledgerly" },
    projectSlug: "ledgerly",
  },
  {
    id: "data",
    pain: "We have lots of data but no answers",
    fix: "We build pipelines, dashboards and private AI search so anyone can ask a question and get a trusted, cited answer in seconds.",
    service: "data-ai",
    metric: { value: "70%", label: "faster research for Docsy Legal" },
    projectSlug: "docsy-legal",
  },
  {
    id: "social",
    pain: "Our social media is inconsistent",
    fix: "An AI-assisted content engine with human review keeps every channel active, on-brand and tied to revenue.",
    service: "growth",
    metric: { value: "+210%", label: "social reach for Bloom & Co" },
    projectSlug: "bloom-and-co",
  },
  {
    id: "leads",
    pain: "Lead generation is slow and expensive",
    fix: "An outbound system finds your ideal clients, personalises every message and books qualified meetings into your calendar.",
    service: "growth",
    metric: { value: "64", label: "meetings / quarter for Pulse" },
    projectSlug: "pulse-b2b",
  },
];

export const processSteps = [
  {
    index: "01",
    name: "Discover",
    duration: "Week 1",
    description: "We audit your workflow, define the outcome in numbers and agree a fixed scope.",
    deliverables: ["Process map", "Success metrics", "Fixed quote & timeline"],
  },
  {
    index: "02",
    name: "Design",
    duration: "Weeks 1 – 2",
    description: "Flows, prototypes and architecture — you see and click it before we build it.",
    deliverables: ["Clickable prototype", "Technical plan", "Sign-off"],
  },
  {
    index: "03",
    name: "Build",
    duration: "2-week sprints",
    description: "Senior engineers ship in short sprints with a live demo at the end of each one.",
    deliverables: ["Working software every sprint", "Weekly updates", "QA on real devices"],
  },
  {
    index: "04",
    name: "Launch & Scale",
    duration: "Ongoing",
    description: "We launch, measure against the agreed numbers and keep improving.",
    deliverables: ["Launch & training", "30 days free support", "Growth roadmap"],
  },
];

export const comparison: { typical: string; meshglade: string }[] = [
  { typical: "Vague hourly billing", meshglade: "Fixed quotes per milestone" },
  { typical: "Silent for weeks", meshglade: "Live demo every 2 weeks" },
  { typical: "They keep the code", meshglade: "You own 100% of it" },
  { typical: "Generic templates", meshglade: "Built around your workflow" },
  { typical: "Hand off and disappear", meshglade: "30 days free support, then on call" },
  { typical: "Juniors on your project", meshglade: "Senior team only" },
];

export const comparisonExtended: { typical: string; meshglade: string }[] = [
  ...comparison,
  { typical: "Success = 'delivered'", meshglade: "Success = your numbers moved" },
  { typical: "Days to reply", meshglade: "Reply within 24 hours" },
  { typical: "One-size-fits-all stack", meshglade: "Right tool for the job" },
  { typical: "Surprise invoices", meshglade: "Change requests priced upfront" },
];

export const principles = [
  { title: "Simple beats clever", description: "The best solution is the one your team actually uses. We remove steps before we add features." },
  { title: "Numbers, not opinions", description: "Every project starts with a metric we agree to move — hours saved, leads won, revenue gained." },
  { title: "Show, don't tell", description: "You'll see working software every two weeks. No black boxes, no 'trust us'." },
  { title: "Own everything", description: "Your code, your data, your accounts. You're never locked in to us." },
];

export const guarantees = [
  { title: "NDA on request", description: "Signed before you share anything sensitive." },
  { title: "100% code ownership", description: "Repositories, designs and docs are yours." },
  { title: "Fixed quotes", description: "Priced per milestone. No surprise invoices." },
  { title: "30-day support", description: "Free fixes and tweaks after every launch." },
  { title: "24-hour replies", description: "Every message answered within one business day." },
];

// Scripted interactive agent demo (no API calls)
export type AgentStep = {
  agent: string;
  options?: string[];
  event?: string;
};

export const agentScenarios: { id: string; label: string; business: string; steps: AgentStep[] }[] = [
  {
    id: "real-estate",
    label: "Real-estate lead",
    business: "Nestwise Realty",
    steps: [
      { agent: "Hi! I'm Nestwise's assistant. Are you looking to buy or rent?", options: ["Buy", "Rent"] },
      { agent: "Great. Which area and budget do you have in mind?", options: ["Downtown · up to $450k", "Suburbs · up to $300k"] },
      {
        agent: "I found 3 homes that match. The 2-bed on Elm Street has a balcony and is available now. Would you like to see it?",
        options: ["Yes — Saturday works", "Send me all 3 first"],
      },
      {
        agent: "Done. I've booked a viewing for Saturday 11:00 with James and sent all three listings to this chat. You'll get a reminder the day before.",
        event: "Lead synced to HubSpot · Score 92/100",
      },
    ],
  },
  {
    id: "clinic",
    label: "Clinic appointment",
    business: "Clinicare",
    steps: [
      { agent: "Hello, this is Clinicare. How can I help you today?", options: ["Book an appointment", "Reschedule"] },
      { agent: "Of course. Which service do you need?", options: ["General check-up", "Dental cleaning"] },
      { agent: "The earliest slots are Tue 09:30 or Wed 16:00. Which suits you?", options: ["Tue 09:30", "Wed 16:00"] },
      {
        agent: "You're booked! I'll send a reminder 24 hours before, and you can reschedule here with one tap.",
        event: "Calendar updated · Reminder scheduled",
      },
    ],
  },
  {
    id: "ecommerce",
    label: "Order status",
    business: "Bloom & Co",
    steps: [
      { agent: "Hi! Welcome to Bloom & Co. What can I do for you?", options: ["Where is my order?", "Start a return"] },
      { agent: "Happy to help. Could you share your order number?", options: ["#BC-20418", "Use my phone number"] },
      {
        agent: "Found it — 2× Monstera pots, shipped yesterday with DHL. Estimated delivery: tomorrow before 18:00. Want live tracking updates here?",
        options: ["Yes please", "No thanks"],
      },
      { agent: "All set. I'll message you when it's out for delivery. Anything else?", event: "Ticket auto-resolved · 0 agent minutes" },
    ],
  },
];
