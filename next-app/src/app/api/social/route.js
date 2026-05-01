import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';

export async function GET() {
  const db = await openDb();
  const socialLinks = await db.all('SELECT * FROM social_links');
  return NextResponse.json(socialLinks);
}

export async function POST(request) {
  const data = await request.json();
  const db = await openDb();
  const result = await db.run(
    'INSERT INTO social_links (platform, url, icon) VALUES (?, ?, ?)',
    [data.platform, data.url, data.icon]
  );
  return NextResponse.json({ id: result.lastID, ...data });
}
