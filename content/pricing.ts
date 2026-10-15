// MOCK PRICES — replace with your real numbers.
export type EngagementModel = {
  id: string;
  name: string;
  kind: string;
  price: string;
  priceNote: string;
  description: string;
  bestFor: string;
  timeline: string;
  includes: string[];
  featured?: boolean;
};

export const engagementModels: EngagementModel[] = [
  {
    id: "launch",
    name: "Launch",
    kind: "Fixed-scope project",
    price: "$4,900",
    priceNote: "starting from",
    description: "A website, web app or MVP delivered against a fixed quote and clear milestones.",
    bestFor: "New products, websites, internal tools",
    timeline: "3 – 12 weeks",
    includes: [
      "Discovery & scope workshop",
      "UX/UI design",
      "Development in 2-week sprints",
      "QA on real devices",
      "30 days free support",
    ],
  },
  {
    id: "automate",
    name: "Automate",
    kind: "AI automation package",
    price: "$2,500",
    priceNote: "starting from",
    description: "An AI agent, chatbot or workflow automation connected to the tools you already use.",
    bestFor: "Lead response, support, back-office work",
    timeline: "2 – 4 weeks",
    includes: [
      "Process audit & ROI estimate",
      "AI agent / workflow build",
      "WhatsApp, CRM & tool integrations",
      "Guardrails & human hand-off",
      "Monitoring dashboard",
    ],
    featured: true,
  },
  {
    id: "partner",
    name: "Partner",
    kind: "Monthly retainer",
    price: "$3,800",
    priceNote: "per month, from",
    description: "A dedicated senior team for ongoing development, automation and growth work.",
    bestFor: "Scaling teams with a continuous roadmap",
    timeline: "Month-to-month",
    includes: [
      "Dedicated product team",
      "Monthly roadmap & priorities",
      "Weekly demos & reports",
      "Growth & content support",
      "Priority response (same day)",
    ],
  },
];
