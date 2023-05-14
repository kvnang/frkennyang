"use client";

import * as React from "react";
import { PostEntry, PostEntrySkeleton } from "@/components/PostEntry";
import type { LangType, PostEntryProps } from "@/types";
import { clientFetch } from "@/lib/sanity.client";
import { query, queryWithSearch } from "./query";
import { Button } from "@/components/Button";

export function BlogList({
  params,
  // searchParams,
  initialData,
  lang,
}: {
  params: { category?: string };
  // searchParams?: { q?: string };
  initialData?: PostEntryProps[];
  lang: LangType;
}) {
  // const q = searchParams?.q || "";

  const lastIdRef = React.useRef(
    !!initialData?.length ? initialData[initialData.length - 1]._id : null
  );

  const lastPublishedAtRef = React.useRef(
    !!initialData?.length
      ? initialData[initialData.length - 1].publishedAt
      : null
  );

  const lastScoreRef = React.useRef(
    !!initialData?.length ? initialData[initialData.length - 1]._score : null
  );

  const [posts, setPosts] = React.useState(initialData || []);

  async function fetchNextPage() {
    if (lastIdRef.current === null) {
      return [];
    }

    const results = await clientFetch(query, {
      category: params.category || "",
      lastPublishedAt: lastPublishedAtRef.current,
      lastId: lastIdRef.current,
      perPage: 9,
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
      lastPublishedAtRef.current = results[results.length - 1].publishedAt;
      // }
      lastIdRef.current = results[results.length - 1]._id;
    } else {
      lastIdRef.current = null; // Reached the end
    }
    return results;
  }

  const handleLoadMoreClick = async () => {
    const nextPosts = await fetchNextPage();
    setPosts((prevPosts) => [...prevPosts, ...nextPosts]);
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
      {lastIdRef.current && (
        <div className="mt-12 flex justify-center">
          <Button onClick={handleLoadMoreClick}>Load More</Button>
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
