import { getVideos } from '@/lib/videos'
import { VideoCard } from '@/components/VideoCard'
import './globals.css'

export default async function HomePage() {
  const videos = await getVideos()

  return (
    <html lang="es">
      <body>
        <div className="streaming-app">
          <header className="header">
            <h1>🎬 StreamTube</h1>
            <input type="text" placeholder="Buscar videos..." />
          </header>

          <main>
            <section className="hero">
              <h2>Videos Recomendados</h2>
            </section>

            <section className="video-grid">
              {videos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </section>
          </main>
        </div>
      </body>
    </html>
  )
}
