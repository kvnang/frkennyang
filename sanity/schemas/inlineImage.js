export default {
  name: 'inlineImage',
  type: 'image',
  options: {hotspot: true},
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternate Text',
      options: {
        isHighlighted: true // <-- make this field easily accessible
      }
    },
  ]
}