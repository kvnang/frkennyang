import { defineType } from "sanity";
import type { PreviewProps } from "sanity";

function Preview(
  props: PreviewProps & {
    url?: string | null;
    bookTitle?: string | null;
    bookAuthor?: string | null;
    bookDescription?: string | null;
  }
) {
  const { url, bookTitle, bookAuthor, renderDefault } = props;

  if (!bookTitle) {
    return <div>Missing Book Title</div>;
  }

  return (
    <div>
      {/* 👇 Renders the default preview UI */}
      {renderDefault({ ...props, title: "Book" })}
      {/* 👇 Renders the book preview below */}
      <div style={{ display: "flex", padding: 8 }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          width={20}
          height={20}
          style={{ flexShrink: 0, marginRight: "0.5rem" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
          />
        </svg>
        <div>
          {bookTitle && <div style={{ fontWeight: "bold" }}>{bookTitle}</div>}
          {bookAuthor && <div style={{ fontSize: "0.8rem" }}>{bookAuthor}</div>}
        </div>
      </div>
    </div>
  );
}

export default defineType({
  name: "book",
  type: "object",
  title: "Book",
  fields: [
    {
      name: "url",
      type: "url",
      title: "Book URL",
    },
    {
      name: "bookTitle",
      type: "string",
      title: "Title",
    },
    {
      name: "bookAuthor",
      type: "string",
      title: "Author",
    },
    {
      name: "bookDescription",
      type: "text",
      title: "Description",
    },
    {
      name: "bookImage",
      type: "image",
      title: "Image",
    },
  ],
  preview: {
    select: {
      url: "url",
      bookTitle: "bookTitle",
      bookAuthor: "bookAuthor",
      bookDescription: "bookDescription",
    },
  },
  components: {
    preview: Preview,
  },
});
