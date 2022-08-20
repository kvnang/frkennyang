import type { GatsbyBrowser } from 'gatsby';
import React from 'react';
import Layout from './src/components/Layout';
import '@fontsource/playfair-display/700.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';
import { slugify } from './src/utils/helpers';

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

  // set body attribute
  const pageSlug = slugify(pathname) || 'home';
  document.body.className = `page-${pageSlug}`;
};
