import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // Eğer ana dizindeyse, config'deki default dile yönlendir
  if (req.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/tr', req.url));
  }

  return NextResponse.next();
}

// Middleware'in hangi path'lerde çalışacağını belirtiyoruz
export const config = {
  matcher: '/'
}; 