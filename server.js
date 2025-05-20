import express from  'express'
import env from 'dotenv'
env.config()
import userRoutes from './routes/userRoutes.js'
import complainRoutes from './routes/complaintRoutes.js'

const app = express()
app.use(express.json())

app.use('/api', userRoutes)
app.use('/api', complainRoutes)

const port = process.env.port

app.listen(port, () => console.log('Rodando na porta ' + port))
