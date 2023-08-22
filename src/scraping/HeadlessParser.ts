import puppeteer, { Browser, Page } from 'puppeteer'

class HeadlessParser {
    public browserInstance: Browser
    public url: string = 'https://hoff.ru/catalog/gostinaya/divany/?sort=price_asc'

    constructor() {
        this.createBrowser()
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

    private async openHoffPage(): Promise<void> {
        let page = await this.browserInstance.newPage()
        console.log(`Navigating to ${this.url}...`)
        await page.goto(this.url)

        await this.selectDataFromPage(page)
    }

    private async selectDataFromPage(page: Page): Promise<void> {
        await page.waitForSelector('.current-price')

        let result = await page.$$eval('.current-price', (elements) => {
            return elements[0].textContent
        })

        console.log(result)
    }

    async test(): Promise<void> {
        await this.openHoffPage()
    }
}

export const headlessParser = new HeadlessParser()
