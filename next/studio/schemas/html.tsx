import {PreviewProps, defineType} from 'sanity'

function Preview(props: PreviewProps & {code?: string}) {
  return (
    <div>
      {props.renderDefault({...props, title: `Custom HTML`})}
      <div style={{overflowX: 'auto', maxWidth: '100%', padding: '0 16px'}}>
        <pre>
          <code>{props.code}</code>
        </pre>
      </div>
    </div>
  )
}

export default defineType({
  name: 'html',
  type: 'object',
  title: 'Custom HTML',
  fields: [
    {
      name: 'code',
      type: 'text',
      title: 'HTML Code',
    },
  ],
  preview: {
    select: {
      code: 'code',
    },
  },
  components: {
    preview: Preview,
  },
})
