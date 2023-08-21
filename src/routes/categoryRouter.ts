import express, { Request, Response } from 'express'
import { categoryController } from '../controllers/CategoryController'

const router = express.Router()

router.get('/getMinPrice', categoryController.getCategoryMinPrice)

export const categoryRouter = router
