import { Request, Response } from 'express'

class CategoryController {
  async getCategoryMinPrice(req: Request, res: Response): Promise<void | Error> {
    try {
      const categoryId = req.query.categoryId
      console.log(typeof categoryId)

      if (typeof categoryId === 'string') {
        res.send({
          categoryId: categoryId,
        })
      } else {
        throw new Error('Category id not correct')
      }
    } catch (error) {}
  }
}

export const categoryController = new CategoryController()
