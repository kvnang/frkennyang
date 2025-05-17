"use client";

import * as React from "react";
import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Link from "next/link";
import getYouTubeID from "get-youtube-id";
import { TypedObject } from "@sanity/types";

const myPortableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
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
    footnote: ({ text, value, markKey, ..._rest }) => {
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
    blockquote: ({ children, isInline, renderNode, ...props }) => (
      <blockquote
        className="bg-darker-gray-2 py-4 lg:py-8 shadow-md"
        {...props}
      >
        {children}
      </blockquote>
    ),
  },
};

export function PostPortableText({
  value,
}: {
  value: TypedObject | TypedObject[];
}) {
  return (
    <PortableText
      value={value}
      components={myPortableTextComponents}
      onMissingComponent={() => {
        // myErrorLogger.report(message, {
        //   // eg `someUnknownType`
        //   type: options.type,
        //   // 'block' | 'mark' | 'blockStyle' | 'listStyle' | 'listItemStyle'
        //   nodeType: options.nodeType,
        // });
      }}
    />
  );
}
