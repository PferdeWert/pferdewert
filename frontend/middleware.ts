import { NextRequest, NextResponse } from 'next/server'

// Simple Rate Limiting - In-Memory Map
const rateLimit = new Map<string, { count: number, resetTime: number }>()

// Domain configuration for multi-country support
const DOMAIN_CONFIG = {
  'pferdewert.at': { locale: 'de-AT', country: 'AT' },
  'www.pferdewert.at': { locale: 'de-AT', country: 'AT' },
  'pferdewert.de': { locale: 'de', country: 'DE' },
  'www.pferdewert.de': { locale: 'de', country: 'DE' },
} as const;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get('host') || '';

  // 1. LOCALE DETECTION - Domain-based (primary) or path-based (fallback)
  // Priority: 1. Domain (.at vs .de) → 2. Path prefix (/at/)
  const domainConfig = DOMAIN_CONFIG[host as keyof typeof DOMAIN_CONFIG];
  const isAtDomain = host.includes('pferdewert.at');
  const isAtPath = pathname.startsWith('/at/') || pathname === '/at';

  // 2. REDIRECT: /at/* paths on .at domain should redirect to clean URLs
  // e.g., pferdewert.at/at/page → pferdewert.at/page
  if (isAtDomain && isAtPath) {
    const cleanPath = pathname.replace(/^\/at/, '') || '/';
    const url = request.nextUrl.clone();
    url.pathname = cleanPath;
    return NextResponse.redirect(url, 301);
  }

  // 3. REDIRECT: /at/* paths on .de domain should redirect to .at domain
  // e.g., pferdewert.de/at/page → pferdewert.at/page
  if (!isAtDomain && isAtPath) {
    const cleanPath = pathname.replace(/^\/at/, '') || '/';
    const atUrl = new URL(`https://pferdewert.at${cleanPath}`);
    // Preserve query parameters
    request.nextUrl.searchParams.forEach((value, key) => {
      atUrl.searchParams.set(key, value);
    });
    return NextResponse.redirect(atUrl.toString(), 301);
  }

  // Determine locale from domain (or fallback to DE)
  const locale = domainConfig?.locale || 'de';

  // 2. RATE LIMITING (bestehende Logik)
  if (pathname.startsWith('/api/bewertung') ||
      pathname.startsWith('/api/checkout')) {

    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'anonymous'
    const now = Date.now()
    const windowMs = 15 * 60 * 1000 // 15 Minuten

    const current = rateLimit.get(ip)

    if (!current || now > current.resetTime) {
      // Neue Rate-Limit-Periode
      rateLimit.set(ip, { count: 1, resetTime: now + windowMs })
    } else if (current.count >= 5) {
      // Rate Limit erreicht - Max 5 requests pro 15min
      return new NextResponse('Rate limit exceeded - zu viele Anfragen', {
        status: 429,
        headers: {
          'Retry-After': Math.ceil((current.resetTime - now) / 1000).toString()
        }
      })
    } else {
      // Zähler erhöhen
      current.count++
    }

    // Cleanup alte Einträge (alle 100 Requests)
    if (Math.random() < 0.01) {
      for (const [key, value] of rateLimit.entries()) {
        if (now > value.resetTime) {
          rateLimit.delete(key)
        }
      }
    }
  }

  // Response mit locale und country headers für Client-Side Detection
  const response = NextResponse.next();
  const country = domainConfig?.country || 'DE';
  response.headers.set('x-locale', locale);
  response.headers.set('x-country', country);
  // Also set as cookie for client-side access (headers not readable in browser)
  response.cookies.set('x-country', country, { path: '/', sameSite: 'lax' });

  return response;
}

export const config = {
  matcher: [
    // Rate Limiting Matcher (bestehend)
    '/api/(bewertung|checkout)/:path*',
    // Locale Detection Matcher (NEU)
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
  ]
}