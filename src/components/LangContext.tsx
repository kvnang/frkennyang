import React, { createContext, useEffect, useState } from 'react';

interface LangContextProps {
  lang: string | undefined;
  setLang: Function;
}

export const LangContext = createContext<LangContextProps>({
  lang: 'en',
  setLang: () => {},
});

export function LangProvider({ children }: any) {
  const [lang, rawSetLang] = useState<string>('en');

  useEffect(() => {
    const initialLang: string | undefined =
      document.documentElement.dataset.lang;
    rawSetLang(initialLang || 'en');
  }, []);

  function setLang(newLang: string) {
    rawSetLang(newLang);
    window.localStorage.setItem('lang', newLang);
  }

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}
