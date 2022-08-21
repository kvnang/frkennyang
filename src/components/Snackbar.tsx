import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import React, { useContext, useEffect } from 'react';
import { SnackbarContext } from './SnackbarContext';

// const loadFeatures = () =>
//   import('../utils/features').then((res) => res.default);

export default function Snackbar() {
  const { snackbar, addSnackbar, removeSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    if (snackbar) {
      const timer1 = setTimeout(() => removeSnackbar(), 8000);
      return () => {
        clearTimeout(timer1);
      };
    }
  }, [snackbar, removeSnackbar]);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {snackbar && (
          <div className={`snackbar ${snackbar.status}`} role="alert">
            <m.div
              className="inner"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <button
                type="button"
                className="close"
                onClick={() => removeSnackbar()}
              >
                &times;
              </button>
              <p>{snackbar.message}</p>
            </m.div>
          </div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
