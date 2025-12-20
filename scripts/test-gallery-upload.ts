/*
 End-to-end test: request signed upload URL from API, upload a small blob
 to Supabase Storage via uploadToSignedUrl, and print the resulting path
 and a preview URL if available.

 Run:
   npx tsx scripts/test-gallery-upload.ts

 Optionally set TEST_API_BASE to test local dev or another domain:
   TEST_API_BASE=http://localhost:3000 npx tsx scripts/test-gallery-upload.ts
*/
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

async function main() {
  const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in env.');
    process.exit(1);
  }
  const apiBase = process.env.TEST_API_BASE || 'https://pstu-bioinfo-club.vercel.app';
  const bucket = 'gallery';

  // Create client for signed upload (anon is fine)
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // 1) Request signed upload URL from server API
  const filename = `test-${Date.now()}.txt`;
  const contentType = 'text/plain';
  const res = await fetch(`${apiBase}/api/gallery-upload-url`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ filename, contentType }),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error('Failed to get signed upload URL:', text);
    process.exit(1);
  }
  const { path, token } = await res.json() as { path: string; token: string };
  console.log('Signed upload URL created:', { path });

  // 2) Upload content via signed URL
  const blob = new Blob([`Hello from test at ${new Date().toISOString()}\n`], { type: contentType });
  const { error: upErr } = await supabase.storage.from(bucket).uploadToSignedUrl(path, token, blob);
  if (upErr) {
    console.error('Upload failed:', upErr.message);
    process.exit(1);
  }
  console.log('Upload succeeded:', path);

  // 3) Try public URL; if not public, fetch a signed view URL
  const { data: pub } = await supabase.storage.from(bucket).getPublicUrl(path);
  const publicUrl = pub?.publicUrl || '';
  if (publicUrl) {
    console.log('Public URL:', publicUrl);
  } else {
    const viewRes = await fetch(`${apiBase}/api/gallery-signed-view`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ path, bucket, expiresIn: 3600 }),
    });
    if (!viewRes.ok) {
      const t = await viewRes.text();
      console.warn('Signed view URL request failed:', t);
    } else {
      const { signedUrl } = await viewRes.json() as { signedUrl: string };
      console.log('Signed view URL:', signedUrl);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
