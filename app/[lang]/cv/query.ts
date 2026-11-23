export const query = `
*[_type == "cv"] | order(_createdAt desc)[0] {
  _id, _updatedAt, title, intro, sections[]
}
`;
