import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: String,
  coverImage: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tags: [String],
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  seo: {
    metaTitle: String,
    metaDescription: String
  },
  aiSummary: String,
  readingTime: Number,
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export const Post = mongoose.model('Post', postSchema)
