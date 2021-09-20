import * as styled from 'styled-components';
import { breakpoints } from './breakpoints';
import { inlineLink } from './Typography';

const GlobalStyles = styled.createGlobalStyle`
  :root {
    --black: #2f2f2f;
    --dark-grey: #3f3f3f;
    --gold: #e2a93a;
    --white: #fff;
    --offwhite: #f5f2ed;
    --offwhite-light: #ddd4c5;
    --grey: #a9a9a9;
    --color-p: var(--offwhite);
    --color-p-light: var(--offwhite);
    --color-bg: var(--black);
    --color-accent: var(--gold);
    --color-error: #f05d5e;
    --color-success: #7dce82;
    --transition: 0.35s cubic-bezier(0.77, 0, 0.175, 1);
    --letter-spacing: 0.1rem;
    --section-padding: 2.5rem;
    --section-padding-sm: 1.25rem;
    --font-primary: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
    --font-secondary: 'Playfair Display', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
    --font-size-small: 0.833rem;
    --font-size-h2: 2.074rem;
    --font-size-h3: 1.728rem;
    --font-size-h4: 1.44rem;
    --font-size-h5: 1rem;
    --p-spacing: 1.5em;

    /* Grid proportions */
    --gutter: 14px;

    /* Container Width */
    --container-width: 90vw;

    --post-gap: 0.33rem;

    @media ${breakpoints.tablet} {
      --section-padding: 3rem;
      --section-padding-sm: 1.5rem;
      --font-size-small: 0.8rem;
      --font-size-h2: 2.441rem;
      --font-size-h3: 1.953rem;
      --font-size-h4: 1.563rem;
      --post-gap: 0.5rem;
    }

    @media ${breakpoints.laptop} {
      --section-padding: 3rem;
      --section-padding-sm: 1.5rem;
      --gutter: 20px;
      --container-width: 95vw;
    }

    @media ${breakpoints.laptopL} {
      --section-padding: 5rem;
      --section-padding-sm: 2.5rem;
    }

    @media ${breakpoints.desktop} {
      --container-width: 1660px;
    }
  }

  * {
    margin: 0;
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
  }

  html {
    &.no-scroll {
      &,
      body {
        overflow: hidden;
      }
    }
  }

  body {
    font-family: var(--font-primary);
    color: var(--color-p);
    background-color: var(--color-bg);
    /* overflow-y: hidden; */

    .site-wrapper {
      overflow: hidden;
    }

    .site {
      background-color: var(--color-bg);
      display: flex;
      flex-direction: column;
      min-height: 100vh;

      .site-content {
        flex: 1;
      }
    }
  }

  @media (hover: hover) {
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      background-color: var(--bg-color);
    }

    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    ::-webkit-scrollbar-thumb {
      background-color: var(--color-p);
      border-radius: 3px;

      &:hover {
        background-color: var(--gold);
      }
    }
  }

  button {
    cursor: pointer;
    border: 0;
    background-color: transparent;
    color: inherit;
    padding: 0;
  }

  img,
  figure {
    max-width: 100%;
  }

  // Spacing Styles
  .section-p {
    padding-top: var(--section-padding);
    padding-bottom: var(--section-padding);

    &-t {
      padding-top: var(--section-padding);
    }

    &-b {
      padding-bottom: var(--section-padding);
    }
  }

  .page-p {
    padding-top: var(--section-padding-sm);
    padding-bottom: var(--section-padding-sm);

    &-t {
      padding-top: var(--section-padding-sm);
    }

    &-b {
      padding-bottom: var(--section-padding-sm);
    }
  }

  // Form Styles
  form {
    width: 100%;
  }

  input,
  textarea,
  select {
    font-family: var(--font-primary);
    font-size: 1rem;
  }
  input[type='text'],
  input[type='tel'],
  input[type='email'],
  input[type='url'],
  input[type='password'],
  input[type='search'],
  input[type='number'],
  input[type='date'],
  input[type='time'],
  .DayPickerInput input,
  textarea,
  select {
    appearance: none;
    background: var(--dark-grey);
    border: 1px solid var(--dark-grey);
    padding: 0.75rem 1.25rem;
    color: var(--color-p);
    width: 100%;
    transition: var(--transition);
    line-height: 1.5;

    &::placeholder {
      color: var(--grey);
      transition: var(--transition);
    }

    &:focus {
      /* border-color: var(--color-p); */
      box-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
      &::placeholder {
        opacity: 0.75;
      }
    }

    &[aria-invalid='true'] {
      border: 1px solid var(--color-error);
    }
  }

  input[type='date'],
  input[type='time'] {
    min-height: 3.25em; // iOS Safari Bug
    &::-webkit-calendar-picker-indicator {
      /* opacity: 0; */
      filter: invert(0.75);
      cursor: pointer;
      transition: filter var(--transition);

      &:hover {
        filter: invert(1);
      }
    }
  }

  /* ::-webkit-calendar-picker-indicator {
   filter: invert(0.5) sepia(1) saturate(5) hue-rotate(175deg);
} */

  .select-wrapper {
    position: relative;

    &::after {
      content: '';
      pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='%23fff' d='M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z'/%3E%3C/svg%3E");
      background-position: center center;
      background-repeat: no-repeat;
      background-size: contain;
      height: 1.5rem;
      width: 1.5rem;
      position: absolute;
      top: 50%;
      right: 0.5rem;
      transform: translateY(-50%);
    }

    select {
      appearance: none;
      cursor: pointer;
    }
  }

  select:invalid {
    color: var(--grey);
  }

  textarea {
    resize: vertical;
    height: 9rem;
  }

  fieldset {
    border: 0;
    padding: 0;

    &[aria-invalid='true'] {
      input[type='radio'] + span::before {
        background-color: var(--color-error);
      }
    }

    legend {
      line-height: 1.5;
    }
  }

  .radio-group {
    &__radio {
      display: flex;
      flex-flow: wrap;
      margin: -0.5rem;

      > label {
        padding: 0.5rem;
        cursor: pointer;
      }
    }
  }

  input[type='radio'] {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;

    + span {
      position: relative;
      padding-left: 1.5em;

      &::before,
      &::after {
        content: '';
        position: absolute;
        height: 1em;
        width: 1em;
        background-color: var(--dark-grey);
        border-radius: 50%;
        top: 0.125em;
        left: 0;
      }

      &::after {
        height: 0.6em;
        width: 0.6em;
        background-color: var(--white);
        top: 0.325em;
        left: 0.2em;
        opacity: 0;
        transform: scale(0);
        transition: var(--transition);
      }
    }

    &:checked + span {
      &::after {
        opacity: 1;
        transform: scale(1);
      }
    }
  }

  .form-fields {
    display: flex;
    flex-flow: wrap;
    margin: -0.5rem;
  }

  .form-field {
    position: relative;
    padding: 0.5rem;
    width: 100%;

    &.half {
      @media ${breakpoints.tablet} {
        width: 50%;
      }
    }

    &.heading {
      &:not(:first-of-type) {
        margin-top: 1.5rem;
      }
    }

    &.submit {
      text-align: right;
    }
  }

  .form-description {
    a {
      ${inlineLink()};
    }
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

  .gatsby-image-wrapper img[src*='base64\\,'] {
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
