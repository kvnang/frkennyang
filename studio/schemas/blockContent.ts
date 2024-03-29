import { defineType, defineArrayMember } from "sanity";

/**
 * This is the schema definition for the rich text fields used for
 * for this blog studio. When you import it in schemas.js it can be
 * reused in other parts of the studio with:
 *  {
 *    name: 'someName',
 *    title: 'Some title',
 *    type: 'blockContent'
 *  }
 */
export default defineType({
  title: "Block Content",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      // Styles let you set what your user can mark up blocks with. These
      // correspond with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Underline", value: "underline" },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
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
                  defineArrayMember({
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
                  }),
                ],
              },
            ],
          },
        ],
      },
    }),
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          type: "text",
          name: "alt",
          title: "Alternative text",
          description: `Some of your visitors cannot see images, 
            be they blind, color-blind, low-sighted; 
            alternative text is of great help for those 
            people that can rely on it to have a good idea of 
            what\'s on your page.`,
        },
        {
          type: "text",
          name: "caption",
          title: "Caption",
          description: "Image caption, e.g. copyright.",
        },
        {
          type: "string",
          name: "alignment",
          title: "Alignment",
          options: {
            list: [
              { title: "Default", value: "" },
              { title: "Left", value: "left" },
              { title: "Center", value: "center" },
              { title: "Right", value: "right" },
            ],
            layout: "radio",
          },
        },
      ],
    }),
    defineArrayMember({
      type: "youtube",
    }),
    defineArrayMember({
      type: "html",
    }),
    defineArrayMember({
      type: "book",
    }),
    defineArrayMember({
      type: "table",
    }),
  ],
});
