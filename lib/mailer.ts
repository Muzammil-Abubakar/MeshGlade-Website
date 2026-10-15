import nodemailer, { type Transporter } from "nodemailer";

/*
  Google SMTP (Gmail / Google Workspace) via Nodemailer.
  Configure in .env.local — see .env.example. SMTP_PASS must be a 16-character
  Google App Password (requires 2-Step Verification), NOT your normal password.
*/

let transporter: Transporter | null = null;

export function smtpConfigured() {
  return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getTransporter() {
  if (transporter) return transporter;
  const port = Number(process.env.SMTP_PORT ?? 465);
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return transporter;
}

export async function sendMail(opts: { to: string; subject: string; html: string; text: string; replyTo?: string }) {
  const from = process.env.MAIL_FROM || `Meshglade <${process.env.SMTP_USER}>`;
  return getTransporter().sendMail({ from, ...opts });
}
