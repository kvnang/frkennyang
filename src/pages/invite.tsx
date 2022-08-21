import React, { useContext } from 'react';
import { graphql, HeadProps } from 'gatsby';
import SEO from '../components/Seo';
import InviteForm from '../components/InviteForm';
import LangSwitcher from '../components/LangSwitcher';
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

export default function InvitePage({ data }: Props) {
  const { lang } = useContext(LangContext);

  const enHTML = data.en.html;
  const idHTML = data.id?.html;

  const html = lang === 'id' && idHTML ? idHTML : enHTML;

  return (
    <main className="main">
      <section className="container page-p-t section-p-b">
        <div className="row">
          <div className="col inner">
            <div className="intro">
              {/* <LangSwitcher shouldNavigate={false} vertical /> */}
              <div
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: html }}
                className="text-content"
              />
            </div>
            <InviteForm />
          </div>
        </div>
      </section>
    </main>
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
