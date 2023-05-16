/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/contents",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/post/:slug",
        destination: "/en/blog/:slug",
        permanent: true,
      },
      {
        source: "/id/post/:slug",
        destination: "/id/blog/:slug",
        permanent: true,
      },
    ];
  },
};

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

module.exports = withMDX(nextConfig);
