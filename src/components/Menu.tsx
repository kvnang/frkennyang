import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { breakpoints } from '../styles/breakpoints';

interface MenuListStylesProps {
  isMobile?: boolean;
  isFooter?: boolean;
}

const MenuListStyles = styled.ul<MenuListStylesProps>`
  --menu-gap: 0.75rem;
  --menu-gap-v: 0.5rem;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  justify-content: ${({ isMobile, isFooter }) => {
    if (isMobile) {
      return 'flex-start';
    }
    if (isFooter) {
      return 'center';
    }
    return 'flex-end';
  }};
  flex-wrap: wrap;
  margin: calc(-1 * var(--menu-gap-v)) calc(-1 * var(--menu-gap));

  @media ${breakpoints.mobileL} {
    --menu-gap: 1rem;
  }

  @media ${breakpoints.laptop} {
    flex-direction: row;
    justify-content: flex-end;
  }

  li {
    font-size: ${({ isFooter }) =>
      isFooter ? 'var(--font-size-small)' : '1.25rem'};
    padding: var(--menu-gap-v) var(--menu-gap);

    @media ${breakpoints.laptop} {
      font-size: ${({ isFooter }) =>
        isFooter ? 'var(--font-size-small)' : '1rem'};
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

const menuItems = [
  {
    link: '/about/',
    title: 'About',
  },
  {
    link: '/cv/',
    title: 'Curriculum Vitae',
    titleShort: 'CV',
  },
  {
    link: '/contents/',
    title: 'Contents',
    titleShort: 'Contents',
  },
  {
    link: '/invite/',
    title: 'Invite to Speak',
    titleShort: 'Invite',
  },
  {
    link: '/#contact',
    title: 'Contact',
  },
];

interface Props extends MenuListStylesProps {
  setMobileMenuActive?: Function;
}

export default function Menu({
  setMobileMenuActive,
  isMobile = false,
  isFooter = false,
}: Props) {
  return (
    <MenuListStyles isMobile={isMobile} isFooter={isFooter}>
      {menuItems.map((menuItem, i) => (
        <li key={`menu-${i}`}>
          <Link
            to={menuItem.link}
            className="link-underline"
            onClick={() => {
              if (typeof setMobileMenuActive !== 'undefined') {
                setMobileMenuActive(false);
              }
            }}
          >
            {isFooter ? menuItem.titleShort || menuItem.title : menuItem.title}
          </Link>
        </li>
      ))}
    </MenuListStyles>
  );
}
