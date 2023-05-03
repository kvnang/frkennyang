'use client';

import { ScrollFade } from '@/components/ScrollFade';
import { LangType } from '@/types';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface CategoryProps {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  count: number;
}

export function Categories({
  categories,
  params,
}: {
  categories: CategoryProps[];
  params: { lang: LangType };
}) {
  const category = useParams()?.category;

  return (
    <div className="flex overflow-auto max-w-full">
      <ul className="flex whitespace-nowrap">
        <li className="mr-6 last:mr-0">
          <Link
            href={`/${params.lang}/blog`}
            aria-current={!category ? 'page' : undefined}
            className="opacity-60 hover:opacity-100 aria-[current=page]:opacity-100 transition-opacity"
          >
            All
          </Link>
        </li>
        {categories.map((c) => (
          <li key={c._id} className="mr-6 last:mr-0">
            <Link
              href={`/${params.lang}/blog/category/${c.slug.current}`}
              aria-current={category === c.slug.current ? 'page' : undefined}
              className="opacity-60 hover:opacity-100 aria-[current=page]:opacity-100 transition-opacity"
            >
              {c.title}
            </Link>
          </li>
        ))}
      </ul>
      <ScrollFade />
    </div>
  );
}
