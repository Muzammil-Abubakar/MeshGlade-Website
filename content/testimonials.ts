// Placeholder testimonials (fictional). Linked to projects where possible.
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  metric: { value: string; label: string };
  projectSlug?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: "We used to wake up to fifty unanswered messages. Now we wake up to booked viewings. It paid for itself in the first month.",
    name: "Sarah Malik",
    role: "Managing Director",
    company: "Nestwise Realty",
    metric: { value: "3×", label: "qualified leads" },
    projectSlug: "nestwise-realty",
  },
  {
    quote: "Meshglade felt like our own engineering team. Demo every two weeks, no surprises, and we launched exactly when we promised investors.",
    name: "Daniel Reyes",
    role: "Co-founder & CEO",
    company: "Ledgerly",
    metric: { value: "10 wk", label: "idea to launch" },
    projectSlug: "ledgerly",
  },
  {
    quote: "It's like giving every associate a librarian who has read everything we've ever written — and who always shows their source.",
    name: "Helena Brooks",
    role: "Partner",
    company: "Docsy Legal",
    metric: { value: "70%", label: "faster research" },
    projectSlug: "docsy-legal",
  },
  {
    quote: "We went from posting when we remembered to showing up every single day — and it actually sounds like us.",
    name: "Amira Chen",
    role: "Founder",
    company: "Bloom & Co",
    metric: { value: "+210%", label: "social reach" },
    projectSlug: "bloom-and-co",
  },
  {
    quote: "Our calendar went from empty to full. They built the system and taught us how to run it.",
    name: "Marcus Lee",
    role: "VP Sales",
    company: "Pulse Software",
    metric: { value: "64", label: "meetings / quarter" },
    projectSlug: "pulse-b2b",
  },
  {
    quote: "Our reception team finally has time to look patients in the eye. The assistant handles the rest.",
    name: "Dr. Omar Haddad",
    role: "Operations Lead",
    company: "Clinicare",
    metric: { value: "−38%", label: "no-shows" },
    projectSlug: "clinicare",
  },
];
