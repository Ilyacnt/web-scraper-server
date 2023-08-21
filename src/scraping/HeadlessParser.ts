import puppeteer, { Browser, Page } from 'puppeteer'

class HeadlessParser {
  public browserInstance: Browser
  public url: string = 'https://hoff.ru/catalog/gostinaya/divany/?sort=price_asc'

  constructor() {
    this.createBrowser()
  }

  async createBrowser(): Promise<void> {
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

  async openHoffPage(): Promise<void> {
    let page = await this.browserInstance.newPage()
    console.log(`Navigating to ${this.url}...`)
    await page.goto(this.url)

    this.selectDataFromPage(page)
  }

  async selectDataFromPage(page: Page): Promise<void> {
    console.log('TEST1 BEFORE WAITING SELECTOR')
    await page.waitForSelector('.o-template-wrapper')
    console.log('TEST2 AFTER WAITING SELECTOR')

    let data = await page.$$eval(
      '#\\30 > div > div > div > div.product-content > div.product-title > div.product-price > div > span',
      (data) => {
        return data
      }
    )
    console.log(data)
  }

  async test(): Promise<void> {
    this.openHoffPage()
  }
}

export const headlessParser = new HeadlessParser()
