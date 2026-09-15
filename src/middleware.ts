import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
// import arcjet from '@/libs/Arcjet';
import { routing } from './libs/I18nRouting';

const handleI18nRouting = createMiddleware(routing);

export default async function middleware(
  request: NextRequest,
) {
  // Skip middleware for Stripe webhook — Stripe handles its own auth via signature
  if (request.nextUrl.pathname.startsWith('/api/stripe-hooks')) {
    return NextResponse.next();
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/', '/(fa|ps|en)/:path*', '/dashboard/:path*'],
};
