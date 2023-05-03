import { graphql, useStaticQuery, navigate } from 'gatsby';
import React, { useContext } from 'react';
import { useLocation } from '@reach/router'; // eslint-disable-line import/no-unresolved
import { LangContext } from './LangContext';

interface Props {
  shouldNavigate?: boolean;
  vertical?: boolean;
}

export default function LangSwitcher({
  shouldNavigate = true,
  vertical = false,
}: Props) {
  const { pathname } = useLocation();
  const query = useStaticQuery(graphql`
    query {
      allSitePage(filter: { path: { regex: "/post/" } }) {
        nodes {
          path
        }
      }
    }
  `);

  const allPosts: Array<{ path: string }> = query.allSitePage.nodes;

  const localizedPathname = pathname.startsWith('/id/')
    ? pathname.replace('/id', '')
    : `/id${pathname}`;

  const hasLocalized = !!allPosts.filter(
    (node) => node.path === localizedPathname
  ).length;

  const { lang, setLang } = useContext(LangContext);

  if (!lang || (shouldNavigate && !hasLocalized)) {
    return null;
  }

  return (
    <div className="inline-flex">
      <ul
        className={`flex flex-wrap -my-2 -mx-3 ${
          vertical ? 'lg:inline-flex lg:flex-col lg:justify-center' : ''
        }`}
      >
        <li
          className={`my-2 px-3 leading-none text-center relative border-r border-gray last:border-none ${
            vertical
              ? 'lg:py-2 lg:px-0 lg:my-0 lg:mx-3 lg:border-r-none lg:border-b lg:last:border-none'
              : ''
          }`}
        >
          <button
            className="opacity-75 transition-opacity hover:opacity-100 disabled:opacity-100 disabled:cursor-default disabled:font-semibold"
            type="button"
            onClick={() => {
              setLang('en');
              if (shouldNavigate && hasLocalized) {
                navigate(localizedPathname);
              }
            }}
            disabled={lang === 'en'}
            aria-label="English"
            title="English"
          >
            EN
          </button>
        </li>
        <li
          className={`my-2 px-3 leading-none text-center relative border-r border-gray last:border-none ${
            vertical
              ? 'lg:py-2 lg:px-0 lg:my-0 lg:mx-3 lg:border-r-none lg:border-b lg:last:border-none'
              : ''
          }`}
        >
          <button
            className="opacity-75 transition-opacity hover:opacity-100 disabled:opacity-100 disabled:cursor-default disabled:font-semibold"
            type="button"
            onClick={() => {
              setLang('id');
              if (shouldNavigate && hasLocalized) {
                navigate(localizedPathname);
              }
            }}
            disabled={lang === 'id'}
            aria-label="Bahasa Indonesia"
            title="Bahasa Indonesia"
          >
            ID
          </button>
        </li>
      </ul>
    </div>
  );
}
