import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';

function siteToken(password: string) {
  return createHash('sha256').update(password + 'site-sm-2026').digest('hex');
}

export async function POST(req: NextRequest) {
  const { password } = (await req.json()) as { password: string };
  const expected = process.env.SITE_PASSWORD;

  if (!expected) {
    // No password configured — grant access freely
    const res = NextResponse.json({ ok: true });
    res.cookies.set('site_auth', 'open', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 90, // 90 days
      path: '/',
    });
    return res;
  }

  if (password !== expected) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  const token = siteToken(expected);
  const res = NextResponse.json({ ok: true });
  res.cookies.set('site_auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 90, // 90 days
    path: '/',
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set('site_auth', '', { maxAge: 0, path: '/' });
  return res;
}
