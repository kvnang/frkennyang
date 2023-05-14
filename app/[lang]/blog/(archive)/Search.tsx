"use client";

import * as React from "react";
// import { useSearchParams } from "next/navigation";
import { clientFetch } from "@/lib/sanity.client";
import { queryWithSearch } from "./query";
import debounce from "just-debounce-it";
import type { LangType, PostEntryProps } from "@/types";
import Link from "next/link";

export function Search({ params }: { params: { lang: string } }) {
  // const router = useRouter();
  // const q = useSearchParams().get("q") || "";
  const [results, setResults] = React.useState<PostEntryProps[]>([]);
  const [loading, setLoading] = React.useState(true);

  const search = async (q: string) => {
    if (!q) {
      setResults([]);
    } else {
      const results = await clientFetch(queryWithSearch, {
        searchQuery: q,
        category: "",
        lastScore: null,
        lastId: null,
        perPage: 9,
      });
      setResults(results);
    }
    setLoading(false);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get("q") as string;
    await search(q);
    // if (q) {
    //   router.push(`/${params.lang}/blog?q=${q}`);
    // } else {
    //   router.push(`/${params.lang}/blog`);
    // }
  };

  const onInput = debounce(async (e: React.FormEvent<HTMLInputElement>) => {
    const q = (e.target as HTMLInputElement).value;
    await search(q);
  }, 500);

  return (
    <div className="relative group">
      <form action={`/${params.lang}/blog`} method="GET" onSubmit={onSubmit}>
        <input
          type="search"
          placeholder="Search Articles"
          name="q"
          onInput={(e) => {
            setLoading(true);
            onInput(e);
          }}
        />
      </form>
      <div className="group-focus-within:block hidden absolute top-full right-0 mt-4 z-50 min-w-full">
        {(!!results.length || loading) && (
          <ul className="p-2 w-full sm:w-96 bg-darker-gray-2 max-h-[60vh] overflow-auto flex flex-col">
            {loading ? (
              <>
                {[...Array(3)].map((_, i) => (
                  <li key={i} className="">
                    <div className="flex p-3">
                      <article className="w-full">
                        <p className="mb-1 rounded-md skeleton-bg w-full">
                          &nbsp;
                        </p>
                        <div className="text-sm">
                          <div className="skeleton-bg w-3/4 h-[1em] mb-[0.5em]">
                            &nbsp;
                          </div>
                          <p className="skeleton-bg w-2/3 h-[1em] mb-[0.5em]">
                            &nbsp;
                          </p>
                        </div>
                      </article>
                    </div>
                  </li>
                ))}
              </>
            ) : (
              <>
                {results.map((post) => (
                  <li key={post._id}>
                    <Link
                      href={`/${params.lang}/blog/${post.slug.current}`}
                      className="flex p-3 hover:bg-darker-gray transition-colors"
                    >
                      <article className="w-full">
                        <p className="font-semibold mb-1">
                          {params.lang === "id"
                            ? post.title.id || post.title.en
                            : post.title.en}
                        </p>
                        <div
                          className="text-sm opacity-80"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {post.excerpt[params.lang as LangType] ||
                            post.excerpt.en ||
                            ""}
                        </div>
                      </article>
                    </Link>
                  </li>
                ))}
              </>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
