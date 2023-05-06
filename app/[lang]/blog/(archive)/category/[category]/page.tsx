import { type LangType } from "@/types";
import BlogPage, {
  generateMetadata as blogPageGenerateMetadata,
} from "../../page";

export async function generateMetadata({
  params,
}: {
  params: { lang: LangType; category?: string };
}) {
  return blogPageGenerateMetadata({ params });
}
export default async function BlogCategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { q?: string };
}) {
  // @ts-expect-error
  return <BlogPage params={params} searchParams={searchParams} />;
}
