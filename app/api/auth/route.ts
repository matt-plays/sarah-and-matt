import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';

function makeToken(password: string) {
  return createHash('sha256').update(password + 'cms-sm-2026').digest('hex');
}

export async function POST(req: NextRequest) {
  const { password } = (await req.json()) as { password: string };
  const expected = process.env.CMS_PASSWORD;

  if (!expected) {
    return NextResponse.json({ error: 'CMS not configured' }, { status: 500 });
  }

  if (password !== expected) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const token = makeToken(expected);
  const res = NextResponse.json({ ok: true });
  res.cookies.set('cms_auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set('cms_auth', '', { maxAge: 0, path: '/' });
  return res;
}
