import React from 'react';
import Footer from './Footer';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import Header from './Header';
// import 'normalize.css';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
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
