"use client";

import * as React from "react";
import { PostEntry, PostEntrySkeleton } from "@/components/PostEntry";
import type { LangType, PostEntryProps } from "@/types";
import { clientFetch } from "@/lib/sanity.client";
import { query } from "./query";
import { Button } from "@/components/Button";

export function BlogList({
  params,
  initialData,
  lang,
}: {
  params: { category?: string };
  initialData?: {
    posts: PostEntryProps[];
    hasMore: boolean;
  };
  lang: LangType;
}) {
  // const q = searchParams?.q || "";
  const [loading, setLoading] = React.useState(false);
  const initialPosts = initialData?.posts || [];
  const initialHasMore = initialData ? initialData.hasMore : true;

  const lastIdRef = React.useRef(
    !!initialPosts?.length ? initialPosts[initialPosts.length - 1]._id : null
  );

  const lastPublishedAtRef = React.useRef(
    !!initialPosts?.length
      ? initialPosts[initialPosts.length - 1].publishedAt
      : null
  );

  const [posts, setPosts] = React.useState<PostEntryProps[]>(
    initialPosts || []
  );
  const [hasMore, setHasMore] = React.useState<boolean>(initialHasMore);

  async function fetchNextPage() {
    if (lastIdRef.current === null) {
      return [];
    }

    const results = await clientFetch(query, {
      category: params.category || "",
      lastPublishedAt: lastPublishedAtRef.current,
      lastId: lastIdRef.current,
      perPage: 10, // Fetch 10, but only show 9 to check if there are more
    });

    // await clientFetch(queryWithSearch, {
    //   searchQuery: q,
    //   category: params.category || "",
    //   lastScore: lastScoreRef.current,
    //   lastId: lastIdRef.current,
    //   perPage: 9,
    // })

    if (results.length > 0) {
      // if (q) {
      //   lastScoreRef.current = results[results.length - 1]._score;
      // } else {
      lastPublishedAtRef.current = results[results.length - 2].publishedAt;
      // }
      lastIdRef.current = results[results.length - 2]._id;

      setHasMore(results.length >= 10);
    } else {
      lastIdRef.current = null; // Reached the end
      setHasMore(false);
    }
    return results.slice(0, 9);
  }

  const handleLoadMoreClick = async () => {
    setLoading(true);
    const nextPosts = await fetchNextPage();
    setPosts((prevPosts) => [...prevPosts, ...nextPosts]);
    setLoading(false);
  };

  return (
    <div>
      {!!posts?.length && (
        <div className="grid md:grid-cols-3 gap-x-4 gap-y-8">
          {posts.map((post) => (
            <div key={post._id}>
              <PostEntry post={post} showImage lang={lang} />
            </div>
          ))}
        </div>
      )}
      {hasMore && lastIdRef.current && (
        <div className="mt-12 flex justify-center">
          <Button onClick={handleLoadMoreClick} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}

export function BlogListSkeleton() {
  return (
    <div className="grid md:grid-cols-3 gap-x-4 gap-y-8">
      {[...Array(9)].map((_, i) => (
        <div key={i}>
          <PostEntrySkeleton showImage />
        </div>
      ))}
    </div>
  );
}
