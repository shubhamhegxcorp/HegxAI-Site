import { escapeHtml, redactLead } from "./lead-utils";

// Future-backend lead storage and notification seams
export interface Lead {
  source: "form" | "cal";
  name: string;
  email: string;
  company?: string;
  message?: string;
  startTime?: string;
  createdAt: Date;
}

/**
 * Lead persistence seam.
 * Currently dispatches notification email for Cal.com bookings (form route dispatches its own email).
 * When a persistent database is connected (e.g. Supabase, PostgreSQL, Prisma),
 * DB writes will be centralized here for both lead sources.
 */
export async function saveLead(lead: Lead): Promise<void> {
  // DB Write stub: future backend persistence
  // e.g. await db.leads.create({ data: lead });

  if (lead.source === "cal") {
    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.LEAD_TO_EMAIL;
    const fromEmail = process.env.LEAD_FROM_EMAIL;

    if (!apiKey || !toEmail || !fromEmail) {
      console.warn("[saveLead] Resend env vars not configured for Cal.com booking notification");
      return;
    }

    const safeName = lead.name.trim();
    const safeEmail = lead.email.trim();
    const safeCompany = (lead.company || "").trim();
    const safeMessage = (lead.message || "").trim();
    const safeStartTime = (lead.startTime || "").trim();

    const subject = `New booking: ${safeName} (${safeCompany || "no company"})`;
    const textBody = [
      `New Cal.com booking received:`,
      `Name: ${safeName}`,
      `Email: ${safeEmail}`,
      `Company: ${safeCompany || "N/A"}`,
      `Start Time: ${safeStartTime || "N/A"}`,
      `Intake / Notes: ${safeMessage || "None"}`,
      `Created At: ${lead.createdAt.toISOString()}`,
    ].join("\n");

    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #141414;">
        <h2 style="margin-top: 0; font-size: 20px; border-bottom: 2px solid #141414; padding-bottom: 8px;">New Cal.com Booking</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px 0; font-weight: 600; width: 140px; color: #666;">Name</td>
            <td style="padding: 8px 0;">${escapeHtml(safeName)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #666;">Email</td>
            <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(safeEmail)}">${escapeHtml(safeEmail)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #666;">Company</td>
            <td style="padding: 8px 0;">${escapeHtml(safeCompany || "N/A")}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #666;">Start Time</td>
            <td style="padding: 8px 0;">${escapeHtml(safeStartTime || "N/A")}</td>
          </tr>
        </table>
        ${
          safeMessage
            ? `<div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-left: 3px solid #141414;">
                <p style="margin: 0 0 6px 0; font-weight: 600; font-size: 13px; text-transform: uppercase; color: #666;">Intake Details</p>
                <p style="margin: 0; white-space: pre-wrap; font-size: 14px; line-height: 1.5;">${escapeHtml(safeMessage)}</p>
              </div>`
            : ""
        }
      </div>
    `;

    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: toEmail,
          reply_to: safeEmail,
          subject,
          text: textBody,
          html: htmlBody,
        }),
      });

      if (!res.ok) {
        console.error(`[saveLead] Resend API error: ${res.status}`);
      } else {
        console.info(`[saveLead] Booking email sent for ${redactLead(safeName, safeEmail)}`);
      }
    } catch (err) {
      console.error("[saveLead] Failed to dispatch Resend email:", err instanceof Error ? err.message : "unknown");
    }
  }
}
