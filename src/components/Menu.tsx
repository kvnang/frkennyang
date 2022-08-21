import React from 'react';
import { Link } from 'gatsby';

interface MenuListStylesProps {
  isMobile?: boolean;
  isFooter?: boolean;
}

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
    <ul
      className={`menu-list ${isMobile ? 'menu-list--mobile' : ''} ${
        isFooter ? 'menu-list--footer' : ''
      }`}
    >
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
    </ul>
  );
}
