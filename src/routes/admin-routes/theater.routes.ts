import express from 'express'
import { getAllTheaters } from '@/controllers/theater.controller'

const theaterRoutes = express.Router()

theaterRoutes.get('/theaters', getAllTheaters)

export default theaterRoutes
