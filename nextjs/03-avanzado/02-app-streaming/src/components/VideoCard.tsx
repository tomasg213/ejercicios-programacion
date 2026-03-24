import { Video } from '@/lib/videos'
import Link from 'next/link'

interface VideoCardProps {
  video: Video
}

export function VideoCard({ video }: VideoCardProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatViews = (views: number) => {
    return views >= 1000 ? `${(views / 1000).toFixed(1)}K` : views
  }

  return (
    <Link href={`/video/${video.id}`} className="video-card">
      <div className="thumbnail">
        <span className="thumbnail-icon">🎬</span>
        <span className="duration">{formatDuration(video.duration)}</span>
      </div>
      <div className="info">
        <h3>{video.title}</h3>
        <p className="channel">{video.channel}</p>
        <p className="views">{formatViews(video.views)} vistas</p>
      </div>
    </Link>
  )
}
