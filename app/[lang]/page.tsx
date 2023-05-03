import Social from "@/components/Social";
import { HomeFeatured } from "@/components/HomeFeatured";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import heroImage from "@/assets/images/frk-halfbody.png";
import signature from "@/assets/images/frk-signature.svg";
import contactImage from "@/assets/images/frk-contact.jpg";
import { ButtonLink } from "@/components/Button";

// export function Head({ location: { pathname } }: HeadProps) {
//   return (
//     <SEO
//       title="A Catholic Priest serving the Universal Church"
//       pathname={pathname}
//     />
//   );
// }

export default function HomePage() {
  return (
    <main>
      <div
        className="pt-5 flex items-end"
        style={{
          background: `radial-gradient(
          62.87% 62.87% at 53.33% 37.13%,
          var(--dark-grey) 0%,
          var(--black) 55.75%
        )`,
        }}
      >
        <div className="container">
          <div className="relative">
            <div className="grid grid-cols-12 gap-x-4">
              <div className="col-span-12 md:col-span-7 md:col-start-2 lg:col-span-5 lg:col-start-2 2xl:col-span-4 2xl:col-start-3">
                <div className="flex flex-col justify-end mb-[10%] relative md:pr-10 lg:pr-0">
                  <div className="h-[200%] w-[1px] bg-gray absolute bottom-0 -left-4 opacity-50 hidden md:block" />
                  <Image
                    src={signature}
                    alt="Fr. Kenny Ang"
                    className="max-md:w-1/2 max-md:absolute max-md:opacity-40 max-md:order-9 max-md:translate-y-[calc(100%+1.6rem)] w-60 md:-ml-14 md:mb-7"
                    width="240"
                    height="202"
                  />
                  <div className="mb-6 prose">
                    <h1 className="">Heaven is your final destination.</h1>
                    <p>
                      <strong>Hi, I’m Father Kenny.</strong> As a priest, I
                      provide you with resources to help you grow in your faith.
                      Check them out!
                    </p>
                  </div>
                  <div className="flex flex-wrap -mx-4 -my-3 max-w-[80%] md:max-w-none">
                    <div className="mx-4 my-3">
                      <ButtonLink href="/about" className="button">
                        Read My Bio
                      </ButtonLink>
                    </div>
                    <div className="mx-4 my-3">
                      <ButtonLink href="/blog" className="button">
                        Browse Contents
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-4 md:col-start-9 xl:col-span-3 xl:col-start-9">
                <div className="h-full flex justify-end items-end -mt-8 md:mt-0">
                  <div className="w-3/5 -mr-[20%] md:w-[130%] md:-mr-[30%] lg:mr-0 lg:w-full">
                    <Image
                      src={heroImage}
                      alt=""
                      className="w-full"
                      // placeholder="none"
                      // objectFit="contain"
                      // objectPosition="50% 100%"
                      // layout="constrained"
                      // width={380}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Social className="max-md:hidden max-lg:right-auto max-lg:left-0" />
          </div>
        </div>
      </div>
      {/* @ts-expect-error */}
      <HomeFeatured />
      <div id="contact" className="xl:bg-off-white">
        <div className="container">
          <div className="relative z-0">
            <div className="grid grid-cols-12 gap-x-4">
              <div className="bg-black col-span-full lg:col-span-10 lg:col-start-2 relative pt-section">
                <div className="grid grid-cols-10 gap-x-4">
                  <div className="hidden xl:flex col-span-3">
                    <div className="flex-1 -ml-[calc(35%+var(--container-padding))]">
                      <div className="w-full h-full relative">
                        <div className="absolute top-0 left-0 w-full h-full translate-x-4 -translate-y-4 bg-gray opacity-20"></div>
                        <Image
                          src={contactImage}
                          alt="Fr. Kenny Ang"
                          fill
                          className="object-cover"
                          style={{ objectPosition: "50% 25%" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-full xl:col-span-5 xl:col-start-5">
                    <div className="pb-section">
                      <div className="mb-12">
                        <div className="prose mb-8">
                          <h2>Contact</h2>
                          <p>
                            Feel free to reach out to me via email or the
                            contact form.
                          </p>
                        </div>
                        <h3 className="text-md font-serif">
                          <ButtonLink
                            href="mailto:fatherkennyang@gmail.com"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            fatherkennyang@gmail.com
                          </ButtonLink>
                        </h3>
                      </div>
                      <ContactForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Social dark className="hidden lg:flex" />
          </div>
        </div>
      </div>
    </main>
  );
}
