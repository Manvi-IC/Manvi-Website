import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // 1. Admin Auth Logic
  const isAdmin = request.cookies.get('admin_auth')?.value === 'true';
  const role = request.cookies.get('admin_role')?.value;
  const pathname = request.nextUrl.pathname;
  const isLoginPage = pathname.startsWith('/admin/login');

  if (pathname.startsWith('/admin')) {
    if (!isAdmin && !isLoginPage) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    if (isAdmin && isLoginPage) {
      const destination = role === 'salesperson' ? '/admin/proposal' : '/admin';
      return NextResponse.redirect(new URL(destination, request.url));
    }

    // Role-based restrictions: salesperson can only access /admin/proposal
    if (isAdmin && role === 'salesperson' && !pathname.startsWith('/admin/proposal')) {
      return NextResponse.redirect(new URL('/admin/proposal', request.url));
    }
  }

  if (pathname === '/proposal') {
    return NextResponse.redirect(new URL('/admin/proposal', request.url));
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
  matcher: ['/admin/:path*', '/api/:path*', '/proposal'],
};
