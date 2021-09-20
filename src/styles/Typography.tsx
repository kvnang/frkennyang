import * as styled from 'styled-components';
import { breakpoints } from './breakpoints';

export const titleLine = () => styled.css`
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
`;

export const inlineLink = () => styled.css`
  text-decoration: underline;
  text-decoration-color: var(--color-accent);
  text-decoration-thickness: 1px;
  text-underline-offset: 5px;
  transition: color var(--transition);

  &:hover,
  &:focus {
    color: var(--color-accent);
  }
`;

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

    &[href^='mailto'] {
      word-break: break-all;
    }
  }

  .center {
    text-align: center;
  }

  h1,
  .h1 {
    font-size: 2.488rem;

    @media ${breakpoints.tablet} {
      font-size: 3.052rem;
    }

    &:not(:first-child) {
      margin-top: 1em;
    }

    &:not(:last-child) {
      margin-bottom: 0.75em;
    }
  }

  h2,
  .h2 {
    font-size: var(--font-size-h2);

    &:not(:first-child) {
      margin-top: 1em;
    }

    &:not(:last-child) {
      margin-bottom: 0.75em;
    }
  }

  h3,
  .h3 {
    font-size: var(--font-size-h3);

    &:not(:first-child) {
      margin-top: 1em;
    }

    &:not(:last-child) {
      margin-bottom: 0.75em;
    }
  }

  h4,
  .h4 {
    font-size: var(--font-size-h4);

    &:not(:first-child) {
      margin-top: 1em;
    }

    &:not(:last-child) {
      margin-bottom: 0.75em;
    }
  }

  h5,
  .h5 {
    font-family: var(--font-primary);
    /* font-size: 1.25rem; */
    font-size: var(--font-size-h5);
    font-weight: 600;
    line-height: 1.5;

    &:not(:last-child) {
      margin-bottom: 1em;
    }
  }

  h6,
  .h6 {
    font-family: var(--font-primary);
    font-size: var(--font-size-small);
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
      margin-bottom: var(--p-spacing);
    }
  }

  blockquote {
    padding-left: 1rem;
    position: relative;

    @media ${breakpoints.tablet} {
      padding-left: 1.5rem;
    }

    &::before {
      content: '“';
      font-family: var(--font-secondary);
      font-size: 5rem;
      font-weight: 700;
      position: absolute;
      top: 0;
      left: 0;
      line-height: 1;
      color: var(--color-accent);
      transform: translate(-66%, -25%);
      opacity: 0.5;

      @media ${breakpoints.tablet} {
        font-size: 6.25rem;
      }
    }

    &:not(:last-child) {
      margin-bottom: var(--p-spacing);
    }
  }

  .title-line {
    ${titleLine()}
  }

  small,
  .small {
    font-size: var(--font-size-small);
  }

  .bg-light {
    background-color: var(--offwhite);
    --color-p: var(--black);
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
        color: var(--color-p);

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

  .text-content {
    ul,
    ol {
      &:not(:last-child) {
        margin-bottom: var(--p-spacing);
      }
      li {
        &:not(:last-child) {
          margin-bottom: var(--p-spacing);
        }
      }
    }

    hr {
      margin: var(--p-spacing) 0;
      border-color: var(--grey);
      border-width: 1px;
    }

    a {
      ${inlineLink()};
    }

    // Table
    table {
      border-collapse: collapse;

      &:not(:last-child) {
        margin-bottom: var(--p-spacing);
      }

      td,
      th {
        padding: 0.5rem;
        border-bottom: 1px solid var(--grey);
      }

      thead {
        th {
          background-color: var(--dark-grey);
          border-bottom: 0;
        }
      }
    }

    // Gatsby Image
    .gatsby-resp-image-wrapper {
      max-width: initial !important;

      // Caption
      & + em {
        display: block;
        /* max-width: 50%; */
        margin-left: auto;
        text-align: right;
        font-style: normal;
        padding: 0.5rem 0 0;
        /* border-bottom: 1px solid var(--grey); */
        font-size: var(--font-size-small);
      }
    }

    .gatsby-img-attributes {
      &[style*='float'] {
        width: 100%;
        max-width: 45%;
        margin: 0.25rem 1rem 1rem 0;

        @media ${breakpoints.mobileOnly} {
          float: none !important;
          margin: 0 !important;
          max-width: 100%;
        }
      }

      &[style*='float: right'] {
        margin-left: 1rem;
        margin-right: 0;
      }
    }

    // Footnote

    .footnotes {
      font-size: var(--font-size-small);
    }

    a.footnote-ref,
    a.footnote-backref {
      text-decoration: none;
      color: var(--gold);
      font-weight: bold;
    }

    // Title link
    a.anchor svg {
      fill: var(--color-accent);
      height: 1rem;
      width: auto;
    }
  }
`;

export default Typography;
