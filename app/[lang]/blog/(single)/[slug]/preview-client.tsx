"use client";

import { SinglePost } from "./SinglePost";
import { query } from "./query";
import { LangType } from "@/types";
import { getDictionary } from "@/lib/dictionaries";
import { useLiveQuery } from "next-sanity/preview";

export function PreviewClient({
  initialData,
  params,
  dictionary,
}: {
  initialData: any;
  params: { lang: LangType; slug: string };
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const [data, loading] = useLiveQuery(initialData, query);

  if (loading) {
    return <>Loading...</>;
  }

  return <SinglePost post={data[0]} params={params} dictionary={dictionary} />;
}
