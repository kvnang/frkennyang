import React, { createContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

interface LangContextProps {
  lang: string;
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
  lang: 'en',
  setLang: () => {},
});

export function LangProvider({ children }: any) {
  const [lang, rawSetLang] = useState<string>('en');

  useEffect(() => {
    const htmlLangAttribute = document.documentElement.getAttribute('lang');
    const initialLang: string | undefined = htmlLangAttribute
      ? parseHTMLLang(htmlLangAttribute)
      : undefined;
    rawSetLang(initialLang || 'en');
  }, []);

  function setLang(newLang: string) {
    rawSetLang(newLang);
    window.localStorage.setItem('lang', newLang);
  }

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <Helmet htmlAttributes={{ lang }} />
      {children}
    </LangContext.Provider>
  );
}
