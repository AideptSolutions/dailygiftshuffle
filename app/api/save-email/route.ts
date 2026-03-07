import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'emails.json');

// RFC 5322-simplified email regex
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

// Simple in-memory rate limiter: max 5 requests per IP per 60 s
const rateMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  if (entry.count >= 5) return true;
  entry.count++;
  return false;
}

interface EmailEntry {
  email: string;
  productId: string;
  timestamp: string;
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { email, productId, timestamp } = body as EmailEntry;

    if (!email || !productId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Sanitize & validate email
    const sanitizedEmail = String(email).trim().slice(0, 254).toLowerCase();
    if (!EMAIL_RE.test(sanitizedEmail)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Sanitize productId — alphanumeric + dashes/underscores only
    const sanitizedProductId = String(productId).replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 100);
    if (!sanitizedProductId) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    // Read existing data or start fresh
    let entries: EmailEntry[] = [];
    try {
      const raw = await fs.readFile(DATA_FILE, 'utf-8');
      entries = JSON.parse(raw);
    } catch {
      // File doesn't exist yet — start fresh
    }

    entries.push({
      email: sanitizedEmail,
      productId: sanitizedProductId,
      timestamp: timestamp ? new Date(timestamp).toISOString() : new Date().toISOString(),
    });

    await fs.writeFile(DATA_FILE, JSON.stringify(entries, null, 2), 'utf-8');

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('save-email error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
