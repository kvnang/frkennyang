import { Config } from "tailwindcss";

const config: Config = {
  // content: [
  //   "./components/**/*.{js,ts,jsx,tsx,mdx}",
  //   "./app/**/*.{js,ts,jsx,tsx,mdx}",
  // ],
  // future: {
  //   hoverOnlyWhenSupported: true,
  // },
  theme: {
    fontSize: {
      sm: "var(--font-size-sm)",
      base: "var(--font-size-base)",
      md: "var(--font-size-md)",
      lg: "var(--font-size-lg)",
      xl: "var(--font-size-xl)",
      "2xl": "var(--font-size-2xl)",
      "3xl": "var(--font-size-3xl)",
    },
    extend: {
      spacing: {
        section: "var(--section-padding)",
        page: "var(--section-padding-sm)",
        container: "var(--container-padding)",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": "var(--color-p)",
            "--tw-prose-headings": "var(--color-p)",
            "--tw-prose-bold": "var(--color-p-bright)",
            "--tw-prose-links": "var(--color-p-bright)",
            "--tw-prose-counters": "var(--gray)",
            "--tw-prose-bullets": "var(--gray)",
            "--tw-prose-quotes": "var(--color-p)",
            "--tw-prose-quote-borders": "var(--medium-gray)",
            a: {
              textDecorationColor: "var(--color-accent)",
              textUnderlineOffset: "0.25em",
              "&:hover": {
                color: "var(--color-accent)",
              },
            },
            h1: {
              fontFamily: "var(--font-serif)",
              fontSize: "var(--font-size-2xl)",
              marginTop: "1.5em",
              fontWeight: "400",
            },
            h2: {
              fontFamily: "var(--font-serif)",
              fontSize: "var(--font-size-xl)",
              marginTop: "1.5em",
              fontWeight: "400",
            },
            blockquote: {
              // color: theme('colors.gray.500'),
              fontStyle: "normal",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              borderLeftWidth: "0.25rem",
              quotes: "none",
              "@media (min-width: 1024px)": {
                paddingLeft: "2rem",
                paddingRight: "2rem",
              },
            },
          },
        },

        black: {
          css: {
            "--tw-prose-body": "var(--dark-gray)",
            "--tw-prose-headings": "var(--dark-gray)",
            "--tw-prose-bold": "var(--darker-gray)",
            "--tw-prose-quotes": "var(--dark-gray)",
          },
        },
      }),
    },
  },
};

export default config;
