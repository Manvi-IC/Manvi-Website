import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
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

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
