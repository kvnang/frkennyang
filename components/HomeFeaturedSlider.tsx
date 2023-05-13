"use client";

import * as React from "react";
import { Slider } from "./Slider";
import { PostEntry } from "./PostEntry";
import type { LangType, PostEntryProps } from "@/types";

export function HomeFeaturedSlider({
  posts,
  lang,
}: {
  posts: PostEntryProps[];
  lang: LangType;
}) {
  const [_, setRef] = React.useState<HTMLDivElement | null>(null);

  return (
    <div style={{}}>
      <Slider setRef={setRef}>
        {posts.map((post: PostEntryProps) => (
          <PostEntry
            key={post._id}
            post={post}
            showImage
            showExcerpt
            lang={lang}
          />
        ))}
      </Slider>
    </div>
  );
}
