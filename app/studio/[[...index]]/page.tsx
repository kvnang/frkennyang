import { Studio } from "./Studio";

// Set the right `viewport`, `robots` and `referer` meta tags
export { metadata } from "next-sanity/studio";

export default function StudioPage() {
  return <Studio />;
}
