import express, { Express, Request, Response } from 'express'
import path from 'path'
import dotenv from 'dotenv'
import { categoryRouter } from './routes/categoryRouter'
dotenv.config({ path: path.resolve(__dirname, '../config/.env') })

const app: Express = express()

app.use('/category', categoryRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Running on http://localhost:${process.env.SERVER_PORT}`)
})
