import React, { CSSProperties, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BsChevronDown } from 'react-icons/bs';

interface AccordionItemHeadProps {
  children?: React.ReactNode;
  id?: string;
  activeAccordionItem?: string | null;
  setActiveAccordionItem?: Function;
}

export function AccordionItemHead({
  children,
  id,
  activeAccordionItem,
  setActiveAccordionItem,
}: AccordionItemHeadProps) {
  function handleClick() {
    if (typeof setActiveAccordionItem === 'function') {
      setActiveAccordionItem(activeAccordionItem === id ? null : id);
    }
  }

  return (
    <div
      id={`${id}`}
      className={`accordion__item__head ${
        activeAccordionItem === id ? 'active' : ''
      }`}
      aria-controls={`accordion-${id}`}
      aria-expanded={activeAccordionItem === id}
      onClick={() => handleClick()}
      onKeyPress={() => handleClick()}
      role="button"
      tabIndex={0}
      style={{ cursor: 'pointer' }}
    >
      <div>{children}</div>
      <BsChevronDown />
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
    <motion.div
      id={`accordion-${id}`}
      className="accordion__item__body"
      aria-labelledby={`${id}`}
      role="region"
      animate={{ height: activeAccordionItem === id ? 'auto' : '0' }}
      style={{ overflow: 'hidden', height: 0 }}
    >
      <div
        className="accordion__item__body__inner"
        style={{ paddingTop: '1rem' }}
      >
        {children}
      </div>
    </motion.div>
  );
}

interface AccordionItemProps {
  children?: any;
  id?: string;
  activeAccordionItem?: string | null;
  setActiveAccordionItem?: Function;
}

export function AccordionItem({
  children,
  id,
  activeAccordionItem,
  setActiveAccordionItem,
}: AccordionItemProps) {
  return (
    <div
      className={`accordion__item ${
        activeAccordionItem === id ? 'accordion__item--active' : ''
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
    null
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { hash } = window.location;
      if (hash) {
        const hashId = hash.substr(1);
        setActiveAccordionItem(hashId);
      }
    }
  }, []);

  return (
    <div className="accordion" style={style}>
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
  );
}
