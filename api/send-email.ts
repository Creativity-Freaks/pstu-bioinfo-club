import { Resend } from "resend";
import nodemailer from "nodemailer";

// Ensure Vercel uses the Node.js runtime (not Edge) for SMTP/Resend
export const config = { runtime: "nodejs" };

type EmailPayload = {
  type?: "contact" | "membership";
  name: string;
  email: string;
  subject?: string;
  message: string;
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

    const { type = "contact", name, email, subject, message } = req.body || {};
    if (!name || !email || !message) {
      res.status(400).json({ error: "Missing required fields: name, email, message" });
      return;
    }

    const finalSubject = subject || (type === "membership" ? "New membership application" : "New contact message");
    const html = `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6;">
        <h2 style="margin: 0 0 8px;">${finalSubject}</h2>
        <p style="margin: 0 0 8px;">Type: <strong>${type}</strong></p>
        <p style="margin: 0 0 8px;">From: <strong>${name}</strong> &lt;${email}&gt;</p>
        <div style="padding: 12px; background: #f7f7f8; border-radius: 8px; margin-top: 12px; white-space: pre-wrap;">
          ${message}
        </div>
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
