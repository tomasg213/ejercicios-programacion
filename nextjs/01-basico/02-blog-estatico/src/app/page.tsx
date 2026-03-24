import { getAllPosts } from '@/lib/posts'
import { PostCard } from '@/components/PostCard'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import './globals.css'

export const revalidate = 3600

export default async function HomePage() {
  const posts = await getAllPosts()

  return (
    <html lang="es">
      <body>
        <Header />
        <main>
          <section className="hero">
            <div className="container">
              <h1>Mi Blog</h1>
              <p>Artículos sobre desarrollo web, programación y tecnología</p>
            </div>
          </section>

          <section className="posts">
            <div className="container">
              <div className="posts-grid">
                {posts.map(post => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </body>
    </html>
  )
}
