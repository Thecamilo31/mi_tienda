import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { query } from '../db.js'

const router = express.Router()

// POST /auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email y contraseña son requeridos' })

    // Check if user exists
    const existing = await query('SELECT id FROM users WHERE email = $1', [email])
    if (existing.rowCount > 0) return res.status(409).json({ message: 'Usuario ya existe' })

    const saltRounds = 10
    const hashed = await bcrypt.hash(password, saltRounds)

    const result = await query('INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, email, name', [name || null, email, hashed])
    const user = result.rows[0]

    // Issue token
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' })

    res.json({ token, user })
  } catch (err) {
    console.error('Register error', err)
    res.status(500).json({ message: 'Error al registrar usuario' })
  }
})

// POST /auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email y contraseña son requeridos' })

    const result = await query('SELECT id, email, name, password_hash FROM users WHERE email = $1', [email])
    if (result.rowCount === 0) return res.status(401).json({ message: 'Credenciales inválidas' })

    const user = result.rows[0]
    const match = await bcrypt.compare(password, user.password_hash)
    if (!match) return res.status(401).json({ message: 'Credenciales inválidas' })

    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' })

    res.json({ token, user: { id: user.id, email: user.email, name: user.name } })
  } catch (err) {
    console.error('Login error', err)
    res.status(500).json({ message: 'Error al iniciar sesión' })
  }
})

export default router
