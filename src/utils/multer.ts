import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
import { allowedImageTypes } from './constants'

export const fileStorage = (folderName: string) =>
  multer.diskStorage({
    destination: (_req, _file, callback) => {
      callback(null, 'public/uploads/' + folderName)
    },
    filename: (_req, file, callback) => {
      const ext = file.originalname.split('.')[1]
      const uniqueId = `${Date.now()}-${Math.round(Math.random() * 1e9)}`

      callback(null, `${file.fieldname}-${uniqueId}.${ext}`)
    },
  })

export const fileFilter = (_req: Request, file: Express.Multer.File, callback: FileFilterCallback) => {
  if (allowedImageTypes.includes(file.mimetype)) {
    callback(null, true)
  } else {
    callback(null, false)
  }
}
