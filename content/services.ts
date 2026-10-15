export type ServiceSlug = "ai-automation" | "software-development" | "data-ai" | "growth";

export type Service = {
  slug: ServiceSlug;
  index: string;
  name: string;
  shortName: string;
  tagline: string;
  outcome: string;
  description: string;
  chips: string[];
  subServices: { name: string; description: string; deliverables: string[] }[];
  outcomes: { value: string; label: string }[];
  useCases: { industry: string; title: string; description: string }[];
  stack: { group: string; items: string[] }[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "ai-automation",
    index: "01",
    name: "AI Automation",
    shortName: "Automation",
    tagline: "Your best employee never sleeps.",
    outcome: "Answer every customer in seconds and remove the copy-paste work from your week.",
    description:
      "We design AI agents, chatbots and workflow automations that plug into the tools you already use — WhatsApp, CRM, email, spreadsheets — so leads get answered instantly and your team stops doing robot work.",
    chips: ["AI Agents", "Chatbots", "WhatsApp", "Workflow Automation"],
    subServices: [
      {
        name: "AI Agents",
        description:
          "Agents that reason over your data and take actions — qualify leads, book meetings, update records, escalate to humans when it matters.",
        deliverables: ["Agent design & guardrails", "Tool / API integrations", "Human hand-off flows", "Monitoring dashboard"],
      },
      {
        name: "Chatbots",
        description:
          "On-brand assistants for your website and support channels, trained on your docs, products and policies.",
        deliverables: ["Knowledge base ingestion", "Website widget", "Conversation analytics", "Multilingual replies"],
      },
      {
        name: "WhatsApp Automation",
        description:
          "Official WhatsApp Business API flows: instant replies, lead capture, reminders, order updates and broadcast campaigns.",
        deliverables: ["WhatsApp Cloud API setup", "Lead qualification flows", "CRM sync", "Template approval"],
      },
      {
        name: "Workflow Automation",
        description:
          "We connect your apps and remove manual steps — invoices, reports, onboarding, data entry — with n8n, Make or custom code.",
        deliverables: ["Process mapping", "Automated workflows", "Error alerts", "Documentation & training"],
      },
    ],
    outcomes: [
      { value: "40s", label: "Average first reply, 24/7" },
      { value: "3×", label: "More qualified leads" },
      { value: "−70%", label: "Manual data entry" },
    ],
    useCases: [
      { industry: "Real Estate", title: "Lead qualifier on WhatsApp", description: "Asks budget, area and timeline, then books viewings straight into your agents' calendars." },
      { industry: "Healthcare", title: "Appointment assistant", description: "Books, reschedules and reminds patients automatically — fewer no-shows, calmer front desk." },
      { industry: "E-commerce", title: "Order-status agent", description: "Answers 'where is my order?' instantly from your store data and handles returns." },
      { industry: "Services", title: "Back-office autopilot", description: "Invoices, proposals and weekly reports generated and sent without anyone touching a spreadsheet." },
    ],
    stack: [
      { group: "AI", items: ["Claude", "GPT", "LangGraph", "Vector DBs"] },
      { group: "Channels", items: ["WhatsApp Cloud API", "Twilio", "Web widget", "Email"] },
      { group: "Automation", items: ["n8n", "Make", "Zapier", "Node.js"] },
      { group: "Systems", items: ["HubSpot", "Salesforce", "Google Workspace", "Airtable"] },
    ],
    faqs: [
      { q: "Will the AI say something wrong to my customers?", a: "We build guardrails: the agent only answers from your approved knowledge, follows rules you set, and hands over to a human whenever it is unsure." },
      { q: "Do I need the WhatsApp Business API?", a: "Yes for automation at scale. We handle the full setup, verification and message-template approvals for you." },
      { q: "Can it work with my current CRM?", a: "Almost certainly. We integrate with HubSpot, Salesforce, Pipedrive, Zoho, Airtable, Google Sheets and any tool with an API." },
      { q: "What does it cost to run?", a: "Typical running costs (AI usage + messaging) are a fraction of one employee's salary. We estimate them for you before we build." },
      { q: "How fast can we go live?", a: "A focused automation usually launches in 2–4 weeks. Complex multi-agent systems take 6–10 weeks." },
    ],
  },
  {
    slug: "software-development",
    index: "02",
    name: "Software Development",
    shortName: "Software",
    tagline: "Software that feels simple.",
    outcome: "Launch the website, app or SaaS you need — fast, stable and yours to own.",
    description:
      "From marketing websites to complex SaaS platforms, we design and engineer software that is fast, secure and easy to grow. Two-week sprints, a demo every sprint, and clean code you own.",
    chips: ["Websites", "Web Apps", "SaaS", "APIs"],
    subServices: [
      {
        name: "Websites",
        description: "High-converting marketing sites with a CMS your team can actually use, built for speed and SEO.",
        deliverables: ["UX & visual design", "Next.js build", "CMS setup", "SEO & analytics"],
      },
      {
        name: "Web Apps",
        description: "Internal tools, portals and dashboards that replace spreadsheets and email chains.",
        deliverables: ["Product discovery", "UI/UX prototypes", "Full-stack development", "Role-based access"],
      },
      {
        name: "SaaS",
        description: "MVP to scale: subscriptions, multi-tenancy, onboarding, billing and everything a SaaS needs.",
        deliverables: ["MVP scoping", "Stripe billing", "Multi-tenant architecture", "Admin panel"],
      },
      {
        name: "APIs",
        description: "Robust, documented APIs and integrations that connect your systems and partners.",
        deliverables: ["API design", "Third-party integrations", "Docs & SDKs", "Load testing"],
      },
    ],
    outcomes: [
      { value: "10 wk", label: "Typical MVP launch" },
      { value: "95+", label: "Lighthouse performance" },
      { value: "100%", label: "Code ownership" },
    ],
    useCases: [
      { industry: "Fintech", title: "SMB finance SaaS", description: "Bookkeeping, invoicing and reporting in one subscription product." },
      { industry: "Logistics", title: "Dispatch & tracking app", description: "Live map, driver app and automated customer updates." },
      { industry: "Healthcare", title: "Patient portal", description: "Secure records, bookings and messaging with role-based access." },
      { industry: "Services", title: "Client portal", description: "Proposals, approvals, files and invoices in one branded place." },
    ],
    stack: [
      { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind"] },
      { group: "Backend", items: ["Node.js", "NestJS", "Python", "GraphQL"] },
      { group: "Data", items: ["PostgreSQL", "Redis", "Prisma", "Supabase"] },
      { group: "Cloud", items: ["Vercel", "AWS", "Docker", "Stripe"] },
    ],
    faqs: [
      { q: "Do I own the code?", a: "Yes, 100%. The repository lives in your account (or is transferred at the end) along with all designs and documentation." },
      { q: "Fixed price or hourly?", a: "Both are available. Most clients choose a fixed quote per milestone so the budget never surprises them." },
      { q: "Can you take over an existing project?", a: "Yes. We start with a short code audit, then propose a plan to stabilise and extend it." },
      { q: "What happens after launch?", a: "Every project includes 30 days of free support. After that you can choose a monthly care plan or keep us on call." },
      { q: "Will it work on mobile?", a: "Everything we build is responsive by default and tested on real phones, tablets and large screens." },
    ],
  },
  {
    slug: "data-ai",
    index: "03",
    name: "Data & AI",
    shortName: "Data & AI",
    tagline: "Your data already knows the answer.",
    outcome: "Turn scattered data into decisions, search and models that work in production.",
    description:
      "We build the pipelines, dashboards and AI models that turn raw data into answers — from analytics your leadership trusts to RAG assistants and computer vision running in production.",
    chips: ["Analytics", "RAG", "ML", "Computer Vision", "Data Pipelines"],
    subServices: [
      {
        name: "Analytics",
        description: "Dashboards and KPIs that update themselves — one source of truth instead of ten spreadsheets.",
        deliverables: ["KPI framework", "Dashboards (Metabase / Looker)", "Automated reporting", "Data modelling"],
      },
      {
        name: "RAG Systems",
        description: "Private AI assistants that search your documents and answer with citations — secure and accurate.",
        deliverables: ["Document ingestion", "Vector search", "Citation-backed answers", "Access control"],
      },
      {
        name: "Machine Learning",
        description: "Forecasting, scoring and recommendation models trained on your data and deployed behind an API.",
        deliverables: ["Feasibility study", "Model training", "API deployment", "Drift monitoring"],
      },
      {
        name: "Computer Vision",
        description: "Detection, counting and inspection from images or video — on the edge or in the cloud.",
        deliverables: ["Dataset & labelling", "Custom models", "Edge / cloud inference", "Accuracy reports"],
      },
      {
        name: "Data Pipelines",
        description: "Reliable ETL/ELT that moves and cleans data between your apps, warehouse and AI systems.",
        deliverables: ["Source connectors", "Warehouse setup", "Scheduling & alerts", "Data quality checks"],
      },
    ],
    outcomes: [
      { value: "70%", label: "Faster information lookup" },
      { value: "92%", label: "Vision model accuracy" },
      { value: "1", label: "Source of truth" },
    ],
    useCases: [
      { industry: "Legal", title: "Contract knowledge assistant", description: "Ask questions across thousands of documents and get cited answers in seconds." },
      { industry: "Retail", title: "Shelf auditing with vision", description: "Phones photograph shelves; the model flags gaps, misplacements and pricing errors." },
      { industry: "E-commerce", title: "Demand forecasting", description: "Predict stock needs per SKU and stop over-ordering." },
      { industry: "Services", title: "Executive dashboard", description: "Revenue, pipeline and delivery KPIs in one live view." },
    ],
    stack: [
      { group: "AI / ML", items: ["PyTorch", "scikit-learn", "YOLO", "LLMs"] },
      { group: "Retrieval", items: ["pgvector", "Pinecone", "LlamaIndex", "Rerankers"] },
      { group: "Data", items: ["dbt", "Airflow", "BigQuery", "Snowflake"] },
      { group: "BI", items: ["Metabase", "Looker Studio", "Power BI", "Python"] },
    ],
    faqs: [
      { q: "Is my data safe?", a: "Yes. We can deploy inside your own cloud, sign NDAs and DPAs, and never use your data to train public models." },
      { q: "How much data do we need for ML?", a: "Less than you think for many problems. We run a short feasibility study first so you don't invest blindly." },
      { q: "Will a RAG assistant hallucinate?", a: "We ground every answer in your documents, show citations, and tune the system to say 'I don't know' instead of guessing." },
      { q: "Can you work with our existing warehouse?", a: "Yes — BigQuery, Snowflake, Redshift, Postgres and most BI tools." },
      { q: "How long does a dashboard project take?", a: "A first live dashboard typically ships in 2–3 weeks." },
    ],
  },
  {
    slug: "growth",
    index: "04",
    name: "Growth",
    shortName: "Growth",
    tagline: "Be seen. Be chosen.",
    outcome: "A consistent brand presence and a steady stream of qualified leads.",
    description:
      "We combine strategy, AI-assisted content and outbound systems to keep your brand visible and your pipeline full — measured by meetings booked, not likes.",
    chips: ["Social Media", "AI Content", "Lead Generation"],
    subServices: [
      {
        name: "Social Media",
        description: "Strategy, content calendars, design and community management for the channels your buyers use.",
        deliverables: ["Channel strategy", "Monthly content calendar", "Design & copy", "Monthly reporting"],
      },
      {
        name: "AI Content",
        description: "An AI-assisted content engine that produces on-brand posts, blogs and videos at 5× the pace.",
        deliverables: ["Brand voice model", "Content workflows", "SEO articles", "Short-form video"],
      },
      {
        name: "Lead Generation",
        description: "Outbound systems that find, enrich and reach your ideal clients — and book meetings on autopilot.",
        deliverables: ["ICP & list building", "Data enrichment", "Multichannel sequences", "CRM & booking setup"],
      },
    ],
    outcomes: [
      { value: "+210%", label: "Social reach in 90 days" },
      { value: "64", label: "Meetings booked / quarter" },
      { value: "5×", label: "Content output" },
    ],
    useCases: [
      { industry: "SaaS", title: "Outbound meeting machine", description: "Targeted lists, personalised sequences and a calendar that fills itself." },
      { industry: "E-commerce", title: "AI content engine", description: "Daily product content across Instagram, TikTok and Pinterest." },
      { industry: "Real Estate", title: "Listing content on autopilot", description: "Every new listing becomes posts, reels and an email campaign automatically." },
      { industry: "Services", title: "Founder-led LinkedIn", description: "Ghost-written posts that build authority and bring inbound leads." },
    ],
    stack: [
      { group: "Outbound", items: ["Clay", "Apollo", "Instantly", "LinkedIn"] },
      { group: "Content", items: ["Claude", "Midjourney", "CapCut", "Canva"] },
      { group: "Ads", items: ["Meta Ads", "Google Ads", "LinkedIn Ads", "TikTok"] },
      { group: "Measure", items: ["GA4", "HubSpot", "Looker Studio", "UTM tracking"] },
    ],
    faqs: [
      { q: "Is AI content generic?", a: "Not ours. We train the system on your voice and every piece is reviewed and edited by a human strategist." },
      { q: "How soon will I see results?", a: "Outbound usually produces first meetings in 3–4 weeks; organic social compounds over 60–90 days." },
      { q: "Do you run paid ads?", a: "Yes, as an add-on. We focus first on the channels with the best cost per qualified lead for your market." },
      { q: "Is there a long contract?", a: "Growth plans are month-to-month after an initial 3-month period." },
      { q: "What do you need from us?", a: "A 60-minute kickoff, access to your brand assets, and a quick weekly approval of the content calendar." },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
