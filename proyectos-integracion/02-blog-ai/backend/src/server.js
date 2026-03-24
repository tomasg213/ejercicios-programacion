import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { createClient } from 'redis'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import postRoutes from './routes/posts.js'
import commentRoutes from './routes/comments.js'
import aiRoutes from './routes/ai.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

export const redis = createClient({ url: process.env.REDIS_URL || 'redis://redis:6379' })
redis.on('error', (err) => console.log('Redis Client Error', err))

await redis.connect()

export const db = mongoose.connect(process.env.MONGODB_URI || 'mongodb://mongo:27017/blog')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err))

app.use('/auth', authRoutes)
app.use('/posts', postRoutes)
app.use('/comments', commentRoutes)
app.use('/ai', aiRoutes)

app.get('/health', (req, res) => res.json({ status: 'ok' }))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
