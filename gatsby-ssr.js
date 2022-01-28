/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from 'react';
import Layout from './src/components/Layout';

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

export function onRenderBody({ setPreBodyComponents }) {
  setPreBodyComponents([
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
              console.log(document.documentElement.getAttribute('lang'));
            }

            setLang(getInitialLang());
          })();
        `,
      }}
    />,
    <script
      key="cf-analytics"
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon='{"token": "5e4d44f2777e44d184490c0732ba7473"}'
    />,
  ]);
}
