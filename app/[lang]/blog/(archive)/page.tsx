import * as React from "react";
import { clientFetch } from "@/lib/sanity.client";
import { PostEntry } from "@/components/PostEntry";
import { BlogList } from "./BlogList";
import { query, queryWithSearch } from "./query";
import { getMetadata } from "@/lib/metadata";
import { type LangType } from "@/types";
import { type ResolvingMetadata } from "next";

export async function generateMetadata(
  {
    params,
  }: {
    params: { lang: LangType; category?: string };
  },
  parent: ResolvingMetadata
) {
  const category = params.category
    ? await clientFetch(
        `*[_type == "category" && slug.current == $slug] {
      title
    }[0]`,
        {
          slug: params.category,
        }
      )
    : null;

  return getMetadata(
    {
      title: category ? `${category.title} | Blog` : "Blog",
      pathname: `/${params.lang}/blog`,
      description: `Browse Fr. Kenny's latest works, available in both English and Bahasa Indonesia.`,
    },
    await parent
  );
}

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: { lang: LangType; category?: string };
  searchParams: { q?: string };
}) {
  const category = params.category || "";
  const q = searchParams.q || "";

  const posts = q
    ? await clientFetch(queryWithSearch, {
        searchQuery: q,
        category,
        lastScore: null,
        lastId: null,
        perPage: 10,
      })
    : await clientFetch(query, {
        category,
        lastPublishedAt: null,
        lastId: null,
        perPage: 10,
      });

  if (!posts) return null;

  const featuredPost = posts.slice(0, 1)[0];
  const recentPosts = posts.slice(1, 10);

  return (
    <>
      <div className="pb-10 mb-10 border-b border-medium-gray last:border-none last:mb-0 last:pb-0">
        <PostEntry
          post={featuredPost}
          showImage
          format="featured"
          showExcerpt
          lang={params.lang}
        />
      </div>
      {recentPosts.length > 0 && (
        <div>
          <BlogList
            params={params}
            searchParams={searchParams}
            initialData={recentPosts}
            lang={params.lang}
          />
        </div>
      )}
    </>
  );
}
