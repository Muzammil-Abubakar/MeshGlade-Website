// ─────────────────────────────────────────────────────────────
// HARD-CODED PLACEHOLDER PROJECTS — all fictional. Edit freely.
//
// Real media (put files in /public/projects):
//   cover: { kind: "chat", tone: "ember", image: "/projects/nestwise.jpg" }
//   cover: { kind: "chat", tone: "ember", video: "/projects/nestwise.mp4", poster: "/projects/nestwise.jpg" }
// Videos: 5–10 s screen recordings, muted, H.264 MP4, ~1600px wide, under ~3 MB.
// Images: 1600×1200 (4:3) or larger, JPG/WebP. Without media, a branded mockup is generated.
// ─────────────────────────────────────────────────────────────
import type { ServiceSlug } from "./services";

export type CoverKind = "chat" | "dashboard" | "map" | "search" | "vision" | "social" | "pipeline";
export type CoverTone = "ember" | "charcoal" | "peach" | "ivory";

export type Project = {
  slug: string;
  title: string;
  client: string;
  tagline: string;
  industry: string;
  services: ServiceSlug[];
  year: number;
  duration: string;
  featured: boolean;
  headlineMetric: { value: string; label: string };
  metrics: { value: string; label: string }[];
  summary: string;
  challenge: string;
  approach: string;
  result: string;
  before: string[];
  after: string[];
  features: { title: string; description: string }[];
  stack: string[];
  testimonial?: { quote: string; name: string; role: string };
  cover: { kind: CoverKind; tone: CoverTone; image?: string; video?: string; poster?: string };
};

