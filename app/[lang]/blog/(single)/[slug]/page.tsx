import * as React from "react";
import type { LangType } from "@/types";
import { clientFetch } from "@/lib/sanity.client";
import { getDictionary } from "@/lib/dictionaries";
import { query } from "./query";
import { SinglePost, type FetchPostProps } from "./SinglePost";
import { draftMode } from "next/headers";
import { Preview } from "./Preview";
import { getMetadata } from "@/lib/metadata";
import { type ResolvingMetadata } from "next";

async function getPost(slug: string) {
  const posts = (await clientFetch(query, {
    slug,
  })) as FetchPostProps[];

  const post = posts?.[0];

  return post;
}

export async function generateMetadata(
  {
    params,
  }: {
    params: { lang: LangType; slug: string };
  },
  parent: ResolvingMetadata
) {
  const post = await getPost(params.slug);

  if (!post) return getMetadata({}, await parent);

  const title =
    params.lang === "id" && post.title.id ? post.title.id : post.title.en;
  const excerpt =
    params.lang === "id" && post.excerpt.id ? post.excerpt.id : post.excerpt.en;

  return getMetadata(
    {
      pathname: `/${params.lang}/blog/${params.slug}`,
      title,
      description: excerpt,
      image: post.mainImage?.url
        ? {
            url: post.mainImage.url,
            alt: title,
          }
        : undefined,
    },
    await parent
  );
}

export default async function SinglePostPage({
  params,
}: {
  params: { lang: LangType; slug: string };
}) {
  const isDraft = draftMode().isEnabled;
  const token = process.env.SANITY_API_READ_TOKEN;

  const dictionary = await getDictionary(params.lang as LangType);

  if (isDraft && token) {
    return (
      <>
        <Preview token={token} params={params} dictionary={dictionary} />
      </>
    );
  }

  const post = await getPost(params.slug);

  if (!post) return null;

  return <SinglePost post={post} params={params} dictionary={dictionary} />;
}
