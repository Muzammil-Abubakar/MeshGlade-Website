import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { ProblemSelector } from "@/components/sections/ProblemSelector";
import { ServiceIndex } from "@/components/sections/ServiceIndex";
import { AgentDemo } from "@/components/sections/AgentDemo";
import { CaseFiles } from "@/components/sections/CaseFiles";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SectionSpread } from "@/components/ui/SectionSpread";
import { Accordion } from "@/components/ui/Accordion";
import { Button, TextLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { faqs } from "@/content/faqs";
import { engagementModels } from "@/content/pricing";
import { site } from "@/content/site";
import { JsonLd, faqJsonLd } from "@/lib/seo";
import { whatsappLink } from "@/lib/utils";

// The four questions that most often stop people from getting in touch
const homeFaqs = faqs.slice(0, 4);
const lowestPrice = [...engagementModels]
  .map((m) => m.price)
  .sort((a, b) => Number(a.replace(/\D/g, "")) - Number(b.replace(/\D/g, "")))[0];

/*
  Home page — 9 sections, ordered for a buyer's questions:
  what is it (Hero) → is it legit (Proof) → is it for me (Problems) → what do you do (Services)
  → show me (Demo) → prove it (Work) → do people like you (Testimonials) → objections (FAQ) → act (CTA)
*/
export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd(homeFaqs)} />
      <Hero />
      <ProofStrip />

      {/* 01 · Sound familiar? — key moment */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <SectionSpread
            index="01"
            label="Sound familiar?"
            title={["Pick the problem.", "We'll show the fix."]}
            intro="Most businesses come to us with one of these. Choose yours to see how we solve it — and the result we delivered for someone just like you."
          />
          <div className="mt-12 sm:mt-16">
            <ProblemSelector />
          </div>
        </div>
      </section>

      {/* 02 · Services — compact header, the index rows do the talking */}
      <section className="pb-24 sm:pb-32">
        <div className="container-x">
          <SectionSpread
            size="c"
            index="02"
            label="Services"
            title={["Four ways we make it simple."]}
            intro="One senior team across automation, software, data and growth — so your systems actually talk to each other."
            action={<TextLink href="/services">Explore all services</TextLink>}
          />
        </div>
        <div className="mt-10 sm:mt-12">
          <ServiceIndex />
        </div>
      </section>

      {/* 03 · Agent demo — opens with the experience itself */}
      <section
        data-nav-theme="dark"
        className="relative flex flex-col justify-center overflow-hidden bg-charcoal py-16 text-ivory sm:py-20 lg:h-screen lg:max-h-[100svh] lg:min-h-[640px] lg:py-6 xl:py-8"
      >
        <div aria-hidden className="flutes-fine absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-ember/25 via-ember/5 to-transparent opacity-70" />
        <div className="container-x relative flex min-h-0 w-full flex-1 flex-col justify-center">
          <AgentDemo />
        </div>
      </section>

      {/* 04 · Selected work — key moment */}
      <section data-nav-theme="dark" className="bg-charcoal-deep py-24 text-ivory sm:py-32">
        <div className="container-x">
          <SectionSpread
            dark
            index="04"
            label="Selected work"
            title={["Results first.", "Then the story."]}
            intro="Every number below is tied to a case study. Open any file to see the challenge, the approach and what changed."
          />
          <div className="mt-12 sm:mt-16">
            <CaseFiles />
          </div>
        </div>
      </section>

      {/* 05 · Testimonials — the quote is the headline */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <Reveal className="mb-8 sm:mb-10">
            <p className="label flex items-center gap-3 text-charcoal-70">
              <span className="text-ember">05</span>
              <span aria-hidden className="h-px w-8 bg-charcoal/30" />
              In their words
            </p>
            <h2 className="display-s mt-4">Don&apos;t take our word for it.</h2>
          </Reveal>
          <Testimonials />
        </div>
      </section>

      {/* 06 · FAQ — objections + a price anchor */}
      <section className="pb-24 sm:pb-32">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-28">
              <p className="label flex items-center gap-3 text-charcoal-70">
                <span className="text-ember">06</span>
                <span aria-hidden className="h-px w-8 bg-charcoal/30" />
                Questions
              </p>
              <h2 className="display-m mt-6">Before you ask.</h2>
              <Link
                href="/pricing"
                className="group mt-8 flex items-center justify-between gap-6 rounded-card bg-peach p-6 transition-colors hover:bg-peach-80"
              >
                <span>
                  <span className="block text-sm text-charcoal-80">Projects start from</span>
                  <span className="font-display text-4xl tracking-tight">{lowestPrice}</span>
                </span>
                <span className="text-right text-sm font-semibold">
                  See pricing &amp;
                  <br />
                  estimate in 60s →
                </span>
              </Link>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button href={whatsappLink(site.whatsapp, "Hi Meshglade, I have a question.")} variant="outline" arrow={false}>
                  <span className="flex items-center gap-2">
                    <WhatsAppIcon className="size-4" /> Ask on WhatsApp
                  </span>
                </Button>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Accordion items={homeFaqs} />
            <TextLink href="/why-us#faq" className="mt-8">
              See all questions
            </TextLink>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
