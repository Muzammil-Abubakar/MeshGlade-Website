import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/ui/LegalLayout";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms for using the ${site.name} website and services.`,
  alternates: { canonical: "/terms" },
};

// TEMPLATE — have this reviewed by a qualified professional for your jurisdiction.
const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement",
    body: (
      <p>
        By using this website you agree to these terms. Services we deliver to clients are governed by a separate written proposal or
        Statement of Work (SOW), which takes precedence over these terms where they differ.
      </p>
    ),
  },
  {
    id: "website-use",
    title: "Using this website",
    body: (
      <p>
        You may browse and share our content for personal, non-commercial purposes. Don&apos;t attempt to disrupt the website, scrape it at scale,
        or submit false or malicious information through our forms.
      </p>
    ),
  },
  {
    id: "estimates",
    title: "Estimates & pricing",
    body: (
      <p>
        Prices, the ROI calculator and the project estimator on this website are indicative only and do not constitute an offer. A binding
        price is only provided in a signed proposal.
      </p>
    ),
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: (
      <>
        <p>
          The Meshglade name, logo, brand assets and website content belong to {site.legalName}. Don&apos;t use them without written permission.
        </p>
        <p>
          For client work: once paid in full, you own the deliverables and source code we create for you, as described in your SOW.
          Pre-existing tools and open-source components remain under their own licenses.
        </p>
      </>
    ),
  },
  {
    id: "case-studies",
    title: "Case studies",
    body: <p>Case studies on this website are shared with client permission or anonymised. Results vary between businesses.</p>,
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <p>
        This website is provided &ldquo;as is&rdquo;. To the extent permitted by law, we aren&apos;t liable for indirect or consequential losses from
        using it. Nothing here limits liability that cannot be limited by law.
      </p>
    ),
  },
  {
    id: "links",
    title: "Third-party links",
    body: <p>We link to other websites (e.g. WhatsApp, social networks). We&apos;re not responsible for their content or policies.</p>,
  },
  {
    id: "changes",
    title: "Changes",
    body: <p>We may update these terms from time to time. Continued use of the website means you accept the updated terms.</p>,
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <p>
        Questions about these terms? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalLayout
      label="Legal"
      title={["Terms of", "Service."]}
      updated="October 2026"
      intro="The short version: be fair with our website, estimates aren't binding until you sign a proposal, and you own the code we build for you."
      sections={sections}
    />
  );
}
