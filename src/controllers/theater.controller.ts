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

export const createTheater = async (req: Request, res: Response) => {
  try {
    const body = req.body

    const theater = new TheaterModel({
      name: body.name,
      location: body.location,
    })

    await theater.save()

    return res.status(200).json({
      status: 'success',
      message: 'Theater created successfully',
      data: theater,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      status: 'failed',
      message: 'Internal Server Error',
    })
  }
}

export const updateTheater = async (req: Request, res: Response) => {
  try {
    const theaterId = req.params.theaterId
    const body = req.body

    const theater = await TheaterModel.findByIdAndUpdate(
      theaterId,
      { name: body.name, location: body.location },
      { new: true }
    )

    if (!theater) {
      return res.status(404).json({
        status: 'failed',
        message: 'Theater not found',
      })
    }

    return res.status(200).json({
      status: 'success',
      message: 'Theater updated successfully',
      data: theater,
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      status: 'failed',
      message: 'Internal Server Error',
    })
  }
}

export const deleteTheater = async (req: Request, res: Response) => {
  try {
    const theaterId = req.params.theaterId

    const theater = await TheaterModel.findByIdAndDelete(theaterId)

    if (!theater) {
      return res.status(404).json({
        status: 'failed',
        message: 'Theater not found',
      })
    }

    return res.status(200).json({
      status: 'success',
      message: 'Theater deleted successfully',
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      status: 'failed',
      message: 'Internal Server Error',
    })
  }
}
