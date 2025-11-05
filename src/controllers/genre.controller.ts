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

export const createGenre = async (req: Request, res: Response) => {
  try {
    const body = req.body

    const genre = new GenreModel({
      name: body.name,
    })

    await genre.save()

    return res.status(201).json({
      status: 'success',
      message: 'Genre created successfully',
      data: genre,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      status: 'failed',
      message: 'Internal Server Error',
    })
  }
}

export const updateGenre = async (req: Request, res: Response) => {
  try {
    const genreId = req.params.id
    const body = req.body

    const genre = await GenreModel.findByIdAndUpdate(
      genreId,
      { name: body.name },
      { new: true }
    )

    if (!genre) {
      return res.status(404).json({
        status: 'failed',
        message: 'Genre not found',
      })
    }

    return res.status(200).json({
      status: 'success',
      message: 'Genre updated successfully',
      data: genre,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      status: 'failed',
      message: 'Internal Server Error',
    })
  }
}
