import { Request, Response } from 'express'
import { TheaterModel } from '@/models'

export const getAllTheaters = async (_: Request, res: Response) => {
  try {
    const theaters = await TheaterModel.find()

    return res.status(200).json({
      status: 'success',
      message: 'Success get all theaters',
      data: theaters,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      status: 'failed',
      message: 'Internal Server Error',
    })
  }
}
