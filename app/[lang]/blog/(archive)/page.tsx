import * as React from "react";
import client from "@/lib/sanity.client";
import { PostEntry } from "@/components/PostEntry";
import { BlogList } from "./BlogList";
import { query, queryWithSearch } from "./query";

export default async function BlogPage({
  params,
  searchParams,
}: {
  params: { category?: string };
  searchParams: { q?: string };
}) {
  const category = params.category || "";
  const q = searchParams.q || "";

  const posts = q
    ? await client.fetch(queryWithSearch, {
        searchQuery: q,
        category,
        lastScore: null,
        lastId: null,
        perPage: 10,
      })
    : await client.fetch(query, {
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
      <div className="pb-10 mb-10 border-b border-gray">
        <PostEntry
          post={featuredPost}
          showImage
          format="featured"
          showExcerpt
        />
      </div>
      <div>
        <BlogList
          params={params}
          searchParams={searchParams}
          initialData={recentPosts}
        />
      </div>
    </>
  );
}
