import express from 'express'
import multer from 'multer'
import { createMovie, getAllMovies, getMovieById } from '@/controllers/movie.controller'
import { fileFilter, fileStorage } from '@/utils/multer'

const router = express.Router()

const upload = multer({
  storage: fileStorage('movies'),
  fileFilter,
})

router.get('/movies', getAllMovies)
router.get('/movies/:movieId', getMovieById)
router.post('/movies', upload.single('thumbnail'), createMovie)

export default router
