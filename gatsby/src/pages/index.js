import { graphql, Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { breakpoints } from '../styles/breakpoints';
import signature from '../assets/images/frk-signature.svg';

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
`;

const FeaturedStyles = styled.div`
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

      h2 {
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

          @media ${breakpoints.laptop} {
            left: -100%;
          }
        }
      }
    }
  }
`;

const ContactStyles = styled.div`
  @media ${breakpoints.laptop} {
    background-color: var(--offwhite);
    margin: -1px 0;
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
    width: calc(30% + 10%);
    margin-left: -10%;
    position: absolute;
    top: var(--section-padding);
    left: 0;
    height: 100%;

    @media ${breakpoints.laptop} {
      display: block;
    }

    .gatsby-image-wrapper {
      height: 100%;
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

export default function HomePage({ data }) {
  return (
    <>
      <HeroStyles>
        <div className="container ">
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
              <Img
                fluid={data.heroImage.childImageSharp.fluid}
                alt=""
                critical="true"
              />
            </div>
          </div>
        </div>
      </HeroStyles>
      <FeaturedStyles className="bg-light">
        <div className="container">
          <div className="title col">
            <div className="inner">
              <h2>Featured Contents</h2>
              <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
            </div>
          </div>
        </div>
      </FeaturedStyles>
      <ContactStyles>
        <div className="container">
          <div className="row">
            <div className="col inner">
              <div className="contact-img">
                <Img fluid={data.contactImage.childImageSharp.fluid} alt="" />
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
        </div>
      </ContactStyles>
    </>
  );
}

export const query = graphql`
  query {
    heroImage: file(relativePath: { eq: "frk-halfbody.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    contactImage: file(relativePath: { eq: "frk-contact.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
