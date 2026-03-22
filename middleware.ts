import { NextRequest, NextResponse } from 'next/server';

// Web Crypto API — safe for Vercel Edge Runtime (no Node.js 'crypto' import)
async function siteToken(password: string): Promise<string> {
  const data = new TextEncoder().encode(password + 'site-sm-2026');
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function middleware(req: NextRequest) {
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
  const expected = await siteToken(sitePassword);

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
