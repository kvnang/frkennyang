import React, { useContext } from 'react';
import styled from 'styled-components';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Configure,
  // Menu,
} from 'react-instantsearch-dom';
import { Helmet } from 'react-helmet';
import Menu from '../components/algolia/Menu';
import Hits from '../components/algolia/Hits';
import SEO from '../components/Seo';
import { LangContext } from '../components/LangContext';

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID || '',
  process.env.GATSBY_ALGOLIA_API_KEY || ''
);

const IntroStyles = styled.section`
  background-color: var(--black);
  position: relative;
  z-index: 0;

  .inner {
    --width-xs: 12;
    --width-md: 8;
    --offset-md: 2;
    --width-lg: 6;
    --offset-lg: 3;
  }

  &::before {
    content: '';
    z-index: -1;
    width: 100%;
    height: 200%;
    background-color: var(--black);
    position: absolute;
    bottom: 0;
    left: 0;
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
  margin: -0.5rem -1rem;

  .search,
  .menu {
    padding: 0.5rem 1rem;
  }

  .search {
    flex: 1;
    min-width: 300px;
  }

  .menu {
    min-width: 100px;
    margin-left: auto;
  }
`;

const SearchStyles = styled.div`
  .ais-SearchBox {
    &-form {
      position: relative;

      input[type='search'] {
        padding-right: 3rem;
        text-overflow: ellipsis;

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
  const { lang, setLang } = useContext(LangContext);

  return (
    <main>
      <SEO title="Contents" />
      <Helmet bodyAttributes={{ class: 'page-contents footer-light' }} />
      <InstantSearch searchClient={searchClient} indexName="Posts">
        <Configure hitsPerPage={9} />
        <IntroStyles className="page-p-t section-p-b">
          <div className="container">
            <div className="row">
              <div className="col inner">
                <h1>My Contents</h1>
                <p>
                  Browse my latest works. Some of them are available in both
                  English and Bahasa Indonesia.
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
                      defaultRefinement={lang || 'en'}
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
