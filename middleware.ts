// middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Allow the request if the following is true
  // 1. It's a request for next-auth session & provider fetching
  // 2. the token exists
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  // Allow components through middleware
  if (pathname.startsWith('/_next/static')) {
    return NextResponse.next();
  }

  // Redirect to login if no token and requesting a protected route
  if (!token && pathname !== '/login') {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
}