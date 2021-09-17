import styled from 'styled-components';
import { breakpoints } from './breakpoints';

export const HomeFeaturedStyles = styled.div`
  padding-top: var(--section-padding);
  padding-bottom: var(--section-padding);

  .title {
    --width-xs: 12;
    --width-md: 10;
    --offset-md: 1;

    .inner {
      @media ${breakpoints.laptop} {
        padding-left: 50%;
      }
    }
  }

  .posts-wrapper {
    --width-xs: 12;
    --width-md: 10;
    --offset-md: 1;
    margin-top: 2.5rem;
  }

  .posts {
    display: flex;
    margin: 0 -0.5rem;
  }

  .slick-slider {
    width: 100%;

    .slick-track {
      display: flex;
    }

    .slick-dots {
      list-style: none;
      padding-left: 0;
      text-align: right;
      margin: 1rem -0.5rem 0;

      li {
        display: inline-block;
        padding: 0.5rem;

        button {
          color: transparent;
          text-indent: -9999px;
          height: 0.5rem;
          width: 0.5rem;
          background-color: var(--grey);
          border-radius: 50%;
          padding: 0;
          transition: var(--transition);

          &:hover,
          &:focus {
            background-color: var(--gold);
          }
        }

        &.slick-active {
          button {
            background-color: var(--black);
          }
        }
      }
    }
  }

  .post {
    width: 35%;
    flex: 0 0 35%;
    padding: 0 0.5rem;

    .post-inner {
      display: flex;
      flex-direction: column;

      &:hover,
      &:focus {
        .post-title {
          color: var(--gold);
        }
        .post-img {
          .gatsby-image-wrapper {
            transform: translate(-0.5rem, -0.5rem);
          }
          &::before {
            opacity: 0.7;
          }
        }
      }
    }

    .post-img {
      position: relative;

      .gatsby-image-wrapper {
        transition: var(--transition);
      }

      &::before {
        content: '';
        height: 100%;
        width: 100%;
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        background: var(--grey);
        opacity: 0.2;
        transition: var(--transition);
      }

      .post-format {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2.5rem;
        width: 2.5rem;
        background-color: var(--black);
        padding: 0.5rem;

        svg {
          color: var(--white);
          height: 100%;
          width: auto;
        }
      }
    }

    .post-img,
    .post-title,
    .post-excerpt {
      margin-bottom: 0.5rem;
    }

    .post-title {
      transition: var(--transition);
    }

    .post-excerpt {
      color: var(--black);
    }
  }
`;
