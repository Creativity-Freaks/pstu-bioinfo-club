import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

async function main() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error('Missing SUPABASE_URL/VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }
  const admin = createClient(url, key);
  console.log('Listing buckets...');
  const { data, error } = await admin.storage.listBuckets();
  if (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
  console.log('Buckets:', (data || []).map((b) => b.name));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
