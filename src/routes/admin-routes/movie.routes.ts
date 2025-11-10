import express from 'express'
import { getAllMovies } from '@/controllers/movie.controller'

const router = express.Router()

router.get('/movies', getAllMovies)

export default router
