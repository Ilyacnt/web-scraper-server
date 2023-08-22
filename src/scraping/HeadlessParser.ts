import puppeteer, { Browser, Page } from 'puppeteer'

export const enum CategorySortBy {
    PRICE_ASC = 'price_asc',
    PRICE_DESC = 'price_desc',
    DISCOUNT_DESC = 'discount_desc',
}

type DataFromPage = 'price' | 'discount'

class HeadlessParser {
    public browserInstance: Browser
    // public url: string = 'https://hoff.ru/catalog/gostinaya/divany/?sort=price_asc'
    public url: string = process.env.HOFF_URL || 'https://hoff.ru/'

    constructor() {
        this.createBrowser()
    }

    public async parseMinPrice(
        category: string,
        sortBy: CategorySortBy
    ): Promise<Record<string, string>> {
        return await this.openHoffPageByCategory(category, sortBy)
    }

    private async openHoffPageByCategory(
        category: string,
        sortBy: CategorySortBy
    ): Promise<Record<string, string>> {
        let currentUrl = this.url + `catalog/${category}/?sort=${sortBy}`

        let page = await this.browserInstance.newPage()
        console.log(`Navigating to ${currentUrl}...`)
        await page.goto(currentUrl)

        const result = await this.selectDataFromPage(page)
        return result
    }

    private async createBrowser(): Promise<void> {
        try {
            console.log('Opening the browser......')
            let browser: Browser = await puppeteer.launch({
                headless: false,
                args: ['--disable-setuid-sandbox'],
                ignoreHTTPSErrors: true,
            })

            this.browserInstance = browser
        } catch (err) {
            console.log('Could not create a browser instance => : ', err)
        }
    }

    private async selectDataFromPage(
        page: Page,
        dataType: DataFromPage = 'price'
    ): Promise<Record<string, string>> {
        let result = {}
        if (dataType === 'price') {
            await page.waitForSelector('.current-price')

            result = await page.$$eval('.current-price', (elements) => {
                return { minPrice: elements[0].textContent }
            })
        } else if (dataType === 'discount') {
            await page.waitForSelector('.promo-label__text')

            result = await page.$$eval('.promo-label__text', (elements) => {
                return { maxDiscount: elements[0].textContent }
            })
        }

        console.log(result)

        return result
    }
}

export const headlessParser = new HeadlessParser()
