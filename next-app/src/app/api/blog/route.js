import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  const db = await openDb();
  let posts;
  if (q) {
    posts = await db.all('SELECT * FROM posts WHERE title LIKE ? OR content LIKE ? ORDER BY id DESC', [`%${q}%`, `%${q}%`]);
  } else {
    posts = await db.all('SELECT * FROM posts ORDER BY id DESC');
  }

  return NextResponse.json(posts);
}

export async function POST(request) {
  const data = await request.json();
  const db = await openDb();
  const result = await db.run(
    'INSERT INTO posts (title, content, tag, date, imageUrl) VALUES (?, ?, ?, ?, ?)',
    [data.title, data.content, data.tag, data.date, data.imageUrl || '']
  );

  return NextResponse.json({ id: result.lastID, ...data });
}
