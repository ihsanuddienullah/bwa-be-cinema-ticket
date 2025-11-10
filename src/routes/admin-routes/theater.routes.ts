import express from 'express'
import { createTheater, deleteTheater, getAllTheaters, updateTheater } from '@/controllers/theater.controller'
import { validateRequest } from '@/middlewares/validate-request.middleware'
import { theaterSchema } from '@/utils/zod-schema'

const theaterRoutes = express.Router()

theaterRoutes.get('/theaters', getAllTheaters)
theaterRoutes.post('/theaters', validateRequest(theaterSchema), createTheater)
theaterRoutes.put('/theaters/:theaterId', validateRequest(theaterSchema), updateTheater)
theaterRoutes.delete('/theaters/:theaterId', deleteTheater)

export default theaterRoutes
