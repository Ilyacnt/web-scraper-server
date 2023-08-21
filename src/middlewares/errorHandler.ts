import { NextFunction, Request, Response } from 'express'

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
}

export const errorMiddleware = errorHandler