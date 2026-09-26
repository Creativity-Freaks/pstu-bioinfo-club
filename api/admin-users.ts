import { createClient } from "@supabase/supabase-js";

export const config = { runtime: "nodejs" };

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

function getAdmin() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  if (!url) throw new Error("SUPABASE_URL is not configured on the server");
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRET_KEY is not configured on the server");
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

export default async function handler(request: Request): Promise<Response> {
  try {
    const admin = getAdmin();
    const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
    if (!token) return json({ error: "Authentication required" }, 401);
    const { data: actor, error: actorError } = await admin.auth.getUser(token);
    const configuredAdminEmail = String(process.env.ADMIN_EMAIL || process.env.VITE_ADMIN_EMAIL || "").trim().toLowerCase();
    const actorEmail = String(actor.user?.email || "").trim().toLowerCase();
    const isAdmin = actor.user?.app_metadata?.role === "admin" || (configuredAdminEmail && actorEmail === configuredAdminEmail);
    if (actorError || !isAdmin) return json({ error: "Admin access required" }, 403);
    if (request.method === "GET") {
      const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
      if (error) return json({ error: error.message }, 500);
      return json({ users: data.users.map((user) => ({ id: user.id, email: user.email, created_at: user.created_at, last_sign_in_at: user.last_sign_in_at, role: user.app_metadata?.role || "moderator", user_metadata: user.user_metadata || {} })) });
    }
    if (request.method !== "POST" && request.method !== "PATCH" && request.method !== "DELETE") return json({ error: "Method not allowed" }, 405);
    const body = await request.json();
    if (request.method === "POST") {
      const email = String(body.email || "").trim().toLowerCase();
      const password = String(body.password || "");
      const role = body.role === "admin" ? "admin" : "moderator";
      if (!email || password.length < 8) return json({ error: "A valid email and password of at least 8 characters are required." }, 400);
      const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true, app_metadata: { role }, user_metadata: { display_name: String(body.display_name || email.split("@")[0]) } });
      if (error) return json({ error: error.message }, 400);
      return json({ user: data.user });
    }
    const id = String(body.id || "");
    if (!id) return json({ error: "Missing user id" }, 400);
    if (request.method === "DELETE") {
      if (id === actor.user?.id) return json({ error: "You cannot delete your own account." }, 400);
      const { error } = await admin.auth.admin.deleteUser(id);
      if (error) return json({ error: error.message }, 400);
      return json({ ok: true });
    }
    const updates: Record<string, unknown> = {};
    if (body.email) updates.email = String(body.email).trim().toLowerCase();
    if (body.password) updates.password = String(body.password);
    if (body.role) updates.app_metadata = { role: body.role === "admin" ? "admin" : "moderator" };
    if (body.display_name !== undefined) updates.user_metadata = { display_name: String(body.display_name).trim() };
    const { data, error } = await admin.auth.admin.updateUserById(id, updates);
    if (error) return json({ error: error.message }, 400);
    return json({ user: data.user });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Unexpected server error" }, 500);
  }
}
