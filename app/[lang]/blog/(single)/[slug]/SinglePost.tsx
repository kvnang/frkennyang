import * as React from "react";
import type { PostProps, LangType } from "@/types";
import SocialShare from "@/components/SocialShare";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Footnotes } from "./Footnotes";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { TableOfContents } from "./TableOfContents";
import { getDictionary } from "@/lib/dictionaries";
import { BASE_URL } from "@/lib/constants";
import Balancer from "react-wrap-balancer";
import { formatDate } from "@/utils/helpers";
import { PostPortableText } from "./PostPortableText";

export type FetchPostProps = Omit<PostProps, "content" | "intro"> & {
  introEn: any[];
  introId: any[];
  contentEn: any[];
  contentId: any[];
};

export function SinglePost({
  post,
  params,
  dictionary,
}: {
  post: FetchPostProps;
  params: { lang: LangType };
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
}) {
  const normalizedPost: PostProps = {
    ...post,
    intro: {
      en: post.introEn,
      id: post.introId,
    },
    content: {
      en: post.contentEn,
      id: post.contentId,
    },
  };

  const categories = normalizedPost.categories;
  const meta = [];
  if (normalizedPost.publishedAt)
    meta.push(formatDate(normalizedPost.publishedAt));
  if (categories?.length) meta.push(categories.map((c) => c.title).join(", "));

  const title =
    params.lang === "id" && normalizedPost.title.id
      ? normalizedPost.title.id
      : normalizedPost.title.en;
  const content =
    params.lang === "id" && normalizedPost.content.id
      ? normalizedPost.content.id
      : normalizedPost.content.en;
  const intro =
    params.lang === "id" && normalizedPost.intro.id
      ? normalizedPost.intro.id
      : normalizedPost.intro.en;

  const dominantColor = post.mainImage?.metadata.palette?.dominant?.background;

  return (
    <div className="pt-page mb-section relative z-0">
      <div
        className="absolute -z-10 h-64 lg:h-72 top-0 bg-linear-to-b from-bg to-bg opacity-20 w-full left-0"
        style={
          {
            "--tw-gradient-from": `${
              dominantColor || "var(--color-accent)"
            } var(--tw-gradient-from-position)`,
          } as React.CSSProperties
        }
      />
      <section className="container">
        <div className="grid grid-cols-12 gap-x-4">
          <div className="col-span-full xl:col-span-10 xl:col-start-2 mb-section">
            <div className="mb-8">
              <Link
                href={`/${params.lang}/blog`}
                className="inline-flex items-center -mx-3 px-3 py-1 text-sm rounded-full group opacity-80 hover:opacity-100 transition-opacity"
              >
                <ArrowLongLeftIcon className="w-4 h-4 shrink-0 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to Blog
              </Link>
            </div>
            <div className="mb-6">
              <div className="flex flex-wrap items-center -m-2">
                {/* Categories */}
                {!!categories?.length && (
                  <div className="p-2">
                    <div className="flex flex-wrap items-center -m-1">
                      {categories.map((category) => (
                        <Link
                          key={category.title}
                          href={`/${params.lang}/blog/category/${category.slug.current}`}
                          className="text-sm rounded-full px-3 py-1 bg-dark-gray m-1 border border-darker-gray hover:bg-darker-gray"
                        >
                          {category.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {/* Date */}
                {!!post.publishedAt && (
                  <div className="p-2">
                    <div className="text-gray text-sm">
                      {formatDate(post.publishedAt)}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* <LangSwitcher vertical /> */}
            <div className="prose" style={{ maxWidth: "none" }}>
              <h1 className="max-w-prose leading-snug">
                <Balancer>{title}</Balancer>
              </h1>
            </div>
            {intro && (
              <div className="max-w-4xl mt-10">
                <div className="font-normal text-md prose">
                  <PortableText value={intro}></PortableText>
                </div>
              </div>
            )}
          </div>
          <div className="col-span-full lg:col-span-8 xl:col-span-7 xl:col-start-2 order-1 lg:order-none">
            {/* {post.frontmatter.lang && post.frontmatter.lang !== lang && (
            <div className="only-available-in">
              {post.frontmatter.lang === 'en' && <UsFlag />}
              {post.frontmatter.lang === 'id' && <IndonesiaFlag />}
              {lang === 'en' && (
                <p>
                  This article is only available in{' '}
                  <strong>Bahasa Indonesia</strong>.
                </p>
              )}
              {lang === 'id' && (
                <p>
                  Artikel ini hanya tersedia di dalam{' '}
                  <strong>bahasa Ingris</strong>.
                </p>
              )}
            </div>
          )} */}
            <main>
              {post.mainImage && (
                <div className="-mx-container mb-10 lg:mx-0 ">
                  <div className="relative w-full pb-[56.25%] overflow-hidden">
                    <Image
                      src={post.mainImage.url}
                      priority
                      alt={title}
                      fill
                      blurDataURL={post.mainImage.metadata.lqip}
                      placeholder="blur"
                      sizes="(min-width: 1024px) 62vw, (min-width: 1280px) 56vw, (min-width: 1750px) 962px, 100vw"
                      unoptimized
                    />
                  </div>
                </div>
              )}
              <div className="prose">
                <PostPortableText value={content} />
                <Footnotes content={content} />
              </div>
            </main>
          </div>
          <div className="col-span-12 lg:col-span-4 xl:col-span-3 mb-section lg:mb-0">
            <aside className="flex lg:pl-8 lg:ml-4 lg:border-l lg:border-l-medium-gray lg:sticky lg:top-12">
              <div className="flex-1 flex flex-wrap -my-4 -mx-2">
                <section className="py-4 px-2 basis-full lg:basis-full empty:hidden">
                  <TableOfContents
                    label={dictionary.blog.toc}
                    content={content}
                  />
                </section>
                <section className="py-4 px-2 ml-auto lg:ml-0 lg:basis-full empty:hidden">
                  <SocialShare
                    title={title}
                    url={new URL(
                      `/${params.lang}/blog/${post.slug.current}`,
                      BASE_URL,
                    ).toString()}
                    label="Share this article"
                  />
                </section>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
