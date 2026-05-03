import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';

export async function GET() {
  const db = await openDb();
  // Fetch comments and join with posts to get post title
  const comments = await db.all(`
    SELECT c.*, p.title as post_title 
    FROM comments c
    JOIN posts p ON c.post_id = p.id
    ORDER BY c.id DESC
  `);
  return NextResponse.json(comments);
}
