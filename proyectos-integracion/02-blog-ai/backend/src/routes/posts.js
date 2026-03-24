import express from 'express'
import { Post } from '../models/Post.js'
import { redis } from '../server.js'
import jwt from 'jsonwebtoken'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

const auth = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ error: 'No token' })
  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status = 'published' } = req.query
    const cacheKey = `posts:${page}:${limit}:${status}`
    
    const cached = await redis.get(cacheKey)
    if (cached) return res.json(JSON.parse(cached))
    
    const query = status ? { status } : {}
    const posts = await Post.find(query)
      .populate('author', 'name avatar')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
    
    await redis.setex(cacheKey, 3600, JSON.stringify(posts))
    res.json(posts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params
    const post = await Post.findOne({ slug }).populate('author', 'name avatar')
    if (!post) return res.status(404).json({ error: 'Post not found' })
    
    post.views += 1
    await post.save()
    res.json(post)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const { title, content, tags, status = 'draft', seo } = req.body
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const readingTime = Math.ceil(content.split(' ').length / 200)
    
    const post = await Post.create({
      title, slug, content, tags, status, seo, readingTime,
      author: req.user.userId
    })
    await redis.del('posts:*')
    res.json(post)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.put('/:id', auth, async (req, res) => {
  try {
    const { title, content, tags, status, seo } = req.body
    const post = await Post.findByIdAndUpdate(req.params.id, 
      { title, content, tags, status, seo, updatedAt: Date.now() }, 
      { new: true }
    )
    if (!post) return res.status(404).json({ error: 'Post not found' })
    await redis.del('posts:*')
    res.json(post)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/:id', auth, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id)
    await redis.del('posts:*')
    res.json({ message: 'Post deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
