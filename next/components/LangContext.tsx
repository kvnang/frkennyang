'use client';

import React, { createContext, useEffect, useState } from 'react';

export type LangType = 'en' | 'id';

interface LangContextProps {
  lang: LangType | null;
  setLang: Function;
}

const parseHTMLLang = (str: string) => str.split('-')[0];
// const formatHTMLLang = (str: string) => {
//   if (str.split('-').length > 1) {
//     return str;
//   }

//   if (str === 'id') {
//     return 'id-ID';
//   }

//   return 'en-US';
// };

export const LangContext = createContext<LangContextProps>({
  lang: null,
  setLang: () => {},
});

export function LangProvider({ children }: any) {
  const [lang, rawSetLang] = useState<LangType | null>(null);

  useEffect(() => {
    const htmlLangAttribute = document.documentElement.getAttribute('lang');
    const initialLang: LangType | undefined = htmlLangAttribute
      ? (parseHTMLLang(htmlLangAttribute) as LangType)
      : undefined;
    rawSetLang(initialLang || 'en');
  }, []);

  function setLang(newLang: LangType) {
    rawSetLang(newLang);
    window.localStorage.setItem('lang', newLang);
  }

  useEffect(() => {
    if (lang) {
      document.documentElement.setAttribute('lang', lang);
    }
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
}
