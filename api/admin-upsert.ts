import { createClient } from '@supabase/supabase-js';

export const config = { runtime: 'nodejs' };

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

const ALLOWED_TABLES = new Set([
  'courses',
  'events',
  'team_members',
  'gallery_items',
  'blog_posts',
  'memberships',
  'contact_messages',
]);

export default async function handler(request: Request): Promise<Response> {
  try {
    if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

    const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
      || process.env.SUPABASE_SERVICE_ROLE
      || process.env.SERVICE_ROLE
      || '';
    if (!SUPABASE_URL) return json({ error: 'Missing SUPABASE_URL' }, 500);
    if (!SERVICE_ROLE_KEY) return json({ error: 'Missing SUPABASE_SERVICE_ROLE_KEY' }, 500);

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    let table = '';
    let payload: Record<string, unknown> = {};
    try {
      const body = await request.json();
      table = String(body?.table || '').trim();
      payload = (body?.payload && typeof body.payload === 'object') ? body.payload : {};
    } catch {}

    if (!table || !ALLOWED_TABLES.has(table)) return json({ error: 'Invalid table' }, 400);

    const { data, error } = await admin.from(table).upsert(payload).select();
    if (error) return json({ error: error.message }, 500);
    return json({ ok: true, data });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return json({ error: msg }, 500);
  }
}
