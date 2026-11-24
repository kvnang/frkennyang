import { open, rm } from "node:fs/promises";

// OpenNext embeds Next's dotenv files by default. The Worker uses Wrangler
// bindings at runtime, while Next has already inlined its public build values.
const envModule = await open(
  new URL("../.open-next/cloudflare/next-env.mjs", import.meta.url),
  "r+",
);
try {
  await envModule.truncate();
  await envModule.writeFile(
    "export const production = {};\nexport const development = {};\nexport const test = {};\n",
  );
} finally {
  await envModule.close();
}

// Next.js also copies these files into its standalone server output.
const server = new URL("../.open-next/server-functions/default/", import.meta.url);
await Promise.all([
  rm(new URL(".env", server), { force: true }),
  rm(new URL(".env.production", server), { force: true }),
]);
