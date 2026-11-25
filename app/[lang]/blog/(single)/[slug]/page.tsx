import { cache } from "react";
import type { LangType } from "@/types";
import { clientFetch } from "@/lib/sanity.client";
import { getDictionary } from "@/lib/dictionaries";
import { query } from "./query";
import { SinglePost, type FetchPostProps } from "./SinglePost";
import { draftMode } from "next/headers";
import { getMetadata } from "@/lib/metadata";
import { type ResolvingMetadata } from "next";

export const revalidate = false;

const getPost = cache(async (slug: string) => {
  const posts = (await clientFetch(
    query,
    { slug },
    { next: { tags: ["post", `post:${slug}`], revalidate } },
  )) as FetchPostProps[];

  const post = posts?.[0];

  return post;
});

const getPublishedSlugs = cache(async () =>
  clientFetch<string[]>(
    '*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))].slug.current',
    {},
    { next: { tags: ["post"], revalidate } },
  ),
);

export async function generateStaticParams() {
  const slugs = await getPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
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
    const [{ default: PreviewProvider }, { PreviewClient }] = await Promise.all(
      [import("./preview-provider"), import("./preview-client")],
    );
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
