import express from 'express'
import { config } from 'dotenv'
import connectToDatabase from '@/utils/database'

const app = express()
const port = 3000

config()

connectToDatabase()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log('Example app listening on port 3000!')
})
