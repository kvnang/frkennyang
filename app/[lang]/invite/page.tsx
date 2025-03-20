import InviteForm from "@/components/InviteForm";
import PageContent from "./invite.md";
import PageContentId from "./invite.id.md";
import { getMetadata } from "@/lib/metadata";
import { type LangType } from "@/types";
import { type ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ lang: LangType }> },
  parent: ResolvingMetadata,
) {
  return getMetadata(
    {
      title: "Invite to Speak",
      pathname: "/invite",
      description:
        "Fr. Kenny is open to invitation to speak at your event on dogmatic theology, faith, spirituality, and others. Fill out the online form to submit your request.",
    },
    await parent,
  );
}

export default async function InvitePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <main className="page-invite">
      <section className="container pt-page pb-section">
        <div className="grid grid-cols-12 gap-x-4">
          <div className="col-span-full lg:col-span-8 lg:col-start-3 xl:col-span-6 xl:col-start-4">
            <div className="relative">
              <div className="prose">
                {lang === "id" ? <PageContentId /> : <PageContent />}
              </div>
            </div>
            <InviteForm />
          </div>
        </div>
      </section>
    </main>
  );
}
