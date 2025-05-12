// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define paths that require authentication
const protectedPaths = ['/dashboard', '/profile', '/settings'];
// Define authentication-related paths
const authPaths = ['/login', '/register', '/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get('authToken');
  
  // Check if user is authenticated
  const isAuthenticated = !!authCookie;
  
  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  
  // Check if the path is auth-related
  const isAuthPath = authPaths.some(path => pathname === path);
  
  // Case 1: User is authenticated but tries to access auth pages
  if (isAuthenticated && isAuthPath) {
    console.log('Authenticated user attempting to access auth page, redirecting to dashboard');
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // Case 2: User is not authenticated but tries to access protected routes
  if (!isAuthenticated && isProtectedPath) {
    console.log('Unauthenticated user attempting to access protected page, redirecting to login');
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Allow the request to continue
  return NextResponse.next();
}

// Configure matcher - specify which paths to run middleware on
export const config = {
  matcher: [
    // Run middleware on authentication paths
    '/login',
    '/register',
    '/signup',
    // Run middleware on protected paths (with wildcard for nested routes)
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
  ],
};