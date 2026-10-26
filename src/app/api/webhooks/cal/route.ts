import crypto from "crypto";
import { saveLead } from "@/lib/leads";

export async function POST(request: Request) {
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret) {
    console.error("[Cal Webhook] CAL_WEBHOOK_SECRET is not configured");
    return new Response(JSON.stringify({ ok: false, error: "webhook_not_configured" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const signature = request.headers.get("x-cal-signature-256");
  if (!signature) {
    return new Response(JSON.stringify({ ok: false, error: "missing_signature" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "invalid_body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Calculate HMAC-SHA256 signature
  const expectedSignature = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");

  try {
    const sigBuf = Buffer.from(signature, "hex");
    const expBuf = Buffer.from(expectedSignature, "hex");

    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return new Response(JSON.stringify({ ok: false, error: "invalid_signature" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "invalid_signature_format" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

interface CalWebhookPayload {
  triggerEvent?: string;
  type?: string;
  payload?: {
    name?: string;
    email?: string;
    startTime?: string;
    start_time?: string;
    description?: string;
    attendees?: Array<{ name?: string; email?: string }>;
    responses?: Record<string, { value?: string } | string | undefined>;
  };
}

  let data: CalWebhookPayload | null = null;
  try {
    data = JSON.parse(rawBody) as CalWebhookPayload;
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "invalid_json" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const triggerEvent = data?.triggerEvent || data?.type;

  if (triggerEvent === "BOOKING_CREATED") {
    const payload = data?.payload || {};
    const attendee = payload?.attendees?.[0] || {};
    const name = attendee?.name || payload?.name || "Cal.com Attendee";
    const email = attendee?.email || payload?.email || "";
function extractResponseValue(entry: { value?: string } | string | undefined): string {
  if (!entry) return "";
  if (typeof entry === "string") return entry;
  if (typeof entry === "object" && typeof entry.value === "string") return entry.value;
  return "";
}

    const company =
      extractResponseValue(payload?.responses?.company) ||
      extractResponseValue(payload?.responses?.organization) ||
      "";
    const message =
      extractResponseValue(payload?.responses?.notes) ||
      extractResponseValue(payload?.responses?.["what-do-you-want-to-automate"]) ||
      (typeof payload?.description === "string" ? payload.description : "") ||
      "";
    const startTime = payload?.startTime || payload?.start_time || "";

    await saveLead({
      source: "cal",
      name,
      email,
      company,
      message,
      startTime,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Acknowledge and ignore other triggers per requirements
  return new Response(JSON.stringify({ ok: true, ignored: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
