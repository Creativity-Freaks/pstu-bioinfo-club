import { Resend } from "resend";
import nodemailer from "nodemailer";

// Ensure Vercel uses the Node.js runtime (not Edge) for SMTP/Resend
export const config = { runtime: "nodejs" };

type EmailPayload = {
  type?: "contact" | "membership";
  name: string;
  email: string;
  subject?: string;
  message?: string;
  // Optional membership-specific fields
  studentId?: string;
  department?: string;
  year?: string;
  phone?: string;
  bio?: string;
  skills?: string;
};
type NodeReq = { method?: string; body?: EmailPayload };
type NodeRes = { status: (code: number) => { json: (obj: Record<string, unknown>) => void } };

// Vercel Serverless Function to send email notifications
// Expects JSON body: { type?: "contact"|"membership", name, email, subject?, message }
export default async function handler(req: NodeReq, res: NodeRes) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const adminEmail = process.env.ADMIN_EMAIL || process.env.VITE_ADMIN_EMAIL;
    if (!adminEmail) {
      res.status(500).json({ error: "Missing ADMIN_EMAIL or VITE_ADMIN_EMAIL" });
      return;
    }

    const { type = "contact", name, email, subject, message, studentId, department, year, phone, bio, skills } = req.body || {};
    if (!name || !email) {
      res.status(400).json({ error: "Missing required fields: name, email" });
      return;
    }

    const finalSubject = subject || (type === "membership" ? "New membership application" : "New contact message");
    const membershipBlock = type === "membership" ? `
        <div style="margin-top: 12px">
          <p style="margin: 0 0 4px">Student ID: <strong>${studentId ?? "N/A"}</strong></p>
          <p style="margin: 0 0 4px">Department: <strong>${department ?? "N/A"}</strong></p>
          <p style="margin: 0 0 4px">Year: <strong>${year ?? "N/A"}</strong></p>
          <p style="margin: 0 0 4px">Phone: <strong>${phone ?? "N/A"}</strong></p>
          ${bio ? `<div style="margin-top:8px"><p style="margin:0 0 4px">Bio:</p><div style="padding:8px;background:#f7f7f8;border-radius:6px;white-space:pre-wrap">${bio}</div></div>` : ""}
          ${skills ? `<div style="margin-top:8px"><p style="margin:0 0 4px">Skills:</p><div style="padding:8px;background:#f7f7f8;border-radius:6px;white-space:pre-wrap">${skills}</div></div>` : ""}
        </div>` : "";

    const composedMessage = message && message.trim().length > 0
      ? message
      : (type === "membership"
          ? `Student ID: ${studentId ?? "N/A"}\nDepartment: ${department ?? "N/A"}\nYear: ${year ?? "N/A"}\nPhone: ${phone ?? "N/A"}\n\nBio:\n${bio ?? "N/A"}\n\nSkills:\n${skills ?? "N/A"}`
          : "");

    if (type !== "membership" && !composedMessage) {
      res.status(400).json({ error: "Missing required field: message" });
      return;
    }

    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6;">
        <h2 style="margin: 0 0 8px;">${finalSubject}</h2>
        <p style="margin: 0 0 8px;">Type: <strong>${type}</strong></p>
        <p style="margin: 0 0 8px;">From: <strong>${name}</strong> &lt;${email}&gt;</p>
        <div style="padding: 12px; background: #f7f7f8; border-radius: 8px; margin-top: 12px; white-space: pre-wrap;">
          ${composedMessage}
        </div>
        ${membershipBlock}
        <p style="margin-top: 16px; color: #6b7280;">This email was sent by PSTU Bioinformatics Club site.</p>
      </div>
    `;
    // Prefer Gmail SMTP with App Password if configured
    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    if (gmailUser && gmailPass) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: gmailUser, pass: gmailPass },
      });
      const info = await transporter.sendMail({
        from: process.env.MAIL_FROM || gmailUser,
        to: adminEmail,
        subject: `[PSTU Bioinfo Club] ${finalSubject}`,
        html,
        text: composedMessage || undefined,
        replyTo: email,
      });
      res.status(200).json({ ok: true, id: info.messageId });
      return;
    }

    // Fallback to Resend if SMTP is not configured
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      res.status(500).json({ error: "Email not configured. Set GMAIL_USER & GMAIL_APP_PASSWORD or RESEND_API_KEY." });
      return;
    }
    const resend = new Resend(resendApiKey);
    const { data, error } = await resend.emails.send({
      from: process.env.MAIL_FROM || "onboarding@resend.dev",
      to: adminEmail,
      subject: `[PSTU Bioinfo Club] ${finalSubject}`,
      html,
      reply_to: email,
    });
    if (error) {
      res.status(500).json({ error: error.message || String(error) });
      return;
    }
    res.status(200).json({ ok: true, id: data?.id });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: msg });
  }
}
