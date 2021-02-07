import React from 'react';
import Footer from './Footer';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import Header from './Header';
import 'normalize.css';

export default function Layout({ children }: any) {
  return (
    <>
      <GlobalStyles />
      <Typography />
      <Header />
      {children}
      <Footer />
    </>
  );
}
