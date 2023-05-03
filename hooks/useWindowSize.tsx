import { useEffect, useState } from 'react';

interface WindowSizeProps {
  width: number | undefined;
  height: number | undefined;
}

export function useWindowSize(debounce: boolean = false, handler?: Function) {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<WindowSizeProps>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (handler) {
      if (debounce) {
        const delayDebounceFn = setTimeout(() => {
          handler();
        }, 500);
        return () => clearTimeout(delayDebounceFn);
      }
      handler();
    }
  }, [windowSize]);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    if (handler) {
      handler();
    }
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}
