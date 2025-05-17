import { defineField, defineType } from "sanity";

export default defineType({
  name: "cv",
  title: "Curriculum Vitae",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "localeBlockContentSimple",
    }),
    defineField({
      name: "sections",
      title: "CV Sections",
      type: "array",
      options: { sortable: true },

      of: [
        {
          type: "object",
          preview: {
            select: {
              title: "title.en",
            },
          },
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "localeString",
            }),
            defineField({
              name: "items",
              title: "Items",
              type: "array",
              options: { sortable: true },
              of: [
                {
                  type: "object",
                  preview: {
                    select: {
                      title: "title.en",
                      date: "date",
                    },
                    prepare(selection) {
                      const { title, date } = selection;
                      return { ...selection, title, subtitle: date };
                    },
                  },
                  fields: [
                    defineField({
                      name: "title",
                      title: "Title",
                      type: "localeString",
                    }),
                    defineField({
                      name: "subtitle",
                      title: "Subtitle",
                      type: "localeString",
                    }),
                    defineField({
                      name: "date",
                      title: "Date",
                      type: "string",
                    }),
                    defineField({
                      name: "institution",
                      title: "Institution",
                      type: "localeString",
                    }),
                    defineField({
                      name: "location",
                      title: "Location",
                      type: "localeString",
                    }),
                    defineField({
                      name: "badges",
                      title: "Badges",
                      type: "array",
                      of: [{ type: "string" }],
                    }),
                    defineField({
                      name: "link",
                      title: "Link",
                      type: "url",
                    }),
                    defineField({
                      name: "description",
                      title: "Description",
                      type: "localeBlockContentSimple",
                    }),
                    defineField({
                      name: "active",
                      title: "Active?",
                      type: "boolean",
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
  // preview: {
  //   select: {
  //     title: baseLanguage ? `title.${baseLanguage.id}` : "title",
  //     publishedAt: "publishedAt",
  //     media: "mainImage",
  //   },
  // prepare(selection) {
  //   const { publishedAt } = selection;
  //   return { ...selection, subtitle: publishedAt && formatDate(publishedAt) };
  // },
  // },
});
