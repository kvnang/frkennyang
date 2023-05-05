const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "var(--container-padding)",
      screens: {
        xs: "100%",
        md: "100%",
        lg: "100%",
        xl: "100%",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      body: "var(--color-p)",
      bg: "var(--color-bg)",
      gold: "var(--gold)",
      black: "var(--black)",
      white: "var(--white)",
      gray: "var(--gray)",
      "darker-gray-2": "var(--darker-gray-2)",
      "darker-gray": "var(--darker-gray)",
      "dark-gray": "var(--dark-gray)",
      "medium-gray": "var(--medium-gray)",
      "light-gray": "var(--light-gray)",
      active: "var(--color-active)",
      accent: "var(--color-accent)",
      "off-white": "var(--offwhite)",
      error: "var(--color-error)",
    },
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
      screens: {
        "3xl": "1750px",
      },
      fontFamily: {
        serif: [
          "var(--font-playfair-display)",
          ...defaultTheme.fontFamily.serif,
        ],
        sans: ["var(--font-montserrat)", ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        section: "var(--section-padding)",
        page: "var(--section-padding-sm)",
        container: "var(--container-padding)",
      },
      typography: (theme) => ({
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
              "&:hover": {
                color: theme("colors.accent"),
              },
            },
            h1: {
              fontFamily: theme("fontFamily.serif").join(", "),
              fontSize: theme("fontSize.2xl"),
            },
            h2: {
              fontFamily: theme("fontFamily.serif").join(", "),
              fontSize: theme("fontSize.xl"),
            },
            blockquote: {
              // color: theme('colors.gray.500'),
              fontStyle: "normal",
              paddingLeft: "1rem",
              paddingRight: "1rem",
              borderLeftWidth: "0.25rem",
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
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
