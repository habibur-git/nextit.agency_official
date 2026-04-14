import {
  getReceiverEmail,
  getSmtpUser,
  getTransporter,
  isSmtpConfigured,
} from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.name || !data.email) {
      return NextResponse.json(
        { success: false, message: "Name and email are required" },
        { status: 400 }
      );
    }

    if (!isSmtpConfigured()) {
      console.error(
        "SMTP configuration missing. Set SMTP_HOST, SMTP_USER, SMTP_PASS, then redeploy.",
        {
          hasHost: Boolean(process.env.SMTP_HOST?.trim()),
          hasUser: Boolean(process.env.SMTP_USER?.trim()),
          hasPass: Boolean(process.env.SMTP_PASS?.trim()),
        }
      );
      return NextResponse.json(
        { success: false, message: "Email service is not configured" },
        { status: 503 }
      );
    }

    const attachments: { filename: string; content: Buffer }[] = [];
    if (data.file?.data && data.file?.name) {
      try {
        const base64Data = data.file.data.includes(",")
          ? data.file.data.split(",")[1]
          : data.file.data;
        if (base64Data?.length > 0) {
          attachments.push({
            filename: data.file.name,
            content: Buffer.from(base64Data, "base64"),
          });
        }
      } catch (fileError) {
        console.error("Error processing file attachment:", fileError);
      }
    }

    const transporter = getTransporter();
    const receiverEmail = getReceiverEmail();

    await transporter.sendMail({
      from: `"Website Estimate" <${getSmtpUser()}>`,
      to: receiverEmail,
      subject: "New Quick Estimate Request",
      html: `
        <h2>New Estimate Request</h2>
        <p><strong>Service:</strong> ${data.service || "Not specified"}</p>
        <p><strong>Project Type:</strong> ${data.projectType || "Not specified"}</p>
        <p><strong>Industry:</strong> ${data.industry || "Not specified"}</p>
        <p><strong>Description:</strong> ${data.description || "Not provided"}</p>
        <p><strong>Budget:</strong> ${data.budget || "Not specified"}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone/WhatsApp:</strong> ${data.contact || "Not provided"}</p>
        ${data.file ? `<p><strong>File:</strong> ${data.file.name}</p>` : ""}
      `,
      attachments,
    });

    return NextResponse.json({
      success: true,
      message: "Estimate request sent!",
    });
  } catch (error) {
    console.error("Error sending estimate email:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      {
        success: false,
        message: "Error sending estimate request",
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
