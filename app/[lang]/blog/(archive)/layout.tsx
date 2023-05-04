import * as React from "react";
import client from "@/lib/sanity.client";
import { Categories } from "./Categories";
import { LangType } from "@/types";
import { Search } from "./Search";

export default async function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: LangType };
}) {
  const categories = await client.fetch(`
  *[_type == "category"] {
    _id, 
    title, 
    slug,
    "count": count(*[_type == "post" && references(^._id)])
  } | order(count desc) [0...5]
`);

  return (
    <main>
      <section className="container pt-page pb-section">
        <div className="grid grid-cols-12 gap-x-4">
          <div className="col-span-12 xl:col-span-10 xl:col-start-2">
            <div className="mb-12">
              <div className="flex items-center justify-between flex-wrap-reverse -m-2">
                <div className="p-2 max-w-full">
                  <React.Suspense fallback={null}>
                    <Categories categories={categories} params={params} />
                  </React.Suspense>
                </div>
                <div className="p-2 max-w-full">
                  <React.Suspense fallback={null}>
                    <Search params={params} />
                  </React.Suspense>
                </div>
              </div>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
