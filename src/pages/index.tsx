import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';
import { Helmet } from 'react-helmet';
import { breakpoints } from '../styles/breakpoints';
import signature from '../assets/images/frk-signature.svg';
import Social from '../components/Social';
import HomeFeaturedMd from '../components/HomeFeaturedMd';
import ContactForm from '../components/ContactForm';
import SEO from '../components/Seo';

const HeroStyles = styled.section`
  background: radial-gradient(
    62.87% 62.87% at 53.33% 37.13%,
    var(--dark-grey) 0%,
    var(--black) 55.75%
  );
  padding-top: 1.25rem;
  width: 100%;
  display: flex;
  align-items: flex-end;

  .container {
    position: relative;
  }

  .hero-text {
    --width-xs: 12;
    --width-sm: 7;
    --width-md: 5;
    --width-lg: 4;
    --offset-xs: 0;
    --offset-sm: 1;
    --offset-md: 1;
    --offset-lg: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin-bottom: 10%;
    position: relative;

    @media ${breakpoints.tabletL} {
      padding-right: 2.5rem;
    }
    @media ${breakpoints.laptop} {
      padding-right: 0;
    }
    @media ${breakpoints.laptopL} {
      --offset-md: 2;
      --width-md: 4;
    }

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
      margin: -0.5rem -1rem;
      max-width: 80%;

      @media ${breakpoints.tablet} {
        max-width: initial;
      }

      .button {
        margin: 0.5rem 1rem;
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
      min-width: 15rem;
      margin-left: -3.5rem;
      margin-bottom: 1.75rem;
      opacity: 1;
      order: 0;
      transform: translateY(0);
    }
  }

  .title {
    margin-top: 0;
  }

  .hero-image {
    --width-xs: 12;
    --width-md: 4;
    --offset-md: 1;
    height: auto;
    display: flex;
    justify-content: flex-end;
    overflow: visible;
    margin-top: -3.5rem;

    @media ${breakpoints.tablet} {
      margin-top: -22rem;
    }

    @media ${breakpoints.tabletL} {
      margin-top: -34rem;
    }

    @media ${breakpoints.laptop} {
      margin-top: 0;
      max-width: 400px;
      min-width: 350px;
    }

    .gatsby-image-wrapper {
      width: 60%;
      transform: translateX(30%);

      @media ${breakpoints.tablet} {
        width: 50%;
      }

      @media ${breakpoints.laptop} {
        width: 100%;

        transform: translateX(0);
      }
    }
  }

  .social {
    right: auto;
    left: 0;
    display: none;

    @media ${breakpoints.tablet} {
      display: flex;
    }

    @media ${breakpoints.laptop} {
      left: auto;
      right: 0;
    }
  }
`;

const ContactStyles = styled.section`
  @media ${breakpoints.laptop} {
    background-color: var(--offwhite);
    margin: -1px 0;
  }

  .container {
    position: relative;
  }

  .inner {
    --width-xs: 12;
    --width-md: 10;
    --offset-md: 1;
    background-color: var(--black);

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
    height: calc(100% - var(--section-padding) + 3.5rem);
    z-index: 1;

    @media ${breakpoints.laptop} {
      display: block;
    }

    @media ${breakpoints.desktop} {
      width: calc(30% + 5% + 2.5vw);
      margin-left: calc(-5% - 2.5vw);
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

export default function HomePage() {
  return (
    <main>
      <SEO title="A Catholic Priest serving the Universal Church" />
      <Helmet bodyAttributes={{ class: 'page-home footer-light' }} />
      <HeroStyles>
        <div className="container">
          <div className="row">
            <div className="hero-text col">
              <img
                src={signature}
                alt="Fr. Kenny Ang"
                className="signature"
                width="240"
                height="202"
              />
              <h1 className="h2 title">Heaven is your final destination.</h1>
              <p>
                <strong>Hi, I’m Father Kenny.</strong> As a priest, I provide
                you with resources to help you grow in your faith. Check them
                out!
              </p>
              <div className="button-group">
                <Link to="/about/" className="button">
                  Read My Bio
                </Link>
                <Link to="/contents/" className="button">
                  Browse Contents
                </Link>
              </div>
            </div>
            <div className="hero-image col">
              <StaticImage
                src="../assets/images/frk-halfbody.png"
                alt=""
                placeholder="none"
                objectFit="contain"
                objectPosition="50% 100%"
              />
            </div>
          </div>
          <Social />
        </div>
      </HeroStyles>
      <HomeFeaturedMd />
      <ContactStyles id="contact">
        <div className="container">
          <div className="row">
            <div className="col inner section-p-t section-p-b">
              <div className="contact-img">
                <StaticImage src="../assets/images/frk-contact.jpg" alt="" />
              </div>
              <div className="form-wrapper">
                <h2>Contact</h2>
                <p>
                  Feel free to reach out to me via email or the contact form.
                </p>
                <h3 className="h4" style={{ margin: 0 }}>
                  <a
                    href="mailto:fatherkennyang@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                  >
                    fatherkennyang@gmail.com
                  </a>
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
          <Social dark />
        </div>
      </ContactStyles>
    </main>
  );
}
