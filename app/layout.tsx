import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { AttributionCapture } from "@/components/layout/ClientEffects";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { JsonLd, organizationJsonLd } from "@/lib/seo";
import { site } from "@/content/site";

// Brand typeface (Brand Guidelines · Typography). Original, unmodified files.
const nohemi = localFont({
  src: [
    { path: "./fonts/Nohemi-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Nohemi-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Nohemi-SemiBold.ttf", weight: "600", style: "normal" },
  ],
  variable: "--font-nohemi",
  display: "swap",
  adjustFontFallback: "Arial",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Meshglade — AI Automation, Software & Growth Agency",
    template: "%s · Meshglade",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "AI automation agency",
    "AI agents",
    "WhatsApp automation",
    "chatbot development",
    "web app development",
    "SaaS development",
    "RAG",
    "computer vision",
    "lead generation",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "Meshglade — Complex needs, simple solutions.",
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#272727",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${nohemi.variable} ${jakarta.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Enables reveal hidden-states only when JS runs (no-JS users see everything). */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <JsonLd data={organizationJsonLd()} />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[80] -translate-y-24 rounded-full bg-charcoal px-5 py-3 text-ivory focus:translate-y-0"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <StickyCTA />
        <RevealObserver />
        <SmoothScroll />
        <AttributionCapture />
      </body>
    </html>
  );
}
