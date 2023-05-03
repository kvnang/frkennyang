import {defineType} from 'sanity'
import getYouTubeId from 'get-youtube-id'
import type {PreviewProps} from 'sanity'
// import LiteYouTubeEmbed from 'react-lite-youtube-embed'
// import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

function Preview(props: PreviewProps & {url?: string}) {
  const {url, renderDefault} = props
  if (!url) {
    return <div>Missing YouTube URL</div>
  }
  const id = getYouTubeId(url)
  return (
    <div>
      {/* 👇 Renders the default preview UI */}
      {renderDefault({...props, title: 'YouTube Embed'})}
      {/* 👇 Renders the video preview below */}
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default defineType({
  name: 'youtube',
  type: 'object',
  title: 'YouTube Embed',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'YouTube video URL',
    },
  ],
  preview: {
    select: {
      url: 'url',
    },
  },
  components: {
    preview: Preview,
  },
})
