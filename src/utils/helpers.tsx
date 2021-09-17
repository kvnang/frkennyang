export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

export function untrailingSlashIt(str: string) {
  return str.replace(/\/$/, '');
}

export function trailingSlashIt(str: string) {
  return `${untrailingSlashIt(str)}/`;
}

export function formatDate(
  date: string,
  ignoreSameYear: boolean = true,
  locale: string = 'en-US'
) {
  const dateObject = new Date(date);
  const options =
    ignoreSameYear && new Date().getFullYear() === dateObject.getFullYear()
      ? ({ month: 'short', day: 'numeric' } as const)
      : ({ year: 'numeric', month: 'short', day: 'numeric' } as const);
  return dateObject.toLocaleDateString(locale, options);
}
