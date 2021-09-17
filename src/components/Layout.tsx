import 'normalize.css';
import React, { useEffect } from 'react';
import Footer from './Footer';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';
import Header from './Header';
import { SnackbarProvider } from './SnackbarContext';
import Snackbar from './Snackbar';
import { LangProvider } from './LangContext';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
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

  return (
    <>
      <GlobalStyles />
      <Typography />
      <LangProvider>
        <SnackbarProvider>
          <div className="site">
            <Header />
            <div className="site-content">{children}</div>
            <Footer />
          </div>
          <Snackbar />
        </SnackbarProvider>
      </LangProvider>
    </>
  );
}
