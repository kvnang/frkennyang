import * as React from "react";
import type { LangType } from "@/types";
import client from "@/lib/sanity.client";
import { getDictionary } from "@/lib/dictionaries";
import { query } from "./query";
import { SinglePost, type FetchPostProps } from "./SinglePost";
import { draftMode } from "next/headers";
import { Preview } from "./Preview";

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

  const posts = (await client.fetch(query, {
    slug: params.slug,
  })) as FetchPostProps[];

  const post = posts[0];

  if (!post) return null;

  return <SinglePost post={post} params={params} dictionary={dictionary} />;
}

// export function Head({
//   location: { pathname },
//   data: { post },
//   pageContext: { lang: pageLang },
// }: HeadProps<DataProps, PageContextProps>) {
//   return (
//     <SEO
//       title={post.frontmatter.title}
//       description={
//         post.frontmatter.excerpt ? post.frontmatter.excerpt : post.excerpt || ''
//       }
//       image={post.frontmatter.featuredImage?.publicURL}
//       pathname={pathname}
//     />
//   );
// }
