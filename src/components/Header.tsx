import { Link } from 'gatsby';
import React, { MouseEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { breakpoints } from '../styles/breakpoints';
import Logo from './Logo';
import Social from './Social';

const HeaderStyles = styled.header`
  padding-top: 1rem;
  padding-bottom: 1rem;
  position: relative;
  z-index: 1;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .link-underline {
    padding-top: 5px;
  }
`;

const MenuListStyles = styled.ul`
  --menu-gap: 1rem;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  margin: calc(-1 * var(--menu-gap) / 2);

  @media ${breakpoints.laptop} {
    --menu-gap: 2rem;
    flex-direction: row;
    justify-content: flex-end;
  }

  li {
    font-size: 1.25rem;
    padding: calc(var(--menu-gap) / 2);

    @media ${breakpoints.laptop} {
      font-size: 1rem;
    }

    a {
      /* display: flex; */
      /* width: 100%; */

      &,
      &:hover,
      &:focus {
        color: var(--color-p);
      }

      &[aria-current='page'] {
        pointer-events: none;

        &::before {
          width: 100%;
          transform: translateX(0);
        }
      }
    }
  }
`;

const MenuStyles = styled.nav`
  display: none;
  width: 100%;
  justify-content: flex-end;

  @media ${breakpoints.laptop} {
    display: flex;
  }

  .page-cv & {
    a,
    a:hover,
    a:focus {
      color: var(--black);
    }
  }
`;

const MobileMenuStyles = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  padding-top: 6rem;
  padding-bottom: 3rem;

  .social {
    position: static;
    top: 0;
    padding: 0;
    margin-top: 2.5rem;
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
  });

  function handleMenuHamburgerClick(e: MouseEvent) {
    e.preventDefault();
    setMobileMenuActive(!mobileMenuActive);
  }

  return (
    <>
      <HeaderStyles>
        <Helmet
          htmlAttributes={{ class: mobileMenuActive ? 'no-scroll' : '' }}
        />
        <div className="container">
          <Link to="/" className="logo">
            <Logo />
          </Link>
          <MenuStyles>
            <MenuListStyles>
              <li>
                <Link to="/about/" className="link-underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/cv/" className="link-underline">
                  Curriculum Vitae
                </Link>
              </li>
              <li>
                <Link to="/contents/" className="link-underline">
                  Contents
                </Link>
              </li>
              <li>
                <Link to="/invite/" className="link-underline">
                  Invite to Speak
                </Link>
              </li>
            </MenuListStyles>
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
              <MobileMenuStyles>
                <MenuListStyles>
                  <li>
                    <Link
                      to="/about/"
                      className="link-underline"
                      onClick={() => setMobileMenuActive(false)}
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/cv/"
                      className="link-underline"
                      onClick={() => setMobileMenuActive(false)}
                    >
                      Curriculum Vitae
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contents/"
                      className="link-underline"
                      onClick={() => setMobileMenuActive(false)}
                    >
                      Contents
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/invite/"
                      className="link-underline"
                      onClick={() => setMobileMenuActive(false)}
                    >
                      Invite to Speak
                    </Link>
                  </li>
                </MenuListStyles>
                <Social />
              </MobileMenuStyles>
            </div>
          </MobileHeaderStyles>
        </div>
      </HeaderStyles>
    </>
  );
}
