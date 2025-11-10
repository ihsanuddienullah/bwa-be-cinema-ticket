import { Request, Response } from 'express'
import { MovieModel } from '@/models'

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
