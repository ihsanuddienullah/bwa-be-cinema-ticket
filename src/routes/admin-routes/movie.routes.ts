import express from 'express'
import { getAllMovies, getMovieById } from '@/controllers/movie.controller'

const router = express.Router()

router.get('/movies', getAllMovies)
router.get('/movies/:movieId', getMovieById)

export default router
