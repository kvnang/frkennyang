import React from 'react';
import styled from 'styled-components';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Configure,
  Menu,
} from 'react-instantsearch-dom';
import { Helmet } from 'react-helmet';
import Hits from '../components/algolia/Hits';
import SEO from '../components/Seo';

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID || '',
  process.env.GATSBY_ALGOLIA_API_KEY || ''
);

const IntroStyles = styled.section`
  .inner {
    --width-xs: 12;
    --width-md: 8;
    --offset-md: 2;
    --width-lg: 6;
    --offset-lg: 3;
  }
`;

const BodyStyles = styled.section`
  background-color: var(--offwhite);

  .inner {
    --width-xs: 12;
    --width-md: 8;
    --offset-md: 2;
    --width-lg: 6;
    --offset-lg: 3;
  }

  .section-title {
    position: relative;
  }
`;

const SearchFilterStyles = styled.div`
  display: flex;
  flex-flow: wrap;
  align-items: center;
  max-width: 700px;
  margin: -1rem;

  .search,
  .menu {
    padding: 1rem;
  }

  .search {
    flex: 1;
    min-width: 300px;
  }

  .menu {
    min-width: 120px;
    margin-left: auto;
  }
`;

const SearchStyles = styled.div`
  .ais-SearchBox {
    &-form {
      position: relative;

      input[type='search'] {
        &::-webkit-search-cancel-button {
          display: none;
        }
      }
      button {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);

        svg {
          fill: var(--color-accent);
          height: 1rem;
          width: 1rem;
        }

        &[type='reset'] {
          right: 3rem;

          svg {
            fill: var(--white);
            height: 0.75rem;
            width: 0.75rem;
          }
        }
      }
    }
  }
`;

const MenuStyles = styled.div`
  display: flex;
  justify-content: flex-end;

  .ais-Menu {
    &-count {
      display: none;
    }
    &-list {
      display: flex;
      list-style: none;
      padding: 0;
      margin: -0.5rem -0.75rem;
    }
    &-item {
      padding: 0 0.75rem;
      margin: 0.5rem 0;
      text-transform: uppercase;
      opacity: 0.75;
      transition: opacity var(--transition);
      line-height: 1;
      text-align: center;

      &:not(:last-child) {
        position: relative;
        border-right: 1px solid var(--grey);
      }

      &:hover {
        opacity: 1;
      }

      &--selected {
        opacity: 1;
        font-weight: 600;
      }
    }
  }
`;

export default function ContentsPage() {
  return (
    <main>
      <SEO title="Contents" />
      <InstantSearch searchClient={searchClient} indexName="Posts">
        <Configure hitsPerPage={9} />
        <IntroStyles className="page-p-t section-p-b">
          <div className="container">
            <div className="row">
              <div className="col inner">
                <h2>My Contents</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit. Lorem
                  ipsum dolor sit amet consectetur adipiscing elit.
                </p>
                <SearchFilterStyles>
                  <SearchStyles className="search">
                    <SearchBox
                      translations={{
                        placeholder: 'Search for articles, videos, etc...',
                      }}
                    />
                  </SearchStyles>
                  <MenuStyles className="menu">
                    <Menu
                      attribute="fields.lang"
                      defaultRefinement="en"
                      searchable={false}
                    />
                  </MenuStyles>
                </SearchFilterStyles>
              </div>
            </div>
          </div>
        </IntroStyles>
        <BodyStyles className="section-p-t section-p-b bg-light">
          <div className="container">
            <div className="row">
              <div className="col inner">
                <Hits />
              </div>
            </div>
          </div>
        </BodyStyles>
      </InstantSearch>
    </main>
  );
}
