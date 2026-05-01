import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';

export async function GET(request, { params }) {
  const { id } = await params;
  const db = await openDb();
  const post = await db.get('SELECT * FROM posts WHERE id = ?', [id]);
  return NextResponse.json(post);
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const data = await request.json();
  const db = await openDb();
  await db.run(
    'UPDATE posts SET title = ?, content = ?, tag = ?, imageUrl = ? WHERE id = ?',
    [data.title, data.content, data.tag, data.imageUrl, id]
  );
  return NextResponse.json({ success: true });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const db = await openDb();
  await db.run('DELETE FROM posts WHERE id = ?', [id]);
  return NextResponse.json({ success: true });
}
