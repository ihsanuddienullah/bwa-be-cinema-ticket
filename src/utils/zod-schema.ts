import { z } from 'zod'

export const genreSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
  })
  .strict()

export const theaterSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    location: z.string().min(1, 'Location is required'),
  })
  .strict()

export const movieSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    genres: z.array(z.string().min(1, 'Genre ID is required')).min(1, 'At least one genre is required'),
    theaters: z.array(z.string().min(1, 'Theater ID is required')).min(1, 'At least one theater is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.number().min(0, 'Price must be at least 0'),
    available: z.boolean(),
    bonus: z.string().optional(),
  })
  .strict()
