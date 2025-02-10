import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const rateLimit = 10; // requests per minute
const rateLimitWindow = 60 * 1000; // 1 minute in milliseconds

const ipRequests = new Map<string, { count: number; resetTime: number }>();

export function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();

  // Clean up expired entries
  for (const [storedIp, data] of ipRequests.entries()) {
    if (now > data.resetTime) {
      ipRequests.delete(storedIp);
    }
  }

  // Get or create rate limit data for this IP
  const rateData = ipRequests.get(ip) || {
    count: 0,
    resetTime: now + rateLimitWindow,
  };

  // If the window has expired, reset the counter
  if (now > rateData.resetTime) {
    rateData.count = 0;
    rateData.resetTime = now + rateLimitWindow;
  }

  // Increment the counter
  rateData.count++;
  ipRequests.set(ip, rateData);

  // Check if rate limit is exceeded
  if (rateData.count > rateLimit) {
    return new NextResponse(JSON.stringify({
      error: 'Rate limit exceeded',
      message: 'Too many requests, please try again later.',
    }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'X-RateLimit-Limit': rateLimit.toString(),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': Math.ceil(rateData.resetTime / 1000).toString(),
      },
    });
  }

  // Add rate limit headers to successful responses
  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', rateLimit.toString());
  response.headers.set('X-RateLimit-Remaining', (rateLimit - rateData.count).toString());
  response.headers.set('X-RateLimit-Reset', Math.ceil(rateData.resetTime / 1000).toString());

  return response;
}

export const config = {
  matcher: '/api/:path*',
}; 