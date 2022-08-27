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
    <div className={`language-switcher ${vertical ? 'vertical' : ''}`}>
      <ul>
        <li>
          <button
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
        <li>
          <button
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
