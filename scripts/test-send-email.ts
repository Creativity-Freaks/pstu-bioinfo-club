import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load env from .env and .env.local if present
const cwd = process.cwd();
const envPaths = [path.join(cwd, '.env'), path.join(cwd, '.env.local')];
for (const p of envPaths) {
  if (fs.existsSync(p)) {
    dotenv.config({ path: p });
  }
}

// Import the handler from the serverless function
import handler from '../api/send-email';

// Build a test membership payload
const payload = {
  type: 'membership' as const,
  name: 'Demo User',
  email: process.env.ADMIN_EMAIL || process.env.VITE_ADMIN_EMAIL || 'bioinformaticsclubpstu@gmail.com',
  subject: 'Demo membership application (ts-node test)',
  studentId: '2025-0001',
  department: 'Computer Science',
  year: '3rd',
  phone: '+8801000000000',
  bio: 'I love bioinformatics and data science.',
  skills: 'Python, R, Linux, BLAST',
};

// Minimal NodeRes implementation capturing output
function makeRes() {
  return {
    status(code: number) {
      return {
        json(obj: Record<string, unknown>) {
          console.log('Response:', { code, ...obj });
        },
      };
    },
  };
}

async function main() {
  console.log('Sending demo membership email using handler...');
  const req = { method: 'POST', body: payload };
  const res = makeRes();
  await handler(req as any, res as any);
}

main().catch((err) => {
  console.error('Test script failed:', err);
  process.exit(1);
});
