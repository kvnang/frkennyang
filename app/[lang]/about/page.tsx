import AboutFrKenny from "./about-fr-kenny.md";
import AboutWebsite from "./about-website.md";
import Image from "next/image";
import bioImage from "@/assets/images/frk-bio.jpg";
import { getMetadata } from "@/lib/metadata";
import { type ResolvingMetadata } from "next";
import { type LangType } from "@/types";

export async function generateMetadata(
  { params }: { params: { lang: LangType } },
  parent: ResolvingMetadata
) {
  return getMetadata(
    {
      title: "About",
      pathname: "/about",
      description:
        "Fr. Kenny Ang is a Catholic priest from Indonesia who was ordained in 2019 and has spoken in numerous occasions across Asia and America.",
    },
    await parent
  );
}

const components = {
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="title-line">{children}</h2>
  ),
};

export default function AboutPage() {
  return (
    <main>
      <section className="pt-page pb-section">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-4">
            <div className="col-span-6 md:col-span-3 lg:col-span-4 lg:col-start-2 mb-10">
              <div className="relative z-0">
                <div className="w-full h-full absolute -z-10 -bottom-4 -right-4 bg-gray opacity-25"></div>
                <Image src={bioImage} alt="Fr. Kenny Ang" />
              </div>
            </div>
            <div className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-5 lg:col-start-7">
              <div className="prose">
                <AboutFrKenny />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-section">
        <div className="container">
          <div className="grid grid-cols-12 gap-x-4">
            <div className="col-span-full lg:col-span-6 lg:col-start-4">
              <div className="prose">
                <AboutWebsite components={components} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
