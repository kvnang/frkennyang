import { graphql, useStaticQuery, navigate } from 'gatsby';
import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router'; // eslint-disable-line import/no-unresolved
import styled from 'styled-components';
import { LangContext, LangType } from './LangContext';
import { breakpoints } from '../styles/breakpoints';
import { untrailingSlashIt } from '../utils/helpers';

const LangSwitcherStyles = styled.div`
  display: inline-flex;

  ul {
    list-style: none;
    display: flex;
    flex-flow: wrap;
    padding: 0;
    margin: -0.5rem -0.75rem;

    li {
      margin: 0.5rem 0;
      padding: 0 0.75rem;
      line-height: 1;
      text-align: center;

      &:not(:last-child) {
        position: relative;
        border-right: 1px solid var(--grey);
      }
    }
  }

  button {
    opacity: 0.75;
    transition: opacity var(--transition);

    &[disabled] {
      opacity: 1;
      font-weight: 600;
      cursor: default;
    }

    &:hover {
      opacity: 1;
    }
  }

  &.vertical {
    @media ${breakpoints.tabletL} {
      ul {
        display: inline-flex;
        flex-direction: column;
        justify-content: center;

        li {
          padding: 0.5rem 0;
          margin: 0 0.75rem;

          &:not(:last-child) {
            border-right: 0;
            border-bottom: 1px solid var(--grey);
          }
        }
      }
    }
  }
`;

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
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);

  const allPosts: Array<{ path: string }> = query.allSitePage.nodes;
  const { siteUrl } = query.site.siteMetadata;

  const localizedPathname = pathname.startsWith('/id/')
    ? pathname.replace('/id', '')
    : `/id${pathname}`;

  const hasLocalized = !!allPosts.filter(
    (node) => node.path === localizedPathname
  ).length;

  const { lang, setLang } = useContext(LangContext);
  console.log(lang);

  if (!lang || (shouldNavigate && !hasLocalized)) {
    return null;
  }

  return (
    <LangSwitcherStyles
      className={`language-switcher ${vertical ? 'vertical' : ''}`}
    >
      <Helmet>
        <link
          rel="alternate"
          hrefLang={lang === 'id' ? 'en' : 'id'}
          href={`${untrailingSlashIt(siteUrl)}/${localizedPathname}`}
        />
      </Helmet>
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
    </LangSwitcherStyles>
  );
}
