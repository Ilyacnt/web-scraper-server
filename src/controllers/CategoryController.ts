import { NextFunction, Request, Response } from 'express'
import { categoryService } from '../service/CategoryService'

class CategoryController {
  async getCategoryMinPrice(req: Request, res: Response, next: NextFunction): Promise<void | Error> {
    try {
      const categoryId = req.query.categoryId
      if (typeof categoryId === 'string') {
        const response = await categoryService.getMinPriceByCategoryIdFromHoff(categoryId)
        res.send({
          minPrice: response,
        })
      } else {
        throw new Error('Category id is not correct')
      }
    } catch (error) {
      next(error)
    }
  }
}

export const categoryController = new CategoryController()
