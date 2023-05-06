import { type LangType } from "@/types";
import BlogPage from "../../page";
import { getMetadata } from "@/lib/metadata";
import client from "@/lib/sanity.client";

export async function generateMetadata({
  params,
}: {
  params: { lang: LangType; category?: string };
}) {
  const category = params.category
    ? await client.fetch(
        `*[_type == "category" && slug.current == $slug] {
      title
    }[0]`,
        {
          slug: params.category,
        }
      )
    : null;

  return getMetadata({
    title: category ? `${category.title} | Blog` : "Blog",
    pathname: `/${params.lang}/blog`,
    description: `Browse Fr. Kenny's latest works, available in both English and Bahasa Indonesia.`,
  });
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
