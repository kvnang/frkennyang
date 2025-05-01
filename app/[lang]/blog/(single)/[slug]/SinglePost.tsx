import * as React from "react";
import type { PostProps, LangType } from "@/types";
import SocialShare from "@/components/SocialShare";
import { formatDate } from "@/utils/helpers";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { Footnotes } from "./Footnotes";
import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/24/outline";
import { TableOfContents } from "./TableOfContents";
import { getDictionary } from "@/lib/dictionaries";
import getYouTubeID from "get-youtube-id";
import { BASE_URL } from "@/lib/constants";
import Balancer from "react-wrap-balancer";

export type FetchPostProps = Omit<PostProps, "content" | "intro"> & {
  introEn: any[];
  introId: any[];
  contentEn: any[];
  contentId: any[];
};

const myPortableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value, isInline }) => {
      const { width, height } = value.asset.metadata.dimensions;

      return (
        <figure>
          <Image
            src={value.asset.url}
            alt={value.alt}
            width={width}
            height={height}
            blurDataURL={value.asset.metadata.lqip}
            placeholder="blur"
            unoptimized
          />
          {value.caption && (
            <figcaption className="text-sm text-left opacity-80 text-body">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    book: ({ value }) => {
      const { bookTitle, bookAuthor, bookDescription, bookImage, url } = value;
      return (
        <div className="not-prose">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col sm:flex-row border-2 bg-dark-gray border-dark-gray hover:border-medium-gray transition-colors"
          >
            <div className="shrink-0 w-full sm:w-36 bg-darker-gray flex items-center justify-center p-4">
              <Image
                src={bookImage.asset.url}
                alt={bookTitle}
                width={bookImage.asset.metadata.dimensions.width}
                height={bookImage.asset.metadata.dimensions.height}
                blurDataURL={bookImage.asset.metadata.lqip}
                placeholder="blur"
                className="w-24 sm:w-32 shadow-md"
                unoptimized
              />
            </div>
            <div className="flex-1 p-6">
              <div className="mb-4">
                <h4 className="text-base font-semibold mb-1">{bookTitle}</h4>
                <div className="text-sm opacity-80">{bookAuthor}</div>
              </div>
              <p className="text-sm">{bookDescription}</p>
            </div>
          </a>
        </div>
      );
    },
    youtube: ({ value }) => {
      const videoId = getYouTubeID(value.url);
      return (
        <div className="w-full relative pb-[56.25%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full border-0"
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      );
    },
    html: ({ value }) => {
      const code = value.code;
      return <div dangerouslySetInnerHTML={{ __html: code }} />;
    },
    table: ({ value }) => {
      const { rows } = value as { rows: { cells: any[]; _key: string }[] };
      const headRow = rows.slice(0, 1)[0];
      const bodyRows = rows.slice(1);

      return (
        <div>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {headRow.cells.map((cell) => {
                  return (
                    <th
                      key={cell._key}
                      className="border border-medium-gray text-left p-4 align-top"
                    >
                      <div className="prose">
                        <PortableText
                          components={myPortableTextComponents}
                          value={cell.text}
                        />
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row) => (
                <tr key={row._key}>
                  {row.cells.map((cell) => (
                    <td
                      key={cell._key}
                      className="border border-medium-gray text-left p-4 align-top"
                    >
                      <div className="prose">
                        <PortableText
                          components={myPortableTextComponents}
                          value={cell.text}
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },

  marks: {
    footnote: ({ text, value, markKey, ...rest }) => {
      return (
        <a id={`footnote-ref-${value._key}`} href={`#footnote-${value._key}`}>
          {text}
        </a>
      );
    },
    link: ({ text, value }) => {
      const href = value.href;
      if (!href) return null;

      const isExternal = href.startsWith("http");
      const target = isExternal ? "_blank" : "_self";
      const rel = isExternal ? "noopener noreferrer" : "";
      return (
        <Link href={href} target={target} rel={rel}>
          {text}
        </Link>
      );
    },
  },

  block: {
    // Add IDs to headings
    h1: ({ children, ...props }) => (
      <h1 id={`_heading-ref-${props.value._key}`}>{children}</h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 id={`_heading-ref-${props.value._key}`}>{children}</h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 id={`_heading-ref-${props.value._key}`}>{children}</h3>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote className="bg-darker-gray-2 py-4 lg:py-8 shadow-md">
        {children}
      </blockquote>
    ),
  },
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
        className="absolute -z-10 h-64 lg:h-72 top-0 bg-gradient-to-b from-bg to-bg opacity-20 w-full left-0"
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
                <PortableText
                  value={content}
                  components={myPortableTextComponents}
                  onMissingComponent={(message, options) => {
                    // myErrorLogger.report(message, {
                    //   // eg `someUnknownType`
                    //   type: options.type,
                    //   // 'block' | 'mark' | 'blockStyle' | 'listStyle' | 'listItemStyle'
                    //   nodeType: options.nodeType,
                    // });
                  }}
                />
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
