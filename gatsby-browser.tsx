import type { GatsbyBrowser } from 'gatsby';
import React from 'react';
import Layout from './src/components/Layout';
import '@fontsource/playfair-display/700.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props,
}) => <Layout {...props}>{element}</Layout>;

export const onRouteUpdate: GatsbyBrowser['onRouteUpdate'] = ({
  location: { pathname },
}) => {
  // set html attribute
  document.documentElement.setAttribute(
    'lang',
    pathname.startsWith('/id/') ? 'id' : 'en'
  );
};
