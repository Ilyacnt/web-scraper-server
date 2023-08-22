import { headlessParser } from '../scraping/HeadlessParser'

class CategoryService {
    async getMinPriceByCategoryIdFromHoff(categoryId: string): Promise<number> {
        try {
            headlessParser.test()
        } catch (error) {
            throw new Error('Error when parsing site')
        }
        return 1337
    }
}

export const categoryService = new CategoryService()
