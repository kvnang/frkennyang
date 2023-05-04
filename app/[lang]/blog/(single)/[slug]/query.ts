export const query = `
*[_type == "post" && slug.current == $slug] {
  _id, title, slug, excerpt, publishedAt, format->{title}, categories[]->{title,slug}, excerpt, "mainImageUrl": mainImage.asset->url, "contentEn": content.en[]{..., asset->, bookImage{asset->}}, "contentId": content.id[]{..., asset->, bookImage{asset->}}
}
`;
