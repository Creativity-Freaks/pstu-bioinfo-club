// Vercel Serverless Function: Generate a signed upload URL for Blog images in Supabase Storage
// Uses the Supabase Service Role key to bypass RLS during uploads.

import { createClient } from "@supabase/supabase-js";

export const config = { runtime: "nodejs" };

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export default async function handler(request: Request): Promise<Response> {
  try {
    if (request.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405);
    }

    const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const SERVICE_ROLE_KEY =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_SERVICE_ROLE ||
      process.env.SERVICE_ROLE ||
      "";

    if (!SUPABASE_URL) {
      return jsonResponse({ error: "Missing SUPABASE_URL (or VITE_SUPABASE_URL) env" }, 500);
    }
    if (!SERVICE_ROLE_KEY) {
      return jsonResponse({ error: "Missing SUPABASE_SERVICE_ROLE_KEY env on server" }, 500);
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    let filename = "image";
    let contentType = "application/octet-stream";
    try {
      const payload = await request.json();
      if (typeof payload?.filename === "string") filename = payload.filename;
      if (typeof payload?.contentType === "string") contentType = payload.contentType;
    } catch {
      // ignore body parse errors
    }

    if (!contentType || !contentType.toLowerCase().startsWith("image/")) {
      return jsonResponse({ error: "Only image uploads are allowed" }, 400);
    }

    const bucket = "blog";

    // Ensure bucket exists (create if missing)
    try {
      const { data: buckets } = await admin.storage.listBuckets();
      const exists = (buckets || []).some((b) => b.name === bucket);
      if (!exists) {
        await admin.storage.createBucket(bucket, { public: true });
      } else {
        try {
          // @ts-expect-error typings may differ across supabase-js versions
          await admin.storage.updateBucket(bucket, { public: true });
        } catch {
          // ignore
        }
      }
    } catch {
      // Continue even if listing/creation fails; upload may still work if bucket exists
    }

    const ext = (filename.split(".").pop() || "bin").toLowerCase();
    const safeExt = ext.replace(/[^a-z0-9]/g, "").slice(0, 10) || "bin";
    const path = `blog/${Date.now()}-${Math.random().toString(36).slice(2)}.${safeExt}`;

    const { data, error } = await admin.storage.from(bucket).createSignedUploadUrl(path, {
      upsert: true,
    });

    if (error || !data) {
      return jsonResponse({ error: error?.message || "Failed to create signed upload URL", details: { bucket, path } }, 500);
    }

    return jsonResponse({ bucket, path, token: data.token });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return jsonResponse({ error: msg }, 500);
  }
}
