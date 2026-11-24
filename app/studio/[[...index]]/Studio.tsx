'use client';

import dynamic from "next/dynamic";

export const Studio = dynamic(
  async () => {
    const [{ NextStudio }, { default: config }] = await Promise.all([
      import("next-sanity/studio"),
      import("@/sanity.config"),
    ]);
    return function StudioClient() {
      return <NextStudio config={config} />;
    };
  },
  { ssr: false },
);
