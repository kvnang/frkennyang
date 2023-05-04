import { defineField, defineType } from "sanity";
import { baseLanguage } from "./locale";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "localeString",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title.en",
        maxLength: 96,
      },
    }),
    defineField({
      name: "format",
      title: "Format",
      type: "reference",
      to: { type: "format" },
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "localeText",
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "localeBlockContent",
    }),
    defineField({
      name: "content",
      title: "Body",
      type: "localeBlockContent",
    }),
  ],

  preview: {
    select: {
      title: baseLanguage ? `title.${baseLanguage.id}` : "title",
      author: "author.name",
      media: "mainImage",
    },
    // prepare(selection) {
    //   const {author} = selection
    //   return {...selection, subtitle: author && `by ${author}`}
    // },
  },
});
