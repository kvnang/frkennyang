import React, { CSSProperties, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { BsChevronDown } from 'react-icons/bs';

const AccordionStyles = styled.div`
  &:not(:last-child) {
    margin-bottom: 2.5rem;
  }
`;

const AccordionItemHeadStyles = styled.div`
  padding-bottom: 1rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &::before,
  &::after {
    content: '';
    height: 1px;
    width: 0;
    background-color: var(--grey);
    position: absolute;
    bottom: 0;
    left: 0;
    transition: var(--transition);
  }

  &::before {
    width: 100%;
  }

  &::after {
    z-index: 1;
    background-color: var(--color-p);
  }

  svg {
    margin-left: 1rem;
    transition: var(--transition);
    height: 1.5rem;
    width: auto;
  }

  &.active {
    &::after {
      width: 100%;
    }
    svg {
      transform: rotate(180deg);
    }
  }
`;

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
    <AccordionItemHeadStyles
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
    </AccordionItemHeadStyles>
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
    <AccordionStyles
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
    </AccordionStyles>
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
    <AccordionStyles className="accordion" style={style}>
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
    </AccordionStyles>
  );
}
