import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/ui/LegalLayout";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.legalName} collects, uses and protects your personal information.`,
  alternates: { canonical: "/privacy-policy" },
};

// TEMPLATE — have this reviewed by a qualified professional for your jurisdiction.
const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          {site.legalName} (&ldquo;Meshglade&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) provides software development, AI automation, data and growth
          services. This policy explains how we handle personal information when you visit {site.url.replace("https://", "")} or contact us.
        </p>
        <p>
          Questions? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "Information we collect",
    body: (
      <>
        <p>
          <strong>Information you give us</strong> — when you submit a form or message us: your name, email, company, phone/WhatsApp number,
          country, project details, budget and timeline preferences.
        </p>
        <p>
          <strong>Context from our tools</strong> — if you use our ROI calculator or project estimator and choose to send the result, that
          summary is attached to your enquiry.
        </p>
        <p>
          <strong>Attribution data</strong> — the page you first landed on, the referring website and campaign parameters (UTM tags). This is
          stored in your browser and only sent to us if you submit a form.
        </p>
        <p>
          <strong>Technical data</strong> — standard server logs (IP address, browser type, time of request) used for security and to prevent
          abuse, such as rate-limiting spam.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How we use it",
    body: (
      <ul>
        <li>To reply to your enquiry and prepare proposals.</li>
        <li>To deliver services under a contract with you.</li>
        <li>To send you a confirmation of your enquiry.</li>
        <li>To understand which channels bring us clients, in aggregate.</li>
        <li>To keep our website secure and prevent spam.</li>
      </ul>
    ),
  },
  {
    id: "legal-basis",
    title: "Legal basis",
    body: (
      <p>
        We process your data based on your consent (when you submit a form), to take steps before entering a contract at your request, to
        perform a contract, and for our legitimate interests in running and securing our business.
      </p>
    ),
  },
  {
    id: "sharing",
    title: "Who we share it with",
    body: (
      <>
        <p>We never sell your data. We share it only with service providers who help us operate, under appropriate agreements:</p>
        <ul>
          <li>Google (Gmail / Google Workspace) — to receive and send emails.</li>
          <li>Our hosting provider — to serve this website.</li>
          <li>WhatsApp (Meta) — only if you choose to contact us there.</li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies & local storage",
    body: (
      <p>
        We don&apos;t use advertising cookies or third-party analytics. We use your browser&apos;s local/session storage to remember attribution
        data and any calculator results you choose to attach. You can clear this at any time in your browser settings.
      </p>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <p>
        Enquiries that don&apos;t become projects are deleted within 24 months. Client records are kept for the duration of our relationship and
        as required by law (for example, tax records).
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: (
      <p>
        Depending on where you live, you may have the right to access, correct, delete, restrict or export your personal data, and to object
        to processing. Email <a href={`mailto:${site.email}`}>{site.email}</a> and we&apos;ll respond within 30 days. You may also complain to your
        local data protection authority.
      </p>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: <p>We use encrypted connections (HTTPS/TLS), access controls and reputable providers to protect your data.</p>,
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: <p>We may update this policy. The &ldquo;last updated&rdquo; date above shows the latest version.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      label="Legal"
      title={["Privacy", "Policy."]}
      updated="October 2026"
      intro="Plain-language summary: we collect only what we need to reply to you and deliver our work, we never sell it, and you can ask us to delete it anytime."
      sections={sections}
    />
  );
}
