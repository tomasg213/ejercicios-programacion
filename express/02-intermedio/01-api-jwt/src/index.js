const express = require('express')
const authRouter = require('./routes/auth')
const profileRouter = require('./routes/profile')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/auth', authRouter)
app.use('/profile', profileRouter)

app.get('/', (req, res) => {
  res.json({ message: 'API con JWT', version: '1.0.0' })
})

app.listen(PORT, () => {
  console.log(`API JWT en http://localhost:${PORT}`)
})
