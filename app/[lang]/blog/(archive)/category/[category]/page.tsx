import { type LangType } from "@/types";
import BlogPage, {
  generateMetadata as blogPageGenerateMetadata,
} from "../../page";
import { ResolvingMetadata } from "next";

export async function generateMetadata(
  {
    params,
  }: {
    params: { lang: LangType; category?: string };
  },
  parent: ResolvingMetadata
) {
  return blogPageGenerateMetadata({ params }, parent);
}
export default async function BlogCategoryPage({
  params,
}: {
  params: { category: string };
}) {
  // @ts-expect-error
  return <BlogPage params={params} />;
}
