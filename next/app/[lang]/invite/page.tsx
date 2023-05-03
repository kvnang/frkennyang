import React, { useContext } from 'react';
// import SEO from '../components/Seo';
import InviteForm from '@/components/InviteForm';
import LangSwitcher from '@/components/LangSwitcher';
import { LangContext } from '@/components/LangContext';
import PageContent from './invite.md';
import PageContentId from './invite.id.md';

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

export default function InvitePage({ lang }: { lang: string }) {
  // const { lang } = useContext(LangContext);

  // const enHTML = data.en.html;
  // const idHTML = data.id?.html;

  // const html = lang === 'id' && idHTML ? idHTML : enHTML;

  return (
    <main className="page-invite">
      <section className="container pt-page pb-section">
        <div className="grid grid-cols-12 gap-x-4">
          <div className="col-span-full lg:col-span-8 lg:col-start-3 xl:col-span-6 xl:col-start-4">
            <div className="relative">
              {/* <div className="mb-4 lg:absolute lg:-left-12 lg:top-2">
                <LangSwitcher shouldNavigate={false} vertical />
              </div> */}
              <div className="prose">
                {lang === 'id' ? <PageContentId /> : <PageContent />}
              </div>
            </div>
            <InviteForm />
          </div>
        </div>
      </section>
    </main>
  );
}

// export function Head({ location: { pathname } }: HeadProps) {
//   return (
//     <SEO
//       title="Invite to Speak"
//       description="Fr. Kenny is open to invitation to speak at your event on dogmatic theology, faith, spirituality, and others. Fill out the online form to submit your request."
//       pathname={pathname}
//     />
//   );
// }
