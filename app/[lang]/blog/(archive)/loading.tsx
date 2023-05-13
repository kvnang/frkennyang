import { PostEntrySkeleton } from "@/components/PostEntry";
import { BlogListSkeleton } from "./BlogList";

export default function Loading() {
  return (
    <>
      <div className="pb-10 mb-10 border-b border-medium-gray last:border-none last:mb-0 last:pb-0">
        <PostEntrySkeleton showImage format="featured" showExcerpt />
      </div>
      <div>
        <BlogListSkeleton />
      </div>
    </>
  );
}
