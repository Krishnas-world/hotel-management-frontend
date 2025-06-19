// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPaths = ['/dashboard', '/profile', '/settings'];
const authPaths = ['/login', '/register', '/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get('authToken');

  const isAuthenticated = !!authCookie;

  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  const isAuthPath = authPaths.some(path => pathname === path);

  if (isAuthenticated && isAuthPath) {
    console.log('Authenticated user attempting to access auth page, redirecting to dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (!isAuthenticated && isProtectedPath) {
    console.log('Unauthenticated user attempting to access protected page, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/signup',
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
  ],
};