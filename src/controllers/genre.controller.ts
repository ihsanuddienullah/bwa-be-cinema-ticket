import { Request, Response } from 'express'
import { GenreModel } from '@/models'

export const getAllGenres = async (req: Request, res: Response) => {
  try {
    const genres = await GenreModel.find()

    return res.status(200).json({
      status: 'success',
      message: 'Success get all genres',
      data: genres,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      status: 'failed',
      message: 'Internal Server Error',
    })
  }
}
