import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';

export async function GET() {
  const db = await openDb();
  const settings = await db.all('SELECT * FROM settings');
  const settingsMap = settings.reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {});
  return NextResponse.json(settingsMap);
}

export async function POST(request) {
  const data = await request.json();
  const db = await openDb();
  
  for (const [key, value] of Object.entries(data)) {
    await db.run(
      'INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value',
      [key, value]
    );
  }
  
  return NextResponse.json({ success: true });
}
