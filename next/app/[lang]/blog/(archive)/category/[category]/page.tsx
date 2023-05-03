import BlogPage from '../../page';

export default async function BlogCategoryPage({
  params,
}: {
  params: { category: string };
}) {
  // @ts-expect-error
  return <BlogPage params={params} />;
}
