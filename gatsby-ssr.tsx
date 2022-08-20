import type { GatsbySSR } from 'gatsby';
import React from 'react';
import Layout from './src/components/Layout';
import { slugify } from './src/utils/helpers';

export const wrapPageElement: GatsbySSR['wrapPageElement'] = ({
  element,
  props,
}) => <Layout {...props}>{element}</Layout>;

export const onRenderBody: GatsbySSR['onRenderBody'] = ({
  pathname,
  setBodyAttributes,
  setPreBodyComponents,
  setHtmlAttributes,
}) => {
  setHtmlAttributes({ lang: pathname.startsWith('/id/') ? 'id' : 'en' });

  const pageSlug = slugify(pathname) || 'home';
  setBodyAttributes({
    className: `page-${pageSlug} ${
      pageSlug === 'contents' ? 'footer-light' : ''
    }`,
  });

  const scripts = [
    <script
      key="preferred-lang-script"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            function getInitialLang() {
              const persistedLangPreference = window.localStorage.getItem('lang');
              const hasPersistedPreference = typeof persistedLangPreference === 'string';

              if (hasPersistedPreference) {
                return persistedLangPreference;
              }

              const lang =
                (window.navigator.languages && window.navigator.languages[0]) ||
                window.navigator.language ||
                window.navigator.browserLanguage ||
                window.navigator.userLanguage ||
                window.navigator.systemLanguage ||
                'en';

              return lang;
            }

            function setLang(newLang) {
              document.documentElement.setAttribute('lang', newLang);
            }

            setLang(getInitialLang());
          })();
        `,
      }}
    />,
  ];

  if (process.env.NODE_ENV === 'production') {
    scripts.push(
      <script
        key="cf-analytics"
        defer
        src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token": "5e4d44f2777e44d184490c0732ba7473"}'
      />
    );
  }

  setPreBodyComponents(scripts);
};
