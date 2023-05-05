"use client";

import { usePreview } from "@/lib/sanity.preview";
import { SinglePost } from "./SinglePost";
import { query } from "./query";
import { LangType } from "@/types";
import { getDictionary } from "@/lib/dictionaries";

export function PreviewClient({
  token,
  params,
  dictionary,
}: {
  token: string;
  params: { lang: LangType; slug: string };
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const data = usePreview(token, query, { slug: params.slug });
  return <SinglePost post={data[0]} params={params} dictionary={dictionary} />;
}
