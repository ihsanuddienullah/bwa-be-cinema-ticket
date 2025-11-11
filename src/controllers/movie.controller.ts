import { Request, Response } from 'express'
import fs from 'fs'
import { MovieModel } from '@/models'
import { movieSchema } from '@/utils/zod-schema'

export const getAllMovies = async (_: Request, res: Response) => {
  try {
    const movies = await MovieModel.find()
      .populate({
        path: 'genres',
        select: 'name',
      })
      .populate({
        path: 'theaters',
        select: 'name location',
      })

    return res.status(200).json({
      status: 'success',
      message: 'Success get all movies',
      data: movies,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      status: 'failed',
      message: 'Internal Server Error',
    })
  }
}

export const getMovieById = async (req: Request, res: Response) => {
  try {
    const movieId = req.params.movieId

    const movie = await MovieModel.findById(movieId)
      .populate({
        path: 'genres',
        select: 'name',
      })
      .populate({
        path: 'theaters',
        select: 'name location',
      })

    if (!movie) {
      return res.status(404).json({
        status: 'failed',
        message: 'Movie not found',
      })
    }

    return res.status(200).json({
      status: 'success',
      message: 'Success get movie by id',
      data: movie,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      status: 'failed',
      message: 'Internal Server Error',
    })
  }
}

export const createMovie = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: 'failed',
        message: 'Image file is required',
      })
    }

    const parse = movieSchema.safeParse({
      title: req.body.title,
      genres: (req.body.genres || '').split(','),
      theaters: (req.body.theaters || '').split(','),
      available: req.body.available === 'true',
      description: req.body.description,
      price: Number(req.body.price),
      bonus: req.body.bonus,
    })

    if (!parse.success) {
      const errorMessages = parse.error.issues.map((issue) => `${issue.path}: ${issue.message}`)

      if (req?.file?.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path)
      }

      console.log(errorMessages)
      return res.status(400).json({ error: 'invalid request', message: errorMessages })
    }

    const movie = new MovieModel({
      ...parse.data,
      thumbnail: req.file?.filename,
    })

    await movie.save()

    return res.status(200).json({
      status: 'success',
      message: 'Movie created successfully',
      data: movie,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      status: 'failed',
      message: 'Internal Server Error',
    })
  }
}
