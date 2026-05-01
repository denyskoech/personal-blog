import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';

export async function GET() {
  const db = await openDb();
  const messages = await db.all('SELECT * FROM messages ORDER BY id DESC');
  return NextResponse.json(messages);
}

export async function POST(request) {
  const data = await request.json();
  const db = await openDb();
  const date = new Date().toISOString();
  const result = await db.run(
    'INSERT INTO messages (name, email, message, date) VALUES (?, ?, ?, ?)',
    [data.name, data.email, data.message, date]
  );
  return NextResponse.json({ id: result.lastID, success: true });
}
