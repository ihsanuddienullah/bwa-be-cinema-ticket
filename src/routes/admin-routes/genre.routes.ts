import express from 'express'
import {
  createGenre,
  getAllGenres,
  updateGenre,
} from '@/controllers/genre.controller'
import { validateRequest } from '@/middlewares/validate-request.middleware'
import { createGenreSchema } from '@/utils/zod-schema'

const genreRoutes = express.Router()

genreRoutes.get('/genres', getAllGenres)
genreRoutes.post('/genres', validateRequest(createGenreSchema), createGenre)
genreRoutes.put('/genres/:id', validateRequest(createGenreSchema), updateGenre)

export default genreRoutes
