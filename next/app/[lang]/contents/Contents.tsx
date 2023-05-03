'use client';

import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Configure,
} from 'react-instantsearch-hooks-web';
import Menu from '@/components/algolia/Menu';
import Hits from '@/components/algolia/Hits';
// import { LangContext } from '@/components/LangContext';

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID || '',
  process.env.GATSBY_ALGOLIA_API_KEY || ''
);

export function Contents() {
  // const { lang } = useContext(LangContext);
  const lang = 'en';

  return (
    <main className="page-contents">
      <InstantSearch
        searchClient={searchClient}
        indexName="Posts"
        initialUiState={{
          Posts: {
            menu: {
              'fields.lang': lang || 'en',
            },
          },
        }}
      >
        <Configure hitsPerPage={9} />
        <section className="page-p-t section-p-b intro">
          <div className="container">
            <div className="row">
              <div className="col inner">
                <h1>My Contents</h1>
                <p>
                  Browse my latest works. Some of them are available in both
                  English and Bahasa Indonesia.
                </p>
                <div className="search-filter">
                  <div className="search-filter__search">
                    <SearchBox placeholder="Search for articles, videos, etc..." />
                  </div>
                  <div className="search-filter__menu">
                    <Menu attribute="fields.lang" sortBy={['name:asc']} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section-p-t section-p-b body bg-light">
          <div className="container">
            <div className="row">
              <div className="col inner">{/* <Hits /> */}</div>
            </div>
          </div>
        </section>
      </InstantSearch>
    </main>
  );
}

// export function Head({ location: { pathname } }: HeadProps) {
//   return (
//     <SEO
//       title="Contents"
//       description="Browse Fr. Kenny's latest works, available in both English and Bahasa Indonesia."
//       pathname={pathname}
//     />
//   );
// }
