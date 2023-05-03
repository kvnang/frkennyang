import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

const isExternal = (href: string) => {
  return href.startsWith('http') || href.startsWith('mailto');
};

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    a: ({ children, ...props }) => {
      if (!props.href) return null;

      return (
        <Link
          href={props.href}
          target={isExternal(props.href) ? '_blank' : '_self'}
          rel={isExternal(props.href) ? 'noopener noreferrer' : ''}
          // {...props}
        >
          {children}
        </Link>
      );
    },
    ...components,
  };
}
