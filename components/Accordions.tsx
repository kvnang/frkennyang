"use client";

import React, { CSSProperties, useEffect, useState } from "react";
import { LazyMotion, m } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const loadFeatures = () =>
  import("@/utils/features").then((res) => res.default);

interface AccordionItemHeadProps {
  children?: React.ReactNode;
  id?: string;
  activeAccordionItem?: string | null;
  setActiveAccordionItem?: (v: string | null | undefined) => void;
}

export function AccordionItemHead({
  children,
  id,
  activeAccordionItem,
  setActiveAccordionItem,
}: AccordionItemHeadProps) {
  function handleClick() {
    if (typeof setActiveAccordionItem === "function") {
      setActiveAccordionItem(activeAccordionItem === id ? null : id);
    }
  }

  return (
    <div
      id={`${id}`}
      className={`group pb-4 relative flex items-center justify-between ${
        activeAccordionItem === id ? "active" : ""
      }`}
      aria-controls={`accordion-${id}`}
      aria-expanded={activeAccordionItem === id}
      onClick={() => handleClick()}
      // onKeyDown={() => handleClick()}
      role="button"
      tabIndex={0}
      style={{ cursor: "pointer" }}
    >
      <div className="h-px absolute bottom-0 left-0 transition-transform origin-left w-full bg-gray scale-x-100"></div>
      <div className="h-px absolute bottom-0 left-0 transition-transform origin-left w-full bg-body scale-x-0 group-aria-expanded:scale-x-100"></div>
      <div>{children}</div>
      <ChevronDownIcon className="ml-4 transition-transform h-6 w-6 group-aria-expanded:rotate-180" />
    </div>
  );
}

interface AccordionItemBodyProps {
  children?: React.ReactNode;
  id?: string;
  activeAccordionItem?: string | null;
}

export function AccordionItemBody({
  children,
  id,
  activeAccordionItem,
}: AccordionItemBodyProps) {
  return (
    <m.div
      id={`accordion-${id}`}
      className="accordion__item__body"
      aria-labelledby={`${id}`}
      role="region"
      animate={{ height: activeAccordionItem === id ? "auto" : "0" }}
      style={{ overflow: "hidden", height: 0 }}
    >
      <div
        className="accordion__item__body__inner"
        style={{ paddingTop: "1rem" }}
      >
        {children}
      </div>
    </m.div>
  );
}

interface AccordionItemProps {
  children?: any;
  id?: string;
  activeAccordionItem?: string | null;
  setActiveAccordionItem?: (v: string | null | undefined) => void;
}

export function AccordionItem({
  children,
  id,
  activeAccordionItem,
  setActiveAccordionItem,
}: AccordionItemProps) {
  return (
    <div
      className={`mb-10 last:mb-0 ${
        activeAccordionItem === id ? "accordion__item--active" : ""
      }`}
    >
      {React.Children.map(children, (child) => {
        if (child.type === AccordionItemHead) {
          return (
            <AccordionItemHead
              id={id}
              activeAccordionItem={activeAccordionItem}
              setActiveAccordionItem={setActiveAccordionItem}
            >
              {child.props.children}
            </AccordionItemHead>
          );
        }
        if (child.type === AccordionItemBody) {
          return (
            <AccordionItemBody
              id={id}
              activeAccordionItem={activeAccordionItem}
            >
              {child.props.children}
            </AccordionItemBody>
          );
        }
      })}
    </div>
  );
}

interface AccordionProps {
  children: any;
  style?: CSSProperties;
}

export function Accordion({ children, style }: AccordionProps) {
  const [activeAccordionItem, setActiveAccordionItem] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { hash } = window.location;
      if (hash) {
        const hashId = hash.substr(1);
        setActiveAccordionItem(hashId);
      }
    }
  }, []);

  return (
    <LazyMotion features={loadFeatures}>
      <div className="mb-10 last:mb-0" style={style}>
        {React.Children.map(children, (child) => {
          const id = `${child.props.id}`;
          return (
            <AccordionItem
              id={id}
              activeAccordionItem={activeAccordionItem}
              setActiveAccordionItem={setActiveAccordionItem}
            >
              {child.props.children}
            </AccordionItem>
          );
        })}
      </div>
    </LazyMotion>
  );
}
