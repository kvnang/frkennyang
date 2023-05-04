import type { PostProps } from "@/types";
import { PortableText } from "@portabletext/react";

export function Footnotes({
  content,
}: {
  content: PostProps["content"]["en"];
}) {
  const blocks = content;

  const notes = blocks
    // filter out everything that's not a text block
    .filter(({ _type }) => _type === "block")
    // make an array of the mark definitions of those blocks
    .reduce((acc, curr) => {
      return [...acc, ...curr.markDefs];
    }, [])
    // find all the footnote mark definitions
    .filter(({ _type }: { _type: string }) => _type === "footnote");

  if (!notes.length) return null;

  return (
    <div className="pt-6 mt-6 border-t border-gray text-sm">
      <ol>
        {notes.map(({ _key, text, ...rest }: { _key: string; text: any }) => {
          return (
            // the _key is what markKey refers to in the main text component
            <li id={`footnote-${_key}`} key={_key}>
              <PortableText value={text} />
              {/* <a href={`#_footnote-ref-${_key}`} className="inline">
                <ArrowUturnLeftIcon className="inline w-3 h-3" />
              </a> */}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
