import { getVideoById } from '@/lib/videos'
import { Player } from '@/components/Player'
import { notFound } from 'next/navigation'

export default async function VideoPage({ params }: { params: { id: string } }) {
  const video = await getVideoById(params.id)

  if (!video) {
    notFound()
  }

  return (
    <div className="video-page">
      <Player video={video} />
    </div>
  )
}
