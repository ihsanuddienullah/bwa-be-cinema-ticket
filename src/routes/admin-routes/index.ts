import express from 'express'
import genreRoutes from './genre.routes'

const adminRoutes = express.Router()

adminRoutes.use('/admin', genreRoutes)

export default adminRoutes
