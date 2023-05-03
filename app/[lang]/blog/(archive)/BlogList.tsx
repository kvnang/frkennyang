'use client';

import * as React from 'react';
import { PostEntry } from '@/components/PostEntry';
import type { PostEntryProps } from '@/types';
import client from '@/lib/sanity.client';

export function BlogList({ initialData }: { initialData?: PostEntryProps[] }) {
  const lastIdRef = React.useRef(
    !!initialData?.length ? initialData[initialData.length - 1]._id : null
  );
  const lastPublishedAtRef = React.useRef(
    !!initialData?.length
      ? initialData[initialData.length - 1].publishedAt
      : null
  );

  const [posts, setPosts] = React.useState(initialData || []);

  async function fetchNextPage() {
    if (lastIdRef.current === null) {
      return [];
    }

    const results = await client.fetch(
      `*[_type == "post" && (
        publishedAt > $lastPublishedAt
        || (publishedAt == $lastPublishedAt && _id > $lastId)
      )] | order(publishedAt) [0...10] {
        _id, title, slug, excerpt, publishedAt, format->{title}, categories[]->{title}, excerpt, "mainImageUrl": mainImage.asset->url
      }`,
      { lastPublishedAt: lastPublishedAtRef.current, lastId: lastIdRef.current }
    );

    if (results.length > 0) {
      lastPublishedAtRef.current = results[results.length - 1].publishedAt;
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
      <div className="mt-8 flex justify-center">
        <button onClick={handleLoadMoreClick}>Load More</button>
      </div>
    </div>
  );
}
