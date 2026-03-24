import express from 'express'
import { Comment } from '../models/Comment.js'
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

router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate('author', 'name avatar')
      .sort({ createdAt: -1 })
    res.json(comments)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/:postId', auth, async (req, res) => {
  try {
    const { content, parentId } = req.body
    const comment = await Comment.create({
      postId: req.params.postId,
      author: req.user.userId,
      content,
      parentId
    })
    await comment.populate('author', 'name avatar')
    res.json(comment)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
