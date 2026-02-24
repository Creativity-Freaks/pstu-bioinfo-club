// Vercel Serverless Function: Generate signed view URLs for multiple Storage objects
// Uses Supabase Service Role to bypass RLS for private buckets.

import { createClient } from "@supabase/supabase-js";

export const config = { runtime: "nodejs" };

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export default async function handler(request: Request): Promise<Response> {
  try {
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

    const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const SERVICE_ROLE_KEY =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE || process.env.SERVICE_ROLE || "";

    if (!SUPABASE_URL) return json({ error: "Missing SUPABASE_URL" }, 500);
    if (!SERVICE_ROLE_KEY) return json({ error: "Missing SUPABASE_SERVICE_ROLE_KEY" }, 500);

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    let bucket = "gallery";
    let paths: string[] = [];
    let expiresIn = 3600;
    try {
      const payload = await request.json();
      if (typeof payload?.bucket === "string") bucket = payload.bucket;
      if (Array.isArray(payload?.paths)) {
        paths = payload.paths.filter((p: unknown) => typeof p === "string" && p.trim()).map((p: string) => p.trim());
      }
      if (typeof payload?.expiresIn === "number") expiresIn = Math.max(60, Math.min(payload.expiresIn, 86400));
    } catch {
      // ignore
    }

    if (!paths.length) return json({ error: "Missing paths" }, 400);

    // Deduplicate
    const unique = Array.from(new Set(paths));

    // Try native bulk API when available
    try {
      // @ts-expect-error supabase-js typings may not include createSignedUrls in some versions
      const { data, error } = await admin.storage.from(bucket).createSignedUrls(unique, expiresIn);
      if (error) throw error;
      const map: Record<string, string> = {};
      for (const item of data || []) {
        if (item?.path && item?.signedUrl) map[String(item.path)] = String(item.signedUrl);
      }
      return json({ ok: true, bucket, expiresIn, signedUrls: map });
    } catch {
      // Fallback: generate one-by-one
      const results = await Promise.all(
        unique.map(async (path) => {
          const { data, error } = await admin.storage.from(bucket).createSignedUrl(path, expiresIn);
          if (error || !data) return { path, signedUrl: "" };
          return { path, signedUrl: data.signedUrl };
        })
      );
      const map: Record<string, string> = {};
      for (const r of results) {
        if (r.path && r.signedUrl) map[r.path] = r.signedUrl;
      }
      return json({ ok: true, bucket, expiresIn, signedUrls: map });
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return json({ error: msg }, 500);
  }
}
