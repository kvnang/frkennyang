import React from 'react';
import styled from 'styled-components';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';
import { breakpoints } from '../styles/breakpoints';

type SocialProps = {
  dark?: boolean;
};

const SocialStyles = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  bottom: var(--section-padding-sm);
  padding: 1rem 0.5rem;

  ul {
    display: flex;
    flex-flow: wrap;
    align-items: center;
    justify-content: flex-start;
    list-style: none;
    padding-left: 0;
    margin: -0.875rem;

    @media ${breakpoints.laptop} {
      flex-direction: column;
      justify-content: center;
    }

    li {
      padding: 0.875rem;
    }
  }

  a {
    --active-color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--active-color);

    &:hover,
    &:focus {
      color: var(--gold);
    }
  }

  svg {
    color: inherit;
    transition: var(--transition);
    height: 1.25rem;
    width: auto;

    @media ${breakpoints.laptop} {
    }
  }

  &.dark a {
    --active-color: var(--black);
  }
`;

export default function Social({ dark }: SocialProps) {
  return (
    <SocialStyles className={dark === true ? 'social dark' : 'social'}>
      <ul>
        <li>
          <a
            href="https://www.instagram.com/fatherkennyang/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram title="Instagram" />
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/channel/UCcjDuwzBBR7pvcuRjlJi48A"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube title="YouTube" />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/fatherkennyang/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn title="LinkedIn" />
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/fatherkennyang/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF title="Facebook" />
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/fatherkennyang"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter title="Twitter" />
          </a>
        </li>
      </ul>
    </SocialStyles>
  );
}
