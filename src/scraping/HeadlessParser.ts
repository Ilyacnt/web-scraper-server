import puppeteer, { Browser, Page } from 'puppeteer'

export const enum CategorySortBy {
    PRICE_ASC = 'price_asc',
    PRICE_DESC = 'price_desc',
    DISCOUNT_DESC = 'discount_desc',
}

type DataFromPage = 'price' | 'discount'

type ParsedCategory = {
    categoryName: string
    categoryMinPrice: string
    categoryMaxDiscount: string
}

class HeadlessParser {
    public browserInstance: Browser
    public url: string = process.env.HOFF_URL || 'https://hoff.ru'

    constructor() {
        this.createBrowser()
    }

    public async parseMinPrice(category: string, sortBy: CategorySortBy): Promise<ParsedCategory> {
        let response = await this.openHoffPageByCategory(category, sortBy)
        return response
    }

    private async openHoffPageByCategory(
        category: string,
        sortBy: CategorySortBy
    ): Promise<ParsedCategory> {
        let currentUrl = this.url + `${category}?sort=${sortBy}`

        if (!this.browserInstance) {
            await this.createBrowser()
        }

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
                headless: 'new',
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                ignoreHTTPSErrors: true,
                executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || puppeteer.executablePath(),
            })

            this.browserInstance = browser
        } catch (err) {
            console.log('Could not create a browser instance => : ', err)
        }
    }

    private async selectDataFromPage(page: Page): Promise<ParsedCategory> {
        let result: ParsedCategory = {
            categoryName: '',
            categoryMinPrice: '',
            categoryMaxDiscount: '',
        }

        console.log(result)

        await page.waitForSelector('.page-title')

        await page.$$eval('.page-title', (elements) => {
            result.categoryName = elements[0].textContent || ''
        })

        await page.waitForSelector('.current-price')

        await page.$$eval('.current-price', (elements) => {
            result.categoryMinPrice = elements[0].textContent || ''
        })

        await page.waitForSelector('.promo-label__text')

        await page.$$eval('.promo-label__text', (elements) => {
            result.categoryMaxDiscount = elements[0].textContent || ''
        })

        page.close()
        return result
    }
}

export const headlessParser = new HeadlessParser()
