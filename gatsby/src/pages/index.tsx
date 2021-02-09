import { graphql, Link, PageProps } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Img, { FluidObject } from 'gatsby-image';
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

type PostProps = {
  id: number;
  slug: {
    current: string;
  };
  mainImage: {
    asset: {
      fluid: FluidObject;
    };
  };
  title: string;
  publishedAt: string;
  body: string;
  format: string;
};

type IndexQueryProps = {
  heroImage: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  contactImage: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
  sampleImage: {
    childImageSharp: {
      fluid: FluidObject;
    };
  };
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

  .posts-wrapper {
    --width-xs: 12;
    --width-md: 10;
    --offset-md: 1;
    margin-top: 2.5rem;
  }

  .posts {
    display: flex;
    margin: 0 -2.5%;
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
    padding: 0 calc(2.5 / 105 * 100%);

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
  const posts = data.posts.nodes;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

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
              <Img
                fluid={data.heroImage.childImageSharp.fluid}
                alt=""
                loading="eager"
              />
            </div>
          </div>
          <Social />
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
          <div className="posts-wrapper col">
            <div className="posts">
              <Slider {...settings}>
                {posts.map((post) => {
                  let icon;
                  switch (post.format) {
                    case 'video':
                      icon = <MdPlayArrow />;
                      break;
                    case 'article':
                      icon = <MdFormatAlignLeft />;
                      break;
                    default:
                      icon = '';
                  }
                  return (
                    <div key={post.id} className="post">
                      <a
                        href={`/post/${post.slug.current}`}
                        className="post-inner"
                      >
                        <div className="post-img">
                          {post.mainImage ? (
                            <Img
                              fluid={post.mainImage.asset.fluid}
                              alt={post.title}
                            />
                          ) : (
                            ''
                          )}
                          {post.format ? (
                            <div className="post-format">{icon}</div>
                          ) : (
                            ''
                          )}
                        </div>
                        <div className="post-details">
                          <h3 className="post-title h4">{post.title}</h3>
                          <p className="post-excerpt">
                            {post.body
                              ? `${toPlainText(post.body)
                                  .split(' ')
                                  .splice(0, 20)
                                  .join(' ')}\u00A0...`
                              : ''}
                          </p>
                          <p className="post-date">
                            <small>{formatDate(post.publishedAt)}</small>
                          </p>
                        </div>
                      </a>
                    </div>
                  );
                })}
              </Slider>
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
          <Social dark />
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
    sampleImage: file(relativePath: { eq: "sample-img.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    posts: allSanityPost(limit: 9, sort: { fields: publishedAt, order: DESC }) {
      nodes {
        id
        slug {
          current
        }
        title
        format
        mainImage {
          asset {
            fluid(maxWidth: 450, maxHeight: 250) {
              ...GatsbySanityImageFluid
            }
          }
        }
        _rawBody(resolveReferences: { maxDepth: 10 })
        body {
          _key
          _rawChildren
          _type
          children {
            marks
            text
            _key
            _type
          }
          list
          style
        }
        publishedAt
      }
    }
  }
`;
