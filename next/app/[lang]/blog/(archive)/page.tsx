import client from '@/lib/sanity.client';
import { PostEntry } from '@/components/PostEntry';
import { BlogList } from './BlogList';

export default async function BlogPage({
  params,
}: {
  params: { category?: string | null };
}) {
  const category = params.category || '';

  const posts = await client.fetch(
    `*[_type == "post" && ($category == '' || $category in categories[]->slug.current)] | order(publishedAt desc) {
      _id, title, slug, excerpt, publishedAt, format->{title}, categories[]->{title}, excerpt, "mainImageUrl": mainImage.asset->url
    }`,
    { category }
  );

  const featuredPost = posts.slice(0, 1)[0];
  const recentPosts = posts.slice(1, 10);

  return (
    <>
      <div className="pb-10 mb-10 border-b border-gray">
        <PostEntry
          post={featuredPost}
          showImage
          format="featured"
          showExcerpt
        />
      </div>
      <div>
        <BlogList initialData={recentPosts} />
      </div>
    </>
  );
}
