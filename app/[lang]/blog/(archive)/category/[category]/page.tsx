import BlogPage from "../../page";

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
