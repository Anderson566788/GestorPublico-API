import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import pool from '../config/database.js'

const generateToken = (user) => {
    return jwt.sign({ id: user.id, email: user.email, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

export const register = async (req, res) => {
    const { email, username, password } = req.body

    try {
        const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email])
        if (rows.length > 0) return res.status(400).json({ message: 'Email já registrado' })

        const hashedPassword = await bcrypt.hash(password, 10)
        await pool.query(`INSERT INTO users (email, username, password) VALUES (?, ?, ?)`, [email, username, hashedPassword])

        res.status(201).json({ message: 'Usuário registrado com sucesso!' })

    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar', error: error.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email])
        if (rows.length === 0) return res.status(400).json({ message: 'Credenciais inválidas' })

        const user = rows[0]
        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(400).send({ message: 'Credenciais inválidas' })

        const token = generateToken({
            id: user.id,
            password: user.password,
            role: user.role
        })

        res.json({ token })

    } catch (error) {
        res.status(400).json({ message: 'Erro ao fazer login', error: error.message })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const [users] = await pool.query(`SELECT id, email, role FROM users`)
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message })
    }
}

export const promoteUserToAdmin = async (req, res) => {
    const { id } = req.params

    try {
        const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id])
        if (rows.length === 0) return res.status(404).json({ message: 'Usuário não encontrado' })

        pool.query(`UPDATE users SET role = "admin" WHERE id = ?`, [id])
        res.json({ message: 'Usuário promovido a admin com sucesso!' })

    } catch (error) {
        res.status(500).json({ mesage: 'Erro ao promover usuário', error: error.message })
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [id])
        if (rows.length === 0) return res.status(404).json({ message: 'Usuário não encontrado' })


        pool.query(`DELETE FROM users WHERE id = ?`, [id])
        res.json({ message: 'Usuário deletado com sucesso!' })

    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar usuário', error: error.message })
    }
}