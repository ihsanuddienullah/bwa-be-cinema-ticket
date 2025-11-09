import express from 'express'
import genreRoutes from './genre.routes'
import theaterRoutes from './theater.routes'

const adminRoutes = express.Router()

adminRoutes.use('/admin', genreRoutes)
adminRoutes.use('/admin', theaterRoutes)

export default adminRoutes
