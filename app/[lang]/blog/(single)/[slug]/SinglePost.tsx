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

export type FetchPostProps = Omit<PostProps, "content"> & {
  contentEn: any[];
  contentId: any[];
};

const myPortableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value, isInline }) => {
      const { width, height } = value.asset.metadata.dimensions;

      return (
        <Image
          src={value.asset.url}
          alt={value.alt}
          width={width}
          height={height}
          blurDataURL={value.asset.metadata.lqip}
          placeholder="blur"
        />
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

  return (
    <div className="pt-page mb-section">
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
                          className="text-sm rounded-full px-3 py-1 bg-dark-gray m-1"
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
            <div className="prose max-w-5xl" style={{ maxWidth: "none" }}>
              <h1 className="max-w-prose">{title}</h1>
              <h3 className="max-w-prose font-normal">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
                neque ratione aliquid, ut consequatur a libero officiis! Eum a
                facilis repellat nesciunt neque eius autem quis. Voluptatum
                voluptatibus culpa autem?
              </h3>
            </div>
          </div>
          <div className="col-span-full lg:col-span-8 xl:col-span-7 xl:col-start-2">
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
              {post.mainImageUrl && (
                <div className="mb-10">
                  <div className="relative w-full pb-[56.25%] overflow-hidden">
                    <Image src={post.mainImageUrl} alt={title} fill />
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
          <div className="col-span-12 lg:col-span-4 xl:col-span-3">
            <aside className="pl-8 ml-4 border-l border-l-gray sticky top-12">
              <section className="mb-10 last:mb-0">
                <TableOfContents
                  label={dictionary.blog.toc}
                  content={content}
                />
              </section>
              <section className="mb-10 last:mb-0">
                <SocialShare
                  title={title}
                  url={`/post/${dictionary}`}
                  label="Share this article"
                />
              </section>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
