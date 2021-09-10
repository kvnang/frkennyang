import { graphql, Link, PageProps } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { StaticImage, IGatsbyImageData } from 'gatsby-plugin-image';
import Slider from 'react-slick';
import {
  MdFormatAlignLeft,
  MdInsertDriveFile,
  MdPlayArrow,
} from 'react-icons/md';
import { breakpoints } from '../styles/breakpoints';
import signature from '../assets/images/frk-signature.svg';
import Social from '../components/Social';
import formatDate from '../utils/formatDate';
import toPlainText from '../utils/sanityBlockToPlainText';
import HomeFeaturedMd from '../components/HomeFeaturedMd';
import HomeFeatured from '../components/HomeFeatured';

type PostProps = {
  id: number;
  slug: {
    current: string;
  };
  mainImage: {
    asset: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
  title: string;
  publishedAt: string;
  body: string;
  format: string;
};

type IndexQueryProps = {
  posts: {
    nodes: PostProps[];
  };
};

type IndexPageProps = PageProps<IndexQueryProps>;

const HeroStyles = styled.div`
  background: radial-gradient(
    62.87% 62.87% at 53.33% 37.13%,
    var(--dark-grey) 0%,
    var(--black) 55.75%
  );
  padding-top: 1.5rem;
  width: 100%;
  display: flex;
  align-items: flex-end;

  .container {
    position: relative;
  }

  .hero-text {
    --width-xs: 12;
    --width-sm: 7;
    --width-md: 3;
    --offset-xs: 0;
    --offset-sm: 1;
    --offset-md: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-bottom: 10%;
    position: relative;

    &::before {
      content: none;
      height: 200%;
      width: 1px;
      background-color: var(--grey);
      position: absolute;
      bottom: 0;
      left: -1rem;
      opacity: 0.5;

      @media ${breakpoints.tablet} {
        content: '';
      }
    }

    .button-group {
      display: flex;
      flex-flow: wrap;
      margin: -0.5rem;

      .button {
        margin: 0.5rem;
      }
    }
  }

  .signature {
    width: 50%;
    position: absolute;
    opacity: 0.4;
    order: 9;
    transform: translateY(calc(100% + 1.6rem));

    @media ${breakpoints.tablet} {
      position: static;
      width: 15rem;
      margin-left: -3.5rem;
      margin-bottom: 1.75rem;
      opacity: 1;
      order: 0;
      transform: translateY(0);
    }
  }

  .title {
    @media ${breakpoints.tablet} {
      display: none;
    }
  }

  .hero-image {
    --width-xs: 12;
    --width-md: 4;
    --offset-md: 1;
    height: auto;
    display: flex;
    justify-content: flex-end;
    margin-top: -3.5rem;

    @media ${breakpoints.tablet} {
      margin-top: -22rem;
    }

    @media ${breakpoints.laptop} {
      margin-top: 0;
      margin-top: 0;
    }

    .gatsby-image-wrapper {
      width: 60%;
      transform: translateX(30%);

      @media ${breakpoints.tablet} {
        width: 50%;
      }

      @media ${breakpoints.laptop} {
        width: 100%;
        max-width: 400px;
        transform: translateX(0);
      }
    }
  }

  .social {
    right: auto;
    left: 0;

    @media ${breakpoints.laptop} {
      left: auto;
      right: 0;
    }
  }
`;

const ContactStyles = styled.div`
  @media ${breakpoints.laptop} {
    background-color: var(--offwhite);
    margin: -1px 0;
  }

  + footer {
    background-color: var(--offwhite);
    color: var(--black);

    .col {
      --width-xs: 12;
      --width-md: 10;
      --offset-md: 1;
    }
  }

  .container {
    position: relative;
  }

  .inner {
    --width-xs: 12;
    --width-md: 10;
    --offset-md: 1;
    background-color: var(--black);
    padding-top: var(--section-padding);
    padding-bottom: var(--section-padding);
    position: relative;
  }

  .form-wrapper {
    @media ${breakpoints.laptop} {
      margin-left: 40%;
      margin-right: 10%;
    }
  }

  .contact-img {
    display: none;
    width: calc(30% + 10% + 2.5vw);
    margin-left: calc(-10% - 2.5vw);
    position: absolute;
    top: var(--section-padding);
    left: 0;
    height: 100%;
    z-index: 1;

    @media ${breakpoints.laptop} {
      display: block;
    }

    &::before {
      content: '';
      height: 100%;
      width: calc(100% - 20% - 2.5vw);
      position: absolute;
      z-index: -1;
      top: -1rem;
      right: -1rem;
      background-color: var(--grey);
      opacity: 0.25;
    }

    .gatsby-image-wrapper {
      height: 100%;
    }
  }

  .social {
    display: none;

    @media ${breakpoints.laptop} {
      display: flex;
    }
  }
`;

const FormStyles = styled.div`
  margin-top: 3.5rem;

  form {
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
  }

  input,
  textarea {
    background: transparent;
    border: 1px solid var(--white);
    padding: 0.75rem 1.25rem;
    color: var(--white);
    width: 100%;

    &::placeholder {
      opacity: 1;
      color: var(--white);
      transition: var(--transition);
    }

    &:focus {
      &::placeholder {
        opacity: 0.5;
      }
    }
  }

  textarea {
    resize: vertical;
    height: 9rem;
  }

  button[type='submit'] {
    margin-left: auto;
    display: block;
  }
`;

export default function HomePage({ data }: IndexPageProps) {
  return (
    <>
      <HeroStyles>
        <div className="container">
          <div className="row">
            <div className="hero-text col">
              <img src={signature} alt="Fr. Kenny Ang" className="signature" />
              <h1 className="h2 title">Hi, I’m Father Kenny</h1>
              <p>
                Hi, I’m Father Kenny, a Catholic priest serving in Surabaya,
                Indonesia. Lorem ipsum dolor sit amet consectetur adipiscing
                elit.
              </p>
              <div className="button-group">
                <Link to="/about" className="button">
                  Read My Bio
                </Link>
                <Link to="/about" className="button">
                  CV
                </Link>
              </div>
            </div>
            <div className="hero-image col">
              <StaticImage
                src="../assets/images/frk-halfbody.png"
                alt=""
                loading="eager"
              />
            </div>
          </div>
          <Social />
        </div>
      </HeroStyles>
      <HomeFeaturedMd />
      <HomeFeatured />
      <ContactStyles>
        <div className="container">
          <div className="row">
            <div className="col inner">
              <div className="contact-img">
                <StaticImage src="../assets/images/frk-contact.jpg" alt="" />
              </div>
              <div className="form-wrapper">
                <h2>Contact</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
                <h4>
                  <a
                    href="mailto:email@example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline link-underline--cta"
                  >
                    email@example.com
                  </a>
                </h4>
                <FormStyles>
                  <form action="/">
                    <div className="form-field half">
                      <label htmlFor="name" className="visually-hidden">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                      />
                    </div>
                    <div className="form-field half">
                      <label htmlFor="email" className="visually-hidden">
                        Email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                      />
                    </div>
                    <div className="form-field">
                      <label htmlFor="message" className="visually-hidden">
                        Message
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        placeholder="Message"
                      />
                    </div>
                    <div className="form-field">
                      <button type="submit" className="button">
                        Send
                      </button>
                    </div>
                  </form>
                </FormStyles>
              </div>
            </div>
          </div>
          <Social dark />
        </div>
      </ContactStyles>
    </>
  );
}