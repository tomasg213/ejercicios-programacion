'use client'

import { Video } from '@/lib/videos'
import { useState } from 'react'
import Link from 'next/link'

interface PlayerProps {
  video: Video
}

export function Player({ video }: PlayerProps) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="player">
      <div className="video-container">
        <video
          controls
          poster={video.thumbnail}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={video.url} type="video/mp4" />
          Tu navegador no soporta el reproductor de video
        </video>
      </div>
      <div className="video-info">
        <h1>{video.title}</h1>
        <div className="video-stats">
          <span>{video.views.toLocaleString()} vistas</span>
          <span>•</span>
          <span>{video.uploadDate}</span>
        </div>
        <p className="description">{video.description}</p>
        <p className="channel">Canal: {video.channel}</p>
      </div>
    </div>
  )
}
