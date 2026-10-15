// First-touch attribution (UTM + referrer) and cross-page brief context.
// Stored in the visitor's browser only and attached to the lead email.

const ATTR_KEY = "mg-attribution";
export const BRIEF_KEY = "mg-brief-context";
const notify = () => window.dispatchEvent(new Event("mg-storage"));

export type Attribution = Record<string, string>;

export function captureAttribution() {
  try {
    if (localStorage.getItem(ATTR_KEY)) return;
    const url = new URL(window.location.href);
    const data: Attribution = {};
    for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"]) {
      const v = url.searchParams.get(k);
      if (v) data[k] = v;
    }
    if (document.referrer && !document.referrer.startsWith(window.location.origin)) data.referrer = document.referrer;
    data.landing_page = url.pathname;
    data.first_visit = new Date().toISOString();
    localStorage.setItem(ATTR_KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable */
  }
}

export function readAttribution(): string {
  try {
    return localStorage.getItem(ATTR_KEY) ?? "";
  } catch {
    return "";
  }
}

export type BriefContext = { source: "roi" | "estimator" | "problem"; summary: string; services?: string[] };

export function saveBriefContext(ctx: BriefContext) {
  try {
    sessionStorage.setItem(BRIEF_KEY, JSON.stringify(ctx));
    notify();
  } catch {
    /* ignore */
  }
}

export function parseBriefContext(raw: string): BriefContext | null {
  try {
    return raw ? (JSON.parse(raw) as BriefContext) : null;
  } catch {
    return null;
  }
}

export function clearBriefContext() {
  try {
    sessionStorage.removeItem(BRIEF_KEY);
    notify();
  } catch {
    /* ignore */
  }
}
