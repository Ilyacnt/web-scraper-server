import { CategorySortBy, headlessParser } from '../scraping/HeadlessParser'

class CategoryService {
    async getMinPriceByCategoryFromHoff(category: string): Promise<Record<string, string>> {
        try {
            const result = headlessParser.parseMinPrice(category, CategorySortBy.PRICE_ASC)
            return result
        } catch (error) {
            throw new Error('Error when parsing site')
        }
    }
}

export const categoryService = new CategoryService()
