import * as React from "react";
import type { LangType } from "@/types";
import { clientFetch } from "@/lib/sanity.client";
import { getDictionary } from "@/lib/dictionaries";
import { query } from "./query";
import { SinglePost, type FetchPostProps } from "./SinglePost";
import { draftMode } from "next/headers";
import { getMetadata } from "@/lib/metadata";
import { type ResolvingMetadata } from "next";
import PreviewProvider from "./preview-provider";
import { PreviewClient } from "./preview-client";

async function getPost(slug: string) {
  const posts = (await clientFetch(
    query,
    { slug },
    { next: { tags: ["post", `post:${slug}`], revalidate: 300 } },
  )) as FetchPostProps[];

  const post = posts?.[0];

  return post;
}

export async function generateMetadata(
  props: {
    params: Promise<{ lang: LangType; slug: string }>;
  },
  parent: ResolvingMetadata,
) {
  const params = await props.params;
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
    await parent,
  );
}

export default async function SinglePostPage(props: {
  params: Promise<{ lang: LangType; slug: string }>;
}) {
  const params = await props.params;
  const preview = (await draftMode()).isEnabled
    ? { token: process.env.SANITY_API_READ_TOKEN }
    : undefined;
  const post = await getPost(params.slug);

  if (!post) return null;

  const dictionary = await getDictionary(params.lang as LangType);

  if (preview?.token) {
    return (
      <PreviewProvider token={preview.token}>
        <PreviewClient
          initialData={post}
          params={params}
          dictionary={dictionary}
        />
      </PreviewProvider>
    );
  }

  return <SinglePost post={post} params={params} dictionary={dictionary} />;
}
