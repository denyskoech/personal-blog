import { NextResponse } from 'next/server';

export async function POST(request) {
  const { password } = await request.json();
  
  // In a real app, use environment variables and hashing.
  if (password === 'admin123') {
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    return response;
  }
  
  return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin_auth');
  return response;
}
