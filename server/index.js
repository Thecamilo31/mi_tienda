import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use('/auth', authRouter)

app.get('/', (req, res) => res.json({ ok: true, message: 'API running' }))

app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
