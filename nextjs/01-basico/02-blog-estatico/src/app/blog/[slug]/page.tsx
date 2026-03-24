import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { notFound } from 'next/navigation'
import './globals.css'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({
    slug: post.slug
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post no encontrado'
    }
  }

  return {
    title: `${post.title} - Mi Blog`,
    description: post.excerpt
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <html lang="es">
      <body>
        <Header />
        <main>
          <article className="post">
            <div className="container">
              <header className="post-header">
                <div className="post-meta">
                  <span className="post-date">{post.date}</span>
                  <span className="post-category">{post.category}</span>
                </div>
                <h1>{post.title}</h1>
                <div className="post-tags">
                  {post.tags.map(tag => (
                    <span key={tag} className="tag">#{tag}</span>
                  ))}
                </div>
              </header>
              
              <div className="post-content">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>

              <div className="post-footer">
                <a href="/" className="back-link">← Volver al blog</a>
              </div>
            </div>
          </article>
        </main>
        <Footer />
      </body>
    </html>
  )
}
