import { PreviewSuspense } from '@/components/PreviewSuspense';
import { cookies } from 'next/headers';
import { PreviewClient } from './PreviewClient';
import { getDictionary } from '@/lib/dictionaries';
import { LangType } from '@/types';

export default async function PostPreview({
  params,
}: {
  params: { lang: LangType; slug: string };
}) {
  const dictionary = await getDictionary(params.lang);

  const cookieStore = cookies();
  const token = cookieStore.get('token');

  const isPreview = !!token;

  if (isPreview) {
    return (
      <PreviewSuspense fallback="Loading...">
        <PreviewClient
          token={token.value}
          params={params}
          dictionary={dictionary}
        />
      </PreviewSuspense>
    );
  }

  return null;
}
