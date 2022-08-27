import { Link } from 'gatsby';
import React, { MouseEvent, useEffect, useState } from 'react';
import Logo from './Logo';
import Menu from './Menu';
import Social from './Social';

export default function Header() {
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
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <Logo />
        </Link>
        <nav className="menu">
          <Menu />
        </nav>
        <div className="mobile-menu-button">
          <button
            type="button"
            className={`menu-toggle ${mobileMenuActive ? `active` : ``}`}
            onClick={handleMenuHamburgerClick}
            aria-label="Toggle Mobile Menu"
          >
            <div className="hamburger" tabIndex={-1}>
              <span />
              <span />
              <span />
            </div>
          </button>
        </div>
        <div className={`mobile-header ${mobileMenuActive ? `active` : ``}`}>
          <div className="container">
            <nav className="mobile-menu">
              <Menu setMobileMenuActive={setMobileMenuActive} isMobile />
              <Social />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
