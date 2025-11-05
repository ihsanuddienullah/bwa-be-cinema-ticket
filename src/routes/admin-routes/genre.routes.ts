import express from 'express'
import {
  createGenre,
  deleteGenre,
  getAllGenres,
  getGenreById,
  updateGenre,
} from '@/controllers/genre.controller'
import { validateRequest } from '@/middlewares/validate-request.middleware'
import { createGenreSchema } from '@/utils/zod-schema'

const genreRoutes = express.Router()

genreRoutes.get('/genres', getAllGenres)
genreRoutes.post('/genres', validateRequest(createGenreSchema), createGenre)
genreRoutes.put('/genres/:id', validateRequest(createGenreSchema), updateGenre)
genreRoutes.delete('/genres/:id', deleteGenre)
genreRoutes.get('/genres/:id', getGenreById)

export default genreRoutes
