"use client";

import { PreviewSuspense } from "next-sanity/preview";
import { PreviewClient } from "./PreviewClient";
import { type LangType } from "@/types";
import { type getDictionary } from "@/lib/dictionaries";

export function Preview({
  token,
  params,
  dictionary,
}: {
  token: string;
  params: { lang: LangType; slug: string };
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  return (
    <PreviewSuspense fallback="Loading...">
      <PreviewClient token={token} params={params} dictionary={dictionary} />
    </PreviewSuspense>
  );
}
