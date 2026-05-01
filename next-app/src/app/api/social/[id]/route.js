import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';

export async function DELETE(request, { params }) {
  const { id } = await params;
  const db = await openDb();
  await db.run('DELETE FROM social_links WHERE id = ?', [id]);
  return NextResponse.json({ success: true });
}
