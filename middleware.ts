import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';

function siteToken(password: string) {
  return createHash('sha256').update(password + 'site-sm-2026').digest('hex');
}

export function middleware(req: NextRequest) {
  const sitePassword = process.env.SITE_PASSWORD;

  // No password set → public site, no gate
  if (!sitePassword) return NextResponse.next();

  const { pathname } = req.nextUrl;

  // Allow: unlock page, site-auth API, Next.js internals, static assets
  if (
    pathname.startsWith('/unlock') ||
    pathname.startsWith('/api/site-auth') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/fonts') ||
    pathname.startsWith('/images') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get('site_auth');
  const expected = siteToken(sitePassword);

  if (cookie?.value !== expected) {
    const url = req.nextUrl.clone();
    url.pathname = '/unlock';
    url.searchParams.set('from', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
