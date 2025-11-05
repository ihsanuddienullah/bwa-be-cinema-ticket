import express from 'express'
import { config } from 'dotenv'
import connectToDatabase from '@/utils/database'
import adminRoutes from './routes/admin-routes'

const app = express()
const port = 3000

config()

connectToDatabase()

app.use((req, _, next) => {
  console.log(`${req.method} ${req.originalUrl}`)
  next()
})

app.get('/', (_, res) => {
  res.send('Hello World!')
})

app.use('/api', adminRoutes)

app.listen(port, () => {
  console.log('Example app listening on port 3000!')
})
