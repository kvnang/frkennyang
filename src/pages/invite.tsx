import React, { useContext } from 'react';
import styled from 'styled-components';
// import DatePicker from 'react-datepicker';
// import DayPickerInput from 'react-day-picker/DayPickerInput';
// import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import SEO from '../components/Seo';
import InviteForm from '../components/InviteForm';
import LangSwitcher from '../components/LangSwitcher';
import { breakpoints } from '../styles/breakpoints';
import { LangContext } from '../components/LangContext';
// import DayPickerStyles from '../styles/DayPickerStyles';
// import 'react-datepicker/dist/react-datepicker.css';
// import 'react-day-picker/lib/style.css';

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

export default function InvitePage({ data }) {
  const { lang } = useContext(LangContext);

  const enHTML = data.en.html;
  const idHTML = data.id.html;

  const html = lang === 'id' ? idHTML : enHTML;

  return (
    <>
      <SEO title="Invite Fr. Kenny to Speak" />
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
    </>
  );
}

export const query = graphql`
  query {
    en: markdownRemark(fields: { slug: { eq: "/invite/" } }) {
      html
    }
    id: markdownRemark(fields: { slug: { eq: "/invite.id/" } }) {
      html
    }
  }
`;
