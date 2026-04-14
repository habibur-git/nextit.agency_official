import type { Transporter } from "nodemailer";
import nodemailer from "nodemailer";

/** Inbound contact mail; override with RECEIVER_EMAIL for staging. */
const DEFAULT_RECEIVER = "info@nextit.agency";

export function getReceiverEmail(): string {
  return process.env.RECEIVER_EMAIL?.trim() || DEFAULT_RECEIVER;
}

/** Gmail App Passwords are shown with spaces; SMTP expects 16 chars without spaces. */
function normalizeSmtpPassword(pass: string): string {
  return pass.replace(/\s+/g, "");
}

export type SmtpResolvedConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
};

/** Reads SMTP_* from the environment with trimming (avoids accidental whitespace from Vercel UI). */
export function resolveSmtpConfig(): SmtpResolvedConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const rawPass = process.env.SMTP_PASS;
  if (!host || !user || rawPass == null || String(rawPass).trim() === "") {
    return null;
  }
  const pass = normalizeSmtpPassword(String(rawPass));
  if (!pass) return null;

  const portRaw = process.env.SMTP_PORT?.trim();
  const port = portRaw ? Number(portRaw) : 587;
  if (!Number.isFinite(port) || port <= 0) return null;

  return { host, port, user, pass };
}

export function isSmtpConfigured(): boolean {
  return resolveSmtpConfig() !== null;
}

export function assertSmtpConfig(): void {
  if (!resolveSmtpConfig()) {
    throw new Error(
      "SMTP configuration missing. Required: SMTP_HOST, SMTP_USER, SMTP_PASS (optional: SMTP_PORT, default 587)",
    );
  }
}

function requireSmtpConfig(): SmtpResolvedConfig {
  const cfg = resolveSmtpConfig();
  if (cfg) return cfg;
  assertSmtpConfig();
  throw new Error("SMTP configuration missing");
}

let transporterInstance: Transporter | null = null;

export function getSmtpUser(): string {
  return requireSmtpConfig().user;
}

export function getTransporter(): Transporter {
  const cfg = requireSmtpConfig();
  if (!transporterInstance) {
    const secure = cfg.port === 465;
    transporterInstance = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure,
      auth: {
        user: cfg.user,
        pass: cfg.pass,
      },
    });
  }
  return transporterInstance;
}
