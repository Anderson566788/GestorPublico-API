import pool from '../config/database.js'
import jwt from 'jsonwebtoken'

const getUserIdFromToken = (req) => {
    const authHeader = req.headers.authorization
    if (!authHeader) return null

    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        return decoded.id
    } catch (error) {
        return null
    }
}

export const addComplaint = async (req, res) => {
    const userId = getUserIdFromToken(req)
    const { title, description } = req.body

    if (!userId) return res.status(401).json({ message: 'Token inválido ou ausente' })

    try {
        await pool.query(`INSERT INTO complaints (user_id, title, description) VALUES (?, ?, ?)`, [userId, title, description])
        res.status(201).json({ message: 'Reclamação registrada com sucesso!' })
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar reclamação', error: error.message })
    }
}

export const listComplaints = async (req, res) => {
    try {
        const [rows] = await pool.query(`SELECT c.id, c.title, c.description, c.created_at, u.username FROM complaints c JOIN users u ON c.user_id = u.id ORDER BY c.created_at DESC`)
        res.json(rows)

    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar reclamações', error: error.message })
    }
}