import express from 'express'
import { getAllGenres } from '@/controllers/genre.controller'

const genreRoutes = express.Router()

genreRoutes.get('/genres', getAllGenres)

export default genreRoutes
