import React, { useEffect } from 'react';
import { PageProps } from 'gatsby';
import Footer from './Footer';
import Header from './Header';
import { SnackbarProvider } from './SnackbarContext';
import Snackbar from './Snackbar';
import { LangProvider } from './LangContext';
import { slugify } from '../utils/helpers';

import 'normalize.css';
import '../styles/main.scss';
import '@fontsource/playfair-display/700.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';

interface LayoutProps extends PageProps {
  children: React.ReactNode;
}

export default function Layout(props: LayoutProps) {
  const {
    children,
    location: { pathname },
  } = props;

  useEffect(() => {
    // Accessibility Features
    // Let the document know when the mouse is being used
    const mousedownListener = () => {
      document.body.classList.add('is-mouse');
      document.body.classList.remove('is-keyboard');
    };

    // Re-enable focus styling when Tab is pressed
    const keydownListener = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        document.body.classList.remove('is-mouse');
        document.body.classList.add('is-keyboard');
      }
    };

    document.body.addEventListener('mousedown', mousedownListener);
    document.body.addEventListener('touchstart', mousedownListener);
    document.body.addEventListener('keydown', keydownListener, true);

    return () => {
      document.body.removeEventListener('mousedown', mousedownListener);
      document.body.removeEventListener('touchstart', mousedownListener);
      document.body.removeEventListener('keydown', keydownListener, true);
    };
  }, []);

  const pageSlug = pathname === '/' ? 'home' : slugify(pathname);

  return (
    <LangProvider>
      <SnackbarProvider>
        <div className={`site-wrapper page-${pageSlug}`}>
          <div className="site">
            <Header />
            <div className="site-content">{children}</div>
            <Footer />
          </div>
        </div>
        <Snackbar />
      </SnackbarProvider>
    </LangProvider>
  );
}
