import { defineArrayMember, defineConfig } from "sanity";
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
import { portableTable } from "@bitfo/sanity-plugin-portable-table";

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
    portableTable({
      // Required: must provide a block definition
      cellSchema: {
        name: "Block",
        type: "block",
        styles: [],
        lists: [],
        marks: {
          decorators: [
            { title: "Strong", value: "strong" },
            { title: "Emphasis", value: "em" },
            { title: "Underline", value: "underline" },
          ],
          annotations: [
            {
              title: "URL",
              name: "link",
              type: "object",
              fields: [
                {
                  title: "URL",
                  name: "href",
                  type: "string",
                },
              ],
            },
            {
              title: "Footnote",
              name: "footnote",
              type: "object",
              fields: [
                {
                  title: "Text",
                  name: "text",
                  type: "array",
                  of: [
                    {
                      title: "Block",
                      type: "block",
                      styles: [{ title: "Normal", value: "normal" }],
                      lists: [],
                      marks: {
                        // Decorators usually describe a single property – e.g. a typographic
                        // preference or highlighting by editors.
                        decorators: [
                          { title: "Strong", value: "strong" },
                          { title: "Emphasis", value: "em" },
                          { title: "Underline", value: "underline" },
                        ],
                        annotations: [
                          {
                            title: "URL",
                            name: "link",
                            type: "object",
                            fields: [
                              {
                                title: "URL",
                                name: "href",
                                type: "string",
                              },
                            ],
                          },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      },
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
