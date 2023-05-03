export function resolveHref(
  documentType?: string,
  slug?: string
): string | undefined {
  const lang = 'en';
  switch (documentType) {
    case 'post':
      return slug ? `/${lang}/blog/${slug}/preview` : undefined;
    default:
      console.warn('Invalid document type:', documentType);
      return undefined;
  }
}
