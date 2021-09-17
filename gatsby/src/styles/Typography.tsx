import * as styled from 'styled-components';
import { breakpoints } from './breakpoints';

const Typography = styled.createGlobalStyle`
  html {
    font-family: var(--font-primary);
    color: var(--color-p);
    font-size: 100%;
  }

  body {
    font-size: 100%;
    line-height: 1.75;
    color: var(--color-p);
    color-adjust: economy;
    -webkit-print-color-adjust: economy;
    /* background-color: $white; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &.is-mouse {
      *:focus {
        outline: none;
      }
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  .h1,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6 {
    font-family: var(--font-secondary);
    font-weight: normal;
    margin: 0;
    line-height: 1.25;
  }

  a {
    /* color: var(--black); */
    /* text-decoration-color: var(--red); */
    /* Chrome renders this weird with this font, so we turn it off */
    /* text-decoration-skip-ink: none; */
    text-decoration: none;
    color: inherit;
  }

  .center {
    text-align: center;
  }

  h1,
  .h1 {
    font-size: 3.052rem;
  }

  h2,
  .h2 {
    font-size: 2.441rem;
    &:not(:first-child) {
      margin-top: 2.5rem;
    }
    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }

  h3,
  .h3 {
    font-size: 1.953rem;
    &:not(:first-child) {
      margin-top: 2.5rem;
    }
    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }

  h4,
  .h4 {
    font-size: 1.563rem;
  }

  h5,
  .h5 {
    font-family: var(--font-primary);
    /* font-size: 1.25rem; */
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5;

    &:not(:last-child) {
      margin-bottom: 1em;
    }
  }

  h6,
  .h6 {
    font-family: var(--font-primary);
    font-size: 0.8rem;
    line-height: 1.5;

    &:not(:last-child) {
      margin-bottom: 1em;
    }
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
    margin: 0;

    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }

  blockquote {
    padding-left: 1.5rem;
    border-left: 2px solid var(--grey);

    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }

  .title-line {
    position: relative;
    &::before {
      content: '';
      width: calc(100% - 1rem);
      height: 1px;
      background: var(--grey);
      position: absolute;
      left: -100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  small,
  .small {
    font-size: 0.8rem;
  }

  .bg-light {
    background-color: var(--offwhite);
    color: var(--black);

    a {
      color: var(--black);
    }
  }

  .link-underline {
    position: relative;
    padding-bottom: 5px;
    transition: color var(--transition);
    line-height: 1.5;

    &::before {
      content: '';
      position: absolute;
      width: 0;
      bottom: 0;
      height: 1px;
      transform: translateX(-0.5rem);
      background: currentColor;
      transition: var(--transition);
    }

    &:hover,
    &:focus {
      &:not([disabled]) {
        color: var(--white);
        &::before {
          width: 100%;
          transform: translateX(0);
        }
      }
    }
  }

  .button {
    position: relative;
    padding-bottom: 5px;
    transition: color var(--transition);
    line-height: 1.5;

    &::before {
      content: '';
      position: absolute;
      width: 0;
      bottom: 0;
      height: 1px;
      transform: translateX(-0.5rem);
      background: currentColor;
      transition: var(--transition);
      transition-delay: 0s;
    }

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      bottom: 0;
      left: 0;
      height: 1px;
      background: currentColor;
      transition: var(--transition);
      transition-delay: 0.3s;
    }

    &:hover,
    &:focus {
      &:not([disabled]) {
        color: var(--white);

        &::after {
          opacity: 0;
          transform: translateY(1px);
          transition-delay: 0s;
        }
        &::before {
          width: 100%;
          transform: translateX(0);
          transition-delay: 0.3s;
        }
      }
    }
  }

  button {
    &[disabled] {
      opacity: 0.5;
      cursor: progress;
    }

    &.loading {
    }
  }
`;

export default Typography;
