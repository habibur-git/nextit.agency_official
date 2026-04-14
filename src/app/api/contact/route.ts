import {
  getReceiverEmail,
  getSmtpUser,
  getTransporter,
  isSmtpConfigured,
} from "@/lib/email";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type ContactPayload = {
  name?: string;
  email?: string;
  whatsapp?: string;
  hearAbout?: string;
  serviceType?: string;
  helpOptions?: string[];
  budget?: string;
  message?: string;
  /** Legacy single-line service summary (optional). */
  service?: string;
};

/** Map nodemailer / network errors to a short headline + optional technical detail for the UI. */
function describeSendFailure(err: unknown): {
  headline: string;
  detail?: string;
} {
  const raw = err instanceof Error ? err.message : String(err);
  const lower = raw.toLowerCase();

  if (
    lower.includes("econnrefused") ||
    lower.includes("etimedout") ||
    lower.includes("enotfound") ||
    lower.includes("getaddrinfo")
  ) {
    return {
      headline:
        "We couldn’t reach our mail server from the website. This is often a temporary network issue.",
      detail: raw,
    };
  }

  if (
    lower.includes("invalid login") ||
    lower.includes("authentication failed") ||
    lower.includes("535") ||
    lower.includes("534") ||
    (lower.includes("auth") && lower.includes("failed"))
  ) {
    return {
      headline:
        "The site couldn’t sign in to the email service to deliver your message. Please use WhatsApp below or email info@nextit.agency.",
      detail: raw,
    };
  }

  if (
    lower.includes("certificate") ||
    lower.includes("ssl") ||
    lower.includes("tls")
  ) {
    return {
      headline:
        "A secure connection to the mail server failed. Please try again in a moment or reach us on WhatsApp.",
      detail: raw,
    };
  }

  if (
    lower.includes("message rejected") ||
    lower.includes("spam") ||
    lower.includes("blocked")
  ) {
    return {
      headline:
        "The mail provider rejected the outgoing message. Please contact us on WhatsApp or at info@nextit.agency.",
      detail: raw,
    };
  }

  return {
    headline:
      "We couldn’t deliver your message through the form right now. You can still reach us on WhatsApp or by email.",
    detail: raw,
  };
}

export async function POST(req: Request) {
  try {
    let body: ContactPayload;
    try {
      body = (await req.json()) as ContactPayload;
    } catch {
      return NextResponse.json(
        {
          success: false,
          code: "INVALID_JSON",
          message:
            "The form data could not be read. Please refresh the page and try again.",
        },
        { status: 400 },
      );
    }
    const {
      name,
      email,
      whatsapp,
      hearAbout,
      serviceType,
      helpOptions,
      budget,
      message,
      service: legacyService,
    } = body;

    const nameTrim = typeof name === "string" ? name.trim() : "";
    const emailTrim = typeof email === "string" ? email.trim() : "";
    const messageTrim = typeof message === "string" ? message.trim() : "";

    if (!nameTrim || !emailTrim) {
      return NextResponse.json(
        {
          success: false,
          code: "VALIDATION",
          message: "Please enter your name and email so we can reply to you.",
        },
        { status: 400 },
      );
    }

    if (!messageTrim) {
      return NextResponse.json(
        {
          success: false,
          code: "VALIDATION",
          message:
            "Please add a short message about your project — that field was empty.",
        },
        { status: 400 },
      );
    }

    const helpList = Array.isArray(helpOptions)
      ? helpOptions.filter((x) => typeof x === "string" && x.trim())
      : [];
    const serviceSummary =
      [serviceType, helpList.length ? helpList.join(", ") : ""]
        .filter(Boolean)
        .join(" — ") ||
      legacyService ||
      "Not specified";

    if (!isSmtpConfigured()) {
      console.error(
        "SMTP configuration missing. Set SMTP_HOST, SMTP_USER, SMTP_PASS in your host (e.g. Vercel → Settings → Environment Variables), then redeploy.",
        {
          hasHost: Boolean(process.env.SMTP_HOST?.trim()),
          hasUser: Boolean(process.env.SMTP_USER?.trim()),
          hasPass: Boolean(process.env.SMTP_PASS?.trim()),
        },
      );
      return NextResponse.json(
        {
          success: false,
          code: "SMTP_NOT_CONFIGURED",
          message:
            "Email sending isn’t configured on the server yet, so the form can’t deliver your message. Use WhatsApp or email info@nextit.agency — we’ll still get your request.",
        },
        { status: 503 },
      );
    }

    const transporter = getTransporter();
    const receiverEmail = getReceiverEmail();

    const wa =
      typeof whatsapp === "string" && whatsapp.trim() ? whatsapp.trim() : "—";
    const hear =
      typeof hearAbout === "string" && hearAbout.trim()
        ? hearAbout.trim()
        : "—";
    const bud =
      typeof budget === "string" && budget.trim() ? budget.trim() : "—";

    const textBody = `
Name: ${nameTrim}
Email: ${emailTrim}
WhatsApp: ${wa}
How they heard about us: ${hear}
Service type: ${serviceType || "—"}
Help / focus: ${helpList.length ? helpList.join(", ") : "—"}
Budget: ${bud}

Message:
${messageTrim}
`;

    const htmlBody = `
<p><strong>Name:</strong> ${escapeHtml(nameTrim)}</p>
<p><strong>Email:</strong> ${escapeHtml(emailTrim)}</p>
<p><strong>WhatsApp:</strong> ${escapeHtml(wa)}</p>
<p><strong>How they heard about us:</strong> ${escapeHtml(hear)}</p>
<p><strong>Service type:</strong> ${escapeHtml(serviceType || "—")}</p>
<p><strong>Help / focus:</strong> ${escapeHtml(helpList.length ? helpList.join(", ") : "—")}</p>
<p><strong>Budget:</strong> ${escapeHtml(bud)}</p>
<p><strong>Message:</strong></p>
<p>${escapeHtml(messageTrim).replace(/\n/g, "<br/>")}</p>
`;

    const smtpUser = getSmtpUser();
    /** Gmail (and most SMTP) only allows sending From the authenticated mailbox. */
    const fromName = nameTrim.replace(/"/g, "'");

    await transporter.sendMail({
      from: `"${fromName}" <${smtpUser}>`,
      to: receiverEmail,
      replyTo: `"${fromName}" <${emailTrim}>`,
      subject: `New inquiry — ${serviceSummary}`.slice(0, 200),
      text: textBody,
      html: htmlBody,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent!",
      code: "OK",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    const { headline, detail } = describeSendFailure(error);
    return NextResponse.json(
      {
        success: false,
        code: "MAIL_SEND_FAILED",
        message: headline,
        detail,
      },
      { status: 500 },
    );
  }
}
