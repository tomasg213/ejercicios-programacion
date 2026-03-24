import { Post } from './posts'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="post-card">
      <div className="post-meta">
        <span className="post-date">{post.date}</span>
        <span className="post-category">{post.category}</span>
      </div>
      <h2>
        <a href={`/blog/${post.slug}`}>{post.title}</a>
      </h2>
      <p className="post-excerpt">{post.excerpt}</p>
      <div className="post-tags">
        {post.tags.map(tag => (
          <span key={tag} className="tag">#{tag}</span>
        ))}
      </div>
    </article>
  )
}
