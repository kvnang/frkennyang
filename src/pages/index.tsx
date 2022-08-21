import { HeadProps, Link } from 'gatsby';
import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import signature from '../assets/images/frk-signature.svg';
import Social from '../components/Social';
import HomeFeaturedMd from '../components/HomeFeaturedMd';
import ContactForm from '../components/ContactForm';
import SEO from '../components/Seo';
import HomeWydFeatured from '../components/HomeWydFeatured';

export default function HomePage() {
  return (
    <main>
      <div className="hero">
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
              <h1 className="title">Heaven is your final destination.</h1>
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
      </div>
      <HomeWydFeatured />
      <HomeFeaturedMd />
      <div className="contact" id="contact">
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
                <h3 style={{ margin: 0 }}>
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
      </div>
    </main>
  );
}

export function Head({ location: { pathname } }: HeadProps) {
  return (
    <SEO
      title="A Catholic Priest serving the Universal Church"
      pathname={pathname}
    />
  );
}
