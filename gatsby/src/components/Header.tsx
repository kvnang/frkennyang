import { Link } from 'gatsby';
import React, { MouseEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { breakpoints } from '../styles/breakpoints';
import Logo from './Logo';

const HeaderStyles = styled.header`
  background-color: var(--black);
  padding-top: 1rem;
  padding-bottom: 1rem;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .link-underline {
    padding-top: 5px;
  }
`;

const MenuStyles = styled.nav`
  display: none;
  width: 100%;
  justify-content: flex-end;

  @media ${breakpoints.laptop} {
    display: flex;
  }

  ul {
    --menu-gap: 1.5rem;
    list-style: none;
    display: flex;
    margin: calc(-1 * var(--menu-gap) / 2);

    li {
      padding: calc(var(--menu-gap) / 2);
    }
  }
`;

const MobileMenuButtonStyles = styled.div`
  display: flex;
  align-items: center;
  @media ${breakpoints.laptop} {
    display: none;
  }

  .menu-toggle {
    padding: 0;
    margin-left: 1.5rem;

    &:focus,
    .hamburger:focus {
      outline: none;
    }

    &:focus > .hamburger {
      outline: 5px auto Highlight;
      outline: 5px auto -webkit-focus-ring-color;

      span {
        background-color: var(--gold);
      }
    }

    &:hover > .hamburger span {
      background-color: var(--gold);
    }

    &.active {
      z-index: 10;
      span {
        opacity: 1;
        transform: rotate(45deg) translate(2px, -4px);
        background: var(--white);

        &:nth-child(2) {
          opacity: 0;
          transform: rotate(0deg) scale(0.2, 0.2);
        }

        &:nth-child(3) {
          transform: rotate(-45deg) translate(2px, 4px);
        }
      }
    }
  }

  .hamburger {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    padding: 5px;

    span {
      display: block;
      width: 30px;
      height: 2px;
      margin-bottom: 6px;
      position: relative;
      background: var(--white);
      z-index: 1;
      transform-origin: 2px 0px;
      transition: var(--transition);

      &:nth-child(3) {
        transform-origin: 0% 100%;
        margin-bottom: 0;
      }
    }
  }
`;

const MobileHeaderStyles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 9;
  background: var(--black);
  backdrop-filter: blur(3rem);
  opacity: 0;
  pointer-events: none;
  transform: translateX(-100%);
  visibility: hidden;
  transition: var(--transition);

  &.active {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(0);
    visibility: visible;
  }

  nav {
    display: flex;
    flex-direction: column;
    padding-top: 3rem;
    padding-bottom: 3rem;

    a {
      &:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  }
`;

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

    // Let the document know when the mouse is being used
    document.body.addEventListener('mousedown', () => {
      document.body.classList.add('is-mouse');
    });

    // Re-enable focus styling when Tab is pressed
    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.remove('is-mouse');
      }
    });
  });

  function handleMenuHamburgerClick(e : MouseEvent) {
    e.preventDefault();
    setMobileMenuActive(!mobileMenuActive);
  }

  function handleMobileMenuClick() {
    setMobileMenuActive(false);
  }

  return (
    <>
      <HeaderStyles>
        <div className="container">
          <div className="logo">
            <Logo />
          </div>
          <MenuStyles>
            <ul>
              <li>
                <Link to="/about" className="link-underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/about" className="link-underline">
                  About
                </Link>
              </li>
            </ul>
          </MenuStyles>
          <MobileMenuButtonStyles>
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
          </MobileMenuButtonStyles>
          <MobileHeaderStyles className={mobileMenuActive ? `active` : ``}>
            <div className="container">
              <nav>
                <Link to="/about" onClick={handleMobileMenuClick}>
                  About
                </Link>
                <Link to="/contact" onClick={handleMobileMenuClick}>
                  Contact
                </Link>
              </nav>
            </div>
          </MobileHeaderStyles>
        </div>
      </HeaderStyles>
    </>
  );
}
