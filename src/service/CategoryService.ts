class CategoryService {
  async getMinPriceByCategoryIdFromHoff(categoryId: string): Promise<number> {
    return 1337
  }
}

export const categoryService = new CategoryService()
