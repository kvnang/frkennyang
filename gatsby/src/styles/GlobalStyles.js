import { createGlobalStyle } from 'styled-components';
import { breakpoints } from './breakpoints';

const GlobalStyles = createGlobalStyle`
  :root {
    --black: #2F2F2F;
    --dark-grey: #3F3F3F;
    --gold: #E2A93A;
    --white: #fff;
    --offwhite: #F5F2ED;
    --grey: #A9A9A9;
    --transition: 0.5s cubic-bezier(.77,0,.175,1);
    --letter-spacing: 0.1rem;
    --section-padding: 5rem;
    --section-padding-sm: 2.5rem;

    /* Grid proportions */
    --gutter: 14px;

    /* Container Width */
    --container-width: 90vw;
  }

  @media ${breakpoints.laptop} {
    :root {
      --gutter: 20px;
      --container-width: 95vw;
    }
  }

  @media ${breakpoints.desktop} {
    :root {
      --container-width: 1660px;
    }
  }

  * {
    box-sizing: border-box;
  }

  button {
    cursor: pointer;
    border: 0;
    background-color: transparent;
    color: inherit;
  }

  html, body {
    overflow-x: hidden;
    background-color: var(--black);
  }

  body {
    overflow: hidden;
  }

  img {
    max-width: 100%;
  }

  .visually-hidden:not(:focus):not(:active) {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  .gatsby-image-wrapper img[src*="base64\\,"] {
    /* image-rendering: -moz-crisp-edges;
    image-rendering: pixelated; */
    filter: blur(20px);
    -webkit-filter: blur(20px);
    transform: scale(1);
  }

  .container {
    width: var(--container-width);
    margin-right: auto;
    margin-left: auto;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    flex: 0 1 auto;
    margin-right: calc(-1 * var(--gutter) / 2);
    margin-left: calc(-1 * var(--gutter) / 2);
  }

  .col {
    --columns: 12; /* Number of columns in the grid system */
    --width: var(--width-xs, 0); /* Width of the element */
    --offset: var(--offset-xs, 0);
    
    padding-right: calc(var(--gutter) / 2);
    padding-left: calc(var(--gutter) / 2);
    flex-basis: calc(var(--width) / var(--columns) * 100%);
    max-width: calc(var(--width) / var(--columns) * 100%);
    margin-left: calc(var(--offset) / var(--columns) * 100%);
  }

  @media ${breakpoints.tablet} {
    .col {
      --width-sm: var(--width-xs);
      --width: var(--width-sm);
      --offset-sm: var(--offset-xs);
      --offset: var(--offset-sm);
    }
  }

  @media ${breakpoints.laptop} {
    .col {
      --width-md: var(--width-sm);
      --width: var(--width-md);
      --offset-md: var(--offset-sm);
      --offset: var(--offset-md);
    }
  }

  @media ${breakpoints.desktop} {
    .col {
      --width-lg: var(--width-md);
      --width: var(--width-lg);
      --offset-lg: var(--offset-md);
      --offset: var(--offset-lg);
    }
  }
  
`;

export default GlobalStyles;
