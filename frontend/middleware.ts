import { NextRequest, NextResponse } from 'next/server'

// Simple Rate Limiting - In-Memory Map
const rateLimit = new Map<string, { count: number, resetTime: number }>()

export function middleware(request: NextRequest) {
  // Skip middleware rate limiting for bewertung endpoint
  // Let the API handler manage its own sophisticated rate limiting (120/200 per minute)
  if (request.nextUrl.pathname.startsWith('/api/bewertung')) {
    return NextResponse.next()
  }
  
  // Apply strict rate limiting only to checkout endpoint (payment protection)
  if (request.nextUrl.pathname.startsWith('/api/checkout')) {
    
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'anonymous'
    const now = Date.now()
    const windowMs = 15 * 60 * 1000 // 15 Minuten
    
    const current = rateLimit.get(ip)
    
    if (!current || now > current.resetTime) {
      // Neue Rate-Limit-Periode
      rateLimit.set(ip, { count: 1, resetTime: now + windowMs })
    } else if (current.count >= 5) { 
      // Rate Limit erreicht - Max 5 requests pro 15min (appropriate for payments)
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
  
  return NextResponse.next()
}

export const config = {
  matcher: '/api/checkout/:path*'
}