import type { GatsbyBrowser } from 'gatsby';
import React from 'react';
import Layout from './src/components/Layout';

export const wrapPageElement: GatsbyBrowser['wrapPageElement'] = ({
  element,
  props,
}) => <Layout {...props}>{element}</Layout>;
