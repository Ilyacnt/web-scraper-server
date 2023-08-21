import { headlessParser } from '../scraping/HeadlessParser'

class CategoryService {
  async getMinPriceByCategoryIdFromHoff(categoryId: string): Promise<number> {
    headlessParser.test()
    return 1337
  }
}

export const categoryService = new CategoryService()
