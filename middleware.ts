import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getLocale } from "./lib/getLocale";

const locales = ["en", "id"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Handle i18n

  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url),
    );
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!api|_next/|favicon.ico|favicon-|assets|images/|studio).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
