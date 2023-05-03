import type { PostProps } from '@/types';
import { PortableText, PortableTextComponents } from '@portabletext/react';

interface HeadingBlock {
  _key: string;
  children: { text: string; _key: string; _type: string; marks: string[] }[];
  _type: string;
  style: string;
  subheadings?: HeadingBlock[];
}

const components: PortableTextComponents = {
  types: {
    span: ({ value: { text, marks }, ...props }) => {
      if (marks?.includes('em')) {
        return <em>{text}</em>;
      } else if (marks?.includes('strong')) {
        return <strong>{text}</strong>;
      } else if (marks?.includes('underline')) {
        return <u>{text}</u>;
      }

      return <span>{text}</span>;
    },
  },
};

export function TableOfContents({
  label,
  content,
}: {
  label: string;
  content: PostProps['content']['en'];
}) {
  const blocks = content;

  const headings = blocks
    // filter out everything that's not a heading block
    .filter(({ _type }) => _type === 'block')
    // Find style heading
    .filter(({ style }) => {
      return style === 'h2' || style === 'h3';
    }) as Omit<HeadingBlock, 'subheadings'>[];

  // Group headings by hierarchy, e.g. make h3s children of h2s with key "subheadings"
  const groupedHeadings = headings.reduce((acc, curr) => {
    if (curr.style === 'h2') {
      return [...acc, { ...curr, subheadings: [] }];
    } else if (curr.style === 'h3') {
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

  return (
    <div>
      <h2 className="text-base font-bold mb-4">{label}</h2>
      <div className="flex">
        <ol className="text-sm -my-1.5">
          {groupedHeadings.map(({ _key, children, subheadings }) => {
            return (
              // the _key is what markKey refers to in the main text component
              <li id={`_heading-${_key}`} key={_key}>
                <a
                  href={`#_heading-ref-${_key}`}
                  className="inline-block py-1.5 hover:text-accent transition-colors"
                >
                  {/* {children[0].text} */}
                  <PortableText
                    value={children}
                    components={components}
                  ></PortableText>
                </a>
                {subheadings && (
                  <ol className="pl-4 text-gray">
                    {subheadings.map(({ _key, children }) => {
                      return (
                        <li id={`_heading-${_key}`} key={_key}>
                          <a
                            href={`#_heading-ref-${_key}`}
                            className="inline-block py-1.5 hover:text-accent transition-colors"
                          >
                            <PortableText
                              value={children}
                              components={components}
                            ></PortableText>
                            {/* {children[0].text} */}
                          </a>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
