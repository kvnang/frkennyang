export const query = `
*[_type == "post" && slug.current == $slug] {
  _id, title, slug, excerpt, publishedAt, format->{title}, categories[]->{title,slug}, "mainImage": mainImage.asset->, 
  "introEn": intro.en[],
  "introId": intro.id[],
  "contentEn": content.en[]{..., asset->, bookImage{asset->}}, 
  "contentId": content.id[]{..., asset->, bookImage{asset->}}
}
`;
