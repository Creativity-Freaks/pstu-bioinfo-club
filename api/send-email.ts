import { Resend } from "resend";

// Vercel Serverless Function to send email notifications
// Expects JSON body: { type?: "contact"|"membership", name, email, subject?, message }
export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      res.status(500).json({ error: "Missing RESEND_API_KEY" });
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

    const resend = new Resend(resendApiKey);

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

    const { data, error } = await resend.emails.send({
      from: process.env.MAIL_FROM || "onboarding@resend.dev",
      to: adminEmail,
      subject: `[PSTU Bioinfo Club] ${finalSubject}`,
      html,
      reply_to: email,
    } as any);

    if (error) {
      res.status(500).json({ error: error.message || String(error) });
      return;
    }

    res.status(200).json({ ok: true, id: data?.id });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || String(err) });
  }
}
