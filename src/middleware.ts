import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPaths = ['/'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const isProtectedPath = protectedPaths.some((path) => {
    return path === '/'
      ? request.nextUrl.pathname === '/'
      : request.nextUrl.pathname.startsWith(path);
  });
  const isVisitingLoginPage = request.nextUrl.pathname.startsWith('/login');

  if (isProtectedPath && !token)
    return NextResponse.redirect(new URL('/login', request.url));

  if (isVisitingLoginPage && token)
    return NextResponse.redirect(new URL('/', request.url));
}
