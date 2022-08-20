import React, { useContext } from 'react';
import styled from 'styled-components';
import { graphql, HeadProps } from 'gatsby';
import SEO from '../components/Seo';
import InviteForm from '../components/InviteForm';
import LangSwitcher from '../components/LangSwitcher';
import { breakpoints } from '../styles/breakpoints';
import { LangContext } from '../components/LangContext';

interface Props {
  data: {
    en: {
      html: string;
    };
    id?: {
      html: string;
    };
  };
}

const BodyStyles = styled.main`
  .inner {
    --width-xs: 12;
    --width-md: 8;
    --offset-md: 2;
    --width-lg: 6;
    --offset-lg: 3;
  }

  .section-title {
    position: relative;
  }
`;

const IntroStyles = styled.div`
  position: relative;

  .language-switcher {
    margin-bottom: 1rem;

    @media ${breakpoints.tabletL} {
      position: absolute;
      left: -3rem;
      top: 0.5rem;
    }
  }
  .text-content {
    margin-top: 0 !important;
  }
`;

export default function InvitePage({ data }: Props) {
  const { lang } = useContext(LangContext);

  const enHTML = data.en.html;
  const idHTML = data.id?.html;

  const html = lang === 'id' && idHTML ? idHTML : enHTML;

  return (
    <BodyStyles>
      <section className="container page-p-t section-p-b">
        <div className="row">
          <div className="col inner">
            <IntroStyles>
              <LangSwitcher shouldNavigate={false} vertical />
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: html }}
                className="text-content"
              />
            </IntroStyles>
            <InviteForm />
          </div>
        </div>
      </section>
    </BodyStyles>
  );
}

export function Head({ location: { pathname } }: HeadProps) {
  return (
    <SEO
      title="Invite to Speak"
      description="Fr. Kenny is open to invitation to speak at your event on dogmatic theology, faith, spirituality, and others. Fill out the online form to submit your request."
      pathname={pathname}
    />
  );
}

export const query = graphql`
  query {
    en: markdownRemark(
      fields: { collection: { eq: "data" }, slug: { eq: "/invite/" } }
    ) {
      html
    }
    id: markdownRemark(
      fields: { collection: { eq: "data" }, slug: { eq: "/invite.id/" } }
    ) {
      html
    }
  }
`;
