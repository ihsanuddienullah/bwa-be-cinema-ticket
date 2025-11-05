import express from 'express'
import { createGenre, getAllGenres } from '@/controllers/genre.controller'
import { validateRequest } from '@/middlewares/validate-request.middleware'
import { createGenreSchema } from '@/utils/zod-schema'

const genreRoutes = express.Router()

genreRoutes.get('/genres', getAllGenres)
genreRoutes.post('/genres', validateRequest(createGenreSchema), createGenre)

export default genreRoutes
