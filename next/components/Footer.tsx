import React from 'react';
import Menu from './Menu';
import { LangType } from '@/types';

export default function Footer({ params }: { params: { lang: LangType } }) {
  return (
    <footer>
      <div className="container pt-4 pb-10 border-t border-t-dark-gray">
        <Menu isFooter params={params} />
      </div>
    </footer>
  );
}
