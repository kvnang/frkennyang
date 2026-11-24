const imageAsset = `asset->{url, metadata{dimensions{width, height}, lqip}}`;

export const query = `
*[_type == "post" && slug.current == $slug] {
  _id, title, slug, excerpt, publishedAt, format->{title}, categories[]->{title,slug},
  "mainImage": mainImage.asset->{url, metadata{lqip, palette{dominant{background}}}},
  "introEn": intro.en[],
  "introId": intro.id[],
  "contentEn": content.en[]{..., ${imageAsset}, bookImage{${imageAsset}}},
  "contentId": content.id[]{..., ${imageAsset}, bookImage{${imageAsset}}}
}
`;
