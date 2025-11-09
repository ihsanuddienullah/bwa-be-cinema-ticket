import { z } from 'zod'

export const createGenreSchema = z
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
