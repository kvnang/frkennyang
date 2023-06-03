import type { PostProps } from "@/types";
import { PortableText } from "@portabletext/react";

export function Footnotes({
  content,
}: {
  content: PostProps["content"]["en"];
}) {
  const blocks = content;

  const notes = [];

  for (const block of blocks) {
    if (!["block", "table"].includes(block._type)) {
      continue;
    }

    if (block._type === "table") {
      // Traverse the table cells
      for (const row of block.rows) {
        for (const cell of row.cells) {
          for (const child of cell.text) {
            if (!["block"].includes(child._type)) {
              continue;
            }
            const markDefs = child.markDefs;
            if (markDefs) {
              for (const markDef of markDefs) {
                if (markDef._type === "footnote") {
                  notes.push(markDef);
                }
              }
            }
          }
        }
      }
    } else if (block._type === "block") {
      // Traverse the block text
      for (const markDef of block.markDefs) {
        if (markDef._type === "footnote") {
          notes.push(markDef);
        }
      }
    }
  }

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
