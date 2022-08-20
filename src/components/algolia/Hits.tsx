import React from 'react';
import {
  useHits,
  Pagination,
  UseHitsProps,
} from 'react-instantsearch-hooks-web';
import styled from 'styled-components';
import PostEntry, { PostEntrySkeleton } from '../PostEntry';
import { PostProps } from '../../types';

interface SearchResults {
  query: string;
  hits: Array<PostProps>;
  index: string;
  hitsPerPage: number;
  nbHits: number;
  nbSortedHits?: number | undefined;
  appliedRelevancyStrictness?: number | undefined;
  nbPages: number;
  page: number;
  processingTimeMS: number;
  exhaustiveNbHits: boolean;
  disjunctiveFacets: any[];
  hierarchicalFacets: any[];
  facets: any[];
  aroundLatLng?: string | undefined;
  automaticRadius?: string | undefined;
}

interface Props {
  // searchState: object;
  searchResults: SearchResults;
  // allSearchResults: object;
  // error: object;
  // searching: boolean;
  // searchingForFacetValues: boolean;
  // isSearchStalled: boolean;
}

const WrapperStyles = styled.div`
  ul {
    list-style: none;
    padding-left: 0;
    margin: calc(var(--post-gap) * -2) calc(var(--post-gap) * -1);
  }
`;

const PaginationStyles = styled.div`
  margin-top: 2.5rem;

  .ais-Pagination {
    &-list {
      list-style: none;
      display: flex;
      flex-flow: wrap;
      align-items: center;
      padding: 0;
      margin: -0.5rem;
    }
    &-item {
      padding: 0.5rem;

      &--disabled {
        span {
          background-color: transparent;
          color: var(--grey);
          pointer-events: none;
        }
      }
    }

    &-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2rem;
      height: 2rem;
      background-color: var(--white);
      color: var(--black);
      transition: var(--transition);

      &:hover {
        background-color: var(--color-accent);
        color: var(--white);
      }

      &--selected {
        font-weight: bold;
        cursor: auto;
        &,
        &:hover {
          color: var(--color-accent);
          background-color: transparent;
        }
      }
    }
  }
`;

function Hits(props: UseHitsProps) {
  const p = useHits(props);
  console.log(p);
  const { results } = p;
  // console.log(results);
  if (!results?.hits?.length && !results?.processingTimeMS) {
    return (
      <WrapperStyles>
        <ul>
          {[...Array(9)].map((_, i) => (
            <PostEntrySkeleton key={`skeleton-${i}`} format="list" />
          ))}
        </ul>
      </WrapperStyles>
    );
  }

  const { hits, nbHits, hitsPerPage } = results;

  return (
    <>
      <WrapperStyles>
        <ul>
          {!!hits.length &&
            hits.map((hit) => (
              <PostEntry key={hit.objectID} post={hit} format="list" />
            ))}
          {!hits.length && (
            <p>
              There's nothing found based on your search. Please modify your
              search parameter.
            </p>
          )}
        </ul>
      </WrapperStyles>
      {nbHits > hitsPerPage && (
        <PaginationStyles>
          <Pagination />
        </PaginationStyles>
      )}
    </>
  );
}

export default Hits;
