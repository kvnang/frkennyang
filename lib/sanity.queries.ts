import { defineQuery } from "next-sanity";

export const POSTS_QUERY = defineQuery(`*[_type == "post" 
    && ($category == '' || $category in categories[]->slug.current) 
    && (($lastPublishedAt == null || $lastId == null) 
      || (publishedAt < $lastPublishedAt || (publishedAt == $lastPublishedAt && _id > $lastId))
    )] 
    | order(publishedAt desc) 
    [0...$perPage] {
    _id, title, slug, excerpt, publishedAt, format->{title}, categories[]->{title}, excerpt, "mainImage": mainImage.asset->
  }`);

export const POSTS_QUERY_WITH_SEARCH =
  defineQuery(`*[_type == "post" && ($category == '' || $category in categories[]->slug.current)]
    | score(pt::text(content.en) match $searchQuery
      || boost(pt::text(content.en) match $searchQuery + "*", 0.5)) 
    [($lastScore == null || $lastId == null) 
      || (_score < $lastScore || (_score == $lastScore && _id > $lastId))]
    [_score > 0]
    | order(_score desc) 
    [0...$perPage] {
    _id, _score, title, slug, excerpt, publishedAt, format->{title}, categories[]->{title}, excerpt, "mainImage": mainImage.asset->
  }`);

export const POST_QUERY = defineQuery(`
*[_type == "post" && slug.current == $slug] {
  _id, title, slug, excerpt, publishedAt, format->{title}, categories[]->{title,slug}, "mainImage": mainImage.asset->, 
  "introEn": intro.en[],
  "introId": intro.id[],
  "contentEn": content.en[]{..., asset->, bookImage{asset->}}, 
  "contentId": content.id[]{..., asset->, bookImage{asset->}}
}
`);
