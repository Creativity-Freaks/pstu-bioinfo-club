// Vercel Serverless Function: Generate a signed view URL for a Storage object
// Uses Supabase Service Role to bypass RLS for private buckets.

import { createClient } from '@supabase/supabase-js';

export const config = { runtime: 'nodejs' };

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

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

    let path = '';
    let expiresIn = 3600; // seconds (1 hour)
    let bucket = 'gallery';
    try {
      const payload = await request.json();
      if (typeof payload?.path === 'string') path = payload.path;
      if (typeof payload?.expiresIn === 'number') expiresIn = Math.max(60, Math.min(payload.expiresIn, 86400));
      if (typeof payload?.bucket === 'string') bucket = payload.bucket;
    } catch {}

    if (!path) return json({ error: 'Missing path' }, 400);

    const { data, error } = await admin.storage.from(bucket).createSignedUrl(path, expiresIn);
    if (error || !data) return json({ error: error?.message || 'Failed to create signed view URL', details: { bucket, path } }, 500);

    return json({ signedUrl: data.signedUrl, path, bucket, expiresIn });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return json({ error: msg }, 500);
  }
}
