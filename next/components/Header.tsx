'use client';

import Link from 'next/link';
import React, { MouseEvent, useEffect, useState } from 'react';
import Logo from './Logo';
import Menu from './Menu';
import Social from './Social';
import { Hamburger } from './Hamburger';
import { LangType } from '@/types';

export default function Header({ params }: { params: { lang: LangType } }) {
  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  useEffect(() => {
    window.onresize = () => {
      if (window.outerWidth >= 1025) {
        setMobileMenuActive(false);
      }
    };

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setMobileMenuActive(false);
      }
    });
  });

  function handleMenuHamburgerClick(e: MouseEvent) {
    e.preventDefault();
    setMobileMenuActive(!mobileMenuActive);
  }

  useEffect(() => {
    if (mobileMenuActive) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [mobileMenuActive]);

  return (
    <header className="py-4 relative z-10">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link href={`/${params.lang}`} className="logo">
            <Logo />
          </Link>
          <nav className="hidden lg:flex w-full justify-end">
            <Menu params={params} />
          </nav>
          <div className="flex items-center lg:hidden relative z-30">
            <Hamburger
              isOpen={mobileMenuActive}
              setIsOpen={setMobileMenuActive}
            />
          </div>
          <div
            className={`fixed top-0 left-0 w-full h-full z-20 bg-black backdrop-blur-md transition-all ${
              mobileMenuActive
                ? `opacity-100 pointer-events-auto translate-x-0 visible`
                : `opacity-0 pointer-events-none -translate-x-4 hidden`
            }`}
          >
            <div className="container">
              <nav className="flex flex-col justify-start w-full py-24 pb-12">
                <Menu
                  setMobileMenuActive={setMobileMenuActive}
                  isMobile
                  params={params}
                />
                <Social className="static top-0 p-0 mt-10" />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
