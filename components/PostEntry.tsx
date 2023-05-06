import * as React from "react";
import { MdFormatAlignLeft, MdPlayArrow } from "react-icons/md";
import type { PostEntryProps, LangType } from "@/types";
import { formatDate } from "@/utils/helpers";
import Image from "next/image";
import placeholderImage from "@/assets/images/placeholder.jpg";
import Link from "next/link";

interface SkeletonProps {
  showImage?: boolean;
  format?: "default" | "list" | "featured";
}

export function PostEntry({
  post,
  showImage = true,
  showExcerpt,
  format = "default",
  siteLang,
}: {
  post: PostEntryProps;
  showImage?: boolean;
  showExcerpt?: boolean;
  format?: "default" | "list" | "featured";
  siteLang?: LangType | null;
}) {
  let icon;

  switch (format.toLowerCase()) {
    case "video":
      icon = <MdPlayArrow className="w-full h-full" title="video" />;
      break;
    case "article":
      icon = <MdFormatAlignLeft className="w-full h-full" title="article" />;
      break;
    default:
      icon = "";
  }

  // const onlyAvailableInLabel =
  //   post.fields.lang === 'en' ? 'Only in' : 'Hanya dalam bahasa';

  const meta = [];
  if (post.publishedAt) {
    meta.push(formatDate(post.publishedAt));
  }
  // if (format === 'list' && post.format) {
  //   meta.push(post.format);
  // }
  const categories = post.categories;
  // if (post.timeToRead) {
  //   meta.push(`${post.timeToRead.toString()} min read`);
  // }

  return (
    <article>
      <div
        className={`relative z-0 flex group ${
          format === "list" || format === "featured"
            ? "flex-col md:flex-row"
            : "flex-col"
        }`}
      >
        {showImage && (
          <div
            className={`${
              format === "list" ? "order-1 w-24 md:w-48 shrink-0 ml-6" : "mb-4"
            } ${
              format === "featured"
                ? "w-full md:w-[32rem] md:max-w-[50%] shrink-0 md:mr-10"
                : ""
            }`}
          >
            <div className="w-full h-0 relative pb-[56.25%] z-0 group-hover:shadow-md transition-all">
              <div className="w-full h-full absolute top-0 left-0 bg-gray opacity-20 transition-all"></div>
              <Image
                src={post.mainImage?.url || placeholderImage}
                alt={post.title.en}
                placeholder="blur"
                blurDataURL={post.mainImage?.metadata?.lqip}
                fill
              />
            </div>
          </div>
        )}
        <div className="flex-1">
          <p className="mb-2 opacity-80">
            <small>{meta.join(" ∙ ")}</small>
          </p>
          <h3
            className={`font-semibold mb-[0.5em] last:mb-0 ${
              format === "featured" ? "text-lg" : "text-md"
            }`}
          >
            <Link
              href={`/blog/${post.slug?.current}`}
              className="hover:text-accent transition-colors"
            >
              <div className="absolute top-0 left-0 w-full h-full z-10"></div>
              {post.title.en}
            </Link>
          </h3>
          {showExcerpt && (
            <div
              className={`mb-[0.5em] ${
                format === "list" ? "max-md:hidden" : ""
              }`}
              style={{
                display: "-webkit-box",
                WebkitLineClamp: format === "list" ? 2 : 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              <p>{post.excerpt.en || ""}</p>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export function PostEntrySkeleton({
  showImage = true,
  format = "default",
}: SkeletonProps) {
  return (
    <article>
      <div
        className={`relative z-0 flex group ${
          format === "list" ? "" : "flex-col"
        }`}
      >
        {showImage && (
          <div
            className={`${
              format === "list" ? "order-1 w-24 md:w-48 shrink-0 ml-6" : "mb-4"
            }`}
          >
            <div className="skeleton-bg" />
          </div>
        )}
        <div className="flex-1">
          <h3
            className={`text-md font-semibold mb-[0.5em] skeleton-bg ${
              format === "featured" ? "text-lg" : "text-md"
            }`}
          >
            &nbsp;
          </h3>
          <div
            className={`mb-[0.5em] ${
              format === "list" ? "max-md:hidden" : ""
            } skeleton-bg`}
          >
            &nbsp;
            <br />
            &nbsp;
          </div>
          <p className="skeleton-bg w-1/2">
            <small>&nbsp;</small>
          </p>
        </div>
      </div>
    </article>
  );
}

// export const query = graphql`
//   fragment MarkdownRemarkFields on MarkdownRemark {
//     id
//     excerpt
//     frontmatter {
//       title
//       format
//       date(formatString: "YYYY-MM-DDTHH:mm:ss.SSS")
//       excerpt
//       featuredImage {
//         childImageSharp {
//           gatsbyImageData(
//             aspectRatio: 1.777778
//             layout: CONSTRAINED
//             placeholder: BLURRED
//             width: 480
//           )
//         }
//       }
//       lang
//     }
//     fields {
//       slug
//       lang
//     }
//     timeToRead
//   }
// `;
