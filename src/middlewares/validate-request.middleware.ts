import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export const validateRequest =
  (schema: z.ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Validating request body:', req.body)
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.issues.map(
          (issue) => `${issue.path}: ${issue.message}`
        )

        console.log(errorMessages)

        return res
          .status(400)
          .json({ error: 'invalid request', message: errorMessages })
      }

      res.status(500).json({ error: 'Internal server error' })
    }
  }