export const projects: Project[] = [
  {
    slug: "nestwise-realty",
    title: "Nestwise Realty",
    client: "Nestwise Realty Group",
    tagline: "A WhatsApp agent that qualifies and books property leads 24/7",
    industry: "Real Estate",
    services: ["ai-automation"],
    year: 2026,
    duration: "5 weeks",
    featured: true,
    headlineMetric: { value: "3×", label: "qualified leads" },
    metrics: [
      { value: "3×", label: "Qualified leads" },
      { value: "40s", label: "Avg. first reply (was 4h)" },
      { value: "62%", label: "Viewings booked by AI" },
      { value: "−18h", label: "Agent admin / week" },
    ],
    summary:
      "Nestwise was losing leads overnight and on weekends. We built a WhatsApp AI agent that replies in seconds, qualifies buyers and books viewings directly into agents' calendars.",
    challenge:
      "Over 60% of enquiries arrived outside office hours. Agents replied hours later — by then, buyers had already called a competitor. Lead details lived in WhatsApp chats, never reaching the CRM.",
    approach:
      "We mapped the agents' best qualifying questions, then built an AI agent on the WhatsApp Cloud API with strict guardrails. It answers listing questions from live inventory, captures budget, area and timeline, books viewings and syncs everything to HubSpot. Hot leads are escalated to a human instantly.",
    result:
      "Response time dropped from 4 hours to 40 seconds, qualified leads tripled in the first quarter, and agents now start their day with booked viewings instead of unread messages.",
    before: ["Replies after 4+ hours", "Leads lost overnight", "Chats never reach the CRM", "Agents chasing cold leads"],
    after: ["Reply in 40 seconds, 24/7", "Budget & timeline captured", "Auto-sync to HubSpot", "Viewings booked automatically"],
    features: [
      { title: "Live inventory answers", description: "The agent reads current listings and answers price, size and availability questions." },
      { title: "Lead scoring", description: "Each conversation gets a score so agents call the hottest buyers first." },
      { title: "Calendar booking", description: "Viewings booked straight into each agent's Google Calendar with reminders." },
      { title: "Human hand-off", description: "One tap to take over any conversation, with full context." },
    ],
    stack: ["WhatsApp Cloud API", "Claude", "n8n", "HubSpot", "Google Calendar", "Node.js"],
    testimonial: {
      quote: "We used to wake up to fifty unanswered messages. Now we wake up to booked viewings. It paid for itself in the first month.",
      name: "Sarah Malik",
      role: "Managing Director, Nestwise Realty",
    },
    cover: { kind: "chat", tone: "ember" },
  },
  {
    slug: "clinicare",
    title: "Clinicare",
    client: "Clinicare Health Clinics",
    tagline: "An AI assistant that books, reminds and reschedules patients",
    industry: "Healthcare",
    services: ["ai-automation"],
    year: 2025,
    duration: "6 weeks",
    featured: false,
    headlineMetric: { value: "−38%", label: "no-shows" },
    metrics: [
      { value: "−38%", label: "No-shows" },
      { value: "2,400", label: "Bookings / month by AI" },
      { value: "−55%", label: "Front-desk calls" },
    ],
    summary:
      "A multi-location clinic replaced phone-tag with an AI booking assistant across WhatsApp, SMS and web chat.",
    challenge:
      "Reception spent most of the day on the phone. Patients forgot appointments, and empty slots cost the clinic thousands every month.",
    approach:
      "We connected an AI assistant to the clinic's scheduling system, added smart reminders with one-tap rescheduling and built a waitlist that fills cancellations automatically.",
    result: "No-shows fell 38% and the front desk now spends its time with patients in the room, not on hold.",
    before: ["Phone-only booking", "Frequent no-shows", "Empty cancelled slots", "Overloaded reception"],
    after: ["Book via WhatsApp & web", "Smart reminders", "Auto-filled waitlist", "Calm front desk"],
    features: [
      { title: "Omnichannel booking", description: "Same assistant on WhatsApp, SMS and website chat." },
      { title: "Smart reminders", description: "Reminders timed per patient history, with one-tap reschedule." },
      { title: "Waitlist autopilot", description: "Cancellations are offered to waitlisted patients instantly." },
    ],
    stack: ["Twilio", "WhatsApp API", "GPT", "Node.js", "PostgreSQL"],
    testimonial: {
      quote: "Our reception team finally has time to look patients in the eye. The assistant handles the rest.",
      name: "Dr. Omar Haddad",
      role: "Operations Lead, Clinicare",
    },
    cover: { kind: "chat", tone: "peach" },
  },
  {
    slug: "ledgerly",
    title: "Ledgerly",
    client: "Ledgerly Inc.",
    tagline: "A bookkeeping SaaS for small businesses — from idea to 1,200 users",
    industry: "Fintech",
    services: ["software-development"],
    year: 2026,
    duration: "10 weeks to MVP",
    featured: true,
    headlineMetric: { value: "10 wk", label: "idea to launch" },
    metrics: [
      { value: "10 wk", label: "Idea to MVP" },
      { value: "1,200", label: "Paying users in 6 months" },
      { value: "99.98%", label: "Uptime" },
      { value: "0.8s", label: "Avg. page load" },
    ],
    summary:
      "We took Ledgerly from a Figma idea to a subscription SaaS with invoicing, expense tracking and bank sync in 10 weeks.",
    challenge:
      "The founders had validated demand but no technical team, a fixed runway and investors expecting a launch within one quarter.",
    approach:
      "A one-week discovery cut the scope to the features users would pay for first. Then five two-week sprints, each ending in a live demo, delivered a multi-tenant platform with Stripe billing and open-banking sync.",
    result: "Ledgerly launched on time, passed its seed due diligence, and grew to 1,200 paying users within six months.",
    before: ["Idea in Figma only", "No tech team", "Fixed runway", "Investor deadline"],
    after: ["Live multi-tenant SaaS", "Stripe subscriptions", "Bank sync", "Launched on schedule"],
    features: [
      { title: "Invoicing", description: "Branded invoices, reminders and online payment." },
      { title: "Bank sync", description: "Open-banking feeds categorised automatically." },
      { title: "Subscriptions", description: "Plans, trials and seat-based billing on Stripe." },
      { title: "Reports", description: "P&L and cash-flow reports in one click." },
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Stripe", "AWS"],
    testimonial: {
      quote: "Meshglade felt like our own engineering team. Demo every two weeks, no surprises, and we launched exactly when we promised investors.",
      name: "Daniel Reyes",
      role: "Co-founder & CEO, Ledgerly",
    },
    cover: { kind: "dashboard", tone: "charcoal" },
  },
  {
    slug: "atlas-freight",
    title: "Atlas Freight",
    client: "Atlas Freight Logistics",
    tagline: "A dispatch and live-tracking platform replacing spreadsheets",
    industry: "Logistics",
    services: ["software-development", "ai-automation"],
    year: 2025,
    duration: "12 weeks",
    featured: false,
    headlineMetric: { value: "−45%", label: "dispatch time" },
    metrics: [
      { value: "−45%", label: "Dispatch time" },
      { value: "−80%", label: "\"Where is my truck?\" calls" },
      { value: "300+", label: "Daily shipments managed" },
    ],
    summary: "A dispatch web app with driver mobile view, live map and automated customer notifications.",
    challenge: "Dispatchers juggled spreadsheets, phone calls and WhatsApp groups. Customers called constantly for updates.",
    approach:
      "We built a dispatch board with drag-and-drop assignment, a lightweight driver app with GPS check-ins and automatic SMS/WhatsApp ETAs for customers.",
    result: "Dispatch time nearly halved and customer status calls dropped by 80%.",
    before: ["Spreadsheet dispatch", "Constant status calls", "No live visibility", "Manual ETAs"],
    after: ["Drag-and-drop board", "Live GPS map", "Automatic ETAs", "Full shipment history"],
    features: [
      { title: "Dispatch board", description: "Assign loads to drivers with drag and drop." },
      { title: "Live map", description: "Every truck on one map with ETA predictions." },
      { title: "Auto notifications", description: "Customers get updates without calling." },
    ],
    stack: ["React", "NestJS", "Mapbox", "Redis", "PostgreSQL", "Twilio"],
    cover: { kind: "map", tone: "ivory" },
  },
  {
    slug: "docsy-legal",
    title: "Docsy Legal",
    client: "Docsy Legal Partners",
    tagline: "A private RAG assistant that answers from 40,000 legal documents",
    industry: "Legal",
    services: ["data-ai"],
    year: 2026,
    duration: "8 weeks",
    featured: true,
    headlineMetric: { value: "70%", label: "faster research" },
    metrics: [
      { value: "70%", label: "Faster document lookup" },
      { value: "40k", label: "Documents indexed" },
      { value: "100%", label: "Answers with citations" },
      { value: "0", label: "Data leaving their cloud" },
    ],
    summary:
      "We built a secure AI research assistant that searches the firm's precedents and contracts and answers with exact citations.",
    challenge:
      "Associates spent hours digging through shared drives for precedents. Public AI tools were off-limits for confidentiality reasons.",
    approach:
      "We deployed a retrieval-augmented system inside the firm's own cloud: document ingestion with OCR, hybrid vector search, reranking and an answer layer that always cites the source paragraph — with matter-level access control.",
    result: "Research time dropped 70% and partners trust the answers because every claim links back to the original document.",
    before: ["Hours of manual search", "Knowledge locked in drives", "Public AI not allowed", "Inconsistent research"],
    after: ["Answers in seconds", "Cited source paragraphs", "Private cloud deployment", "Matter-level permissions"],
    features: [
      { title: "Hybrid search", description: "Keyword + semantic search with reranking for precision." },
      { title: "Citations", description: "Every answer links to the exact paragraph it came from." },
      { title: "Access control", description: "Users only see documents from matters they're on." },
    ],
    stack: ["Python", "FastAPI", "pgvector", "LlamaIndex", "Claude", "Azure"],
    testimonial: {
      quote: "It's like giving every associate a librarian who has read everything we've ever written — and who always shows their source.",
      name: "Helena Brooks",
      role: "Partner, Docsy Legal",
    },
    cover: { kind: "search", tone: "peach" },
  },
  {
    slug: "shelfsight",
    title: "Shelfsight",
    client: "Shelfsight Retail Analytics",
    tagline: "Computer vision that audits store shelves from a phone photo",
    industry: "Retail",
    services: ["data-ai", "software-development"],
    year: 2025,
    duration: "14 weeks",
    featured: false,
    headlineMetric: { value: "92%", label: "detection accuracy" },
    metrics: [
      { value: "92%", label: "Detection accuracy" },
      { value: "6×", label: "Faster store audits" },
      { value: "1,100", label: "Stores covered" },
    ],
    summary: "A mobile-first vision system that detects out-of-stock items, misplacements and price-tag errors.",
    challenge: "Field teams audited shelves by hand with clipboards — slow, inconsistent and impossible to analyse.",
    approach:
      "We collected and labelled a custom dataset, trained detection models, and shipped an app that runs inference in the cloud and feeds a live analytics dashboard.",
    result: "Audits are 6× faster and brands see shelf compliance across 1,100 stores in near real time.",
    before: ["Clipboard audits", "Inconsistent data", "Week-old reports", "Missed stock-outs"],
    after: ["Photo-based audits", "Automatic detection", "Live dashboard", "Instant alerts"],
    features: [
      { title: "Custom detection", description: "Models trained on the client's product catalogue." },
      { title: "Mobile capture", description: "Guided photo capture with quality checks." },
      { title: "Compliance dashboard", description: "Store, region and brand-level shelf health." },
    ],
    stack: ["PyTorch", "YOLO", "AWS", "React Native", "Airflow", "Metabase"],
    cover: { kind: "vision", tone: "charcoal" },
  },
  {
    slug: "bloom-and-co",
    title: "Bloom & Co",
    client: "Bloom & Co Botanicals",
    tagline: "An AI content engine that tripled a brand's social reach",
    industry: "E-commerce",
    services: ["growth"],
    year: 2026,
    duration: "Ongoing · 90-day sprint",
    featured: true,
    headlineMetric: { value: "+210%", label: "social reach" },
    metrics: [
      { value: "+210%", label: "Social reach in 90 days" },
      { value: "5×", label: "Content output" },
      { value: "+34%", label: "Social-driven revenue" },
    ],
    summary:
      "We built an AI-assisted content engine and calendar that publishes on-brand posts, reels and emails daily.",
    challenge: "A two-person marketing team couldn't keep up with daily content across four channels. Posting was sporadic and off-brand.",
    approach:
      "We created a brand-voice system, AI workflows that turn each product into a week of content, and a human review step. A shared calendar keeps every channel consistent.",
    result: "Reach grew 210% in 90 days and social became Bloom & Co's second-largest revenue channel.",
    before: ["Sporadic posting", "Off-brand visuals", "Overloaded team", "No measurable ROI"],
    after: ["Daily on-brand content", "Brand-voice AI", "Weekly approvals", "Revenue attribution"],
    features: [
      { title: "Brand-voice model", description: "Trained on the brand's best-performing content." },
      { title: "Product-to-content", description: "Each product becomes posts, reels and an email." },
      { title: "Attribution", description: "UTM-tracked links tie content to revenue." },
    ],
    stack: ["Claude", "Midjourney", "CapCut", "Meta Business Suite", "Shopify", "GA4"],
    testimonial: {
      quote: "We went from posting when we remembered to showing up every single day — and it actually sounds like us.",
      name: "Amira Chen",
      role: "Founder, Bloom & Co",
    },
    cover: { kind: "social", tone: "ember" },
  },
  {
    slug: "pulse-b2b",
    title: "Pulse B2B",
    client: "Pulse Software",
    tagline: "An outbound system booking 64 sales meetings a quarter",
    industry: "SaaS",
    services: ["growth", "ai-automation"],
    year: 2025,
    duration: "Ongoing",
    featured: false,
    headlineMetric: { value: "64", label: "meetings / quarter" },
    metrics: [
      { value: "64", label: "Meetings booked / quarter" },
      { value: "41%", label: "Reply rate on top sequence" },
      { value: "$1.2M", label: "Pipeline generated" },
    ],
    summary: "A data-driven outbound engine: ICP lists, enrichment, personalised sequences and automatic booking.",
    challenge: "Founders were doing sales themselves with no system — inconsistent outreach and an empty calendar.",
    approach:
      "We defined the ideal customer profile, built enriched lead lists, wrote AI-personalised sequences across email and LinkedIn and connected replies to a booking flow and the CRM.",
    result: "Pulse now books 60+ qualified meetings per quarter and generated $1.2M in pipeline in two quarters.",
    before: ["Founder-led cold outreach", "No lead lists", "Low reply rates", "Empty calendar"],
    after: ["Enriched ICP lists", "Personalised sequences", "41% reply rate", "Calendar on autopilot"],
    features: [
      { title: "ICP lists", description: "Accounts scored on fit and buying signals." },
      { title: "Personalised sequences", description: "AI-researched first lines for every prospect." },
      { title: "Auto-booking", description: "Positive replies get a booking link and CRM entry." },
    ],
    stack: ["Clay", "Apollo", "Instantly", "LinkedIn", "HubSpot", "n8n"],
    testimonial: {
      quote: "Our calendar went from empty to full. Meshglade built the system and taught us how to run it.",
      name: "Marcus Lee",
      role: "VP Sales, Pulse Software",
    },
    cover: { kind: "pipeline", tone: "ivory" },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = projects.filter((p) => p.featured);
export const projectsByService = (slug: ServiceSlug) => projects.filter((p) => p.services.includes(slug));
export const industries = Array.from(new Set(projects.map((p) => p.industry)));
