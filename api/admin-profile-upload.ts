import { createClient } from "@supabase/supabase-js";

export const config = { runtime: "nodejs" };
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

export default async function handler(request: Request): Promise<Response> {
  try {
    if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
    const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
    if (!url || !key) return json({ error: "Supabase server credentials are not configured" }, 500);
    const admin = createClient(url, key);
    const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
    if (!token) return json({ error: "Authentication required" }, 401);
    const { data: actor, error: actorError } = await admin.auth.getUser(token);
    if (actorError || !actor.user) return json({ error: "Authentication required" }, 401);
    const body = await request.json();
    const userId = String(body.userId || "");
    const contentType = String(body.contentType || "image/jpeg");
    if (!userId) return json({ error: "Missing user id" }, 400);
    const bucket = "admin-profiles";
    const { error: bucketError } = await admin.storage.createBucket(bucket, { public: true, fileSizeLimit: "5MB", allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"] });
    if (bucketError && !bucketError.message.toLowerCase().includes("already exists")) return json({ error: bucketError.message }, 500);
    const extension = contentType.split("/")[1]?.replace(/[^a-z0-9]/gi, "") || "jpg";
    const path = `${userId}/avatar-${Date.now()}.${extension}`;
    const { data: signed, error } = await admin.storage.from(bucket).createSignedUploadUrl(path);
    if (error) return json({ error: error.message }, 500);
    return json({ bucket, path, token: signed.token, publicUrl: `${url}/storage/v1/object/public/${bucket}/${path}` });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Unexpected server error" }, 500);
  }
}
