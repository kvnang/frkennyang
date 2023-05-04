"use client";

import { useSearchParams, useRouter } from "next/navigation";

export function Search({ params }: { params: { lang: string } }) {
  const router = useRouter();
  const q = useSearchParams().get("q") || "";

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const q = formData.get("q") as string;
    if (q) {
      router.push(`/${params.lang}/blog?q=${q}`);
    } else {
      router.push(`/${params.lang}/blog`);
    }
  };

  return (
    <form action={`/${params.lang}/blog`} method="GET" onSubmit={onSubmit}>
      <input
        type="search"
        placeholder="Search Articles"
        name="q"
        defaultValue={q}
      />
    </form>
  );
}
