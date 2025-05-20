import { register, login, getAllUsers, promoteUserToAdmin, deleteUser } from '../controller/userController.js'
import { autenticate, authorizeRole } from '../middleware/userMiddleware.js'
import express from 'express'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)

router.get('/users', autenticate, authorizeRole(['admin']), getAllUsers)

router.put('/users/:id/promote', autenticate, authorizeRole(['admin']), promoteUserToAdmin)

router.delete('/users/:id', autenticate, authorizeRole(['admin']), deleteUser)


export default router