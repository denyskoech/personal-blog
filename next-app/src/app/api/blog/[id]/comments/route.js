import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';

export async function GET(request, { params }) {
  const { id } = await params;
  const db = await openDb();
  const comments = await db.all('SELECT * FROM comments WHERE post_id = ? ORDER BY id ASC', [id]);
  return NextResponse.json(comments);
}

export async function POST(request, { params }) {
  const { id } = await params;
  const data = await request.json();
  const db = await openDb();
  const date = new Date().toLocaleString();
  
  const result = await db.run(
    'INSERT INTO comments (post_id, name, content, date) VALUES (?, ?, ?, ?)',
    [id, data.name || 'Anonymous', data.content, date]
  );
  
  return NextResponse.json({ id: result.lastID, post_id: id, name: data.name || 'Anonymous', content: data.content, date });
}
