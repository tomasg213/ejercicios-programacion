import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  avatar: String,
  role: { type: String, enum: ['admin', 'author', 'reader'], default: 'reader' },
  createdAt: { type: Date, default: Date.now }
})

export const User = mongoose.model('User', userSchema)
