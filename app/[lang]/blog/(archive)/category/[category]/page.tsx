import { type LangType } from "@/types";
import BlogPage, {
  generateMetadata as blogPageGenerateMetadata,
} from "../../page";
import { ResolvingMetadata } from "next";

export async function generateMetadata(
  props: {
    params: Promise<{ lang: LangType; category?: string }>;
  },
  parent: ResolvingMetadata,
) {
  return blogPageGenerateMetadata({ params: props.params }, parent);
}
export default async function BlogCategoryPage(props: {
  params: Promise<{ lang: LangType; category: string }>;
}) {
  return <BlogPage params={props.params} />;
}
