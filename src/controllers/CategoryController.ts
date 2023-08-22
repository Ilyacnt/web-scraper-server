import { NextFunction, Request, Response } from 'express'
import { categoryService } from '../service/CategoryService'

class CategoryController {
    async getCategoryMinPrice(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void | Error> {
        try {
            const category = req.query.category
            if (typeof category === 'string') {
                const response = await categoryService.getMinPriceByCategoryFromHoff(category)
                res.send(response)
            } else {
                throw new Error('Category id is not correct')
            }
        } catch (error) {
            next(error)
        }
    }
}

export const categoryController = new CategoryController()
