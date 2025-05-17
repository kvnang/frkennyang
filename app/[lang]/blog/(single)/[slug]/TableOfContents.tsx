import type { PostProps } from "@/types";
import {
  TableOfContentsInner,
  type HeadingBlock,
} from "./TableOfContentsInner";

export function TableOfContents({
  label,
  content,
}: {
  label: string;
  content: PostProps["content"]["en"];
}) {
  const blocks = content;

  const headings = blocks
    // filter out everything that's not a heading block
    .filter(({ _type }) => _type === "block")
    // Find style heading
    .filter(({ style }) => {
      return style === "h2" || style === "h3";
    }) as Omit<HeadingBlock, "subheadings">[];

  // Group headings by hierarchy, e.g. make h3s children of h2s with key "subheadings"
  const groupedHeadings = headings.reduce((acc, curr) => {
    if (curr.style === "h2") {
      return [...acc, { ...curr, subheadings: [] }];
    } else if (curr.style === "h3") {
      const lastHeading = acc[acc.length - 1];
      if (lastHeading.subheadings) {
        lastHeading.subheadings.push(curr);
        return acc;
      } else {
        lastHeading.subheadings = [curr];
        return acc;
      }
    }

    return acc;
  }, [] as HeadingBlock[]);

  if (!groupedHeadings.length) return null;

  return (
    <div className="w-full">
      <TableOfContentsInner label={label} headings={groupedHeadings} />
    </div>
  );
}
