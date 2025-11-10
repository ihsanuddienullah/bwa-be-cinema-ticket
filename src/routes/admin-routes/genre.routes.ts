import express from 'express'
import {
  createGenre,
  deleteGenre,
  getAllGenres,
  getGenreById,
  updateGenre,
} from '@/controllers/genre.controller'
import { validateRequest } from '@/middlewares/validate-request.middleware'
import { genreSchema } from '@/utils/zod-schema'

const genreRoutes = express.Router()

genreRoutes.get('/genres', getAllGenres)
genreRoutes.post('/genres', validateRequest(genreSchema), createGenre)
genreRoutes.put('/genres/:genreId', validateRequest(genreSchema), updateGenre)
genreRoutes.delete('/genres/:genreId', deleteGenre)
genreRoutes.get('/genres/:genreId', getGenreById)

export default genreRoutes
