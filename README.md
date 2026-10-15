# Meshglade — Website

Agency website for **Meshglade** — *Complex needs, simple solutions.*
Built with Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS v4, Motion and OGL (WebGL).

## Quick start

```bash
npm install
cp .env.example .env.local   # then add your Google SMTP secrets
npm run dev                  # http://localhost:3000
```

Production: `npm run build && npm start`.

## Google SMTP (contact forms)

All forms post to one Server Action (`app/actions/contact.ts`) that sends two emails with Nodemailer:

1. **Lead notification** to you — every answer, estimator/ROI summary, source page, UTM tags and a one-click WhatsApp link. `Reply-To` is set to the visitor, so you can just hit reply.
2. **Branded auto-reply** to the visitor.

Setup:

1. Turn on 2-Step Verification on the Google account.
2. Create an **App Password** (Google Account → Security → App passwords).
3. Fill `SMTP_USER`, `SMTP_PASS` (the 16-char app password), `MAIL_TO` and `MAIL_FROM` in `.env.local`.

Without SMTP configured: in development, leads are printed to the terminal and the thank-you page still works; in production, visitors see a friendly message with your email address.

Spam protection: honeypot field, minimum fill time, per-IP rate limit (in-memory — use Upstash/Redis if you run multiple instances) and Zod validation.

## Contact flows

| Route | Purpose |
|---|---|
| `/contact` | **Free audit** — the fast path behind every "Book a free audit" button: 3 fields, or your calendar when `site.bookingUrl` is set |
| `/contact/brief` | **Project brief** — 4-step form for quotes, estimator results and pricing plans |
| `/contact/thank-you` | Confirmation page (track this URL as your conversion) |

Links can pre-fill context: `?service=ai-automation`, `?plan=launch`, `?intent=estimate`.

## Hero headline A/B

`site.heroVariant` in `content/site.ts` switches the home H1 between `"value"` ("AI agents & software that win customers.") and `"tagline"` ("Complex needs. Simple solutions."). Compare with analytics and keep the winner.

## Editing content — everything lives in `/content`

| File | What it controls |
|---|---|
| `content/site.ts` | Contact details (**mock**), socials, booking link, audit offer, proof numbers, client names |
| `content/services.ts` | The 4 services, sub-services, FAQs, stack, use cases |
| `content/projects.ts` | The 8 **placeholder** case studies. Add `cover.image` (screenshot) or `cover.video` + `cover.poster` (5–10 s muted MP4 loop) from `/public/projects` |
| `content/testimonials.ts` | Testimonials (**placeholder**) |
| `content/pricing.ts` | Engagement models & starting prices (**mock**) |
| `content/estimator.ts` | Estimator price ranges, add-ons and timeline multipliers (**mock**) |
| `content/landing.ts` | Problem selector, process, comparison, agent-demo scripts |
| `content/faqs.ts` | General FAQ |

Leave `site.bookingUrl` empty to hide all "Book a call" buttons, or set it to your Cal.com / Calendly link.

## Brand assets

- **Typeface:** Nohemi by Rajesh Rajput (freeware for personal & commercial use; files must not be modified) — `app/fonts/`, see `NOHEMI-LICENSE.txt`. Body text: Plus Jakarta Sans; labels: Geist Mono.
- **Logo:** official artwork extracted pixel-for-pixel from the brand files into transparent PNGs — `public/brand/logo-*.png` (lockup) and `mark-*.png` (logomark), plus the original app-icon tiles `tile-*.png`. Favicon/app icon use the official flat tile.
- **Colours:** Charcoal `#272727`, Ivory `#FFF9EA`, Peach `#FCC8B5`, Ember `#DF462B` (tokens in `app/globals.css`).

## Notable pieces

- `components/gl/UntangleField.tsx` — the signature WebGL "Untangle" hero (tangled mesh → fluted glass). Auto-falls back to a static gradient without WebGL, on Save-Data, or with reduced motion.
- `components/sections/*` — landing sections (problem selector, agent demo, case files, ROI calculator, process, testimonials, comparison toggle…).
- `components/interactive/*` — service hero visuals, estimator, projects explorer, before/after slider.
- Scroll reveals use one global `IntersectionObserver` (`components/motion/RevealObserver.tsx`), so most sections are zero-JS server components.

## Deploy

Works on Vercel or any Node.js host (Node 20.9+). Add the same environment variables in your host's dashboard and set `NEXT_PUBLIC_SITE_URL` to your real domain.
