import express from 'express'
import OpenAI from 'openai'
import { Post } from '../models/Post.js'

const router = express.Router()
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

router.post('/summary', async (req, res) => {
  try {
    const { content } = req.body
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a content summarizer. Create a concise summary of the text.' },
        { role: 'user', content }
      ],
      max_tokens: 300
    })
    res.json({ summary: response.choices[0].message.content })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/seo', async (req, res) => {
  try {
    const { title, content } = req.body
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are an SEO expert. Suggest meta title (max 60 chars) and meta description (max 160 chars).' },
        { role: 'user', content: `Title: ${title}\n\nContent: ${content.slice(0, 1000)}` }
      ],
      max_tokens: 300
    })
    res.json({ seo: response.choices[0].message.content })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/tags', async (req, res) => {
  try {
    const { content, title } = req.body
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'Suggest 5 relevant tags for this content. Return as JSON array.' },
        { role: 'user', content: `Title: ${title}\n\nContent: ${content.slice(0, 1000)}` }
      ],
      max_tokens: 100
    })
    res.json({ tags: response.choices[0].message.content })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/improve', async (req, res) => {
  try {
    const { content } = req.body
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a content editor. Improve the text for clarity and engagement.' },
        { role: 'user', content }
      ],
      max_tokens: 2000
    })
    res.json({ improved: response.choices[0].message.content })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
