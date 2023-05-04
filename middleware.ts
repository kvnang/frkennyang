// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  apiVersion,
  dataset,
  previewSecretId,
  projectId,
  useCdn,
} from "@/lib/sanity.api";
import { resolveHref } from "@/lib/sanity.links";
import { createClient } from "next-sanity";
import { getSecret } from "@/studio/plugins/productionUrl/utils";
import { getLocale } from "./lib/getLocale";

const _client = createClient({ projectId, dataset, apiVersion, useCdn });
const locales = ["en", "id"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/_preview") {
    const searchParams = request.nextUrl.searchParams;
    if (
      process.env.SANITY_REQUIRE_PREVIEW_SECRET === "true" &&
      !searchParams.get("secret")
    ) {
      return NextResponse.rewrite(new URL("/", request.nextUrl.origin), {
        status: 401,
        statusText: "Invalid secret",
      });
    }

    // If a secret is present in the URL, verify it and if valid we upgrade to token based preview mode, which works in Safari and Incognito mode
    const token = process.env.SANITY_API_READ_TOKEN;

    if (searchParams.get("secret")) {
      if (!token) {
        throw new Error(
          "A secret is provided but there is no `SANITY_API_READ_TOKEN` environment variable setup."
        );
      }
      const client = _client.withConfig({ useCdn: false, token });
      const secret = await getSecret(client, previewSecretId);
      if (searchParams.get("secret") !== secret) {
        return NextResponse.rewrite(new URL("/", request.nextUrl.origin), {
          status: 401,
          statusText: "Invalid secret",
        });
      }
    }

    const href = resolveHref(
      searchParams.get("documentType") as string,
      searchParams.get("slug") as string
    );

    if (!href) {
      return NextResponse.rewrite(new URL("/", request.nextUrl.origin), {
        status: 400,
        statusText:
          "Unable to resolve preview URL based on the current document type and slug",
      });
    }

    // Set cookie and redirect to href

    return NextResponse.rewrite(new URL(href, request.nextUrl.origin), {
      status: 307,
      headers: {
        "set-cookie": `token=${encodeURIComponent(
          token as string
        )}; path=/; max-age=60`,
        location: new URL(href, request.nextUrl.origin).toString(),
      },
    });
  }

  if (pathname === "/_exit-preview") {
    return NextResponse.rewrite(new URL("/", request.nextUrl.origin), {
      headers: {
        "set-cookie": `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      },
    });
  }

  // Handle i18n

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
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
