"use client";

import * as React from "react";
import { PostEntry } from "@/components/PostEntry";
import type { PostEntryProps } from "@/types";
import client from "@/lib/sanity.client";
import { query, queryWithSearch } from "./query";
import { Button } from "@/components/Button";

export function BlogList({
  params,
  searchParams,
  initialData,
}: {
  params: { category?: string };
  searchParams: { q?: string };
  initialData?: PostEntryProps[];
}) {
  const q = searchParams.q || "";

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

    const results = q
      ? await client.fetch(queryWithSearch, {
          searchQuery: q,
          category: params.category || "",
          lastScore: lastScoreRef.current,
          lastId: lastIdRef.current,
          perPage: 9,
        })
      : await client.fetch(query, {
          category: params.category || "",
          lastPublishedAt: lastPublishedAtRef.current,
          lastId: lastIdRef.current,
          perPage: 9,
        });

    if (results.length > 0) {
      if (q) {
        lastScoreRef.current = results[results.length - 1]._score;
      } else {
        lastPublishedAtRef.current = results[results.length - 1].publishedAt;
      }
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
            <div key={post._id} className="">
              <PostEntry post={post} showImage />
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
