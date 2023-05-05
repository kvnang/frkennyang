import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
// import { visionTool } from '@sanity/vision';
import {
  projectId,
  dataset,
  apiVersion,
  previewSecretId,
} from "@/lib/sanity.api";
import { schemaTypes } from "@/studio/schemas";
import { productionUrl } from "@/studio/plugins/productionUrl";
import post from "@/studio/schemas/post";

const PREVIEWABLE_DOCUMENT_TYPES: string[] = [post.name];

export default defineConfig({
  basePath: "/studio",
  name: "default",
  title: "Fr Kenny Ang",
  projectId,
  dataset,
  plugins: [
    deskTool(),
    // visionTool(),
    productionUrl({
      apiVersion,
      previewSecretId,
      types: PREVIEWABLE_DOCUMENT_TYPES,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
