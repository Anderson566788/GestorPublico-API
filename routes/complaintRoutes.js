import { addComplaint, listComplaints } from '../controller/complaintController.js'
import express from 'express'

const router = express.Router()

router.post('/complaint', addComplaint)
router.get('/complaints', listComplaints)

export default router