import express, { Express, Request, Response } from 'express'
import path from 'path'
import dotenv from 'dotenv'
import { categoryRouter } from './routes/categoryRouter'
import { errorMiddleware } from './middlewares/errorHandler'
dotenv.config({ path: path.resolve(__dirname, '..', 'config', '.env') })

const app: Express = express()

app.use('/category', categoryRouter)
app.use(errorMiddleware)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World')
})

app.listen(process.env.PORT || 80, () => {
    console.log(`Running on http://localhost:${process.env.PORT}`)
})
