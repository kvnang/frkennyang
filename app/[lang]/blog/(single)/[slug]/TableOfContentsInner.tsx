"use client";

import { PortableText, PortableTextComponents } from "@portabletext/react";
import * as React from "react";

export interface HeadingBlock {
  _key: string;
  children: { text: string; _key: string; _type: string; marks: string[] }[];
  _type: string;
  style: string;
  subheadings?: HeadingBlock[];
}

const components: PortableTextComponents = {
  types: {
    span: ({ value: { text, marks }, ...props }) => {
      if (marks?.includes("em")) {
        return <em>{text}</em>;
      } else if (marks?.includes("strong")) {
        return <strong>{text}</strong>;
      } else if (marks?.includes("underline")) {
        return <u>{text}</u>;
      }

      return <span>{text}</span>;
    },
  },
};

export function TableOfContentsInner({
  headings,
}: {
  headings: HeadingBlock[];
}) {
  const [activeSection, setActiveSection] = React.useState<string | null>(null);

  const handleScroll = () => {
    const sections = document.querySelectorAll<HTMLElement>(
      "main [id^=_heading-ref-]"
    );
    const scrollPosition = window.scrollY;

    const active = Array.from(sections).reduce((acc, curr) => {
      if (curr.offsetTop < scrollPosition + window.innerHeight / 2 && curr.id) {
        return curr.id;
      } else {
        return acc || "";
      }
    }, "");

    setActiveSection(active);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ol className="text-sm -my-1.5">
      {headings.map(({ _key, children, subheadings }) => {
        return (
          // the _key is what markKey refers to in the main text component
          <li id={`_heading-${_key}`} key={_key}>
            <a
              href={`#_heading-ref-${_key}`}
              className="inline-block py-1.5 text-light-gray hover:text-white data-[state=active]:text-accent data-[state=active]:translate-x-1 transition-all"
              data-state={
                activeSection === `_heading-ref-${_key}` ? "active" : ""
              }
            >
              <PortableText value={children} components={components} />
            </a>
            {subheadings && (
              <ol className="pl-4">
                {subheadings.map(({ _key, children }) => {
                  return (
                    <li id={`_heading-${_key}`} key={_key}>
                      <a
                        href={`#_heading-ref-${_key}`}
                        className="inline-block py-1.5 text-gray hover:text-white data-[state=active]:text-accent data-[state=active]:translate-x-1 transition-all"
                        data-state={
                          activeSection === `_heading-ref-${_key}`
                            ? "active"
                            : ""
                        }
                      >
                        <PortableText
                          value={children}
                          components={components}
                        />
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
  );
}
