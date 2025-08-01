import { clientFetch } from "@/lib/sanity.client";
import { HomeFeaturedSlider } from "./HomeFeaturedSlider";
import { ButtonLink } from "./Button";
import type { LangType } from "@/types";

export async function HomeFeatured({ lang }: { lang: LangType }) {
  // Fetch data from Sanity, for posts that have featured image
  const posts = await clientFetch(
    `
    *[_type == "post" && mainImage != null] | order(publishedAt desc) {
      _id, title, slug, excerpt, publishedAt, format->{title}, categories[]->{title}, excerpt, "mainImage": mainImage.asset->
    }[0...8]
  `,
    {},
    {
      next: { tags: ["posts"], revalidate: 300 },
    },
  );

  // const postsEN = data.postsEN.nodes;
  // const postsID = data.postsID.nodes;

  // const { lang } = useContext(LangContext);

  // const posts = lang === 'id' ? postsID : postsEN;

  return (
    <section className="bg-off-white text-darker-gray py-section w-full overflow-x-hidden">
      <div className="container">
        <div className="grid grid-cols-12 gap-x-4">
          <div className="col-span-full lg:col-span-10 lg:col-start-2">
            <div className="lg:pl-[50%]">
              <div className="prose prose-black mb-8">
                <h2 className="title-line">Featured Contents</h2>
                <p>
                  Browse my latest works. Some of them are available in both
                  English and Bahasa Indonesia.
                </p>
              </div>
              <div className="flex justify-between items-center">
                {/* <LangSwitcher shouldNavigate={false} /> */}
                <ButtonLink href="/blog">View All</ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <HomeFeaturedSlider posts={posts} lang={lang} />
      </div>
    </section>
  );
}
