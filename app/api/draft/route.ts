import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
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

const _client = createClient({ projectId, dataset, apiVersion, useCdn });

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (process.env.SANITY_REQUIRE_PREVIEW_SECRET === "true" && !secret) {
    // Return a 401
    return new Response("Invalid secret", { status: 401 });
  }

  // If a secret is present in the URL, verify it and if valid we upgrade to token based preview mode, which works in Safari and Incognito mode
  const token = process.env.SANITY_API_READ_TOKEN;

  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (!token) {
    return new Response(
      "A secret is provided but there is no `SANITY_API_READ_TOKEN` environment variable setup.",
      { status: 401 }
    );
  }

  const client = _client.withConfig({ useCdn: false, token });
  const sanitySecret = await getSecret(client, previewSecretId);
  if (secret !== sanitySecret) {
    return new Response("Invalid secret", { status: 401 });
  }

  const href = resolveHref(
    searchParams.get("documentType") as string,
    searchParams.get("slug") as string
  );

  if (!href) {
    return new Response(
      "Unable to resolve preview URL based on the current document type and slug",
      { status: 400 }
    );
  }

  // Enable Draft Mode by setting the cookie
  draftMode().enable();

  // Redirect to the path from the fetched post
  // We don't redirect to searchParams.slug as that might lead to open redirect vulnerabilities
  // redirect(href);
  return new Response("", {
    headers: {
      Location: href,
    },
    status: 307,
  });
}
