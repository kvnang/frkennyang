import Social from "@/components/Social";
import { HomeFeatured } from "@/components/HomeFeatured";
import ContactForm from "@/components/ContactForm";
import Image from "next/image";
import heroImage from "@/assets/images/frk-halfbody.png";
import signature from "@/assets/images/frk-signature.svg";
import contactImage from "@/assets/images/frk-contact.jpg";
import { ButtonLink } from "@/components/Button";
import type { LangType } from "@/types";

export default async function HomePage(props: {
  params: Promise<{ lang: LangType }>;
}) {
  const params = await props.params;
  return (
    <main>
      <div
        className="pt-5 flex items-end"
        style={{
          background: `radial-gradient(63% 63% at 53% 37%, var(--dark-gray) 0%, var(--darker-gray) 56%)`,
        }}
      >
        <div className="container overflow-hidden">
          <div className="relative">
            <div className="grid grid-cols-12 gap-x-4">
              <div className="col-span-12 lg:col-span-5 lg:col-start-2 2xl:col-span-4 2xl:col-start-3">
                <div className="flex flex-col justify-end mb-[10%] relative md:pr-10 lg:pr-0">
                  <div className="h-[200%] w-[1px] bg-gray absolute bottom-0 -left-4 opacity-50 hidden md:block" />
                  <Image
                    src={signature}
                    alt="Fr. Kenny Ang"
                    className="max-lg:w-1/2 max-lg:absolute max-lg:opacity-40 max-lg:order-9 max-lg:translate-y-[calc(100%+3rem)] w-60 lg:-ml-14 lg:mb-7"
                    width="240"
                    height="202"
                    priority
                  />
                  <div className="mb-6 prose">
                    <h1>Heaven is your final destination.</h1>
                    <p>
                      <strong>Hi, I’m Father Kenny.</strong> Thanks for stopping
                      by! This site is here to provide tools and insights to
                      support your faith journey—feel free to explore!
                    </p>
                  </div>
                  <div className="flex flex-wrap -mx-4 -my-3 max-w-[90%] md:max-w-none">
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
              <div className="col-span-12 md:col-span-5 md:col-start-8 xl:col-span-4 xl:col-start-8">
                <div className="h-[calc(100%+2rem)] flex justify-end items-end -mt-8 md:h-full md:mt-0">
                  <div className="w-3/5 -mr-[20%] md:w-[130%] md:-mr-[30%] lg:mr-0 lg:w-full">
                    <Image
                      src={heroImage}
                      alt="Fr. Kenny Ang"
                      className="w-full"
                      priority
                      sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 30vw, (min-width: 768px) 40vw, 60vw"
                    />
                  </div>
                </div>
              </div>
            </div>
            <Social className="max-md:hidden max-lg:right-auto max-lg:left-0" />
          </div>
        </div>
      </div>
      <HomeFeatured lang={params.lang} />
      <div id="contact" className="xl:bg-off-white">
        <div className="container">
          <div className="relative z-0">
            <div className="grid grid-cols-12 gap-x-4">
              <div className="bg-darker-gray col-span-full lg:col-span-10 lg:col-start-2 relative pt-section">
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
