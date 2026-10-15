import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { SectionSpread } from "@/components/ui/SectionSpread";
import { Accordion } from "@/components/ui/Accordion";
import { PricingCards } from "@/components/sections/PricingCards";
import { Estimator } from "@/components/interactive/Estimator";
import { CTABand } from "@/components/sections/CTABand";
import { RoiCalculator } from "@/components/sections/RoiCalculator";
import { TextLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Pricing — Engagement Models & Project Estimator",
  description:
    "Transparent starting prices for AI automation, software and growth projects — plus an instant estimator for your project's cost and timeline.",
  alternates: { canonical: "/pricing" },
};

const pricingFaqs = [
  { q: "Why do you show prices?", a: "Because you deserve to know if we're a fit before booking a call. Starting prices are honest minimums; your proposal will have one fixed number." },
  { q: "What's included in the price?", a: "Discovery, design, development, testing, launch, documentation and 30 days of free support. Third-party costs (hosting, AI usage, software licenses) are billed at cost — we estimate them upfront." },
  { q: "How do payments work?", a: "Fixed-scope projects are split into milestones — typically 40% to start, then the rest across delivery milestones. Retainers are billed monthly in advance." },
  { q: "What if the scope changes?", a: "It happens! Any change is quoted before we do it, so you always approve costs in advance. No surprise invoices." },
  { q: "Do you offer discounts?", a: "Combining services gets 10% off, and flexible timelines save another 8%. We also have startup-friendly payment plans — just ask." },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        label="Pricing"
        title={["Clear prices.", <span key="n" className="text-ember">No surprises.</span>]}
        intro="Three ways to work with us, honest starting prices, and an estimator that gives you a real range in under a minute."
        aside={<TextLink href="#estimator" className="mt-6">Jump to the estimator</TextLink>}
      />

      <section className="pb-24 sm:pb-32">
        <div className="container-x">
          <PricingCards detailed />
          <p className="mt-6 text-sm text-charcoal-70">Prices in USD. All prices shown are starting points — every project gets a fixed quote.</p>
        </div>
      </section>

      <section id="estimator" className="scroll-mt-24 bg-ivory-deep py-24 sm:py-32">
        <div className="container-x">
          <SectionSpread
            index="01"
            label="Project estimator"
            title={["Your project,", "priced in 60 seconds."]}
            intro="Answer four quick questions. Send the result to us and we'll turn it into a fixed proposal within 3 days."
          />
          <div className="mt-12 sm:mt-16">
            <Estimator />
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionSpread
            size="c"
            index="02"
            label="ROI calculator"
            title={["Will it pay for itself?"]}
            intro="For automation projects, compare the cost with what manual work costs you today."
          />
          <div className="mt-10 sm:mt-12">
            <RoiCalculator />
          </div>
        </div>
      </section>

      <section className="pb-24 sm:pb-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionSpread size="m" index="03" label="Pricing FAQ" title={["Money", "questions."]} />
          </div>
          <div className="lg:col-span-7">
            <Accordion items={pricingFaqs} />
          </div>
        </div>
      </section>

      <CTABand title={["Get a fixed", "quote, free."]} />
    </>
  );
}
