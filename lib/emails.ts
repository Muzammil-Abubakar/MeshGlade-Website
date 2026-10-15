import type { Lead } from "./schema";
import { serviceOptions } from "./schema";
import { site } from "@/content/site";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

const C = { charcoal: "#272727", ivory: "#FFF9EA", peach: "#FCC8B5", ember: "#DF462B", grey: "#7D7D7D" };

const serviceLabels = (ids: string[]) =>
  ids.map((id) => serviceOptions.find((s) => s.id === id)?.label ?? id).join(", ") || "—";

function parseAttribution(raw: string): Record<string, string> {
  try {
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

function shell(inner: string, preheader: string) {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${C.ivory};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:${C.charcoal}">
<span style="display:none;max-height:0;overflow:hidden">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.ivory};padding:32px 12px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #eee3c9">
<tr><td style="background:${C.charcoal};padding:28px 32px">
<img src="${site.url}/brand/logo-ivory.png" width="170" alt="Meshglade" style="display:block;width:170px;height:auto;border:0">
</td></tr>
<tr><td style="padding:32px">${inner}</td></tr>
<tr><td style="padding:20px 32px;border-top:1px solid #f0e8d6;font-size:12px;color:${C.grey}">
${esc(site.legalName)} · ${esc(site.tagline)}
</td></tr>
</table></td></tr></table></body></html>`;
}

function row(label: string, value: string) {
  if (!value) return "";
  return `<tr><td style="padding:10px 0;border-bottom:1px solid #f0e8d6;width:150px;vertical-align:top;font-size:13px;color:${C.grey}">${esc(label)}</td>
<td style="padding:10px 0;border-bottom:1px solid #f0e8d6;font-size:14px;white-space:pre-wrap">${esc(value)}</td></tr>`;
}

/** Notification to the Meshglade team */
export function leadNotification(lead: Lead) {
  const services = serviceLabels(lead.services);
  const attr = parseAttribution(lead.attribution);
  const wa = lead.phone.replace(/[^\d]/g, "");
  const subject = `${lead.formType === "audit" ? "Audit request" : "New lead"} · ${services} · ${lead.budget || "budget n/a"} · ${lead.name}${lead.company ? ` (${lead.company})` : ""}`;

  const details: [string, string][] = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Company / website", lead.company],
    ["Phone / WhatsApp", lead.phone],
    ["Country", lead.country],
    ["Services", services],
    ["Budget", lead.budget],
    ["Timeline", lead.timeline],
    ["Intent", lead.intent],
    ["Plan", lead.plan],
    ["Message", lead.message],
    ["Current tools", lead.tools],
    ["Heard about us", lead.heardFrom],
    ["Context", lead.context],
  ];
  const tracking: [string, string][] = [
    ["Form", { quick: "Home page quick form", audit: "Free audit request", brief: "Full project brief" }[lead.formType]],
    ["Submitted from", lead.page],
    ...Object.entries(attr).map(([k, v]) => [k, v] as [string, string]),
  ];

  const html = shell(
    `<p style="margin:0 0 6px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:${C.ember}">New lead</p>
<h1 style="margin:0 0 20px;font-size:26px;line-height:1.2">${esc(lead.name)}${lead.company ? ` · ${esc(lead.company)}` : ""}</h1>
<p style="margin:0 0 24px">
<a href="mailto:${esc(lead.email)}" style="display:inline-block;background:${C.charcoal};color:${C.ivory};text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:600;font-size:14px">Reply by email</a>
${wa ? `&nbsp;<a href="https://wa.me/${wa}" style="display:inline-block;background:${C.ember};color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:600;font-size:14px">WhatsApp</a>` : ""}
</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${details.map(([l, v]) => row(l, v)).join("")}</table>
<p style="margin:28px 0 8px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:${C.grey}">Tracking</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${tracking.map(([l, v]) => row(l, v)).join("")}</table>`,
    `${lead.name} — ${services}`,
  );

  const text = [...details, ...tracking]
    .filter(([, v]) => v)
    .map(([l, v]) => `${l}: ${v}`)
    .join("\n");

  return { subject, html, text };
}

/** Auto-reply to the client */
export function clientAutoReply(lead: Lead) {
  const first = lead.name.split(" ")[0];
  const services = serviceLabels(lead.services);
  const subject = `We got your message, ${first} — Meshglade`;
  const html = shell(
    `<h1 style="margin:0 0 16px;font-size:28px;line-height:1.15;letter-spacing:-.02em">Thanks, ${esc(first)} — we&rsquo;ve got it.</h1>
<p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#525252">A senior member of our team will read your message and reply within <strong style="color:${C.charcoal}">${esc(site.responseTime)}</strong>. Here&rsquo;s what happens next:</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px">
${[
  ["01", "We review your brief", "and research your business before we talk."],
  ["02", "30-minute call", "to understand the problem and the numbers you want to move."],
  ["03", "Written proposal in 3 days", "with scope, fixed price and timeline."],
]
  .map(
    ([n, t, d]) => `<tr><td style="padding:12px 0;border-top:1px solid #f0e8d6;width:44px;vertical-align:top;font-size:12px;color:${C.ember};font-family:monospace">${n}</td>
<td style="padding:12px 0;border-top:1px solid #f0e8d6;font-size:15px"><strong>${t}</strong> <span style="color:#525252">${d}</span></td></tr>`,
  )
  .join("")}
</table>
<div style="background:${C.ivory};border-radius:16px;padding:18px 20px;margin:0 0 24px;font-size:14px;line-height:1.6">
<strong>Your summary</strong><br>
Services: ${esc(services)}${lead.budget ? `<br>Budget: ${esc(lead.budget)}` : ""}${lead.timeline ? `<br>Timeline: ${esc(lead.timeline)}` : ""}
</div>
<p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#525252">In a hurry? Message us on WhatsApp and mention your name.</p>
<a href="https://wa.me/${site.whatsapp}" style="display:inline-block;background:${C.charcoal};color:${C.ivory};text-decoration:none;padding:14px 24px;border-radius:999px;font-weight:600;font-size:14px">Chat on WhatsApp</a>
&nbsp;<a href="${site.url}/projects" style="display:inline-block;color:${C.charcoal};padding:14px 8px;font-weight:600;font-size:14px">See our work →</a>`,
    "We'll reply within 24 hours. Here's what happens next.",
  );
  const text = `Thanks, ${first} — we've got your message.\n\nWe'll reply within ${site.responseTime}.\n\n01 We review your brief\n02 30-minute call\n03 Written proposal in 3 days\n\nWhatsApp: https://wa.me/${site.whatsapp}\n\n— Meshglade`;
  return { subject, html, text };
}
