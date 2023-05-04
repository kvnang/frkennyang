import React from "react";
import {
  useHits,
  Pagination,
  UseHitsProps,
} from "react-instantsearch-hooks-web";
import { PostEntry, PostEntrySkeleton } from "@/components/PostEntry";
import { type PostEntryProps } from "@/types";

function Hits(props: UseHitsProps) {
  const { results } = useHits(props);
  if (!results?.hits?.length && !results?.processingTimeMS) {
    return (
      <div className="hits-wrapper">
        <ul>
          {[...Array(9)].map((_, i) => (
            <PostEntrySkeleton key={`skeleton-${i}`} format="list" />
          ))}
        </ul>
      </div>
    );
  }

  const { hits, nbHits, hitsPerPage } = results;

  return (
    <>
      <div className="hits-wrapper">
        <ul>
          {!!hits.length &&
            hits.map((hit) => (
              // @ts-expect-error
              <PostEntry key={hit.objectID} post={hit} format="list" />
            ))}
          {!hits.length && (
            <p>
              There’s nothing found based on your search. Please modify your
              search parameter.
            </p>
          )}
        </ul>
      </div>
      {nbHits > hitsPerPage && (
        <div className="hits-pagination">
          <Pagination />
        </div>
      )}
    </>
  );
}

export default Hits;
