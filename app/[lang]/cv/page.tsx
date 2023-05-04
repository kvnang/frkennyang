import * as React from "react";
import Image from "next/image";
import cvImage from "@/assets/images/frk-cv.jpg";
import CvContent from "./cv.md";
import { Accordions } from "./Accordions";

export default function CvPage() {
  return (
    <main className="page-cv">
      <section className="container pt-page pb-section relative z-0 overflow-hidden">
        <div className="grid grid-cols-12 gap-x-4">
          <div className="col-span-6 md:col-span-4 lg:col-span-4 lg:col-start-2 mb-10">
            <div className="md:pt-10">
              <div className="relative z-0">
                <div className="w-full h-full absolute -z-10 -bottom-4 -left-4 bg-gray opacity-25"></div>
                <Image src={cvImage} alt="" />
              </div>
            </div>
          </div>
          <div className="col-span-full md:col-span-7 md:col-start-6 lg:col-span-5 lg:col-start-7">
            <div className="md:pt-section pb-10 relative lg:pb-16 text-darker-gray h-full">
              <div className="absolute h-[calc(100%+6rem)] md:h-full -top-24 md:top-0 w-screen -left-container -z-10 bg-off-white md:-left-1/2"></div>
              <div className="prose prose-black">
                <CvContent />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container pb-section">
        <div className="grid grid-cols-12 gap-x-4">
          <div className="col-span-12 lg:col-span-8 lg:col-start-3 xl:col-span-6 xl:col-start-4">
            <Accordions />
          </div>
        </div>
      </section>
    </main>
  );
}

// export function Head({ location: { pathname } }: HeadProps) {
//   return (
//     <SEO
//       title="Curriculum Vitae"
//       description="Fr. Kenny's online Curriculum Vitae features his biograhical data and educational history, as well as professional experience."
//       pathname={pathname}
//     />
//   );
// }

// export const query = graphql`
//   query {
//     cv: markdownRemark(
//       fields: { collection: { eq: "data" }, slug: { eq: "/cv/" } }
//     ) {
//       html
//     }
//     cvList: markdownRemark(
//       fields: { collection: { eq: "data" }, slug: { eq: "/cvList/" } }
//     ) {
//       htmlAst
//     }
//   }
// `;
