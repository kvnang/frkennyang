import * as React from "react";
import InviteForm from "@/components/InviteForm";
import PageContent from "./invite.md";
import PageContentId from "./invite.id.md";

export default function InvitePage({ params }: { params: { lang: string } }) {
  return (
    <main className="page-invite">
      <section className="container pt-page pb-section">
        <div className="grid grid-cols-12 gap-x-4">
          <div className="col-span-full lg:col-span-8 lg:col-start-3 xl:col-span-6 xl:col-start-4">
            <div className="relative">
              <div className="prose">
                {params.lang === "id" ? <PageContentId /> : <PageContent />}
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
