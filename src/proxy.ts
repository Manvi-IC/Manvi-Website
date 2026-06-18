import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // 1. Admin Auth Logic
  const isAdmin = request.cookies.get('admin_auth')?.value === 'true';
  const isLoginPage = request.nextUrl.pathname.startsWith('/admin/login');

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!isAdmin && !isLoginPage) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    if (isAdmin && isLoginPage) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // 2. API Header Injection Logic
  if (request.nextUrl.pathname.startsWith('/api')) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-database', process.env.NEXT_PUBLIC_X_DATABASE || 'manvi');
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
